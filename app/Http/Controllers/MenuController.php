<?php

namespace App\Http\Controllers;

use App\Models\MenuItem;

class MenuController extends Controller
{
    /**
     * Display the menu with available items.
     */
    public function index()
    {
        $menuItems = MenuItem::with('category')
            ->where('is_available', true)
            ->orderBy('category_id')
            ->orderBy('name')
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'name' => $item->name,
                    'description' => $item->description,
                    'price' => $item->price,
                    'image_url' => $item->image_url,
                    'category' => $item->category?->name ?? 'Uncategorized',
                    'is_available' => $item->is_available,
                ];
            });

        $categories = MenuItem::with('category')
            ->where('is_available', true)
            ->get()
            ->pluck('category.name')
            ->unique()
            ->filter()
            ->sort()
            ->values()
            ->toArray();

        array_unshift($categories, 'All');

        return inertia('Menu', [
            'menuItems' => $menuItems,
            'categories' => $categories,
        ]);
    }
}
