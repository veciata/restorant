<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            [
                'name' => 'John Customer',
                'email' => 'customer@example.com',
                'role' => UserRole::Customer,
            ],
            [
                'name' => 'Gordon Chef',
                'email' => 'chef@example.com',
                'role' => UserRole::Chef,
            ],
            [
                'name' => 'Waitress Sarah',
                'email' => 'waiter@example.com',
                'role' => UserRole::Waiter,
            ],
            [
                'name' => 'Management CEO',
                'email' => 'ceo@example.com',
                'role' => UserRole::CEO,
            ],
        ];

        foreach ($users as $u) {
            User::create([
                'name' => $u['name'],
                'email' => $u['email'],
                'password' => Hash::make('password'),
                'role' => $u['role'],
            ]);
        }
    }
}
