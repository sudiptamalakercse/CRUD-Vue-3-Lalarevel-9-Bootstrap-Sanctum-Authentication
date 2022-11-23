<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'user1',
            'email' => 'user1@gmail.com',
            'password' => '$2y$10$E0WC5Sfc2M.l3ZwUBpo23OxfpOUgNqsjBtGmPK9E1pA/QdDqkWHnO',
        ]);

    }
}
