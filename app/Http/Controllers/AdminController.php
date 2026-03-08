<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    /**
     * Display the admin dashboard.
     */
    public function dashboard()
    {
        $user = auth()->user();

        // Return appropriate dashboard component based on role hierarchy
        if (in_array($user->role->value, ['ceo', 'editor'])) {
            // CEO and Editor get business dashboard (highest priority)
            $recentOrders = Order::with(['user'])
                ->orderBy('created_at', 'desc')
                ->take(5)
                ->get()
                ->map(function ($order) {
                    return [
                        'id' => 'ORD-' . str_pad($order->id, 4, '0', STR_PAD_LEFT),
                        'customer' => $order->user?->name ?? 'Unknown',
                        'total' => $order->total_price,
                        'status' => $order->status,
                        'date' => $order->created_at->format('M j, Y'),
                        'items_count' => $order->items->count(),
                    ];
                });

            return inertia('CEO/Dashboard', [
                'stats' => [
                    'total_orders' => Order::count(),
                    'total_users' => \App\Models\User::count(),
                    'total_revenue' => Order::sum('total_price'),
                    'pending_orders' => Order::where('status', 'pending')->count(),
                    'weekly_orders' => Order::whereBetween('created_at', [now()->startOfWeek(), now()->endOfWeek()])->count(),
                    'weekly_revenue' => Order::whereBetween('created_at', [now()->startOfWeek(), now()->endOfWeek()])->sum('total_price'),
                    'weekly_users' => \App\Models\User::whereBetween('created_at', [now()->startOfWeek(), now()->endOfWeek()])->count(),
                    'monthly_orders' => Order::whereBetween('created_at', [now()->startOfMonth(), now()->endOfMonth()])->count(),
                    'monthly_revenue' => Order::whereBetween('created_at', [now()->startOfMonth(), now()->endOfMonth()])->sum('total_price'),
                    'monthly_users' => \App\Models\User::whereBetween('created_at', [now()->startOfMonth(), now()->endOfMonth()])->count(),
                    'recent_orders' => $recentOrders,
                ],
            ]);
        } elseif ($user->role->value === 'chef') {
            // Chef gets kitchen data
            $today = now()->startOfDay();
            $tomorrow = now()->endOfDay();

            $pendingOrders = $this->formatOrders(Order::where('status', 'pending')
                ->with(['items.menuItem', 'user', 'waiter', 'table'])
                ->orderBy('created_at', 'asc')
                ->get());

            $preparingOrders = $this->formatOrders(Order::where('status', 'preparing')
                ->with(['items.menuItem', 'user', 'waiter', 'table'])
                ->orderBy('created_at', 'asc')
                ->get());

            $readyOrders = $this->formatOrders(Order::where('status', 'ready')
                ->with(['items.menuItem', 'user', 'waiter', 'table'])
                ->orderBy('created_at', 'asc')
                ->get());

            // Get today's statistics for chef
            $totalOrdersToday = Order::whereBetween('created_at', [$today, $tomorrow])->count();
            $completedOrdersToday = Order::whereBetween('created_at', [$today, $tomorrow])
                ->where('status', 'delivered')
                ->count();

            $avgPrepTime = 0;
            $completedPrepOrders = Order::where('status', 'ready')
                ->orWhere('status', 'delivered')
                ->whereBetween('created_at', [$today, $tomorrow])
                ->get();

            if ($completedPrepOrders->count() > 0) {
                $totalPrepTime = 0;
                foreach ($completedPrepOrders as $order) {
                    $totalPrepTime += 30; // Simplified
                }
                $avgPrepTime = round($totalPrepTime / $completedPrepOrders->count());
            }

            $popularItems = OrderItem::with('menuItem')
                ->whereHas('order', function ($query) use ($today, $tomorrow) {
                    $query->whereBetween('created_at', [$today, $tomorrow]);
                })
                ->selectRaw('menu_item_id, SUM(quantity) as total_quantity')
                ->groupBy('menu_item_id')
                ->orderBy('total_quantity', 'desc')
                ->take(5)
                ->get()
                ->map(function ($item) {
                    return [
                        'name' => $item->menuItem->name ?? 'Unknown Item',
                        'count' => $item->total_quantity,
                    ];
                });

            return inertia('Chef/Dashboard', [
                'pendingOrders' => $pendingOrders,
                'preparingOrders' => $preparingOrders,
                'readyOrders' => $readyOrders,
                'stats' => [
                    'total_orders_today' => $totalOrdersToday,
                    'completed_orders_today' => $completedOrdersToday,
                    'average_prep_time' => $avgPrepTime,
                    'popular_items' => $popularItems,
                ],
            ]);
        } elseif ($user->role->value === 'waiter') {
            // Waiter gets table and order data
            $today = now()->startOfDay();
            $tomorrow = now()->endOfDay();

            // Waiter gets table and order data
            $activeOrders = Order::whereIn('status', ['pending', 'preparing', 'ready'])
                ->with(['items.menuItem', 'user', 'table'])
                ->orderBy('created_at', 'desc')
                ->take(10)
                ->get()
                ->map(function ($order) {
                    return [
                        'id' => 'ORD-' . str_pad($order->id, 4, '0', STR_PAD_LEFT),
                        'table_number' => $order->table?->table_number ?? 'Takeout',
                        'status' => $order->status,
                        'customer_name' => $order->user?->name ?? 'Unknown',
                        'items_count' => $order->items->count(),
                        'created_at' => $order->created_at->format('M j, Y g:i A'),
                    ];
                });

            $availableTables = \App\Models\Table::where('status', 'available')
                ->orderBy('table_number')
                ->get()
                ->map(function ($table) {
                    return [
                        'id' => $table->id,
                        'table_number' => $table->table_number,
                        'capacity' => $table->capacity,
                        'status' => $table->status,
                    ];
                });

            return inertia('Waiter/Dashboard', [
                'activeOrders' => $activeOrders,
                'availableTables' => $availableTables,
                'stats' => [
                    'active_tables' => \App\Models\Table::where('status', 'occupied')->count(),
                    'pending_orders' => Order::where('status', 'pending')->count(),
                    'completed_today' => Order::whereBetween('created_at', [$today, $tomorrow])
                        ->where('status', 'delivered')
                        ->count(),
                ],
            ]);
        } else {
            // Unauthorized role - return 403
            abort(403, 'Access denied. Invalid user role for dashboard.');
        }
    }

    /**
     * Display admin orders page.
     */
    public function orders()
    {
        $orders = Order::with(['items.menuItem', 'user', 'waiter', 'table'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($order) {
                return [
                    'id' => 'ORD-' . str_pad($order->id, 4, '0', STR_PAD_LEFT),
                    'date' => $order->created_at->format('Y-m-d'),
                    'time' => $order->created_at->format('g:i A'),
                    'status' => $order->status,
                    'total' => $order->total_price,
                    'customer_name' => $order->user?->name ?? 'Unknown',
                    'items' => $order->items->map(function ($item) {
                        return [
                            'name' => $item->menuItem?->name ?? 'Unknown Item',
                            'quantity' => $item->quantity,
                            'price' => $item->price,
                        ];
                    }),
                    'delivery' => [
                        'address' => $order->table ? 'Table ' . $order->table->table_number : 'Takeout',
                        'estimated' => $order->created_at->addMinutes(30)->format('g:i A'),
                        'delivered' => $order->status === 'delivered' ? $order->updated_at->format('g:i A') : null,
                    ],
                ];
            });

        return inertia('Admin/Orders/Index', [
            'orders' => $orders,
        ]);
    }

    /**
     * Update order status.
     */
    public function updateOrderStatus(Request $request, $orderId)
    {
        $request->validate([
            'status' => 'required|in:pending,preparing,ready,delivered',
        ]);

        // Extract numeric ID from formatted ID (e.g., "ORD-0001" -> 1)
        $numericId = is_numeric($orderId) ? $orderId : (int)preg_replace('/[^0-9]/', '', $orderId);
        
        $order = Order::find($numericId);
        
        if (!$order) {
            return response()->json(['error' => 'Order not found'], 404);
        }

        $order->status = $request->status;
        $order->save();

        return response()->json(['success' => true, 'status' => $order->status]);
    }

    /**
     * Format orders for frontend display.
     */
    private function formatOrders($orders)
    {
        return $orders->map(function ($order) {
            return [
                'id' => 'ORD-' . str_pad($order->id, 4, '0', STR_PAD_LEFT),
                'date' => $order->created_at->format('M j, Y'),
                'time' => $order->created_at->format('g:i A'),
                'status' => $order->status,
                'total' => $order->total_price,
                'customer_name' => $order->user?->name ?? 'Unknown',
                'items' => $order->items->map(function ($item) {
                    return [
                        'name' => $item->menuItem?->name ?? 'Unknown Item',
                        'quantity' => $item->quantity,
                        'price' => $item->price,
                    ];
                }),
                'delivery' => [
                    'address' => $order->table ? 'Table ' . $order->table->table_number : 'Takeout',
                    'estimated' => $order->created_at->addMinutes(30)->format('g:i A'),
                    'delivered' => $order->status === 'delivered' ? $order->updated_at->format('g:i A') : null,
                ],
            ];
        });
    }
}
