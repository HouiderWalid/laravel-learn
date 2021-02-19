<?php

namespace App\Http\Controllers;

use App\Http\Controllers\traits\PasswordResettable;
use App\Jobs\EmailJob;
use App\Mail\ResetPasswordMail;
use App\Models\Company;
use App\Models\Employee;
use App\Notifications\RegisterEmployeeNotification;
use Carbon\Carbon;
use GuzzleHttp\Client;
use Illuminate\Http\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Laravel\Socialite\Facades\Socialite;

class EmployeeController extends Controller
{
    use RequestFormatter;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->sendApiRequestFormat(200, Employee::all(), 'Employees fetched successfully.');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $fields = [
            'company_id' => 'nullable|numeric',
            'employee_username' => 'required|min:3|unique:employees|max:15',
            'employee_email' => 'required|email|max:40',
            'employee_image' => 'required|image|max:2048',
            'employee_first_name' => 'required|min:3|max:15',
            'employee_last_name' => 'required|min:3|max:15',
            'employee_phone' => 'required|unique:employees|min:10',
            'employee_address' => 'required|min:3',
            'employee_function' => 'required|min:3',
            'employee_password' => 'required|confirmed|min:8|max:255',
        ];

        $employee_validation = Validator::make($request->all(), $fields);

        if($employee_validation->fails()) return $this->sendApiRequestFormat(401, null, $employee_validation->errors());

        if($request->company_id != null){
            $company = Company::find($request->company_id);
            if(! $company) return $this->sendApiRequestFormat(404, null, 'Company not found.');
        }

        $employee = new Employee();
        $employee->employee_username = $request->employee_username;
        $employee->employee_email = $request->employee_email;
        $employee->employee_image = env('APP_URL').$request->file('employee_image')->storeAs('iamges/employees', time().$request->employee_username, 'public');
        $employee->employee_first_name = $request->employee_first_name;
        $employee->employee_last_name = $request->employee_last_name;
        $employee->employee_phone = $request->employee_phone;
        $employee->employee_address = $request->employee_address;
        $employee->employee_function = $request->employee_function;
        $employee->employee_password = Hash::make($request->employee_password);

        if(!Employee::create($employee)) return $this->sendApiRequestFormat(500, null, 'Employee creation failed.');

        return $this->sendApiRequestFormat(200, null, 'Employee created successfully.');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $employee = Employee::find($id);

        if (! $employee) return $this->sendApiRequestFormat(404, null, 'Employee not found.');

