<?php

namespace App\Http\Controllers;

use App\Models\Testimonial;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    /**
     * Display a listing of testimonials.
     */
    public function index()
    {
        $testimonials = Testimonial::orderBy('sort_order', 'asc')
            ->get()
            ->map(function ($testimonial) {
                return [
                    'id' => $testimonial->id,
                    'author' => $testimonial->author,
                    'role' => $testimonial->role,
                    'content' => $testimonial->content,
                    'status' => $testimonial->status,
                    'sort_order' => $testimonial->sort_order,
                    'created_at' => $testimonial->created_at->toISOString(),
                ];
            });

        return inertia('Admin/Testimonials', [
            'testimonials' => $testimonials,
        ]);
    }

    /**
     * Store a newly created testimonial.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'author' => ['required', 'string', 'max:255'],
            'role' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string', 'max:1000'],
            'status' => ['boolean'],
            'sort_order' => ['integer', 'min:0'],
        ]);

        $testimonial = Testimonial::create([
            'author' => $validated['author'],
            'role' => $validated['role'],
            'content' => $validated['content'],
            'status' => $validated['status'] ?? true,
            'sort_order' => $validated['sort_order'] ?? Testimonial::max('sort_order') + 1,
        ]);

        return response()->json([
            'id' => $testimonial->id,
            'author' => $testimonial->author,
            'role' => $testimonial->role,
            'content' => $testimonial->content,
            'is_active' => $testimonial->status, // Keep for frontend compatibility
            'sort_order' => $testimonial->sort_order,
            'created_at' => $testimonial->created_at->toISOString(),
        ]);

        return back()->with('success', 'Testimonial created successfully!');
    }

    /**
     * Update the specified testimonial.
     */
    public function update(Request $request, Testimonial $testimonial)
    {
        $validated = $request->validate([
            'author' => ['required', 'string', 'max:255'],
            'role' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string', 'max:1000'],
            'status' => ['boolean'],
            'sort_order' => ['integer', 'min:0'],
        ]);

        $testimonial->update($validated);

        return back()->with('success', 'Testimonial updated successfully!');
    }

    /**
     * Remove the specified testimonial.
     */
    public function destroy(Testimonial $testimonial)
    {
        $testimonial->delete();

        return back()->with('success', 'Testimonial deleted successfully!');
    }

    /**
     * Toggle testimonial status.
     */
    public function toggle(Testimonial $testimonial)
    {
        $testimonial->update([
            'status' => !$testimonial->status,
        ]);

        return back()->with('success', 'Testimonial status updated!');
    }
}
