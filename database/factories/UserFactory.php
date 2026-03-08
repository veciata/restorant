<?php

namespace Database\Factories;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
            'role' => UserRole::Customer,
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }

    /**
     * Create a customer user.
     */
    public function customer(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => UserRole::Customer,
        ]);
    }

    /**
     * Create a chef user.
     */
    public function chef(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => UserRole::Chef,
        ]);
    }

    /**
     * Create a waiter user.
     */
    public function waiter(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => UserRole::Waiter,
        ]);
    }

    /**
     * Create an editor user.
     */
    public function editor(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => UserRole::Editor,
        ]);
    }

    /**
     * Create a CEO user.
     */
    public function ceo(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => UserRole::CEO,
            'email' => 'admin@regalresto.com',
        ]);
    }

    /**
     * Create a user with a specific name.
     */
    public function withName(string $name): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => $name,
            'email' => strtolower(str_replace(' ', '.', $name)) . '@regalresto.com',
        ]);
    }

    /**
     * Create a user with a specific email.
     */
    public function withEmail(string $email): static
    {
        return $this->state(fn (array $attributes) => [
            'email' => $email,
        ]);
    }

    /**
     * Create a user with a specific password.
     */
    public function withPassword(string $password): static
    {
        return $this->state(fn (array $attributes) => [
            'password' => Hash::make($password),
        ]);
    }

    /**
     * Create a demo user with predictable data.
     */
    public function demo(): static
    {
        $demoNames = [
            'John Anderson',
            'Sarah Mitchell', 
            'Michael Chen',
            'Emma Wilson',
            'David Thompson',
            'Lisa Rodriguez',
        ];

        return $this->state(fn (array $attributes) => [
            'name' => fake()->randomElement($demoNames),
            'email' => fn ($attrs) => strtolower(str_replace(' ', '.', $attrs['name'])) . '@example.com',
            'role' => UserRole::Customer,
            'password' => Hash::make('password123'),
        ]);
    }
}
