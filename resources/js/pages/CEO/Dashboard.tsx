import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import AdminLayout from '../../components/AdminLayout';
import { motion } from 'framer-motion';
import { BarChart3, Users, DollarSign, Package, TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export default function Dashboard() {
    const { stats } = usePage().props as any;

    const statCards = [
        {
            title: 'Total Orders',
            value: stats.total_orders,
            icon: Package,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
        },
        {
            title: 'Total Users',
            value: stats.total_users,
            icon: Users,
            color: 'text-green-600',
            bgColor: 'bg-green-50',
        },
        {
            title: 'Total Revenue',
            value: `$${stats.total_revenue.toFixed(2)}`,
            icon: DollarSign,
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-50',
        },
        {
            title: 'Pending Orders',
            value: stats.pending_orders,
            icon: Clock,
            color: 'text-orange-600',
            bgColor: 'bg-orange-50',
        },
    ];

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'delivered':
                return <CheckCircle className="h-4 w-4 text-green-600" />;
            case 'pending':
                return <Clock className="h-4 w-4 text-yellow-600" />;
            default:
                return <AlertCircle className="h-4 w-4 text-blue-600" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'delivered':
                return 'text-green-600 bg-green-50';
            case 'pending':
                return 'text-yellow-600 bg-yellow-50';
            default:
                return 'text-blue-600 bg-blue-50';
        }
    };

    return (
        <AdminLayout>
            <Head title="CEO Dashboard - Regal Resto" />

            <div className="space-y-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3"
                >
                    <BarChart3 className="h-8 w-8 text-orange-600" />
                    <h1 className="text-3xl font-black tracking-tight text-zinc-950 dark:text-zinc-100">CEO Dashboard</h1>
                </motion.div>

                {/* Stats Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {statCards.map((stat, index) => (
                        <motion.div
                            key={stat.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white dark:bg-zinc-800 p-6 rounded-3xl border border-zinc-100 dark:border-zinc-700 shadow-xl shadow-black/5"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-zinc-400">{stat.title}</p>
                                    <p className="text-3xl font-bold text-zinc-950 dark:text-zinc-100 mt-2">{stat.value}</p>
                                </div>
                                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Weekly & Monthly Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                >
                    {/* Weekly Stats */}
                    <div className="bg-white dark:bg-zinc-800 p-6 rounded-3xl border border-zinc-100 dark:border-zinc-700 shadow-xl shadow-black/5">
                        <h3 className="text-lg font-bold text-zinc-950 dark:text-zinc-100 mb-4 flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-blue-600" />
                            This Week
                        </h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 dark:text-zinc-400">Orders</span>
                                <span className="font-bold text-zinc-950 dark:text-zinc-100">{stats.weekly_orders}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 dark:text-zinc-400">Revenue</span>
                                <span className="font-bold text-zinc-950 dark:text-zinc-100">${stats.weekly_revenue.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 dark:text-zinc-400">New Users</span>
                                <span className="font-bold text-zinc-950 dark:text-zinc-100">{stats.weekly_users}</span>
                            </div>
                        </div>
                    </div>

                    {/* Monthly Stats */}
                    <div className="bg-white dark:bg-zinc-800 p-6 rounded-3xl border border-zinc-100 dark:border-zinc-700 shadow-xl shadow-black/5">
                        <h3 className="text-lg font-bold text-zinc-950 dark:text-zinc-100 mb-4 flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-green-600" />
                            This Month
                        </h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 dark:text-zinc-400">Orders</span>
                                <span className="font-bold text-zinc-950 dark:text-zinc-100">{stats.monthly_orders}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 dark:text-zinc-400">Revenue</span>
                                <span className="font-bold text-zinc-950 dark:text-zinc-100">${stats.monthly_revenue.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 dark:text-zinc-400">New Users</span>
                                <span className="font-bold text-zinc-950 dark:text-zinc-100">{stats.monthly_users}</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Recent Orders */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white dark:bg-zinc-800 rounded-3xl border border-zinc-100 dark:border-zinc-700 shadow-xl shadow-black/5 overflow-hidden"
                >
                    <div className="p-6 border-b border-zinc-100 dark:border-zinc-700">
                        <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-100 flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-orange-600" />
                            Recent Orders
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-zinc-50 dark:bg-zinc-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wider">Order ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wider">Customer</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wider">Items</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wider">Total</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wider">Date</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-zinc-800 divide-y divide-zinc-100 dark:divide-zinc-700">
                                {stats.recent_orders.map((order: any, index: number) => (
                                    <motion.tr
                                        key={order.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="hover:bg-zinc-50 dark:hover:bg-zinc-700 transition"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-950 dark:text-zinc-100">{order.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-950 dark:text-zinc-100">{order.customer}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-950 dark:text-zinc-100">{order.items_count} items</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-950 dark:text-zinc-100">${order.total}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                                                {getStatusIcon(order.status)}
                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-400">{order.date}</td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {stats.recent_orders.length === 0 && (
                        <div className="text-center py-12">
                            <Package className="h-16 w-16 text-zinc-300 dark:text-zinc-600 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-zinc-950 dark:text-zinc-100 mb-2">No orders yet</h3>
                            <p className="text-gray-500 dark:text-zinc-400">Orders will appear here once customers start placing them.</p>
                        </div>
                    )}
                </motion.div>
            </div>
        </AdminLayout>
    );
}
