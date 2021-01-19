<?php


namespace App\Http\Controllers\traits;


use Illuminate\Support\Facades\Validator;

trait PasswordResettable
{
    public function validateEmail($email_name, $email)
    {
        $field = [
          $email_name =>  'required|email'
        ];

        $data = [
            $email_name => $email
        ];

        $email_validation = Validator::make($data, $field);

        if ($email_validation->fails()) return $email_validation->errors();

    }

}
