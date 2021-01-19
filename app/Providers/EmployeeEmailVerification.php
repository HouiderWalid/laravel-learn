<?php

namespace App\Providers;

use App\Providers\EmployeeRegistered;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class EmployeeEmailVerification
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  EmployeeRegistered  $event
     * @return void
     */
    public function handle(EmployeeRegistered $event)
    {
        //
    }
}
