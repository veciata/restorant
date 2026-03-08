<?php

namespace App\Http\Controllers;

use App\Events\NewOrderCreated;
use App\Events\OrderStatusUpdated;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class OrderEventsController extends Controller
{
    public function stream(Request $request): Response
    {
        // Set headers for Server-Sent Events
        $response = new Response();
        $response->header('Content-Type', 'text/event-stream');
        $response->header('Cache-Control', 'no-cache');
        $response->header('Connection', 'keep-alive');
        $response->header('Access-Control-Allow-Origin', '*');
        $response->header('Access-Control-Allow-Headers', 'Cache-Control');

        // Start the stream
        $response->setCallback(function () use ($request) {
            // Send initial connection event
            echo "data: " . json_encode([
                'type' => 'connected',
                'message' => 'Connected to order events',
                'timestamp' => now()->toISOString()
            ]) . "\n\n";

            // Keep the connection alive
            while (true) {
                echo "data: " . json_encode([
                    'type' => 'heartbeat',
                    'timestamp' => now()->toISOString()
                ]) . "\n\n";
                
                // Flush output to send data immediately
                if (ob_get_level()) {
                    ob_end_flush();
                }
                flush();

                // Wait 1 second before next heartbeat
                sleep(1);
            }
        });

        return $response;
    }

    public function broadcastOrder(Request $request): Response
    {
        $request->validate([
            'type' => 'required|in:created,updated',
            'orderId' => 'required|integer',
            'oldStatus' => 'nullable|string',
            'newStatus' => 'nullable|string',
            'message' => 'nullable|string|max:255'
        ]);

        $order = Order::find($request->orderId);
        if (!$order) {
            return response()->json(['error' => 'Order not found'], 404);
        }

        // Broadcast the appropriate event
        if ($request->type === 'created') {
            event(new NewOrderCreated($order));
        } elseif ($request->type === 'updated') {
            event(new OrderStatusUpdated($order, $request->oldStatus, $request->newStatus, $request->message));
        }

        return response()->json(['success' => true]);
    }
}
