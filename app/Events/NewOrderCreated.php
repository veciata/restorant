<?php

namespace App\Events;

use App\Models\Order;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;

class NewOrderCreated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets;

    public function __construct(
        public Order $order,
        public ?string $message = null
    ) {}

    public function broadcastOn(): Channel
    {
        return new Channel('orders');
    }

    public function broadcastWith(): array
    {
        return ['orders'];
    }
}
