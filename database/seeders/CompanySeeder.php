<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\Employee;
use Illuminate\Database\Seeder;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
            Company::factory()
                ->times(5)
                ->hasEmployees()
                ->create();
    }
}
