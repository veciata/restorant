<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DemoUsersSeeder extends Seeder
{
    public function run(): void
    {
        // Clear existing demo users (except admin)
        User::where('role', '!=', 'ceo')->delete();

        // Create demo users using the factory
        $demoUsers = [
            ['name' => 'John Anderson', 'email' => 'john.anderson@example.com'],
            ['name' => 'Sarah Mitchell', 'email' => 'sarah.mitchell@example.com'],
            ['name' => 'Michael Chen', 'email' => 'michael.chen@example.com'],
            ['name' => 'Emma Wilson', 'email' => 'emma.wilson@example.com'],
            ['name' => 'David Thompson', 'email' => 'david.thompson@example.com'],
            ['name' => 'Lisa Rodriguez', 'email' => 'lisa.rodriguez@example.com'],
        ];

        foreach ($demoUsers as $userData) {
            User::factory()
                ->withName($userData['name'])
                ->withEmail($userData['email'])
                ->withPassword('password123')
                ->customer()
                ->create();
        }

        // Create admin user
        User::updateOrCreate(
            ['email' => 'admin@regalresto.com'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('admin123'),
                'role' => 'ceo',
                'email_verified_at' => now(),
            ]
        );

        // Create some additional random customers for variety
        User::factory()
            ->count(10)
            ->customer()
            ->create();

        // Create staff users
        User::factory()
            ->withName('Head Chef')
            ->withEmail('chef@regalresto.com')
            ->withPassword('chef123')
            ->chef()
            ->create();

        User::factory()
            ->withName('Head Waiter')
            ->withEmail('waiter@regalresto.com')
            ->withPassword('waiter123')
            ->waiter()
            ->create();

        User::factory()
            ->withName('Content Editor')
            ->withEmail('editor@regalresto.com')
            ->withPassword('editor123')
            ->editor()
            ->create();

        $this->command->info('Demo users created successfully!');
        $this->command->info('Created ' . User::count() . ' demo users.');
        $this->command->info('Customers: ' . User::where('role', 'customer')->count());
        $this->command->info('Staff: ' . User::where('role', '!=', 'customer')->count());
    }
}
