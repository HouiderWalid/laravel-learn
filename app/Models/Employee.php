<?php

namespace App\Models;

use Illuminate\Contracts\Translation\HasLocalePreference;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Laravel\Passport\HasApiTokens;

class Employee extends Authenticatable implements HasLocalePreference
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $primaryKey = 'employee_id';

    protected $fillable = [
        'employee_username',
        'employee_email',
        'employee_image',
        'employee_first_name',
        'employee_last_name',
        'employee_phone',
        'employee_address',
        'employee_function',
        'employee_password',
    ];

    public function company()
    {
        $this->belongsTo(Company::class);
    }

/*    public function findForPassport($username)
    {
        return $this->where('employee_email', $username)->first();
    }

    public function validateForPassportPasswordGrant($password)
    {
        return Hash::check($password, $this->employee_password);
    }*/

    public function getEmailForPasswordReset()
    {
        return $this->employee_email;
    }

    public function getAuthPassword(){
        return $this->employee_password;
    }

    public function preferredLocale()
    {
        return $this->locale;
    }
}
