<?php

namespace App\Http\Controllers;

use App\Models\SiteSettings;
use Illuminate\Http\Request;

class SiteSettingsController extends Controller
{
    /**
     * Show the site settings edit form.
     */
    public function edit()
    {
        $settings = SiteSettings::current();

        return inertia('Admin/SiteSettings', [
            'settings' => $settings,
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
        ]);

        $settings = SiteSettings::current();
        $settings->update($validated);

        return back()->with('success', 'Site settings updated successfully!');
    }
}
