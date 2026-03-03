import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { Package, Calendar, Clock, MapPin, CheckCircle, XCircle, AlertCircle, Plus } from 'lucide-react';

// Define the order data structure
interface OrderItem {
    name: string;
    quantity: number;
    price: number;
}

interface Order {
    id: string;
    date: string;
    time: string;
    status: string;
    total: number;
    items: OrderItem[];
    delivery: {
        address: string;
        estimated: string;
        delivered: string | null;
    };
}

interface OrdersPageProps {
    orders: Order[];
    [key: string]: any; // Required for Inertia PageProps
}

export default function Orders() {
    // Get real orders data from props with proper typing
    const { orders = [] } = usePage<OrdersPageProps>().props;

    console.log('Orders page data:', { orders, ordersLength: orders?.length });

    // Ensure orders is always an array
    const safeOrders = Array.isArray(orders) ? orders : [];

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'delivered':
                return <CheckCircle className="h-5 w-5 text-green-600" />;
            case 'cancelled':
                return <XCircle className="h-5 w-5 text-red-600" />;
            default:
                return <AlertCircle className="h-5 w-5 text-yellow-600" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'delivered':
                return 'text-green-600 bg-green-50';
            case 'cancelled':
                return 'text-red-600 bg-red-50';
            default:
                return 'text-yellow-600 bg-yellow-50';
        }
    };

    return (
        <Layout>
            <Head title="Order History - Regal Resto" />

            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Debug Info (remove in production) */}
                    <div className="mb-4 p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
                        <strong>Debug:</strong> Orders count: {safeOrders.length}
                        {safeOrders.length > 0 && (
                            <span className="ml-4">
                                Sample order: {safeOrders[0]?.id} - {safeOrders[0]?.status}
                            </span>
                        )}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <Package className="h-8 w-8 text-orange-600" />
                                    <h1 className="text-3xl font-black tracking-tight text-zinc-950">Order History</h1>
                                </div>
                                <p className="text-gray-600">
                                    View and track your past orders
                                </p>
                            </div>
                            
                            {/* Development: Add Dummy Order Button */}
                            {import.meta.env.DEV && (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        fetch('/dev/create-dummy-order', {
                                            method: 'POST',
                                            headers: {
                                                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                                            },
                                        })
                                        .then(() => window.location.reload())
                                        .catch(error => console.error('Error creating dummy order:', error));
                                    }}
                                    className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-xl font-medium hover:bg-orange-700 transition"
                                >
                                    <Plus className="h-4 w-4" />
                                    Add Dummy Order
                                </motion.button>
                            )}
                        </div>
                    </motion.div>

                    {/* Orders List */}
                    <div className="space-y-6">
                        {safeOrders.map((order: any, index: number) => (
                            <motion.div
                                key={order.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-3xl border border-zinc-100 shadow-xl shadow-black/5 overflow-hidden"
                            >
                                {/* Order Header */}
                                <div className="p-6 border-b border-zinc-100">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div>
                                                <h3 className="text-lg font-bold text-zinc-950">{order.id}</h3>
                                                <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="h-4 w-4" />
                                                        {order.date}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Clock className="h-4 w-4" />
                                                        {order.time}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                                                {getStatusIcon(order.status)}
                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-gray-500">Total</p>
                                                <p className="text-xl font-bold text-zinc-950">${order.total.toFixed(2)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Details */}
                                <div className="p-6">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        {/* Items */}
                                        <div>
                                            <h4 className="font-medium text-zinc-950 mb-3">Order Items</h4>
                                            <div className="space-y-2">
                                                {order.items.map((item: any, itemIndex: number) => (
                                                    <div key={itemIndex} className="flex justify-between items-center py-2 border-b border-zinc-50">
                                                        <div>
                                                            <p className="font-medium text-zinc-950">{item.name}</p>
                                                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                                        </div>
                                                        <p className="font-medium text-zinc-950">${item.price.toFixed(2)}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Delivery Info */}
                                        <div>
                                            <h4 className="font-medium text-zinc-950 mb-3">Delivery Information</h4>
                                            <div className="space-y-3">
                                                <div className="flex items-start gap-3">
                                                    <MapPin className="h-5 w-5 text-zinc-400 mt-0.5" />
                                                    <div>
                                                        <p className="text-sm text-zinc-950">{order.delivery.address}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Clock className="h-5 w-5 text-zinc-400" />
                                                    <div>
                                                        <p className="text-sm text-gray-500">Estimated: {order.delivery.estimated}</p>
                                                        {order.delivery.delivered && (
                                                            <p className="text-sm text-green-600">Delivered: {order.delivery.delivered}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-3 mt-6 pt-6 border-t border-zinc-100">
                                        <button className="px-4 py-2 text-sm font-medium text-orange-600 hover:text-orange-700 transition">
                                            View Receipt
                                        </button>
                                        <button className="px-4 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-700 transition">
                                            Reorder
                                        </button>
                                        {order.status === 'delivered' && (
                                            <button className="px-4 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-700 transition">
                                                Leave Review
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Empty State (if no orders) */}
                    {safeOrders.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-16"
                        >
                            <Package className="h-16 w-16 text-zinc-300 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-zinc-950 mb-2">No orders yet</h3>
                            <p className="text-gray-500 mb-6">Start ordering to see your order history here</p>
                            <a
                                href="/menu"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-xl font-medium hover:bg-orange-700 transition"
                            >
                                Browse Menu
                            </a>
                        </motion.div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
