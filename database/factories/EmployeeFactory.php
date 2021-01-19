<?php

namespace Database\Factories;

use App\Models\Employee;
use Illuminate\Database\Eloquent\Factories\Factory;

class EmployeeFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Employee::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'employee_username' => $this->faker->userName,
            'employee_email' => $this->faker->email,
            'employee_image' => $this->faker->imageUrl(),
            'employee_first_name' => $this->faker->firstName,
            'employee_last_name' => $this->faker->lastName,
            'employee_phone' => $this->faker->phoneNumber,
            'employee_address' => $this->faker->address,
            'employee_function' => $this->faker->jobTitle,
            'employee_password' => $this->faker->password,
        ];
    }
}
