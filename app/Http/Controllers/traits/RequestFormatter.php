<?php


namespace App\Http\Controllers;


trait RequestFormatter
{
    public function sendApiRequestFormat($code, $data, $message)
    {
        return response()->json([
            'code' => $code,
            'data' => $data,
            'message' => $message
        ]);
    }
}
