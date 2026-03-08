import { usePage, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Facebook,
    Instagram,
    Twitter,
    Utensils,
    Search,
    ShoppingBag,
    Sun,
    Moon,
    User,
    LogOut,
    ChevronDown,
    Package,
    Settings,
} from 'lucide-react';
import React, { useState, useEffect } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
    const { auth, url, workingHours } = usePage().props as any;
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') || 'light';
        }
        return 'light';
    });
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const [cartCount, setCartCount] = useState(() => {
        if (typeof window !== 'undefined') {
            const cart = localStorage.getItem('cart');
            if (cart) {
                try {
                    const cartItems = JSON.parse(cart);
                    return cartItems.reduce((total: number, item: any) => total + item.quantity, 0);
                } catch {
                    return 0;
                }
            }
        }
        return 0;
    });

    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [theme]);

    // Listen for cart changes
    useEffect(() => {
        const handleStorageChange = () => {
            const cart = localStorage.getItem('cart');
            if (cart) {
                try {
                    const cartItems = JSON.parse(cart);
                    setCartCount(cartItems.reduce((total: number, item: any) => total + item.quantity, 0));
                } catch {
                    setCartCount(0);
                }
            } else {
                setCartCount(0);
            }
        };

        // Listen for storage events (for cross-tab updates)
        window.addEventListener('storage', handleStorageChange);

        // Also listen for custom cart update events
        const handleCartUpdate = () => handleStorageChange();
        window.addEventListener('cartUpdate', handleCartUpdate);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('cartUpdate', handleCartUpdate);
        };
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    // Working hours from database
    const workingHoursData = workingHours || {
        mon_thu: { start: '11:00', end: '22:00' },
        fri_sat: { start: '11:00', end: '23:30' },
        sunday: { start: '12:00', end: '21:00' }
    };
    
    // Format time for display
    const formatTime = (timeStr: string) => {
        const [hours, minutes] = timeStr.split(':');
        const hour = parseInt(hours);
        const suffix = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
        return `${displayHour}:${minutes} ${suffix}`;
    };

    // Aktif link kontrolü için yardımcı fonksiyon
    const isActive = (path: string) => {
        if (!url || typeof url !== 'string') return false;
        
        // Exact match for root
        if (path === '/') {
            return url === '/';
        }
        
        // For other paths, check if URL starts with the path
        // This handles nested routes like /admin/orders, /orders/1, etc.
        return url.startsWith(path);
    };

    return (
        <div className="flex min-h-screen flex-col bg-white dark:bg-zinc-950">
            <nav className="fixed top-0 right-0 left-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-black/80">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-20 items-center justify-between">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-2">
                            <Utensils className="h-8 w-8 text-orange-600" />
                            <a href="/">
                                <span className="text-xl font-bold tracking-tight text-gray-900 uppercase dark:text-white">
                                    Restorant
                                </span>
                            </a>
                        </motion.div>

                        <div className="hidden items-center space-x-10 md:flex">
                            <Link
                                href="/"
                                className={`relative text-sm font-semibold transition hover:text-orange-600 ${isActive('/') ? 'text-orange-600' : 'text-gray-700 dark:text-gray-200'
                                    }`}>
                                Home
                                {isActive('/') && (
                                    <motion.span layoutId="activeNav" className="absolute right-0 bottom-0 left-0 h-0.5 bg-orange-600" />
                                )}
                            </Link>
                            <Link
                                href="/menu"
                                className={`relative text-sm font-semibold transition hover:text-orange-600 ${isActive('/menu') ? 'text-orange-600' : 'text-gray-700 dark:text-gray-200'
                                    }`}>
                                Menu
                                {isActive('/menu') && (
                                    <motion.span layoutId="activeNav" className="absolute right-0 bottom-0 left-0 h-0.5 bg-orange-600" />
                                )}
                            </Link>
                            <Link
                                href="/booking"
                                className={`relative text-sm font-semibold transition hover:text-orange-600 ${isActive('/booking') ? 'text-orange-600' : 'text-gray-700 dark:text-gray-200'
                                    }`}>
                                Seating
                                {isActive('/booking') && (
                                    <motion.span layoutId="activeNav" className="absolute right-0 bottom-0 left-0 h-0.5 bg-orange-600" />
                                )}
                            </Link>
                            <Link
                                href="/about"
                                className={`relative text-sm font-semibold transition hover:text-orange-600 ${isActive('/about') ? 'text-orange-600' : 'text-gray-700 dark:text-gray-200'
                                    }`}>
                                Our Story
                                {isActive('/about') && (
                                    <motion.span layoutId="activeNav" className="absolute right-0 bottom-0 left-0 h-0.5 bg-orange-600" />
                                )}
                            </Link>
                        </div>

                        <div className="flex items-center gap-6 text-gray-700 dark:text-gray-200">
                            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Search className="h-5 w-5 cursor-pointer hover:text-orange-600" />
                            </motion.button>
                            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="relative">
                                <ShoppingBag className="h-5 w-5 cursor-pointer hover:text-orange-600" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 flex h-3 w-3 min-w-[12px] items-center justify-center rounded-full bg-orange-600 px-1 text-[8px] text-white">
                                        {cartCount > 9 ? '9+' : cartCount}
                                    </span>
                                )}
                            </motion.button>
                            <motion.button onClick={toggleTheme} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                {theme === 'light' ? (
                                    <Moon className="h-5 w-5 cursor-pointer hover:text-orange-600" />
                                ) : (
                                    <Sun className="h-5 w-5 cursor-pointer hover:text-orange-600" />
                                )}
                            </motion.button>
                            {auth?.user ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                                        className="flex items-center gap-2 rounded-lg px-3 py-2 transition hover:bg-zinc-100 dark:hover:bg-zinc-800">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-600">
                                            <User className="h-4 w-4 text-white" />
                                        </div>
                                        <span className="text-sm font-medium text-zinc-950 dark:text-gray-200">{auth?.user?.name || 'User'}</span>
                                        <ChevronDown className="h-4 w-4 text-zinc-500" />
                                    </button>

                                    <AnimatePresence>
                                        {userDropdownOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                                className="absolute right-0 z-50 mt-2 w-56 rounded-xl border border-zinc-200 bg-white py-2 shadow-xl shadow-black/10 dark:border-zinc-700 dark:bg-zinc-900">
                                                <Link
                                                    href="/account"
                                                    className="flex items-center gap-3 px-4 py-3 text-sm text-zinc-700 transition hover:bg-zinc-50 dark:text-zinc-200 dark:hover:bg-zinc-800">
                                                    <User className="h-4 w-4" />
                                                    My Account
                                                </Link>
                                                <Link
                                                    href="/orders"
                                                    className="flex items-center gap-3 px-4 py-3 text-sm text-zinc-700 transition hover:bg-zinc-50 dark:text-zinc-200 dark:hover:bg-zinc-800">
                                                    <Package className="h-4 w-4" />
                                                    Order History
                                                </Link>
                                                {/* Dashboard for all authenticated users */}
                                                {auth?.user && (
                                                    <Link
                                                        href={
                                                            (auth.user.role as string) === 'customer' ? '/orders' : '/admin/dashboard' // all staff use admin dashboard
                                                        }
                                                        className="flex items-center gap-3 px-4 py-3 text-sm text-zinc-700 transition hover:bg-zinc-50 dark:text-zinc-200 dark:hover:bg-zinc-800">
                                                        <Settings className="h-4 w-4" />
                                                        Dashboard
                                                    </Link>
                                                )}
                                                {/* Only show role switcher in development */}
                                                {import.meta.env.DEV && (
                                                    <>
                                                        <div className="border-t border-zinc-100 px-4 py-2 dark:border-zinc-700">
                                                            <div className="mb-2 flex items-center justify-between">
                                                                <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Role</span>
                                                                <span className="rounded-full bg-zinc-100 px-2 py-1 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                                                                    {auth?.user?.role || 'unknown'}
                                                                </span>
                                                            </div>
                                                            <select
                                                                value={auth?.user?.role || ''}
                                                                onChange={(e) => {
                                                                    console.log('Switching role to:', e.target.value);
                                                                    fetch('/dev/switch-role', {
                                                                        method: 'POST',
                                                                        headers: {
                                                                            'Content-Type': 'application/json',
                                                                            'X-CSRF-TOKEN':
                                                                                document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ||
                                                                                '',
                                                                        },
                                                                        body: JSON.stringify({ role: e.target.value }),
                                                                    })
                                                                        .then((response) => {
                                                                            console.log('Response:', response);
                                                                            return response.json();
                                                                        })
                                                                        .then((data) => {
                                                                            console.log('Data:', data);
                                                                            window.location.reload();
                                                                        })
                                                                        .catch((error) => {
                                                                            console.error('Error:', error);
                                                                        });
                                                                }}
                                                                className="w-full rounded border border-zinc-200 bg-white px-2 py-1 text-xs text-zinc-900 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100">
                                                                <option value="customer">Customer</option>
                                                                <option value="chef">Chef</option>
                                                                <option value="waiter">Waiter</option>
                                                                <option value="editor">Editor</option>
                                                                <option value="ceo">CEO</option>
                                                            </select>
                                                        </div>
                                                    </>
                                                )}

                                                <div className="mt-2 border-t border-zinc-100 pt-2 dark:border-zinc-700">
                                                    <Link
                                                        href="/logout"
                                                        method="post"
                                                        as="button"
                                                        className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20">
                                                        <LogOut className="h-4 w-4" />
                                                        Logout
                                                    </Link>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <Link
                                    href="/login"
                                    className="rounded-full bg-orange-600 px-6 py-2 font-medium text-white shadow-lg shadow-orange-600/20 transition hover:bg-orange-700">
                                    Sign In
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            <AnimatePresence mode="wait">
                <motion.main
                    key={url || 'default'}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                    className="flex-grow pt-20">
                    {children}
                </motion.main>
            </AnimatePresence>
            <footer className="border-t border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-black/90">
                <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
                        <div className="col-span-1">
                            <div className="mb-6 flex items-center gap-2">
                                <Utensils className="h-6 w-6 text-orange-600" />
                                <span className="text-lg font-bold tracking-tight text-gray-900 uppercase dark:text-white">
                                    Regal Resto
                                </span>
                            </div>
                            <p className="max-w-xs leading-relaxed text-gray-600 dark:text-gray-200">
                                Indulge in an exquisite culinary journey where tradition meets innovation. Our chef's carefully crafted
                                menu promises an unforgettable experience for your palate.
                            </p>
                        </div>

                        <div>
                            <h3 className="mb-6 text-sm font-bold tracking-wider text-gray-900 uppercase dark:text-white">
                                Quick Links
                            </h3>
                            <div className="flex flex-col gap-4 text-gray-600 dark:text-gray-200">
                                <Link href="/menu" className={`transition ${isActive('/menu') ? 'text-orange-600 font-medium' : 'hover:text-orange-600'}`}>
                                    Browse Menu
                                </Link>
                                <Link href="/booking" className={`transition ${isActive('/booking') ? 'text-orange-600 font-medium' : 'hover:text-orange-600'}`}>
                                    Reserve Table
                                </Link>
                                <Link href="/about" className={`transition ${isActive('/about') ? 'text-orange-600 font-medium' : 'hover:text-orange-600'}`}>
                                    About Us
                                </Link>
                                <Link href="/contact" className={`transition ${isActive('/contact') ? 'text-orange-600 font-medium' : 'hover:text-orange-600'}`}>
                                    Get in Touch
                                </Link>
                            </div>
                        </div>

                        <div>
                            <h3 className="mb-6 text-sm font-bold tracking-wider text-gray-900 uppercase dark:text-white">
                                Working Hours
                            </h3>
                            <div className="flex flex-col gap-4 text-gray-600 dark:text-gray-200">
                                <p className="flex justify-between">
                                    <span>Mon - Thu:</span>{' '}
                                    <span className="font-medium text-gray-900 dark:text-gray-200">{formatTime(workingHoursData.mon_thu.start)} - {formatTime(workingHoursData.mon_thu.end)}</span>
                                </p>
                                <p className="flex justify-between">
                                    <span>Fri - Sat:</span>{' '}
                                    <span className="font-medium text-gray-900 dark:text-gray-200">{formatTime(workingHoursData.fri_sat.start)} - {formatTime(workingHoursData.fri_sat.end)}</span>
                                </p>
                                <p className="flex justify-between">
                                    <span>Sunday:</span>{' '}
                                    <span className="font-medium text-gray-900 dark:text-gray-200">{formatTime(workingHoursData.sunday.start)} - {formatTime(workingHoursData.sunday.end)}</span>
                                </p>
                            </div>
                        </div>

                        <div>
                            <h3 className="mb-6 text-sm font-bold tracking-wider text-gray-900 uppercase dark:text-white">
                                Connect With Us
                            </h3>
                            <div className="mb-8 flex gap-4">
                                <motion.button whileHover={{ scale: 1.1 }}>
                                    <Facebook className="h-5 w-5 cursor-pointer text-gray-400 hover:text-orange-600 dark:text-gray-200" />
                                </motion.button>
                                <motion.button whileHover={{ scale: 1.1 }}>
                                    <Instagram className="h-5 w-5 cursor-pointer text-gray-400 hover:text-orange-600 dark:text-gray-200" />
                                </motion.button>
                                <motion.button whileHover={{ scale: 1.1 }}>
                                    <Twitter className="h-5 w-5 cursor-pointer text-gray-400 hover:text-orange-600 dark:text-gray-200" />
                                </motion.button>
                            </div>
                            <div className="flex items-center rounded-lg border border-gray-100 bg-white p-2 shadow-sm shadow-black/5 dark:border-gray-800 dark:bg-gray-950">
                                <input
                                    type="email"
                                    placeholder="Subscribe"
                                    className="flex-1 border-none bg-transparent px-2 text-sm focus:outline-none"
                                />
                                <button className="rounded-md bg-orange-600 px-4 py-1.5 text-sm font-medium text-white">Join</button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-20 flex items-center justify-between border-t border-gray-100 pt-8 text-xs text-gray-500 dark:border-gray-900 dark:text-gray-400">
                        <p>&copy; 2026 Regal Resto. All rights reserved.</p>
                        <div className="flex gap-8 font-medium tracking-widest uppercase">
                            <Link href="/terms" className={`transition ${isActive('/terms') ? 'text-orange-600' : 'hover:text-orange-600'}`}>
                                Terms
                            </Link>
                            <Link href="/privacy" className={`transition ${isActive('/privacy') ? 'text-orange-600' : 'hover:text-orange-600'}`}>
                                Privacy
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
