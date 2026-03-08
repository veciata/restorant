<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SiteSettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('site_settings')->updateOrInsert(
            ['id' => 1],
            [
                'site_name' => 'Regal Resto',
                'site_description' => 'Experience fine dining at its best with our exquisite menu and exceptional service.',
                'contact_email' => 'info@regalresto.com',
                'contact_phone' => '+1 (555) 123-4567',
                'address' => '123 Gourmet Street, Culinary District, NY 10001',
                'working_hours' => json_encode([
                    'mon_thu' => ['start' => '11:00', 'end' => '22:00'],
                    'fri_sat' => ['start' => '11:00', 'end' => '23:30'],
                    'sunday' => ['start' => '12:00', 'end' => '21:00']
                ]),
                'social_facebook' => 'https://facebook.com/regalresto',
                'social_instagram' => 'https://instagram.com/regalresto',
                'social_twitter' => 'https://twitter.com/regalresto',
                'hero_title' => 'Exceptional Dining Experience',
                'hero_subtitle' => 'Where Culinary Art Meets Excellence',
                'hero_description' => 'Indulge in our carefully crafted dishes prepared by world-class chefs using only the finest ingredients.',
                'hero_image' => 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=800&fit=crop&auto=format',
                'michelin_stars' => 3,
                'happy_guests' => '5000+',
                'artisan_dishes' => '50+',
                'testimonial_text' => 'Absolutely phenomenal dining experience! The attention to detail and flavor combinations were extraordinary.',
                'testimonial_author' => 'Sarah Mitchell',
                'testimonial_role' => 'Food Critic',
                'banner_texts' => json_encode([
                    'Welcome to Regal Resto',
                    'Experience Culinary Excellence',
                    'Reserve Your Table Today'
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );

        $this->command->info('Site settings seeded successfully!');
    }
}
