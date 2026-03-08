<?php

namespace App\Http\Controllers;

use App\Models\Table;
use App\Models\Booking;
use App\Models\SiteSettings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class BookingController extends Controller
{
    public function index(Request $request)
    {
        // Get the requested date and time, default to today
        $date = $request->get('date', now()->format('Y-m-d'));
        $time = $request->get('time', now()->format('H:i'));
        $guests = $request->get('guests', 2);

        // Get working hours from site settings
        $siteSettings = SiteSettings::first();
        $workingHours = $siteSettings?->working_hours ?? [
            'mon_thu' => ['start' => '11:00', 'end' => '22:00'],
            'fri_sat' => ['start' => '11:00', 'end' => '23:30'],
            'sunday' => ['start' => '12:00', 'end' => '21:00']
        ];

        // Combine date and time for booking time
        $bookingDateTime = Carbon::parse($date . ' ' . $time);

        // Get all tables with their current status
        $tables = Table::all()->map(function ($table) use ($bookingDateTime) {
            // Check if table has any booking at the requested time
            // Consider a 2-hour window for each booking
            $timeStart = $bookingDateTime->copy()->subHours(1);
            $timeEnd = $bookingDateTime->copy()->addHours(2);

            $hasBooking = Booking::where('table_id', $table->id)
                ->where('status', 'confirmed')
                ->where('booking_time', '>=', $timeStart)
                ->where('booking_time', '<=', $timeEnd)
                ->exists();

            return [
                'id' => $table->id,
                'number' => $table->table_number,
                'position' => [
                    $table->x_pos ?? 0,
                    $table->y_pos ?? 0,
                    $table->z_pos ?? 0,
                ],
                'status' => $hasBooking ? 'occupied' : ($table->status === 'maintenance' ? 'maintenance' : 'available'),
                'capacity' => $table->capacity,
            ];
        });

        return inertia('Booking', [
            'tables' => $tables,
            'workingHours' => $workingHours,
            'filters' => [
                'date' => $date,
                'time' => $time,
                'guests' => $guests,
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'table_id' => 'required|exists:tables,id',
            'date' => 'required|date|after_or_equal:today',
            'time' => 'required',
            'guests_count' => 'required|integer|min:1|max:12',
            'special_requests' => 'nullable|string|max:500',
        ]);

        // Check if user is authenticated
        if (!auth()->check()) {
            return redirect()->route('login')->with('error', 'Please login to make a reservation.');
        }

        // Check table availability again
        $bookingDateTime = Carbon::parse($validated['date'] . ' ' . $validated['time']);
        $timeStart = $bookingDateTime->copy()->subHours(1);
        $timeEnd = $bookingDateTime->copy()->addHours(2);

        $hasBooking = Booking::where('table_id', $validated['table_id'])
            ->where('status', 'confirmed')
            ->where('booking_time', '>=', $timeStart)
            ->where('booking_time', '<=', $timeEnd)
            ->exists();

        if ($hasBooking) {
            return back()->with('error', 'This table is already booked for the selected time.');
        }

        // Create the booking
        Booking::create([
            'user_id' => auth()->id(),
            'table_id' => $validated['table_id'],
            'booking_time' => $bookingDateTime,
            'guests_count' => $validated['guests_count'],
            'status' => 'pending',
            'special_requests' => $validated['special_requests'] ?? null,
        ]);

        return redirect()->route('orders')->with('success', 'Reservation created successfully!');
    }
}
