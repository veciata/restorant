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
    ];

    protected $casts = [
        'working_hours' => 'array',
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
        ]);
    }
}
