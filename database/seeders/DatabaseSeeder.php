<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            SiteSettingsSeeder::class,
            CategorySeeder::class,
            MenuItemSeeder::class,
            TableSeeder::class,
            WorkingHoursSeeder::class,
            DemoUsersSeeder::class,
            DemoBookingsSeeder::class,
            UserSeeder::class,
        ]);
    }
}