        return $this->sendApiRequestFormat(200, $employee, 'Employee fetshed successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $employee = Employee::find($id);
        if(!$employee) return $this->sendApiRequestFormat(404, null, 'Employee not found.');

        $fields = [
            'employee_username' => ['required', 'min:3', 'max:15', Rule::unique('employees')->ignore($employee)],
            'employee_email' => ['required', 'email', 'max:40', Rule::unique('employees')->ignore($employee)],
            'employee_image' => 'nullable|image|max:2048',
            'employee_first_name' => 'nullable|min:3|max:15',
            'employee_last_name' => 'nullable|min:3|max:15',
            'employee_phone' => 'nullable|unique:employees|min:10',
            'employee_address' => 'nullable|min:3',
            'employee_function' => 'nullable|min:3',
            'employee_password' => 'nullable|confirmed|min:8',
        ];

        $employee_validation = Validator::make($request->all(), $fields);

        if($employee_validation->fails()) return $this->sendApiRequestFormat(401, null, $employee_validation->errors());

        $employee->employee_username = $request->employee_username;
        $employee->employee_email = $request->employee_email;
        if ($request->file('employee_image'))
            $employee->employee_image = env('APP_URL').$request->file('employee_image')->storeAs('images/employees', time().$request->employee_username, 'public');
        elseif (gettype($request->employee_image) == "string") $employee->employee_image = $request->employee_image;
        $employee->employee_first_name = $request->employee_first_name;
        $employee->employee_last_name = $request->employee_last_name;
        $employee->employee_phone = $request->employee_phone;
        $employee->employee_address = $request->employee_address;
        $employee->employee_function = $request->employee_function;
        $employee->employee_password = Hash::make($request->employee_password);

        if(!$employee->save()) return $this->sendApiRequestFormat(500, null, 'Employee creation failed.');

        return $this->sendApiRequestFormat(200, null, 'Employee updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $employee = Employee::find($id);
        if(!$employee) return $this->sendApiRequestFormat(404, null, 'Employee not found.');
        if(!Employee::destroy($employee)) return $this->sendApiRequestFormat(500, null, 'Employee delete failed.');
        return $this->sendApiRequestFormat(200, null, 'Employee deleted successfully.');
    }

    public function registerEmployee(Request $request)
    {
        $fields = [
            'employee_username' => 'required|min:3|unique:employees|max:15',
            'employee_email' => 'required|email|max:40',
            'employee_password' => 'required|confirmed|min:3|max:255',
        ];

        $employee_validation = Validator::make($request->all(), $fields);

        if($employee_validation->fails()) return $this->sendApiRequestFormat(401, null, $employee_validation->errors());

        if($request->company_id){
            $company = Company::find($request->company_id);
            if(! $company) return $this->sendApiRequestFormat(404, null, 'Company not found.');
        }

        $employee = new Employee();
        $employee->employee_username = $request->employee_username;
        $employee->employee_email = $request->employee_email;
        $employee->employee_password = Hash::make($request->employee_password);

        if(!$employee->save()) return $this->sendApiRequestFormat(500, null, 'Employee creation failed.');

        $token_result =  $employee->createToken('access-token');
        if ($request->employee_remember_me) $token_result->expires_at = Carbon::now()->addWeeks(1);
        else $token_result->expires_at = Carbon::now()->addHours(1);

        $data = [
            'user' => $employee,
            'access_token' => $token_result->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse( $token_result->expires_at )->toDateTimeString()
        ];

        return $this->sendApiRequestFormat(200, $data, 'Employee created and signed in successfully.');
    }

    /*public function loginEmployee(Request $request)
    {
        $locale = $request->lang;
        if ($locale && in_array($locale, ['en', 'fr'])) {
            App::setLocale($locale);
        }

        $credentials = [
            'employee_username' => 'required|min:3|email|max:50',
            'employee_password' => 'required|min:3|max:255',
            'app_client_id' => 'required|max:255',
            'app_client_secret' => 'required|max:255',
        ];

        $employee_login_validation = Validator::make($request->all(), $credentials);

        if ($employee_login_validation->fails()) return $this->sendApiRequestFormat(401, null, $employee_login_validation->errors());

        $http = new Client();

        // This request can work only when using a multithreaded server (like: apache), so don't use php artisan serve.
        $response = $http->post(env('APP_URL').'/oauth/token', [
            'form_params' => [
                'grant_type' => 'password',
                'client_id' => $request->app_client_id,
                'client_secret' => $request->app_client_secret,
                'username' => $request->employee_username,
                'password' => $request->employee_password,
                'scope' => ''
            ],
            'http_errors' => false // important for the request to return a json error format.
        ]);

        $response_code  = $response->getStatusCode();
        $response_data  = json_decode((string) $response->getBody(), true);
        $response_error = 'Access granted !';
        if($response_code == 400)  $response_error =  Lang::get('auth.failed');
        if ($response_code != 200 && $response_code != 400) $response_error =  'Server error.';

        return $this->sendApiRequestFormat($response_code, $response_data, $response_error);
    }*/

    public function loginEmployee(Request $request)
    {
        $locale = $request->lang;
        if ($locale && in_array($locale, ['en', 'fr'])) {
            App::setLocale($locale);
        }

        $credentials_validation_array = [
            'employee_username' => 'required|email|min:3|max:50',
            'employee_password' => 'required|min:3|max:255'
        ];

        $credentials = [
            'employee_email' => $request->employee_username,
            'password' => $request->employee_password
        ];

        $login_validation = Validator::make($request->all(), $credentials_validation_array);

        if ($login_validation->fails()) return $this->sendApiRequestFormat(401, null, $login_validation->errors());

        $auth = Auth::guard('web-employees');

        if (!$auth->attempt($credentials))
            return $this->sendApiRequestFormat(400, null, Lang::get('auth.failed'));

        $user = $auth->user();
        $token_result =  $user->createToken('access-token');
        if ($request->employee_remember_me) $token_result->expires_at = Carbon::now()->addWeeks(1);
        else $token_result->expires_at = Carbon::now()->addHours(1);

        $data = [
            'user' => $user,
            'access_token' => $token_result->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse( $token_result->expires_at )->toDateTimeString()
        ];

        return $this->sendApiRequestFormat(200, $data, 'signed in successfully.');
    }

    public function socialMediaLogin($provider)
    {
        $targetUrl =  Socialite::driver($provider)->stateless()->redirect()->getTargetUrl();
        if (!$targetUrl) return $this->sendApiRequestFormat(500, null, "$provider url target fetching failed.");
        return $this->sendApiRequestFormat(200, $targetUrl, "$provider url target is ready.");
    }

    public function socialMediaCallback($provider)
    {
        $user = Socialite::driver($provider)->stateless()->user();

        $oldUser = Employee::where('employee_social_id', $user->getId())->where('employee_social_id_type', $provider)->first();

        if (!$oldUser) $oldUser = new Employee();

        $fullName = explode(' ', $user->getName());

        $oldUser->employee_social_id = $user->getId();
        $oldUser->employee_social_id_type = $provider;
        $oldUser->employee_username = $user->getNickname() ?? $fullName[0];
        $oldUser->employee_email = $user->getEmail();
        $oldUser->employee_password = Hash::make(Str::random(7));
        if($user->getAvatar()) {
            $avatarContent = file_get_contents($user->getAvatar());
            $avatarName = $this->getImageNameFromUrl($user->getAvatar());
            Storage::disk('public')->put('/images/employees/' . $avatarName, $avatarContent);
            $oldUser->employee_image = env('APP_URL').'/files/images/employees/'.$avatarName;
        }else $oldUser->employee_image = $this->getDefaultAvatar();
        $oldUser->employee_first_name = $fullName[0];
        $oldUser->employee_last_name = $fullName[1];
        $oldUser->save();

        $token_result = $oldUser->createToken('access-token');
        $token_result->expires_at = Carbon::now()->addWeeks(1);

        $data = [
            'user' => $oldUser,
            'access_token' => $token_result->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse( $token_result->expires_at )->toDateTimeString()
        ];

        $oldUser->notify(new RegisterEmployeeNotification());

        return $this->sendApiRequestFormat(200, $data, "login with $provider done successfully.");
    }

    public function getImageNameFromUrl($url): string
    {
        $path = pathinfo($url);
        $name = $path['filename'] ?? 'image'.time();
        $urlExtension = $path['extension'] ?? '.png';
        return $name . $urlExtension;
    }

    public function getDefaultAvatar(): string
    {
        return 'default_avatar.png';
    }

    public function resetPasswordEmailCheck(Request $request)
    {
        $locale = $request->lang;
        if ($locale && in_array($locale, ['en', 'fr'])) {
            App::setLocale($locale);
        }

        $validation_array = [
          'employee_email' => 'required|email'
        ];

        $validation = Validator::make($request->all(), $validation_array);
        if ($validation->fails()) return $this->sendApiRequestFormat(401, null, $validation->errors());

        $employee = Employee::where('employee_email', $request->employee_email)->first();

        if (!$employee) return $this->sendApiRequestFormat(404, null, 'employee not found');

        $data = [
            'email' => $request->employee_email,
            'token' => Str::random(60)
        ];

        $data_table = $data;
        $data_table['created_at'] = Carbon::now();

        DB::table('password_resets')->insert($data_table);

        $url = 'http://localhost/reset/password/callback/'.$data['token'].'?email='.urlencode($data['email']).'?lang='.App::getLocale();

        $this->sendEmail($employee, $url);

        return $this->sendApiRequestFormat(200, $data, 'success');
    }

    public function resetPassword(Request $request, $token)
    {
        $locale = $request->lang;

        if ($locale && in_array($locale, ['en', 'fr'])) {
            App::setLocale($locale);
        }

        $validation_array = [
            'employee_email' => 'required|email',
            'employee_password' => 'required|confirmed|min:3|max:255'
        ];

        $validation = Validator::make($request->all(), $validation_array);
        if ($validation->fails()) return $this->sendApiRequestFormat(401, null, $validation->errors());

        $reset_obj = DB::table('password_resets')->where('token', $token)->where('email', $request->email)->first();

        if (!$reset_obj) return $this->sendApiRequestFormat(400, null, 'request not found');

        $employee = Employee::where('employee_email', $request->email)->first();

        $employee->employee_password = Hash::make($request->employee_password);

        if (!$employee->save()) return $this->sendApiRequestFormat(500, null, 'server error');

        return $this->sendApiRequestFormat(200, null, 'password reset successfully.');

    }

    public function sendEmail($employee, $url)
    {

        $data = [
            'url' => $url,
            'employee' => $employee
        ];

        Mail::to($employee->employee_email)->send(new ResetPasswordMail($data));

        //EmailJob::dispatch($data)->delay(now()->addSeconds(10));

        return $this;
    }

    public function getEmployeeNotifications($id)
    {
        $employee = Employee::find($id);

        if (!$employee) return $this->sendApiRequestFormat(404, null, 'Employee not found');

        return $this->sendApiRequestFormat(200, json_encode($employee->array_column_multi($employee->notifications->toarray(), ['id', 'data', 'created_at', 'read_at'])), 'success');

    }

    public function readNotifications($id)
    {
        $employee = Employee::find($id);

        if (!$employee) return $this->sendApiRequestFormat(404, null, 'Employee not found');

        $employee->unreadNotifications->markAsRead();

        return $this->sendApiRequestFormat(200, json_encode($employee->array_column_multi($employee->notifications->toarray(), ['id', 'data', 'created_at', 'read_at'])), 'success');
    }

    public function verifyEmail()
    {

    }

}
