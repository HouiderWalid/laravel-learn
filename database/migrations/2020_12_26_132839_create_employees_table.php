<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmployeesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('employees', function (Blueprint $table) {
            $table->increments('employee_id');
/*            $table->integer('employee_social_id')->nullable();
            $table->string('employee_social_id_type')->nullable();*/
            $table->integer('company_id')->unsigned()->nullable();
            $table->string('employee_username')->unique();
            $table->string('employee_email')->unique();
            $table->string('employee_password');
            $table->string('employee_first_name');
            $table->string('employee_last_name');
            $table->string('employee_function');
            $table->string('employee_phone');
            $table->string('employee_image');
            $table->string('employee_address');
            $table->timestamp('employee_email_verified_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('employees');
    }
}
