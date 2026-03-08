<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SiteSettings extends Model
{
    protected $fillable = [
        'site_name',
        'site_description',
        'contact_email',
        'contact_phone',
        'address',
        'working_hours',
        'social_facebook',
        'social_instagram',
        'social_twitter',
        // Homepage content
        'hero_title',
        'hero_subtitle',
        'hero_description',
        'hero_image',
        'michelin_stars',
        'happy_guests',
        'artisan_dishes',
        'testimonial_text',
        'testimonial_author',
        'testimonial_role',
        // Scrolling banner content (JSON array)
        'banner_texts',
    ];

    protected $casts = [
        'working_hours' => 'array',
        'banner_texts' => 'array',
    ];

    /**
     * Get the current site settings (create default if none exists)
     */
    public static function current()
    {
        return static::firstOrCreate([], [
            'site_name' => 'Regal Resto',
            'site_description' => 'Indulge in an exquisite culinary journey where tradition meets innovation.',
            'working_hours' => [
                'monday_thursday' => '11:00 AM - 10:00 PM',
                'friday_saturday' => '11:00 AM - 11:30 PM',
                'sunday' => '12:00 PM - 9:00 PM',
            ],
            // Homepage defaults
            'hero_title' => 'Crafted Culinary Perfection.',
            'hero_subtitle' => 'A Masterpiece in Every Bite',
            'hero_description' => 'Experience symphony of flavors in our award-winning restaurant. From locally-sourced ingredients to avant-garde presentation.',
            'hero_image' => 'https://images.unsplash.com/photo-1559333086-b0a262b5a48c?q=80&w=1200&auto=format&fit=crop',
            'michelin_stars' => 3,
            'happy_guests' => '50K+',
            'artisan_dishes' => '120+',
            'testimonial_text' => 'The 3D table selection made our anniversary booking so much more exciting. We picked exactly where we wanted to sit!',
            'testimonial_author' => 'Sophia Chen',
            'testimonial_role' => 'Food Blogger',
            // Default banner texts
            'banner_texts' => [
                'Locally Sourced',
                'Award Winning Chef',
                '3D Table Booking'
            ],
        ]);
    }
}
