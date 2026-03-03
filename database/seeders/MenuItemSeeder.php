<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\MenuItem;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class MenuItemSeeder extends Seeder
{
    public function run(): void
    {
        $starters = Category::where('name', 'Starters')->first();
        $main = Category::where('name', 'Main Course')->first();
        $desserts = Category::where('name', 'Desserts')->first();
        $beverages = Category::where('name', 'Beverages')->first();

        $items = [
            [
                'category_id' => $main->id,
                'name' => 'Wild Mushroom Risotto',
                'description' => 'Creamy Arborio rice with assorted forest mushrooms and truffle oil.',
                'price' => 24.99,
                'image_url' => 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=800&auto=format&fit=crop',
            ],
            [
                'category_id' => $main->id,
                'name' => 'Glazed Salmon Fillet',
                'description' => 'Pan-seared salmon with honey-soy glaze and seasonal roast vegetables.',
                'price' => 28.50,
                'image_url' => 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=800&auto=format&fit=crop',
            ],
            [
                'category_id' => $starters->id,
                'name' => 'Burrata & Tomato Salad',
                'description' => 'Fresh burrata cheese with heirloom tomatoes and basil pesto.',
                'price' => 16.00,
                'image_url' => 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?q=80&w=800&auto=format&fit=crop',
            ],
            [
                'category_id' => $desserts->id,
                'name' => 'Dark Chocolate Fondant',
                'description' => 'Warm chocolate cake with a molten center and vanilla bean gelato.',
                'price' => 12.00,
                'image_url' => 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=800&auto=format&fit=crop',
            ],
            [
                'category_id' => $starters->id,
                'name' => 'Classic Beef Tartare',
                'description' => 'Hand-cut prime beef with traditional condiments and quail egg.',
                'price' => 19.50,
                'image_url' => 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=800&auto=format&fit=crop',
            ],
            [
                'category_id' => $beverages->id,
                'name' => 'Passion Fruit Martini',
                'description' => 'Zesty passion fruit with premium vodka and a splash of lime.',
                'price' => 14.00,
                'image_url' => 'https://images.unsplash.com/photo-1544145945-f904253d0c7b?q=80&w=800&auto=format&fit=crop',
            ],
        ];

        foreach ($items as $item) {
            MenuItem::create([
                ...$item,
                'slug' => Str::slug($item['name']),
                'is_available' => true,
            ]);
        }
    }
}
