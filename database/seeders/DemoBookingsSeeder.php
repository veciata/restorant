<?php

namespace Database\Seeders;

use App\Models\Booking;
use App\Models\User;
use App\Models\Table;
use Illuminate\Database\Seeder;

class DemoBookingsSeeder extends Seeder
{
    public function run(): void
    {
        // Get demo users and tables
        $users = User::where('role', 'customer')->get();
        $tables = Table::all();

        if ($users->isEmpty() || $tables->isEmpty()) {
            $this->command->error('No users or tables found. Please run other seeders first.');
            return;
        }

        // Clear existing demo bookings
        Booking::query()->delete();

        // Create demo bookings using the factory
        $bookings = [];

        // Today's bookings (confirmed)
        $bookings[] = Booking::factory()
            ->forUser($users->get(0))
            ->forTable($tables->where('table_number', '1')->first())
            ->today()
            ->confirmed()
            ->forGuests(2)
            ->create();

        $bookings[] = Booking::factory()
            ->forUser($users->get(1))
            ->forTable($tables->where('table_number', '4')->first())
            ->today()
            ->confirmed()
            ->forGuests(6)
            ->create();

        $bookings[] = Booking::factory()
            ->forUser($users->get(2))
            ->forTable($tables->where('table_number', '2')->first())
            ->today()
            ->confirmed()
            ->forGuests(4)
            ->create();

        // Tomorrow's bookings (confirmed)
        $bookings[] = Booking::factory()
            ->forUser($users->get(3))
            ->vip() // VIP booking
            ->tomorrow()
            ->create();

        $bookings[] = Booking::factory()
            ->forUser($users->get(4))
            ->forTable($tables->where('table_number', '3')->first())
            ->tomorrow()
            ->confirmed()
            ->forGuests(2)
            ->create();

        $bookings[] = Booking::factory()
            ->forUser($users->get(5))
            ->forTable($tables->where('table_number', '5')->first())
            ->tomorrow()
            ->confirmed()
            ->forGuests(4)
            ->create();

        // Weekend bookings (confirmed)
        $bookings[] = Booking::factory()
            ->forUser($users->get(0))
            ->forTable($tables->where('table_number', '6')->first())
            ->thisWeekend()
            ->confirmed()
            ->forGuests(2)
            ->create();

        $bookings[] = Booking::factory()
            ->forUser($users->get(1))
            ->forTable($tables->where('table_number', '2')->first())
            ->thisWeekend()
            ->confirmed()
            ->forGuests(4)
            ->create();

        // Pending bookings
        $bookings[] = Booking::factory()
            ->forUser($users->get(2))
            ->forTable($tables->where('table_number', '4')->first())
            ->duringWorkingHours()
            ->pending()
            ->forGuests(6)
            ->create();

        $bookings[] = Booking::factory()
            ->forUser($users->get(3))
            ->forTable($tables->where('table_number', '1')->first())
            ->duringWorkingHours()
            ->pending()
            ->forGuests(2)
            ->create();

        // Cancelled booking (yesterday)
        $bookings[] = Booking::factory()
            ->forUser($users->get(4))
            ->forTable($tables->where('table_number', '3')->first())
            ->cancelled()
            ->create([
                'booking_time' => now()->subDay()->setHour(19)->setMinute(0),
            ]);

        // Create some additional random bookings for variety
        Booking::factory()
            ->count(5)
            ->confirmed()
            ->duringWorkingHours()
            ->create();

        $this->command->info('Demo bookings created successfully!');
        $this->command->info('Created ' . Booking::count() . ' demo bookings.');
    }
}
