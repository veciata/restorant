import React, { useState } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import AdminLayout from '../../../components/AdminLayout';
import { motion } from 'framer-motion';
import { Package, Calendar, Clock, MapPin, CheckCircle, XCircle, AlertCircle, Search, Filter, Eye, Edit, DollarSign, Plus } from 'lucide-react';

export default function Index() {
    const { orders } = usePage().props as any;
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    // Filter orders based on search and status
    const filteredOrders = orders.filter((order: any) => {
        const matchesSearch = searchTerm === '' ||
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer_name.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'delivered':
                return <CheckCircle className="h-4 w-4 text-green-600" />;
            case 'cancelled':
                return <XCircle className="h-4 w-4 text-red-600" />;
            default:
                return <AlertCircle className="h-4 w-4 text-yellow-600" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'delivered':
                return 'text-green-600 bg-green-50 border-green-200';
            case 'cancelled':
                return 'text-red-600 bg-red-50 border-red-200';
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

    const updateOrderStatus = (orderId: string, newStatus: string) => {
        fetch(`/admin/orders/${orderId}/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
            },
            body: JSON.stringify({ status: newStatus }),
        })
        .then(response => {
            console.log('Status update response:', response.status);
            if (response.ok) {
                // Reload the page to show updated data
                router.reload();
            } else {
                return response.json().then(data => {
                    throw new Error(data.message || 'Failed to update status');
                });
            }
        })
        .catch(error => {
            console.error('Status update error:', error);
            alert('Failed to update order status: ' + error.message);
        });
    };

    const getStatusStats = () => {
        const stats = {
            all: orders.length,
            pending: orders.filter((o: any) => o.status === 'pending').length,
            preparing: orders.filter((o: any) => o.status === 'preparing').length,
            ready: orders.filter((o: any) => o.status === 'ready').length,
            delivered: orders.filter((o: any) => o.status === 'delivered').length,
            cancelled: orders.filter((o: any) => o.status === 'cancelled').length,
        };
        return stats;
    };

    const stats = getStatusStats();

    return (
        <AdminLayout>
            <Head title="Order Management - Regal Resto" />

            <div className="space-y-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between"
                >
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <Package className="h-8 w-8 text-orange-600" />
                            <h1 className="text-3xl font-black tracking-tight text-zinc-950 dark:text-zinc-100">Order Management</h1>
                        </div>
                        <p className="text-gray-600 dark:text-zinc-400">
                            Manage all orders in the system
                        </p>
                    </div>

                            {/* Create Dummy Order Button (Development Only) */}
                            {import.meta.env.DEV && (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        console.log('Creating dummy order...');
                                        fetch('/dev/create-dummy-order', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json',
                                                'Accept': 'application/json',
                                            },
                                        })
                                        .then(response => {
                                            console.log('Response status:', response.status);
                                            return response.json().catch(() => ({}));
                                        })
                                        .then(data => {
                                            console.log('Response data:', data);
                                            if (data.error) {
                                                alert('Error: ' + data.error);
                                            } else {
                                                alert('Dummy order created successfully!');
                                                // Reload page data without full refresh
                                                router.reload();
                                            }
                                        })
                                        .catch(error => {
                                            console.error('Error creating dummy order:', error);
                                            alert('Failed to create dummy order. Check console for details.');
                                        });
                                    }}
                                    className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-xl font-medium hover:bg-orange-700 transition"
                                >
                                    <Plus className="h-4 w-4" />
                                    Add Dummy Order
                                </motion.button>
                            )}
                </motion.div>

                {/* Stats Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
                >
                    <div
                        onClick={() => setStatusFilter('all')}
                        className={`p-4 rounded-xl border cursor-pointer transition ${statusFilter === 'all' ? 'bg-orange-50 border-orange-200' : 'bg-white dark:bg-zinc-800 border-zinc-100 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700'}`}
                    >
                        <div className="text-2xl font-bold text-zinc-950 dark:text-zinc-100">{stats.all}</div>
                        <div className="text-sm text-gray-500 dark:text-zinc-400">Total</div>
                    </div>
                    <div
                        onClick={() => setStatusFilter('pending')}
                        className={`p-4 rounded-xl border cursor-pointer transition ${statusFilter === 'pending' ? 'bg-yellow-50 border-yellow-200' : 'bg-white dark:bg-zinc-800 border-zinc-100 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700'}`}
                    >
                        <div className="text-2xl font-bold text-zinc-950 dark:text-zinc-100">{stats.pending}</div>
                        <div className="text-sm text-gray-500 dark:text-zinc-400">Pending</div>
                    </div>
                    <div
                        onClick={() => setStatusFilter('preparing')}
                        className={`p-4 rounded-xl border cursor-pointer transition ${statusFilter === 'preparing' ? 'bg-blue-50 border-blue-200' : 'bg-white dark:bg-zinc-800 border-zinc-100 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700'}`}
                    >
                        <div className="text-2xl font-bold text-zinc-950 dark:text-zinc-100">{stats.preparing}</div>
                        <div className="text-sm text-gray-500 dark:text-zinc-400">Preparing</div>
                    </div>
                    <div
                        onClick={() => setStatusFilter('ready')}
                        className={`p-4 rounded-xl border cursor-pointer transition ${statusFilter === 'ready' ? 'bg-purple-50 border-purple-200' : 'bg-white dark:bg-zinc-800 border-zinc-100 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700'}`}
                    >
                        <div className="text-2xl font-bold text-zinc-950 dark:text-zinc-100">{stats.ready}</div>
                        <div className="text-sm text-gray-500 dark:text-zinc-400">Ready</div>
                    </div>
                    <div
                        onClick={() => setStatusFilter('delivered')}
                        className={`p-4 rounded-xl border cursor-pointer transition ${statusFilter === 'delivered' ? 'bg-green-50 border-green-200' : 'bg-white dark:bg-zinc-800 border-zinc-100 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700'}`}
                    >
                        <div className="text-2xl font-bold text-zinc-950 dark:text-zinc-100">{stats.delivered}</div>
                        <div className="text-sm text-gray-500 dark:text-zinc-400">Delivered</div>
                    </div>
                    <div
                        onClick={() => setStatusFilter('cancelled')}
                        className={`p-4 rounded-xl border cursor-pointer transition ${statusFilter === 'cancelled' ? 'bg-red-50 border-red-200' : 'bg-white dark:bg-zinc-800 border-zinc-100 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700'}`}
                    >
                        <div className="text-2xl font-bold text-zinc-950 dark:text-zinc-100">{stats.cancelled}</div>
                        <div className="text-sm text-gray-500 dark:text-zinc-400">Cancelled</div>
                    </div>
                </motion.div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col sm:flex-row gap-4"
                >
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search orders by ID or customer name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-950 dark:text-zinc-100 focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                            />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-950 dark:text-zinc-100 focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="preparing">Preparing</option>
                            <option value="ready">Ready</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                        {statusFilter !== 'all' && (
                            <button
                                onClick={() => setStatusFilter('all')}
                                className="px-3 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </motion.div>

                {/* Orders Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white dark:bg-zinc-800 rounded-3xl border border-zinc-100 dark:border-zinc-700 shadow-xl shadow-black/5 overflow-hidden"
                >
                    <div className="p-6 border-b border-zinc-100 dark:border-zinc-700">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-100 flex items-center gap-2">
                                <Package className="h-5 w-5 text-orange-600" />
                                Orders ({filteredOrders.length})
                            </h2>
                        </div>
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
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-zinc-800 divide-y divide-zinc-100 dark:divide-zinc-700">
                                {filteredOrders.map((order: any, index: number) => (
                                    <motion.tr
                                        key={order.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.02 }}
                                        className="hover:bg-zinc-50 dark:hover:bg-zinc-700 transition"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-950 dark:text-zinc-100">{order.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-950 dark:text-zinc-100">{order.customer_name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-950 dark:text-zinc-100">{order.items.length} items</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-950 dark:text-zinc-100">${order.total}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(order.status)}`}>
                                                    {getStatusIcon(order.status)}
                                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                </span>
                                                {/* Status Update Dropdown */}
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                                    className="text-xs px-2 py-1 border border-zinc-300 dark:border-zinc-600 rounded bg-white dark:bg-zinc-700 focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="preparing">Preparing</option>
                                                    <option value="ready">Ready</option>
                                                    <option value="delivered">Delivered</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-400">
                                            <div>{order.date}</div>
                                            <div className="text-xs">{order.time}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <div className="flex gap-2">
                                                <button className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300" title="View Details">
                                                    <Eye className="h-4 w-4" />
                                                </button>
                                                <button className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300" title="Edit Order">
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredOrders.length === 0 && (
                        <div className="text-center py-12">
                            <Package className="h-16 w-16 text-zinc-300 dark:text-zinc-600 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-zinc-950 dark:text-zinc-100 mb-2">
                                {orders.length === 0 ? 'No orders yet' : 'No orders match your filters'}
                            </h3>
                            <p className="text-gray-500 dark:text-zinc-400 mb-4">
                                {orders.length === 0 ? 'Orders will appear here once customers start placing them.' : 'Try adjusting your search or filter criteria.'}
                            </p>
                            {statusFilter !== 'all' && (
                                <button
                                    onClick={() => {
                                        setSearchTerm('');
                                        setStatusFilter('all');
                                    }}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
                                >
                                    <Filter className="h-4 w-4" />
                                    Clear Filters
                                </button>
                            )}
                        </div>
                    )}
                </motion.div>
            </div>
        </AdminLayout>
    );
}
