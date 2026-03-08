import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Users, Package, Settings, LogOut, Menu, X, BarChart3, ChefHat, UserCheck, MessageSquare } from 'lucide-react';
import { usePage, Link } from '@inertiajs/react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { auth } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') || 'light';
        }
        return 'light';
    });

    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        if (typeof window !== 'undefined') {
            localStorage.setItem('theme', newTheme);
        }
    };

    const adminNavItems = [
        {
            name: 'Dashboard',
            href: '/admin/dashboard',
            icon: LayoutDashboard,
            current: typeof window !== 'undefined' ? window.location.pathname === '/admin/dashboard' : false
        },
        {
            name: 'Orders',
            href: '/admin/orders',
            icon: Package,
            current: typeof window !== 'undefined' ? window.location.pathname === '/admin/orders' : false
        },
        // Only show Users link for CEOs
        ...(auth?.user?.role === 'ceo' ? [{
            name: 'Users',
            href: '/admin/users',
            icon: Users,
            current: typeof window !== 'undefined' ? window.location.pathname === '/admin/users' : false
        }] : []),
        // Only show Menu link for CEOs
        ...(auth?.user?.role === 'ceo' ? [{
            name: 'Menu',
            href: '/admin/menu',
            icon: ChefHat,
            current: typeof window !== 'undefined' ? window.location.pathname === '/admin/menu' : false
        }] : []),
        // Show Testimonials and Settings links for CEOs and Editors
        ...(auth?.user?.role === 'ceo' || auth?.user?.role === 'editor' ? [{
            name: 'Testimonials',
            href: '/admin/testimonials',
            icon: MessageSquare,
            current: typeof window !== 'undefined' ? window.location.pathname === '/admin/testimonials' : false
        }, {
            name: 'Settings',
            href: '/admin/site-settings',
            icon: Settings,
            current: typeof window !== 'undefined' ? window.location.pathname === '/admin/site-settings' : false
        }] : []),
    ];

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-zinc-950">
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-700 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="flex items-center justify-center h-16 px-4 bg-orange-600">
                        <div className="flex items-center gap-2">
                            <BarChart3 className="h-6 w-6 text-white" />
                            <span className="text-lg font-bold text-white">Admin Panel</span>
                        </div>
                    </div>

                    {/* User Info */}
                    <div className="p-4 border-b border-zinc-200 dark:border-zinc-700">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-orange-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-medium text-sm">
                                    {auth.user?.name?.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-zinc-950 dark:text-zinc-100 truncate">
                                    {auth.user?.name}
                                </p>
                                <select
                                    value={auth.user?.role || ''}
                                    onChange={(e) => {
                                        console.log('Switching role to:', e.target.value);
                                        fetch('/dev/switch-role', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json',
                                                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                                            },
                                            body: JSON.stringify({ role: e.target.value }),
                                        })
                                        .then(response => {
                                            console.log('Response:', response);
                                            return response.json();
                                        })
                                        .then(data => {
                                            console.log('Data:', data);
                                            window.location.reload();
                                        })
                                        .catch(error => {
                                            console.error('Error:', error);
                                        });
                                    }}
                                    className="w-full text-xs bg-transparent border-none text-zinc-500 dark:text-zinc-400 capitalize focus:outline-none focus:text-zinc-700 dark:focus:text-zinc-300"
                                >
                                    <option value="customer">Customer</option>
                                    <option value="chef">Chef</option>
                                    <option value="waiter">Waiter</option>
                                    <option value="editor">Editor</option>
                                    <option value="ceo">CEO</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6 space-y-2">
                        {adminNavItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
                                    item.current
                                        ? 'bg-orange-50 text-orange-700 border border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800'
                                        : 'text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800'
                                }`}
                                onClick={() => setSidebarOpen(false)}
                            >
                                <item.icon className="h-5 w-5" />
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Logout */}
                    <div className="p-4 border-t border-zinc-200 dark:border-zinc-700">
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 rounded-lg transition dark:text-zinc-300 dark:hover:bg-zinc-800"
                        >
                            <LogOut className="h-5 w-5" />
                            Logout
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top bar */}
                <header className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700 lg:hidden">
                    <div className="flex items-center justify-between px-4 py-3">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="p-2 rounded-lg text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                        >
                            <Menu className="h-5 w-5" />
                        </button>

                        <div className="flex items-center gap-3">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={toggleTheme}
                                className="p-2 rounded-lg text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                            >
                                {theme === 'light' ? (
                                    <motion.div
                                        key="moon"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {'🌙' as React.ReactNode}
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="sun"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {'☀️' as React.ReactNode}
                                    </motion.div>
                                )}
                            </motion.button>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 overflow-y-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={typeof window !== 'undefined' ? window.location.pathname : 'page'}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                            className="p-6"
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>

            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
}
