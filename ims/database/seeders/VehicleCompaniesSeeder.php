<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VehicleCompaniesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Sample data for vehicle companies
        $companies = [
            ['company_name' => 'Suzuki', 'company_logo' => 'https://upload.wikimedia.org/wikipedia/commons/1/12/Suzuki_logo_2.svg'],
            ['company_name' => 'Toyota', 'company_logo' => 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Toyota_Logo.svg'],
            ['company_name' => 'Ford', 'company_logo' => 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Ford_logo_flat.svg'],
            ['company_name' => 'BMW', 'company_logo' => 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg'],
        ];

        DB::table('vehicle_companies')->insert($companies);
    }
}
