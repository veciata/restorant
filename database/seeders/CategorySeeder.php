<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Starters', 'description' => 'Light and appetizing dishes to start your meal.'],
            ['name' => 'Main Course', 'description' => 'Our signature hearty and fulfilling dishes.'],
            ['name' => 'Desserts', 'description' => 'Sweet delicacies to conclude your experience.'],
            ['name' => 'Beverages', 'description' => 'Refreshing drinks, cocktails, and wines.'],
            ['name' => 'Specialties', 'description' => 'Chef\'s exclusive creations for the season.'],
        ];

        foreach ($categories as $cat) {
            Category::create([
                'name' => $cat['name'],
                'slug' => Str::slug($cat['name']),
                'description' => $cat['description'],
            ]);
        }
    }
}
