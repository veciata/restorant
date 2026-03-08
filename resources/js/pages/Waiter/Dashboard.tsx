import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import AdminLayout from '../../components/AdminLayout';
import { motion } from 'framer-motion';
import { Users, Clock, CheckCircle, Table, Package } from 'lucide-react';

interface WaiterDashboardProps {
    activeOrders: Array<{
        id: string;
        table_number: number;
        status: string;
        customer_name: string;
        items_count: number;
        created_at: string;
    }>;
    availableTables: Array<{
        id: number;
        table_number: number;
        capacity: number;
        status: string;
    }>;
    stats: {
        active_tables: number;
        pending_orders: number;
        completed_today: number;
    };
    [key: string]: any; // Required for Inertia PageProps
}

export default function Dashboard() {
    const { activeOrders, availableTables, stats } = usePage<WaiterDashboardProps>().props;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'text-yellow-600 bg-yellow-50 border-yellow-200';
            case 'preparing':
                return 'text-blue-600 bg-blue-50 border-blue-200';
            case 'ready':
                return 'text-purple-600 bg-purple-50 border-purple-200';
            case 'delivered':
                return 'text-green-600 bg-green-50 border-green-200';
            default:
                return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    return (
        <AdminLayout>
            <Head title="Waiter Dashboard - Regal Resto" />

            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <Users className="h-8 w-8 text-orange-600" />
                            <h1 className="text-3xl font-black tracking-tight text-zinc-950">Waiter Dashboard</h1>
                        </div>
                        <p className="text-gray-600">
                            Manage tables and track order progress
                        </p>
                    </motion.div>

                    {/* Stats Cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
                    >
                        <div className="bg-white rounded-xl border border-zinc-100 shadow-xl shadow-black/5 p-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Table className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Active Tables</p>
                                    <p className="text-2xl font-bold text-zinc-950">{stats?.active_tables || 0}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl border border-zinc-100 shadow-xl shadow-black/5 p-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-orange-100 rounded-lg">
                                    <Clock className="h-6 w-6 text-orange-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Pending Orders</p>
                                    <p className="text-2xl font-bold text-zinc-950">{stats?.pending_orders || 0}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl border border-zinc-100 shadow-xl shadow-black/5 p-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <CheckCircle className="h-6 w-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Completed Today</p>
                                    <p className="text-2xl font-bold text-zinc-950">{stats?.completed_today || 0}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Active Orders */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-3xl border border-zinc-100 shadow-xl shadow-black/5 p-6"
                        >
                            <h2 className="text-xl font-bold text-zinc-950 mb-6">Active Orders</h2>

                            {activeOrders && activeOrders.length > 0 ? (
                                <div className="space-y-4">
                                    {activeOrders.map((order, index) => (
                                        <div key={index} className="flex items-center justify-between p-4 border border-zinc-100 rounded-lg">
                                            <div>
                                                <p className="font-medium text-zinc-950">{order.id}</p>
                                                <p className="text-sm text-gray-600">Table {order.table_number} • {order.customer_name}</p>
                                            </div>
                                            <div className="text-right">
                                                <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mb-2 ${getStatusColor(order.status)}`}>
                                                    {order.status}
                                                </span>
                                                <p className="text-sm text-gray-500">{order.items_count} items</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <Package className="h-8 w-8 text-zinc-300 mx-auto mb-2" />
                                    <p className="text-gray-500">No active orders</p>
                                </div>
                            )}
                        </motion.div>

                        {/* Available Tables */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white rounded-3xl border border-zinc-100 shadow-xl shadow-black/5 p-6"
                        >
                            <h2 className="text-xl font-bold text-zinc-950 mb-6">Available Tables</h2>

                            {availableTables && availableTables.length > 0 ? (
                                <div className="space-y-4">
                                    {availableTables.map((table, index) => (
                                        <div key={index} className="flex items-center justify-between p-4 border border-zinc-100 rounded-lg">
                                            <div>
                                                <p className="font-medium text-zinc-950">Table {table.table_number}</p>
                                                <p className="text-sm text-gray-600">{table.capacity} seats</p>
                                            </div>
                                            <div className="text-right">
                                                <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800">
                                                    Available
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <Table className="h-8 w-8 text-zinc-300 mx-auto mb-2" />
                                    <p className="text-gray-500">No available tables</p>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
