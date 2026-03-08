import { Head, usePage, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Calendar, Edit, Save, X } from 'lucide-react';
import React, { useState } from 'react';
import Layout from '../components/Layout';

export default function Account() {
    const { auth } = usePage().props;
    const [isEditing, setIsEditing] = useState(false);
    
    const { data, setData, put, processing, errors, recentlySuccessful } = useForm({
        name: auth.user.name || '',
        email: auth.user.email || '',
        phone: (auth.user.phone as string) || '',
    });

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        // Reset form data to current user values
        setData({
            name: auth.user.name || '',
            email: auth.user.email || '',
            phone: (auth.user.phone as string) || '',
        });
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Saving profile data:', data);
        put('/account/update', {
            preserveScroll: true,
            onSuccess: () => {
                console.log('Profile updated successfully');
                setIsEditing(false);
            },
            onError: (errors) => {
                console.error('Profile update errors:', errors);
            },
        });
    };

    return (
        <Layout>
            <Head title="My Account - Regal Resto" />

            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Success Message */}
                    {recentlySuccessful && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl"
                        >
                            <p className="text-green-800 font-medium">Profile updated successfully!</p>
                        </motion.div>
                    )}
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <User className="h-8 w-8 text-orange-600" />
                                    <h1 className="text-3xl font-black tracking-tight text-zinc-950">My Account</h1>
                                </div>
                                <p className="text-gray-600">
                                    Manage your personal information and preferences
                                </p>
                            </div>
                            
                            {/* Edit/Save/Cancel Buttons */}
                            <div className="flex gap-3">
                                {isEditing ? (
                                    <>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={handleSave}
                                            disabled={processing}
                                            className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-xl font-medium hover:bg-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <Save className="h-4 w-4" />
                                            {processing ? 'Saving...' : 'Save Changes'}
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={handleCancel}
                                            className="flex items-center gap-2 px-4 py-2 border border-zinc-300 text-zinc-700 rounded-xl font-medium hover:bg-zinc-50 transition"
                                        >
                                            <X className="h-4 w-4" />
                                            Cancel
                                        </motion.button>
                                    </>
                                ) : (
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleEdit}
                                        className="flex items-center gap-2 px-4 py-2 border border-zinc-300 text-zinc-700 rounded-xl font-medium hover:bg-zinc-50 transition"
                                    >
                                        <Edit className="h-4 w-4" />
                                        Edit Profile
                                    </motion.button>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    {/* Profile Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-xl shadow-black/5 mb-8"
                    >
                        <h2 className="text-xl font-bold text-zinc-950 flex items-center gap-2">
                            <User className="h-5 w-5 text-orange-600" />
                            Profile Information
                        </h2>

                        <form onSubmit={handleSave}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-bold text-zinc-950 mb-2">
                                        Full Name
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="w-full px-4 py-3 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent bg-white text-zinc-950"
                                            required
                                        />
                                    ) : (
                                        <div className="flex items-center gap-3 px-4 py-3 bg-zinc-50 rounded-xl">
                                            <User className="h-5 w-5 text-zinc-400" />
                                            <span className="text-zinc-950">{auth.user.name}</span>
                                        </div>
                                    )}
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-bold text-zinc-950 mb-2">
                                        Email Address
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            id="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="w-full px-4 py-3 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent bg-white text-zinc-950"
                                            required
                                        />
                                    ) : (
                                        <div className="flex items-center gap-3 px-4 py-3 bg-zinc-50 rounded-xl">
                                            <Mail className="h-5 w-5 text-zinc-400" />
                                            <span className="text-zinc-950">{auth.user.email}</span>
                                        </div>
                                    )}
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-bold text-zinc-950 mb-2">
                                        Phone Number
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="tel"
                                            id="phone"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            className="w-full px-4 py-3 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent bg-white text-zinc-950"
                                            placeholder="+1 (555) 123-4567"
                                        />
                                    ) : (
                                        <div className="flex items-center gap-3 px-4 py-3 bg-zinc-50 rounded-xl">
                                            <Phone className="h-5 w-5 text-zinc-400" />
                                            <span className="text-zinc-950">{(auth.user.phone as string) || 'Not provided'}</span>
                                        </div>
                                    )}
                                    {errors.phone && (
                                        <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-zinc-950 mb-2">
                                        Member Since
                                    </label>
                                    <div className="flex items-center gap-3 px-4 py-3 bg-zinc-50 rounded-xl">
                                        <Calendar className="h-5 w-5 text-zinc-400" />
                                        <span className="text-zinc-950">January 15, 2024</span>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </motion.div>

                    {/* Preferences Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-xl shadow-black/5"
                    >
                        <h2 className="text-xl font-bold text-zinc-950 mb-6">Preferences</h2>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between py-3">
                                <div>
                                    <h3 className="font-medium text-zinc-950">Email Notifications</h3>
                                    <p className="text-sm text-gray-500">Receive updates about your orders and reservations</p>
                                </div>
                                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-orange-600 transition-colors">
                                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                                </button>
                            </div>

                            <div className="flex items-center justify-between py-3">
                                <div>
                                    <h3 className="font-medium text-zinc-950">SMS Notifications</h3>
                                    <p className="text-sm text-gray-500">Get text messages for order updates</p>
                                </div>
                                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors">
                                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
                                </button>
                            </div>

                            <div className="flex items-center justify-between py-3">
                                <div>
                                    <h3 className="font-medium text-zinc-950">Marketing Emails</h3>
                                    <p className="text-sm text-gray-500">Receive special offers and promotions</p>
                                </div>
                                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-orange-600 transition-colors">
                                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </Layout>
    );
}
