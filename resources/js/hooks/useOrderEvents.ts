import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';

interface OrderEvent {
    type: 'created' | 'status_updated';
    order: any;
    oldStatus?: string;
    newStatus?: string;
    message?: string;
}

export function useOrderEvents() {
    const [lastEvent, setLastEvent] = useState<OrderEvent | null>(null);
    const { props } = usePage();

    useEffect(() => {
        // Set up Server-Sent Events connection
        const eventSource = new EventSource('/orders/events');

        eventSource.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log('Order event received:', data);

                setLastEvent(data);

                // Trigger page reload to get updated props
                if (data.type === 'created' || data.type === 'status_updated') {
                    // Use Inertia's reload with only the props that might change
                    window.location.reload();
                }
            } catch (error) {
                console.error('Error parsing order event:', error);
            }
        };

        eventSource.onerror = (error) => {
            console.error('EventSource error:', error);
        };

        eventSource.onopen = () => {
            console.log('Connected to order events stream');
        };

        return () => {
            eventSource.close();
        };
    }, []);

    return { lastEvent };
}
