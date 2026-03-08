<?php

namespace Database\Seeders;

use App\Models\SiteSettings;
use Illuminate\Database\Seeder;

class WorkingHoursSeeder extends Seeder
{
    public function run(): void
    {
        SiteSettings::updateOrCreate(
            ['id' => 1],
            [
                'working_hours' => [
                    'mon_thu' => ['start' => '11:00', 'end' => '22:00'],
                    'fri_sat' => ['start' => '11:00', 'end' => '23:30'],
                    'sunday' => ['start' => '12:00', 'end' => '21:00']
                ]
            ]
        );
    }
}
