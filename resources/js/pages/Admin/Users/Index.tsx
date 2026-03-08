import { Head, usePage, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Users, Crown, UserCheck, DollarSign, X } from 'lucide-react';
import React, { useState } from 'react';
import AdminLayout from '../../../components/AdminLayout';

export default function Index() {
    const { users } = usePage().props as any;
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [showBonusModal, setShowBonusModal] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        bonus_amount: '',
        bonus_reason: '',
    });

    const handleGiveBonus = (user: any) => {
        setSelectedUser(user);
        setShowBonusModal(true);
    };

    const handleSubmitBonus = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedUser) return;
        post(`/admin/users/${selectedUser.id}/bonus`, {
            preserveScroll: true,
            onSuccess: () => {
                setShowBonusModal(false);
                reset();
                setSelectedUser(null);
            },
        });
    };

    const closeModal = () => {
        setShowBonusModal(false);
        setSelectedUser(null);
        reset();
    };

    const getRoleBadge = (role: string) => {
        const roleConfig: Record<string, { color: string; icon: any }> = {
            ceo: { color: 'bg-purple-100 text-purple-800', icon: Crown },
            editor: { color: 'bg-blue-100 text-blue-800', icon: UserCheck },
            chef: { color: 'bg-orange-100 text-orange-800', icon: UserCheck },
            waiter: { color: 'bg-green-100 text-green-800', icon: UserCheck },
            customer: { color: 'bg-gray-100 text-gray-800', icon: UserCheck },
        };

        const config = roleConfig[role] || roleConfig.customer;
        const Icon = config.icon;

        return (
            <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full capitalize ${config.color}`}>
                <Icon className="h-3 w-3" />
                {role}
            </span>
        );
    };

    return (
        <AdminLayout>
            <Head title="User Management - Regal Resto" />

            <div className="space-y-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3"
                >
                    <Users className="h-8 w-8 text-orange-600" />
                    <h1 className="text-3xl font-black tracking-tight text-zinc-950 dark:text-zinc-100">User Management</h1>
                </motion.div>

                {/* Stats Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    <div className="bg-white dark:bg-zinc-800 p-6 rounded-3xl border border-zinc-100 dark:border-zinc-700 shadow-xl shadow-black/5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-zinc-400">Total Users</p>
                                <p className="text-3xl font-bold text-zinc-950 dark:text-zinc-100 mt-2">{users.length}</p>
                            </div>
                            <Users className="h-8 w-8 text-blue-600" />
                        </div>
                    </div>

                    <div className="bg-white dark:bg-zinc-800 p-6 rounded-3xl border border-zinc-100 dark:border-zinc-700 shadow-xl shadow-black/5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-zinc-400">Active Staff</p>
                                <p className="text-3xl font-bold text-zinc-950 dark:text-zinc-100 mt-2">
                                    {users.filter((u: any) => ['ceo', 'editor', 'chef', 'waiter'].includes(u.role)).length}
                                </p>
                            </div>
                            <UserCheck className="h-8 w-8 text-green-600" />
                        </div>
                    </div>

                    <div className="bg-white dark:bg-zinc-800 p-6 rounded-3xl border border-zinc-100 dark:border-zinc-700 shadow-xl shadow-black/5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-zinc-400">Customers</p>
                                <p className="text-3xl font-bold text-zinc-950 dark:text-zinc-100 mt-2">
                                    {users.filter((u: any) => u.role === 'customer').length}
                                </p>
                            </div>
                            <UserCheck className="h-8 w-8 text-orange-600" />
                        </div>
                    </div>
                </motion.div>

                {/* Users Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white dark:bg-zinc-800 rounded-3xl border border-zinc-100 dark:border-zinc-700 shadow-xl shadow-black/5 overflow-hidden"
                >
                    <div className="p-6 border-b border-zinc-100 dark:border-zinc-700">
                        <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-100 flex items-center gap-2">
                            <Users className="h-5 w-5 text-orange-600" />
                            All Users
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-zinc-50 dark:bg-zinc-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wider">User</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wider">Role</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wider">Orders</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wider">Total Spent</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wider">Member Since</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-zinc-800 divide-y divide-zinc-100 dark:divide-zinc-700">
                                {users.map((user: any, index: number) => (
                                    <motion.tr
                                        key={user.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="hover:bg-zinc-50 dark:hover:bg-zinc-700 transition"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <p className="font-medium text-zinc-950 dark:text-zinc-100">{user.name}</p>
                                                <p className="text-sm text-gray-500 dark:text-zinc-400">{user.email}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getRoleBadge(user.role)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-950 dark:text-zinc-100">
                                            {user.total_orders}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-950 dark:text-zinc-100">
                                            ${user.total_spent}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-400">
                                            {user.member_since}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <button
                                                onClick={() => handleGiveBonus(user)}
                                                className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded-lg transition"
                                            >
                                                <DollarSign className="h-4 w-4" />
                                                Give Bonus
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>

            {/* Bonus Modal */}
            {showBonusModal && selectedUser && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={closeModal} />

                        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-zinc-800 shadow-xl rounded-2xl">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-zinc-950 dark:text-zinc-100">
                                    Give Bonus to {selectedUser.name}
                                </h3>
                                <button
                                    onClick={closeModal}
                                    className="p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmitBonus}>
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="bonus_amount" className="block text-sm font-medium text-zinc-950 dark:text-zinc-100 mb-2">
                                            Bonus Amount ($)
                                        </label>
                                        <input
                                            type="number"
                                            id="bonus_amount"
                                            step="0.01"
                                            min="0.01"
                                            max="999.99"
                                            value={data.bonus_amount}
                                            onChange={(e) => setData('bonus_amount', e.target.value)}
                                            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-950 dark:text-zinc-100 focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                                            placeholder="25.00"
                                            required
                                        />
                                        {errors.bonus_amount && (
                                            <p className="mt-1 text-sm text-red-600">{errors.bonus_amount}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="bonus_reason" className="block text-sm font-medium text-zinc-950 dark:text-zinc-100 mb-2">
                                            Reason
                                        </label>
                                        <textarea
                                            id="bonus_reason"
                                            value={data.bonus_reason}
                                            onChange={(e) => setData('bonus_reason', e.target.value)}
                                            rows={3}
                                            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-950 dark:text-zinc-100 focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                                            placeholder="Great service, loyal customer, etc."
                                            required
                                        />
                                        {errors.bonus_reason && (
                                            <p className="mt-1 text-sm text-red-600">{errors.bonus_reason}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex gap-3 mt-6">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="flex-1 px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-700 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-600 transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="flex-1 px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                    >
                                        {processing ? 'Giving Bonus...' : 'Give Bonus'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
