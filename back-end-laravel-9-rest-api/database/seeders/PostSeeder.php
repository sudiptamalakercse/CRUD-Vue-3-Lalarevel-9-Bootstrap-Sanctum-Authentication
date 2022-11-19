<?php

namespace Database\Seeders;

use Faker\Factory as Faker;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();
        foreach (range(1, 5) as $value) {
            DB::table('posts')->insert([
                'name' => $faker->name(),
                'city' => $faker->city(),
                'fees' => 100.50,
                'user_id' => 1,
            ]);
        }
    }
}
