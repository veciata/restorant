<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\MenuItem;
use Illuminate\Http\Request;

class AdminMenuController extends Controller
{
    /**
     * Display all menu items for management.
     */
    public function index()
    {
        $menuItems = MenuItem::with('category')->orderBy('category_id')->orderBy('name')->get();
        $categories = Category::all();

        return inertia('Admin/Menu/Index', [
            'menuItems' => $menuItems,
            'categories' => $categories,
        ]);
    }

    /**
     * Store a new menu item.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'price' => 'required|numeric|min:0.01|max:999.99',
            'category_id' => 'required|exists:categories,id',
            'image_url' => 'nullable|url',
        ]);

        MenuItem::create($request->all());

        return redirect()->back()->with('success', 'Menu item added successfully!');
    }

    /**
     * Update a menu item.
     */
    public function update(Request $request, MenuItem $menuItem)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'price' => 'required|numeric|min:0.01|max:999.99',
            'category_id' => 'required|exists:categories,id',
            'image_url' => 'nullable|url',
        ]);

        $menuItem->update($request->all());

        return redirect()->back()->with('success', 'Menu item updated successfully!');
    }

    /**
     * Delete a menu item.
     */
    public function destroy(MenuItem $menuItem)
    {
        $menuItem->delete();

        return redirect()->back()->with('success', 'Menu item deleted successfully!');
    }

    /**
     * Toggle menu item availability.
     */
    public function toggleAvailability(MenuItem $menuItem)
    {
        $menuItem->update([
            'is_available' => ! $menuItem->is_available,
        ]);

        $status = $menuItem->is_available ? 'available' : 'unavailable';

        return redirect()->back()->with('success', "Menu item is now {$status}!");
    }
}
