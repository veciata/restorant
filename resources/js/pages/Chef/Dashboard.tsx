import React, { useState, useEffect } from 'react';
import { Head, usePage, router, Link } from '@inertiajs/react';
import AdminLayout from '../../components/AdminLayout';
import { motion } from 'framer-motion';
import { ChefHat, Clock, CheckCircle, Package, TrendingUp, Users, Timer } from 'lucide-react';
import { useOrderEvents } from '../../hooks/useOrderEvents';

interface Order {
    id: string;
    date: string;
    time: string;
    status: string;
    total: number;
    items: Array<{
        name: string;
        quantity: number;
        price: number;
    }>;
    delivery: {
        address: string;
        estimated: string;
        delivered: string | null;
    };
    customer_name?: string;
}

interface ChefDashboardProps {
    pendingOrders: Order[];
    preparingOrders: Order[];
    readyOrders: Order[];
    stats: {
        total_orders_today: number;
        completed_orders_today: number;
        average_prep_time: number;
        popular_items: Array<{
            name: string;
            count: number;
        }>;
    };
    [key: string]: any; // Required for Inertia PageProps
}

export default function Dashboard() {
    const { pendingOrders, preparingOrders, readyOrders, stats } = usePage<ChefDashboardProps>().props;
    const [activeTab, setActiveTab] = useState<'pending' | 'preparing' | 'ready'>('pending');
    const { lastEvent } = useOrderEvents();

    // Auto-refresh when order events are received
    useEffect(() => {
        if (lastEvent && (lastEvent.type === 'created' || lastEvent.type === 'status_updated')) {
            console.log('Order event detected, refreshing dashboard...');
            router.reload({ only: ['pendingOrders', 'preparingOrders', 'readyOrders', 'stats'] });
        }
    }, [lastEvent]);

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending':
                return <Clock className="h-5 w-5 text-yellow-600" />;
            case 'preparing':
                return <ChefHat className="h-5 w-5 text-blue-600" />;
            case 'ready':
                return <Package className="h-5 w-5 text-purple-600" />;
            default:
                return <Clock className="h-5 w-5 text-gray-600" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'text-yellow-600 bg-yellow-50 border-yellow-200';
            case 'preparing':
                return 'text-blue-600 bg-blue-50 border-blue-200';
            case 'ready':
                return 'text-purple-600 bg-purple-50 border-purple-200';
            default:
                return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    const updateOrderStatus = async (orderId: string, newStatus: string) => {
        try {
            const response = await fetch(`/admin/orders/${orderId}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (response.ok) {
                // Reload the page to show updated data
                window.location.reload();
            } else {
                console.error('Failed to update order status');
            }
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    const getCurrentOrders = () => {
        switch (activeTab) {
            case 'pending':
                return pendingOrders;
            case 'preparing':
                return preparingOrders;
            case 'ready':
                return readyOrders;
            default:
                return [];
        }
    };

    const getNextStatus = (currentStatus: string) => {
        switch (currentStatus) {
            case 'pending':
                return 'preparing';
            case 'preparing':
                return 'ready';
            case 'ready':
                return 'delivered';
            default:
                return currentStatus;
        }
    };

    const getNextStatusText = (currentStatus: string) => {
        switch (currentStatus) {
            case 'pending':
                return 'Start Preparing';
            case 'preparing':
                return 'Mark as Ready';
            case 'ready':
                return 'Mark as Delivered';
            default:
                return 'Update Status';
        }
    };

    return (
        <AdminLayout>
            <Head title="Chef Dashboard - Regal Resto" />

            <div className="min-h-screen bg-gray-50">
                <div className="mx-auto max-w-7xl px-4 py-8">
                    {/* Header */}
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex items-center gap-3">
                                <ChefHat className="h-8 w-8 text-orange-600" />
                                <h1 className="text-3xl font-black tracking-tight text-zinc-950">Chef Dashboard</h1>
                            </div>
                            {lastEvent && (
                                <div className="flex items-center gap-2 text-sm text-amber-600">
                                    <Package className="h-4 w-4 animate-pulse" />
                                    <span>{lastEvent.type === 'created' ? 'New Order!' : 'Order Updated'}</span>
                                </div>
                            )}
                        </div>
                        <p className="text-gray-600">Manage kitchen operations and track order progress</p>
                    </motion.div>

                    {/* Stats Cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4"
                    >
                        <div className="rounded-xl border border-zinc-100 bg-white p-6 shadow-xl shadow-black/5">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-orange-100 p-2">
                                    <TrendingUp className="h-6 w-6 text-orange-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Orders Today</p>
                                    <p className="text-2xl font-bold text-zinc-950">{stats?.total_orders_today || 0}</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl border border-zinc-100 bg-white p-6 shadow-xl shadow-black/5">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-green-100 p-2">
                                    <CheckCircle className="h-6 w-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Completed</p>
                                    <p className="text-2xl font-bold text-zinc-950">
                                        {stats?.completed_orders_today || 0}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl border border-zinc-100 bg-white p-6 shadow-xl shadow-black/5">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-blue-100 p-2">
                                    <Timer className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Avg Prep Time</p>
                                    <p className="text-2xl font-bold text-zinc-950">
                                        {stats?.average_prep_time || 0}min
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl border border-zinc-100 bg-white p-6 shadow-xl shadow-black/5">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-purple-100 p-2">
                                    <Users className="h-6 w-6 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Active Orders</p>
                                    <p className="text-2xl font-bold text-zinc-950">
                                        {(pendingOrders?.length || 0) + (preparingOrders?.length || 0)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {/* Orders Management */}
                        <div className="lg:col-span-2">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="overflow-hidden rounded-3xl border border-zinc-100 bg-white shadow-xl shadow-black/5"
                            >
                                {/* Tabs */}
                                <div className="border-b border-zinc-100">
                                    <div className="flex">
                                        {[
                                            {
                                                key: 'pending',
                                                label: 'Pending',
                                                count: pendingOrders?.length || 0,
                                                color: 'text-yellow-600',
                                            },
                                            {
                                                key: 'preparing',
                                                label: 'Preparing',
                                                count: preparingOrders?.length || 0,
                                                color: 'text-blue-600',
                                            },
                                            {
                                                key: 'ready',
                                                label: 'Ready',
                                                count: readyOrders?.length || 0,
                                                color: 'text-purple-600',
                                            },
                                        ].map((tab) => (
                                            <button
                                                key={tab.key}
                                                onClick={() => setActiveTab(tab.key as any)}
                                                className={`flex-1 px-6 py-4 text-sm font-medium transition ${activeTab === tab.key
                                                        ? `${tab.color} border-b-2 border-current`
                                                        : 'text-gray-500 hover:text-gray-700'
                                                    }`}
                                            >
                                                {tab.label} ({tab.count})
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Orders List */}
                                <div className="max-h-96 overflow-y-auto">
                                    {getCurrentOrders().length === 0 ? (
                                        <div className="py-12 text-center">
                                            <ChefHat className="mx-auto mb-4 h-12 w-12 text-zinc-300" />
                                            <p className="text-gray-500">No {activeTab} orders</p>
                                        </div>
                                    ) : (
                                        <div className="divide-y divide-zinc-100">
                                            {getCurrentOrders().map((order: Order, index: number) => (
                                                <motion.div
                                                    key={order.id}
                                                    initial={{
                                                        opacity: 0,
                                                        x: -20,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        x: 0,
                                                    }}
                                                    transition={{
                                                        delay: index * 0.05,
                                                    }}
                                                    className="p-6 transition hover:bg-zinc-50"
                                                >
                                                    <div className="mb-4 flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <div
                                                                className={`flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${getStatusColor(order.status)}`}
                                                            >
                                                                {getStatusIcon(order.status)}
                                                                {order.status.charAt(0).toUpperCase() +
                                                                    order.status.slice(1)}
                                                            </div>
                                                            <span className="font-bold text-zinc-950">{order.id}</span>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-sm text-gray-500">
                                                                {order.date} at {order.time}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Order Items */}
                                                    <div className="mb-4">
                                                        <div className="space-y-1">
                                                            {order.items?.map((item, itemIndex) => (
                                                                <div
                                                                    key={itemIndex}
                                                                    className="flex justify-between text-sm"
                                                                >
                                                                    <span>
                                                                        {item.quantity}x {item.name}
                                                                    </span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Delivery Info & Actions */}
                                                    <div className="flex items-center justify-between">
                                                        <div className="text-sm text-gray-600">
                                                            <span className="font-medium">Delivery:</span>{' '}
                                                            {order.delivery?.address || 'Unknown'}
                                                        </div>
                                                        <div className="flex gap-2">
                                                            {order.status !== 'delivered' && (
                                                                <button
                                                                    onClick={() =>
                                                                        updateOrderStatus(
                                                                            order.id.split('-')[1],
                                                                            getNextStatus(order.status),
                                                                        )
                                                                    }
                                                                    className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-orange-700"
                                                                >
                                                                    {getNextStatusText(order.status)}
                                                                </button>
                                                            )}
                                                            <Link
                                                                href={`/admin/orders/${order.id.split('-')[1]}`}
                                                                className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
                                                            >
                                                                View Details
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </div>

                        {/* Popular Items Sidebar */}
                        <div className="lg:col-span-1">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="rounded-3xl border border-zinc-100 bg-white p-6 shadow-xl shadow-black/5"
                            >
                                <h2 className="mb-6 text-xl font-bold text-zinc-950">Popular Items Today</h2>

                                {stats?.popular_items && stats.popular_items.length > 0 ? (
                                    <div className="space-y-4">
                                        {stats.popular_items.map((item, index) => (
                                            <div key={index} className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100">
                                                        <span className="text-sm font-bold text-orange-600">
                                                            {index + 1}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-zinc-950">{item.name}</p>
                                                        <p className="text-sm text-gray-500">{item.count} orders</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-8 text-center">
                                        <TrendingUp className="mx-auto mb-2 h-8 w-8 text-zinc-300" />
                                        <p className="text-sm text-gray-500">No data available</p>
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
