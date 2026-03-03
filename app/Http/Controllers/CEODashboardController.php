<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\User;

class CEODashboardController extends Controller
{
    /**
     * Display the CEO dashboard.
     */
    public function index()
    {
        // Get dashboard statistics
        $stats = [
            'total_orders' => Order::count(),
            'total_users' => User::count(),
            'total_revenue' => Order::sum('total_price'),
            'pending_orders' => Order::where('status', 'pending')->count(),

            // Weekly statistics (last 7 days)
            'weekly_orders' => Order::where('created_at', '>=', now()->subDays(7))->count(),
            'weekly_revenue' => Order::where('created_at', '>=', now()->subDays(7))->sum('total_price'),
            'weekly_users' => User::where('created_at', '>=', now()->subDays(7))->count(),

            // Monthly statistics (last 30 days)
            'monthly_orders' => Order::where('created_at', '>=', now()->subDays(30))->count(),
            'monthly_revenue' => Order::where('created_at', '>=', now()->subDays(30))->sum('total_price'),
            'monthly_users' => User::where('created_at', '>=', now()->subDays(30))->count(),

            'recent_orders' => Order::with(['user', 'items.menuItem'])
                ->orderBy('created_at', 'desc')
                ->take(5)
                ->get()
                ->map(function ($order) {
                    return [
                        'id' => 'ORD-'.str_pad($order->id, 4, '0', STR_PAD_LEFT),
                        'customer' => $order->user->name,
                        'total' => $order->total_price,
                        'status' => $order->status,
                        'date' => $order->created_at->format('M d, Y'),
                        'items_count' => $order->items->sum('quantity'),
                    ];
                }),
        ];

        return inertia('CEO/Dashboard', [
            'stats' => $stats,
        ]);
    }
}
