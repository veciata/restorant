<?php

namespace Database\Factories;

use App\Models\Booking;
use App\Models\User;
use App\Models\Table;
use Illuminate\Database\Eloquent\Factories\Factory;
use Carbon\Carbon;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Booking>
 */
class BookingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Get random user and table
        $user = User::where('role', 'customer')->inRandomOrder()->first() ?? User::factory()->create(['role' => 'customer']);
        $table = Table::inRandomOrder()->first() ?? Table::factory()->create();
        
        // Generate random booking time within the next 30 days
        $bookingTime = Carbon::now()->addDays(rand(0, 30))
            ->setHour(rand(18, 22)) // Dinner hours between 6 PM and 10 PM
            ->setMinute([0, 15, 30, 45][rand(0, 3)]);

        return [
            'user_id' => $user->id,
            'table_id' => $table->id,
            'booking_time' => $bookingTime,
            'guests_count' => rand(1, min($table->capacity, 8)), // Random guests up to table capacity or 8
            'status' => $this->faker->randomElement(['pending', 'confirmed', 'cancelled']),
        ];
    }

    /**
     * Create a confirmed booking.
     */
    public function confirmed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'confirmed',
        ]);
    }

    /**
     * Create a pending booking.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
        ]);
    }

    /**
     * Create a cancelled booking.
     */
    public function cancelled(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'cancelled',
        ]);
    }

    /**
     * Create a booking for today.
     */
    public function today(): static
    {
        return $this->state(fn (array $attributes) => [
            'booking_time' => Carbon::today()->setHour(rand(18, 22))->setMinute([0, 15, 30, 45][rand(0, 3)]),
        ]);
    }

    /**
     * Create a booking for tomorrow.
     */
    public function tomorrow(): static
    {
        return $this->state(fn (array $attributes) => [
            'booking_time' => Carbon::tomorrow()->setHour(rand(18, 22))->setMinute([0, 15, 30, 45][rand(0, 3)]),
        ]);
    }

    /**
     * Create a booking for this weekend.
     */
    public function thisWeekend(): static
    {
        return $this->state(fn (array $attributes) => [
            'booking_time' => Carbon::now()->next(Carbon::SATURDAY)->setHour(rand(18, 22))->setMinute([0, 15, 30, 45][rand(0, 3)]),
        ]);
    }

    /**
     * Create a booking with specific guest count.
     */
    public function forGuests(int $guests): static
    {
        return $this->state(fn (array $attributes) => [
            'guests_count' => $guests,
        ]);
    }

    /**
     * Create a booking for a specific table.
     */
    public function forTable(Table $table): static
    {
        return $this->state(fn (array $attributes) => [
            'table_id' => $table->id,
            'guests_count' => rand(1, min($table->capacity, 8)),
        ]);
    }

    /**
     * Create a booking for a specific user.
     */
    public function forUser(User $user): static
    {
        return $this->state(fn (array $attributes) => [
            'user_id' => $user->id,
        ]);
    }

    /**
     * Create a booking during working hours.
     */
    public function duringWorkingHours(): static
    {
        return $this->state(fn (array $attributes) => [
            'booking_time' => Carbon::now()->addDays(rand(0, 30))
                ->setHour(rand(11, 22)) // Working hours 11 AM - 10 PM
                ->setMinute([0, 30][rand(0, 1)]), // 30-minute intervals
        ]);
    }

    /**
     * Create a VIP booking (for VIP table with more guests).
     */
    public function vip(): static
    {
        $vipTable = Table::where('table_number', 'like', 'VIP%')->first();
        
        return $this->state(fn (array $attributes) => [
            'table_id' => $vipTable?->id ?? Table::factory()->create(['table_number' => 'VIP 1', 'capacity' => 10])->id,
            'guests_count' => rand(6, 10),
            'status' => 'confirmed',
        ]);
    }
}
