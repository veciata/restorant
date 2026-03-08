<?php

namespace App\Http\Controllers;

use App\Events\NewOrderCreated;
use App\Events\OrderStatusUpdated;
use App\Models\MenuItem;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Table;
use App\Models\Testimonial;
use Illuminate\Http\Request;

class OrdersController extends Controller
{
    /**
     * Display the user's orders.
     */
    public function index()
    {
        $orders = Order::where('user_id', auth()->id())
            ->with(['items.menuItem', 'waiter', 'table', 'testimonials'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($order) {
                return [
                    'id' => 'ORD-'.str_pad($order->id, 4, '0', STR_PAD_LEFT),
                    'numeric_id' => $order->id, // Add numeric ID for testimonial route
                    'date' => $order->created_at->format('Y-m-d'),
                    'time' => $order->created_at->format('g:i A'),
                    'status' => $order->status,
                    'total' => $order->total_price,
                    'has_testimonial' => $order->testimonials->isNotEmpty(), // Check if testimonial exists
                    'testimonial' => $order->testimonials->first(), // Get the first testimonial if exists
                    'items' => $order->items->map(function ($item) {
                        return [
                            'name' => $item->menuItem->name ?? 'Unknown Item',
                            'quantity' => $item->quantity,
                            'price' => $item->price,
                        ];
                    }),
                    'delivery' => [
                        'address' => $order->table ? 'Table '.$order->table->table_number : 'Takeout',
                        'estimated' => $order->created_at->addMinutes(30)->format('g:i A'),
                        'delivered' => $order->status === 'delivered' ? $order->updated_at->format('g:i A') : null,
                    ],
                ];
            });

        return inertia('Orders', [
            'orders' => $orders,
        ]);
    }

    /**
     * Create dummy orders for development testing.
     */
    public function createDummyOrder()
    {
        $user = auth()->user();

        // Get some random menu items
        $menuItems = MenuItem::inRandomOrder()->take(rand(2, 4))->get();

        if ($menuItems->isEmpty()) {
            return back()->with('error', 'No menu items found. Please add some menu items first.');
        }

        // Get a random table
        $table = Table::inRandomOrder()->first();

        // Create the order
        $order = Order::create([
            'user_id' => $user->id,
            'table_id' => $table?->id,
            'waiter_id' => $user->id, // For simplicity, use the user as waiter
            'total_price' => 0, // Will be calculated
            'status' => collect(['pending', 'preparing', 'ready', 'delivered'])->random(),
            'type' => 'dine-in',
        ]);

        $totalPrice = 0;

        // Add order items
        foreach ($menuItems as $menuItem) {
            $quantity = rand(1, 3);
            $price = $menuItem->price * $quantity;
            $totalPrice += $price;

            OrderItem::create([
                'order_id' => $order->id,
                'menu_item_id' => $menuItem->id,
                'quantity' => $quantity,
                'price' => $price,
            ]);
        }

        // Update total price
        $order->update(['total_price' => $totalPrice]);

        return back()->with('success', 'Dummy order created successfully!');
    }

    /**
     * Display all orders for admin users.
     */
    public function adminIndex()
    {
        $orders = Order::with(['items.menuItem', 'user', 'waiter', 'table'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($order) {
                return [
                    'id' => 'ORD-'.str_pad($order->id, 4, '0', STR_PAD_LEFT),
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
                        'address' => $order->table ? 'Table '.$order->table->table_number : 'Takeout',
                        'estimated' => $order->created_at->addMinutes(30)->format('g:i A'),
                        'delivered' => $order->status === 'delivered' ? $order->updated_at->format('g:i A') : null,
                    ],
                ];
            });

    }

    /**
     * Show the order creation form.
     */
    public function create()
    {
        $menuItems = MenuItem::with('category')->get()->groupBy('category.name');
        $tables = Table::where('status', 'available')->get();

        return inertia('MakeOrder', [
            'menuItems' => $menuItems,
            'tables' => $tables,
        ]);
    }

    /**
     * Store a new order.
     */
    public function store(Request $request)
    {
        $request->validate([
            'items' => 'required|array|min:1',
            'items.*.menu_item_id' => 'required|exists:menu_items,id',
            'items.*.quantity' => 'required|integer|min:1|max:99',
            'table_id' => 'nullable|exists:tables,id',
            'notes' => 'nullable|string|max:500',
        ]);

        $user = auth()->user();
        $totalPrice = 0;

        // Calculate total price
        foreach ($request->items as $itemData) {
            $menuItem = MenuItem::find($itemData['menu_item_id']);
            $totalPrice += $menuItem->price * $itemData['quantity'];
        }

        // Create the order
        $order = Order::create([
            'user_id' => $user->id,
            'table_id' => $request->table_id,
            'waiter_id' => $user->id, // For simplicity
            'total_price' => $totalPrice,
            'status' => 'pending',
            'type' => $request->table_id ? 'dine-in' : 'takeout',
        ]);

        // Create order items
        foreach ($request->items as $itemData) {
            $menuItem = MenuItem::find($itemData['menu_item_id']);
            $quantity = $itemData['quantity'];
            $price = $menuItem->price * $quantity;

            OrderItem::create([
                'order_id' => $order->id,
                'menu_item_id' => $menuItem->id,
                'quantity' => $quantity,
                'price' => $price,
                'notes' => $itemData['notes'] ?? null,
            ]);
        }

        // Broadcast new order event
        event(new NewOrderCreated($order));

        return redirect()->route('orders')->with('success', 'Order placed successfully!');
    }

    /**
     * Update order status (for staff use).
     */
    public function updateStatus(Request $request, Order $order)
    {
        $request->validate([
            'status' => 'required|in:pending,preparing,ready,delivered,cancelled',
        ]);

        $oldStatus = $order->status;
        $order->update([
            'status' => $request->status,
        ]);

        // Broadcast the status update event
        event(new OrderStatusUpdated($order, $oldStatus, $request->status));

        return back()->with('success', "Order #{$order->id} status updated to {$request->status}!");
    }

    /**
     * Create testimonial from completed order.
     */
    public function createTestimonial(Request $request, Order $order)
    {
        // Check if testimonial already exists for this order
        $existingTestimonial = Testimonial::where('order_id', $order->id)->first();
        if ($existingTestimonial) {
            return back()->with('error', 'You have already submitted a testimonial for this order.');
        }

        $request->validate([
            'author' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'content' => 'required|string|max:1000',
            'rating' => 'required|integer|min:1|max:5',
        ]);

        Testimonial::create([
            'author' => $request->author,
            'role' => $request->role,
            'content' => $request->content,
            'rating' => $request->rating,
            'status' => false, // Requires admin approval
            'sort_order' => Testimonial::max('sort_order') + 1,
            'order_id' => $order->id,
        ]);

        return back()->with('success', 'Thank you for your feedback! Your testimonial has been submitted for review.');
    }
}
