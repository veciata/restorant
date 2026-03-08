<?php

namespace App\Http\Controllers;

use App\Models\SiteSettings;
use App\Models\Testimonial;
use Illuminate\Http\Request;

class SiteSettingsController extends Controller
{
    /**
     * Show the site settings edit form.
     */
    public function edit()
    {
        $settings = SiteSettings::current();
        
        // Get all testimonials for management
        $testimonials = Testimonial::orderBy('sort_order', 'asc')
            ->get()
            ->map(function ($testimonial) {
                return [
                    'id' => $testimonial->id,
                    'name' => $testimonial->author,
                    'role' => $testimonial->role,
                    'text' => $testimonial->content,
                    'status' => $testimonial->status,
                    'sort_order' => $testimonial->sort_order,
                ];
            });

        return inertia('Admin/SiteSettings', [
            'settings' => $settings,
            'testimonials' => $testimonials,
        ]);
    }

    /**
     * Update the site settings.
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'site_name' => ['required', 'string', 'max:255'],
            'site_description' => ['nullable', 'string', 'max:1000'],
            'contact_email' => ['nullable', 'email', 'max:255'],
            'contact_phone' => ['nullable', 'string', 'max:255'],
            'address' => ['nullable', 'string', 'max:500'],
            'working_hours' => ['nullable', 'array'],
            'working_hours.monday_thursday' => ['nullable', 'string', 'max:255'],
            'working_hours.friday_saturday' => ['nullable', 'string', 'max:255'],
            'working_hours.sunday' => ['nullable', 'string', 'max:255'],
            'social_facebook' => ['nullable', 'url', 'max:255'],
            'social_instagram' => ['nullable', 'url', 'max:255'],
            'social_twitter' => ['nullable', 'url', 'max:255'],
            // Homepage content
            'hero_title' => ['nullable', 'string', 'max:255'],
            'hero_subtitle' => ['nullable', 'string', 'max:255'],
            'hero_description' => ['nullable', 'string', 'max:1000'],
            'hero_image' => ['nullable', 'url', 'max:500'],
            'michelin_stars' => ['nullable', 'integer', 'min:0', 'max:5'],
            'happy_guests' => ['nullable', 'string', 'max:50'],
            'artisan_dishes' => ['nullable', 'string', 'max:50'],
            'testimonial_text' => ['nullable', 'string', 'max:500'],
            'testimonial_author' => ['nullable', 'string', 'max:255'],
            'testimonial_role' => ['nullable', 'string', 'max:255'],
            // Banner texts
            'banner_texts' => ['nullable', 'array'],
            'banner_texts.*' => ['nullable', 'string', 'max:255'],
        ]);

        $settings = SiteSettings::current();
        $settings->update($validated);

        return back()->with('success', 'Site settings updated successfully!');
    }
}
