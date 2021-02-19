<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\CompanyController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('test-mail', [EmployeeController::class, 'sendEmail']);

Route::get('/login', function (){
    return 'you\'re not logged in.';
})->name('login-api');


Route::group(['prefix' => '/employee'/*, 'middleware' => 'auth:api-employees'*/], function (){
    Route::get('/', [EmployeeController::class, 'index']);
    Route::get('/{id}', [EmployeeController::class, 'show']);
    Route::post('/', [EmployeeController::class, 'store']);
    Route::post('/update/{id}', [EmployeeController::class, 'update']);
    Route::delete('/(id)', [EmployeeController::class, 'destroy']);
});

Route::group(['prefix' => '/company'], function (){
    Route::get('/', [CompanyController::class, 'index']);
    Route::post('/', [CompanyController::class, 'store']);
    Route::put('/', [CompanyController::class, 'update']);
    Route::delete('/', [CompanyController::class, 'destroy']);
});

Route::group(['prefix' => '/login'], function(){
    Route::post('/', [EmployeeController::class, 'loginEmployee']);
    Route::get('/{provider}', [EmployeeController::class, 'socialMediaLogin']);
    Route::get('/{provider}/callback', [EmployeeController::class, 'socialMediaCallback']);
});

Route::post('/register', [EmployeeController::class, 'registerEmployee']);

Route::post('employee/reset/password/email-check', [EmployeeController::class, 'resetPasswordEmailCheck']);
Route::post('employee/reset/password/{token}', [EmployeeController::class, 'resetPassword']);

Route::get('employee/notifications/{id}', [EmployeeController::class, 'getEmployeeNotifications']);
Route::get('employee/notifications/read/{id}', [EmployeeController::class, 'readNotifications']);


Route::get('name', function (){
   return  'houider walid';
});

