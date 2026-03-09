import { Head, usePage, Link, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ShoppingCart, Star, Plus, Utensils } from 'lucide-react';
import React, { useState } from 'react';
import Layout from '../components/Layout';
import OptimizedImage from '../components/OptimizedImage';

export default function Menu() {
    const { menuItems, categories } = usePage().props as any;
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    // Filter items based on category and search
    const filteredItems = menuItems.filter((item: any) => {
        const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
        const matchesSearch = searchTerm === '' ||
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.category.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    const handleAddToCart = (item: any) => {
        // For now, redirect to make-order page
        // In a real app, this would add to cart and show cart modal
        router.visit(`/make-order?item=${item.id}`);
    };

    return (
        <Layout>
            <Head title="Our Curated Menu - Regal Resto" />

            {/* Header section with search */}
            <div className="bg-zinc-50 border-b border-zinc-100 py-16 px-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none translate-x-1/4">
                    <Utensils className="w-full h-full text-zinc-900 rotate-12" />
                </div>

                <div className="max-w-7xl mx-auto flex flex-col items-center">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-orange-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-4"
                    >
                        Experience Fine Dining
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-6xl tracking-tighter text-center mb-10 text-zinc-950"
                    >
                        Exquisite Culinary Selection
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="w-full max-w-xl bg-white p-2 rounded-2xl flex items-center border border-zinc-200 shadow-2xl shadow-black/5"
                    >
                        <Search className="h-5 w-5 text-gray-400 ml-4 mr-3" />
                        <input
                            type="text"
                            placeholder="Search for your favorite dish..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-transparent border-none flex-1 py-3 text-sm focus:outline-none focus:ring-0"
                        />
                        <button
                            onClick={() => {/* Search is already reactive */}}
                            className="bg-zinc-900 text-white px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2"
                        >
                            Search
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* Category selection */}
            <div className="sticky top-20 z-40 bg-white/90 backdrop-blur-xl border-b border-zinc-100 py-6 px-6 overflow-x-auto">
                <div className="max-w-7xl mx-auto flex justify-center items-center gap-2">
                    {categories.map((cat: string) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition whitespace-nowrap ${activeCategory === cat ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30 ring-4 ring-orange-100' : 'text-gray-400 hover:text-zinc-900'}`}
                        >
                            {cat}
                        </button>
                    ))}
                    <div className="h-6 w-px bg-zinc-200 mx-4 hidden md:block" />
                    <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-900 p-2 hover:bg-zinc-50 rounded-lg">
                        <Filter className="h-4 w-4" /> Filter
                    </button>
                </div>
            </div>

            {/* Menu Grid */}
            <div className="max-w-7xl mx-auto px-6 py-20">
                {filteredItems.length === 0 ? (
                    <div className="text-center py-20">
                        <Utensils className="h-16 w-16 text-zinc-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-zinc-950 mb-2">
                            {searchTerm ? 'No items match your search' : 'No menu items available'}
                        </h3>
                        <p className="text-gray-500">
                            {searchTerm ? 'Try adjusting your search terms' : 'Check back later for our curated menu'}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        <AnimatePresence mode="popLayout">
                            {filteredItems.map((item: any, idx: number) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                                    className="group relative"
                                >
                                    <div className="aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-2xl shadow-black/5 ring-1 ring-black/5 mb-8 relative">
                                        <OptimizedImage
                                            src={item.image_url || 'https://images.unsplash.com/photo-1544145945-f904253d0c7b?q=80&w=800&auto=format&fit=crop'}
                                            alt={item.name}
                                            width={400}
                                            height={500}
                                            quality={85}
                                            format="auto"
                                            className="h-full w-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition duration-700"
                                        />
                                        <div className="absolute top-6 left-6 flex flex-col gap-2">
                                            <span className="bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-zinc-950 shadow-sm">{item.category}</span>
                                        </div>
                                        <div className="absolute bottom-6 right-6 flex flex-col gap-2">
                                            <motion.button
                                                whileHover={{ scale: 1.1, rotate: 90 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => handleAddToCart(item)}
                                                className="h-12 w-12 bg-orange-600 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-orange-600/40"
                                            >
                                                <Plus className="h-6 w-6" />
                                            </motion.button>
                                        </div>
                                        <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-sm border border-white/20 p-2 rounded-full flex items-center gap-1.5 px-3">
                                            <Star className="h-3 w-3 text-orange-400 fill-orange-400" />
                                            <span className="text-[10px] font-bold text-white">4.8</span>
                                        </div>
                                    </div>
                                    <div className="px-4 space-y-3">
                                        <h3 className="text-2xl font-black tracking-tight text-zinc-950 group-hover:text-orange-600 transition truncate">{item.name}</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">{item.description}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-semibold text-gray-500 tracking-tighter">${parseFloat(item.price).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            {/* Float cart button - Link to make order page */}
            <Link href="/make-order">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="fixed bottom-10 right-10 h-20 w-20 bg-zinc-950 text-white rounded-full flex items-center justify-center shadow-2xl shadow-black/40 z-50 group border border-zinc-800"
                >
                    <div className="relative">
                        <ShoppingCart className="h-8 w-8" />
                        <span className="absolute -top-3 -right-3 h-6 w-6 bg-orange-600 rounded-full flex items-center justify-center text-[10px] font-black border-4 border-black group-hover:scale-110 transition">0</span>
                    </div>
                </motion.button>
            </Link>
        </Layout>
    );
}
