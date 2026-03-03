import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Utensils } from 'lucide-react';

export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/login', {
            onFinish: () => reset('password'),
        });
    };

    return (
        <Layout>
            <Head title="Sign In - Regal Resto" />

            <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <div className="flex justify-center mb-6">
                            <div className="flex items-center gap-2">
                                <Utensils className="h-8 w-8 text-orange-600" />
                                <span className="text-xl font-bold tracking-tight text-zinc-950 uppercase">Regal Resto</span>
                            </div>
                        </div>
                        <h2 className="text-3xl font-black tracking-tight text-zinc-950 mb-2">
                            Welcome Back
                        </h2>
                        <p className="text-gray-500">
                            Sign in to access your reservations and preferences
                        </p>
                    </motion.div>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-xl shadow-black/5"
                    >
                        <form onSubmit={submit} className="space-y-6">
                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-bold text-zinc-950 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full pl-10 pr-3 py-3 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent bg-white text-zinc-950 placeholder-gray-400"
                                        placeholder="john@example.com"
                                        required
                                    />
                                </div>
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-bold text-zinc-950 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className="w-full pl-10 pr-10 py-3 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent bg-white text-zinc-950 placeholder-gray-400"
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                        ) : (
                                            <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                                )}
                            </div>

                            {/* Remember me */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="h-4 w-4 text-orange-600 focus:ring-orange-600 border-zinc-200 rounded"
                                    />
                                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                                </label>
                                <Link
                                    href="/forgot-password"
                                    className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={processing}
                                className="w-full bg-zinc-950 text-white py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-zinc-800 transition shadow-lg shadow-zinc-950/20 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? (
                                    'Signing in...'
                                ) : (
                                    <>
                                        Sign In
                                        <ArrowRight className="h-4 w-4" />
                                    </>
                                )}
                            </motion.button>
                        </form>

                        {/* Sign Up Link */}
                        <div className="mt-6 text-center">
                            <p className="text-gray-600">
                                Don't have an account?{' '}
                                <Link
                                    href="/register"
                                    className="text-orange-600 hover:text-orange-700 font-bold"
                                >
                                    Create one here
                                </Link>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </Layout>
    );
}
