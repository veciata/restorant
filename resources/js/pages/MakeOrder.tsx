import React, { useState } from 'react';
import { Head, usePage, useForm } from '@inertiajs/react';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { Plus, Minus, ShoppingCart, Utensils, MapPin, CheckCircle, X } from 'lucide-react';

export default function MakeOrder() {
    const { menuItems, tables } = usePage().props as any;
    const [cart, setCart] = useState<any[]>([]);
    const [selectedTable, setSelectedTable] = useState('');

    const { data, setData, post, processing, errors } = useForm<{
        items: { menu_item_id: number; quantity: number; notes: string }[];
        table_id: string;
        notes: string;
    }>({
        items: [],
        table_id: '',
        notes: '',
    });

    const addToCart = (menuItem: any) => {
        const existingItem = cart.find(item => item.menu_item_id === menuItem.id);

        if (existingItem) {
            updateQuantity(menuItem.id, existingItem.quantity + 1);
        } else {
            setCart([...cart, {
                menu_item_id: menuItem.id,
                name: menuItem.name,
                price: menuItem.price,
                quantity: 1,
                notes: '',
            }]);
        }
    };

    const updateQuantity = (menuItemId: number, newQuantity: number) => {
        if (newQuantity <= 0) {
            removeFromCart(menuItemId);
            return;
        }

        setCart(cart.map(item =>
            item.menu_item_id === menuItemId
                ? { ...item, quantity: Math.min(newQuantity, 99) }
                : item
        ));
    };

    const removeFromCart = (menuItemId: number) => {
        setCart(cart.filter(item => item.menu_item_id !== menuItemId));
    };

    const updateNotes = (menuItemId: number, notes: string) => {
        setCart(cart.map(item =>
            item.menu_item_id === menuItemId
                ? { ...item, notes }
                : item
        ));
    };

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getTotalItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (cart.length === 0) {
            alert('Please add at least one item to your order.');
            return;
        }

        setData({
            items: cart.map(item => ({
                menu_item_id: item.menu_item_id,
                quantity: item.quantity,
                notes: item.notes,
            })),
            table_id: selectedTable || '',
            notes: data.notes,
        });

        post('/make-order');
    };

    return (
        <Layout>
            <Head title="Make Order - Regal Resto" />

            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <Utensils className="h-8 w-8 text-orange-600" />
                            <h1 className="text-3xl font-black tracking-tight text-zinc-950">Make Your Order</h1>
                        </div>
                        <p className="text-gray-600">
                            Select your favorite dishes and place your order
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Menu Items */}
                        <div className="lg:col-span-2">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white rounded-3xl border border-zinc-100 shadow-xl shadow-black/5 p-6"
                            >
                                <h2 className="text-xl font-bold text-zinc-950 mb-6">Menu</h2>

                                <div className="space-y-8">
                                    {Object.entries(menuItems as Record<string, any[]>).map(([categoryName, items], categoryIndex) => (
                                        <div key={categoryName}>
                                            <h3 className="text-lg font-semibold text-zinc-950 mb-4 border-b border-zinc-100 pb-2">
                                                {categoryName}
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {items.map((item, itemIndex) => (
                                                    <motion.div
                                                        key={item.id}
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: (categoryIndex * 0.1) + (itemIndex * 0.05) }}
                                                        className="bg-zinc-50 rounded-xl p-4 hover:bg-zinc-100 transition"
                                                    >
                                                        <div className="flex justify-between items-start mb-2">
                                                            <div>
                                                                <h4 className="font-medium text-zinc-950">{item.name}</h4>
                                                                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                                                            </div>
                                                            <span className="font-bold text-orange-600">${item.price}</span>
                                                        </div>
                                                        <button
                                                            onClick={() => addToCart(item)}
                                                            className="w-full mt-3 bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition flex items-center justify-center gap-2"
                                                        >
                                                            <Plus className="h-4 w-4" />
                                                            Add to Order
                                                        </button>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white rounded-3xl border border-zinc-100 shadow-xl shadow-black/5 p-6 sticky top-8"
                            >
                                <div className="flex items-center gap-2 mb-6">
                                    <ShoppingCart className="h-5 w-5 text-orange-600" />
                                    <h2 className="text-xl font-bold text-zinc-950">Your Order</h2>
                                    <span className="ml-auto bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                                        {getTotalItems()} items
                                    </span>
                                </div>

                                {/* Cart Items */}
                                <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                                    {cart.length === 0 ? (
                                        <p className="text-gray-500 text-center py-8">Your cart is empty</p>
                                    ) : (
                                        cart.map((item, index) => (
                                            <motion.div
                                                key={item.menu_item_id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 20 }}
                                                className="flex items-center gap-3 p-3 bg-zinc-50 rounded-lg"
                                            >
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-zinc-950">{item.name}</h4>
                                                    <p className="text-sm text-gray-600">${item.price} each</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => updateQuantity(item.menu_item_id, item.quantity - 1)}
                                                        className="p-1 rounded bg-zinc-200 hover:bg-zinc-300 transition"
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </button>
                                                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.menu_item_id, item.quantity + 1)}
                                                        className="p-1 rounded bg-zinc-200 hover:bg-zinc-300 transition"
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </button>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-medium text-zinc-950">${(item.price * item.quantity).toFixed(2)}</p>
                                                    <button
                                                        onClick={() => removeFromCart(item.menu_item_id)}
                                                        className="text-red-600 hover:text-red-800 text-sm mt-1"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ))
                                    )}
                                </div>

                                {/* Order Total */}
                                {cart.length > 0 && (
                                    <>
                                        <div className="border-t border-zinc-100 pt-4 mb-6">
                                            <div className="flex justify-between items-center text-lg font-bold">
                                                <span>Total:</span>
                                                <span className="text-orange-600">${getTotalPrice().toFixed(2)}</span>
                                            </div>
                                        </div>

                                        {/* Table Selection */}
                                        <div className="mb-6">
                                            <label className="block text-sm font-medium text-zinc-950 mb-2">
                                                <MapPin className="h-4 w-4 inline mr-1" />
                                                Dining Option
                                            </label>
                                            <select
                                                value={selectedTable}
                                                onChange={(e) => setSelectedTable(e.target.value)}
                                                className="w-full px-3 py-2 border border-zinc-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                                            >
                                                <option value="">Takeout / Delivery</option>
                                                {tables.map((table: any) => (
                                                    <option key={table.id} value={table.id}>
                                                        Table {table.table_number} ({table.capacity} seats)
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Order Notes */}
                                        <div className="mb-6">
                                            <label htmlFor="notes" className="block text-sm font-medium text-zinc-950 mb-2">
                                                Special Instructions
                                            </label>
                                            <textarea
                                                id="notes"
                                                value={data.notes}
                                                onChange={(e) => setData('notes', e.target.value)}
                                                rows={3}
                                                className="w-full px-3 py-2 border border-zinc-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                                                placeholder="Any special requests..."
                                            />
                                        </div>

                                        {/* Submit Button */}
                                        <button
                                            onClick={handleSubmit}
                                            disabled={processing || cart.length === 0}
                                            className="w-full bg-orange-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
                                        >
                                            {processing ? (
                                                <>Processing...</>
                                            ) : (
                                                <>
                                                    <CheckCircle className="h-5 w-5" />
                                                    Place Order
                                                </>
                                            )}
                                        </button>
                                    </>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
