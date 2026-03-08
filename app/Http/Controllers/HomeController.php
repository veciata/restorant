<?php

namespace App\Http\Controllers;

use App\Models\SiteSettings;
use App\Models\Testimonial;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Show the homepage with dynamic content.
     */
    public function index(Request $request)
    {
        $settings = SiteSettings::current();
        
        // Get all testimonials for public testimonials page
        $allTestimonials = Testimonial::where('status', true)
            ->orderBy('sort_order', 'asc')
            ->get()
            ->map(function ($testimonial) {
                return [
                    'id' => $testimonial->id,
                    'name' => $testimonial->author,
                    'role' => $testimonial->role,
                    'text' => $testimonial->content,
                    'status' => $testimonial->status,
                    'sort_order' => $testimonial->sort_order,
                    'created_at' => $testimonial->created_at->toISOString(),
                ];
            });

        // Get first 2 testimonials for homepage
        $homepageTestimonials = Testimonial::where('status', true)
            ->orderBy('sort_order', 'asc')
            ->take(2)
            ->get()
            ->map(function ($testimonial) {
                return [
                    'name' => $testimonial->author,
                    'role' => $testimonial->role,
                    'text' => $testimonial->content,
                ];
            });

        return inertia('Home', [
            'settings' => $settings,
            'testimonials' => $homepageTestimonials,
        ]);
    }

    /**
     * Show all testimonials page.
     */
    public function testimonials()
    {
        $testimonials = Testimonial::where('status', true)
            ->orderBy('sort_order', 'asc')
            ->get()
            ->map(function ($testimonial) {
                return [
                    'id' => $testimonial->id,
                    'name' => $testimonial->author,
                    'role' => $testimonial->role,
                    'text' => $testimonial->content,
                    'status' => $testimonial->status,
                    'sort_order' => $testimonial->sort_order,
                    'created_at' => $testimonial->created_at->toISOString(),
                ];
            });

        $totalCount = Testimonial::where('status', true)->count();

        return inertia('Testimonials', [
            'testimonials' => $testimonials,
            'total_count' => $totalCount,
        ]);
    }
}
