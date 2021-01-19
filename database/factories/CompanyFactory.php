<?php

namespace Database\Factories;

use App\Models\Company;
use Illuminate\Database\Eloquent\Factories\Factory;

class CompanyFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Company::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'company_name' => $this->faker->company,
            'company_logo' => $this->faker->imageUrl(),
            'company_phone' => $this->faker->phoneNumber,
            'company_address' => $this->faker->address,
            'company_domain' => $this->faker->jobTitle,
        ];
    }
}