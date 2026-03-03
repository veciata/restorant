import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Facebook, Instagram, Twitter, Utensils, Calendar, MapPin, Search, ShoppingBag, Sun, Moon, User, LogOut, ChevronDown, Package, Settings } from 'lucide-react';
import { usePage, Link } from '@inertiajs/react';

export default function Layout({ children }: { children: React.ReactNode }) {
    const { auth } = usePage().props;
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') || 'light';
        }
        return 'light';
    });
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);

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
        localStorage.setItem('theme', newTheme);
    };

    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 dark:bg-black/80 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-2"
                        >
                            <Utensils className="h-8 w-8 text-orange-600" />
                            <a href='/'><span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white uppercase">Restorant</span>
                        </a>
                        </motion.div>

                        <div className="hidden md:flex items-center space-x-10">
                            <a href="/" className="relative text-sm font-semibold transition hover:text-orange-600 text-orange-600">Home</a>
                            <a href="/menu" className="relative text-sm font-semibold transition hover:text-orange-600 text-gray-700 dark:text-gray-200">Menu</a>
                            <a href="/booking" className="relative text-sm font-semibold transition hover:text-orange-600 text-gray-700 dark:text-gray-200">Seating</a>
                            <a href="/about" className="relative text-sm font-semibold transition hover:text-orange-600 text-gray-700 dark:text-gray-200">Our Story</a>
                            {/* Dashboard Link for all authenticated users */}
                            {auth?.user && (
                                <a href="/admin/dashboard" className="relative text-sm font-semibold transition hover:text-orange-600 text-gray-700 dark:text-gray-200">Dashboard</a>
                            )}
                        </div>

                        <div className="flex items-center gap-6 text-gray-700 dark:text-gray-200">
                            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Search className="h-5 w-5 cursor-pointer hover:text-orange-600" />
                            </motion.button>
                            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="relative">
                                <ShoppingBag className="h-5 w-5 cursor-pointer hover:text-orange-600" />
                                <span className="absolute -top-1 -right-1 h-3 w-3 bg-orange-600 rounded-full flex items-center justify-center text-[8px] text-white">2</span>
                            </motion.button>
                            <motion.button onClick={toggleTheme} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                {theme === 'light' ? <Moon className="h-5 w-5 cursor-pointer hover:text-orange-600" /> : <Sun className="h-5 w-5 cursor-pointer hover:text-orange-600" />}
                            </motion.button>
                            {auth?.user ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                                        className="flex items-center gap-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 px-3 py-2 rounded-lg transition"
                                    >
                                        <div className="h-8 w-8 bg-orange-600 rounded-full flex items-center justify-center">
                                            <User className="h-4 w-4 text-white" />
                                        </div>
                                        <span className="text-sm font-medium text-zinc-950 dark:text-gray-200">
                                            {auth.user.name}
                                        </span>
                                        <ChevronDown className="h-4 w-4 text-zinc-500" />
                                    </button>

                                    <AnimatePresence>
                                        {userDropdownOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                                className="absolute right-0 mt-2 w-56 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xl shadow-black/10 py-2 z-50"
                                            >
                                                <Link
                                                    href="/account"
                                                    className="flex items-center gap-3 px-4 py-3 text-sm text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
                                                >
                                                    <User className="h-4 w-4" />
                                                    My Account
                                                </Link>
                                                <Link
                                                    href="/orders"
                                                    className="flex items-center gap-3 px-4 py-3 text-sm text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
                                                >
                                                    <Package className="h-4 w-4" />
                                                    Order History
                                                </Link>
                                                
                                                {/* Only show role switcher in development */}
                                        {import.meta.env.DEV && (
                                                    <>
                                                        <div className="px-4 py-2 border-t border-zinc-100 dark:border-zinc-700">
                                                            <div className="flex items-center justify-between mb-2">
                                                                <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Role</span>
                                                                <span className="text-xs px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-zinc-600 dark:text-zinc-300">
                                                                    {auth.user.role}
                                                                </span>
                                                            </div>
                                                            <select
                                                                value={auth.user.role}
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
                                                                className="w-full text-xs px-2 py-1 border border-zinc-200 dark:border-zinc-600 rounded bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                                                            >
                                                                <option value="customer">Customer</option>
                                                                <option value="chef">Chef</option>
                                                                <option value="waiter">Waiter</option>
                                                                <option value="editor">Editor</option>
                                                                <option value="ceo">CEO</option>
                                                            </select>
                                                        </div>
                                                    </>
                                                )}
                                                
                                                <div className="border-t border-zinc-100 dark:border-zinc-700 mt-2 pt-2">
                                                    <Link
                                                        href="/logout"
                                                        method="post"
                                                        as="button"
                                                        className="flex items-center gap-3 px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition w-full text-left"
                                                    >
                                                        <LogOut className="h-4 w-4" />
                                                        Logout
                                                    </Link>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <a
                                    href="/login"
                                    className="bg-orange-600 text-white px-6 py-2 rounded-full font-medium hover:bg-orange-700 transition shadow-lg shadow-orange-600/20"
                                >
                                    Sign In
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            <AnimatePresence mode="wait">
                <motion.main
                    key={window.location.pathname}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                    className="flex-grow pt-20"
                >
                    {children}
                </motion.main>
            </AnimatePresence>
            <footer className="bg-gray-50 border-t border-gray-100 dark:bg-black/90 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                        <div className="col-span-1">
                            <div className="flex items-center gap-2 mb-6">
                                <Utensils className="h-6 w-6 text-orange-600" />
                                <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white uppercase">Regal Resto</span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-200 leading-relaxed max-w-xs">
                                Indulge in an exquisite culinary journey where tradition meets innovation. Our chef's carefully crafted menu promises an unforgettable experience for your palate.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-bold mb-6 text-gray-900 dark:text-white uppercase tracking-wider text-sm">Quick Links</h3>
                            <div className="flex flex-col gap-4 text-gray-600 dark:text-gray-200">
                                <a href="/menu" className="transition hover:text-orange-600">Browse Menu</a>
                                <a href="/booking" className="transition hover:text-orange-600">Reserve Table</a>
                                <a href="/about" className="transition hover:text-orange-600">About Us</a>
                                <a href="/contact" className="transition hover:text-orange-600">Get in Touch</a>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-bold mb-6 text-gray-900 dark:text-white uppercase tracking-wider text-sm">Working Hours</h3>
                            <div className="flex flex-col gap-4 text-gray-600 dark:text-gray-200">
                                <p className="flex justify-between"><span>Mon - Thu:</span> <span className="font-medium text-gray-900 dark:text-gray-200">11:00 AM - 10:00 PM</span></p>
                                <p className="flex justify-between"><span>Fri - Sat:</span> <span className="font-medium text-gray-900 dark:text-gray-200">11:00 AM - 11:30 PM</span></p>
                                <p className="flex justify-between"><span>Sunday:</span> <span className="font-medium text-gray-900 dark:text-gray-200">12:00 PM - 9:00 PM</span></p>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-bold mb-6 text-gray-900 dark:text-white uppercase tracking-wider text-sm">Connect With Us</h3>
                            <div className="flex gap-4 mb-8">
                                <motion.button whileHover={{ scale: 1.1 }}><Facebook className="h-5 w-5 text-gray-400 dark:text-gray-200 hover:text-orange-600 cursor-pointer" /></motion.button>
                                <motion.button whileHover={{ scale: 1.1 }}><Instagram className="h-5 w-5 text-gray-400 dark:text-gray-200 hover:text-orange-600 cursor-pointer" /></motion.button>
                                <motion.button whileHover={{ scale: 1.1 }}><Twitter className="h-5 w-5 text-gray-400 dark:text-gray-200 hover:text-orange-600 cursor-pointer" /></motion.button>
                            </div>
                            <div className="bg-white dark:bg-gray-950 p-2 rounded-lg flex items-center border border-gray-100 dark:border-gray-800 shadow-sm shadow-black/5">
                                <input type="email" placeholder="Subscribe" className="bg-transparent border-none focus:outline-none flex-1 px-2 text-sm" />
                                <button className="bg-orange-600 text-white px-4 py-1.5 rounded-md text-sm font-medium">Join</button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-20 pt-8 border-t border-gray-100 dark:border-gray-900 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                        <p>&copy; 2026 Regal Resto. All rights reserved.</p>
                        <div className="flex gap-8 uppercase tracking-widest font-medium">
                            <a href="/terms" className="transition hover:text-orange-600">Terms</a>
                            <a href="/privacy" className="transition hover:text-orange-600">Privacy</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
