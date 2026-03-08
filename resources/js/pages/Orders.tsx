import { Head, usePage, router } from '@inertiajs/react';
import { Star, MessageSquare } from 'lucide-react';
import React, { useState } from 'react';
import Layout from '../components/Layout';

// Define the order data structure to match backend
interface OrderItem {
    name: string;
    quantity: number;
    price: string | number;
}

interface Order {
    id: string;
    numeric_id: number;
    date: string;
    time: string;
    status: string;
    total: string | number;
    has_testimonial: boolean;
    testimonial?: {
        id: number;
        author: string;
        role: string;
        content: string;
        rating: number;
        status: boolean;
        created_at: string;
    };
    items: OrderItem[];
    delivery: {
        address: string;
        estimated: string;
        delivered: string | null;
    };
}

export default function Orders() {
    // Get orders data and auth user
    const { orders, auth } = usePage<{ orders: Order[], auth: any }>().props;
    const [showTestimonialForm, setShowTestimonialForm] = useState<string | null>(null);
    const [testimonialData, setTestimonialData] = useState({
        author: '',
        role: '',
        content: '',
        rating: 5,
    });

    console.log('Orders page data:', { orders, ordersLength: orders?.length });

    // Ensure orders is always an array
    const safeOrders = Array.isArray(orders) ? orders : [];

    // Helper functions
    const formatPrice = (price: string | number) => {
        const numPrice = typeof price === 'string' ? parseFloat(price) : price;
        return isNaN(numPrice) ? '0.00' : numPrice.toFixed(2);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'delivered':
                return 'text-green-600 bg-green-50';
            case 'cancelled':
                return 'text-red-600 bg-red-50';
            case 'ready':
                return 'text-blue-600 bg-blue-50';
            case 'preparing':
                return 'text-orange-600 bg-orange-50';
            default:
                return 'text-gray-600 bg-gray-50';
        }
    };

    const handleTestimonialSubmit = (orderId: string, numericId: number) => {
        // Pre-fill with user's info if empty
        const submissionData = {
            author: testimonialData.author || auth?.user?.name || '',
            role: testimonialData.role || auth?.user?.role || '',
            content: testimonialData.content,
            rating: testimonialData.rating,
        };

        router.post(`/orders/${numericId}/testimonial`, submissionData, {
            onSuccess: () => {
                setShowTestimonialForm(null);
                setTestimonialData({
                    author: '',
                    role: '',
                    content: '',
                    rating: 5,
                });
                alert('Thank you for your feedback! Your testimonial has been submitted for review.');
            },
            onError: () => {
                alert('Error submitting testimonial. Please try again.');
            }
        });
    };

    return (
        <Layout>
            <Head title="Order History - Regal Resto" />

            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="mb-8">
                        <h1 className="text-3xl font-black tracking-tight text-zinc-950">Order History</h1>
                        <p className="text-gray-600">View and track your past orders</p>
                    </div>

                    {/* Orders List */}
                    <div className="space-y-6">
                        {safeOrders.map((order: Order) => (
                            <div
                                key={order.id}
                                className="bg-white rounded-lg border border-zinc-100 shadow overflow-hidden"
                            >
                                {/* Order Header */}
                                <div className="p-6 border-b border-zinc-100">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-lg font-bold text-zinc-950">{order.id}</h3>
                                            <p className="text-sm text-gray-500">{order.date} at {order.time}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                            <p className="text-xl font-bold text-zinc-950 mt-2">${formatPrice(order.total)}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Details */}
                                <div className="p-6">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        {/* Items */}
                                        <div>
                                            <h4 className="font-medium text-zinc-950 mb-3">Order Items</h4>
                                            <div className="space-y-2">
                                                {order.items && order.items.length > 0 ? (
                                                    order.items.map((item: OrderItem, itemIndex: number) => (
                                                        <div key={itemIndex} className="flex justify-between items-center py-2 border-b border-zinc-50">
                                                            <div>
                                                                <p className="font-medium text-zinc-950">{item.name || 'Unknown Item'}</p>
                                                                <p className="text-sm text-gray-500">Qty: {item.quantity || 0}</p>
                                                            </div>
                                                            <p className="font-medium text-zinc-950">${formatPrice(item.price)}</p>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p className="text-gray-500">No items found</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Delivery Info */}
                                        <div>
                                            <h4 className="font-medium text-zinc-950 mb-3">Delivery Information</h4>
                                            <div className="space-y-3">
                                                <p className="text-sm text-zinc-950">
                                                    <strong>Address:</strong> {order.delivery?.address || 'Unknown'}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    <strong>Estimated:</strong> {order.delivery?.estimated || 'Unknown'}
                                                </p>
                                                {order.delivery?.delivered && (
                                                    <p className="text-sm text-green-600">
                                                        <strong>Delivered:</strong> {order.delivery.delivered}
                                                    </p>
                                                )}

                                                {/* Testimonial Creation Form */}
                                                {showTestimonialForm === order.id && (
                                                    <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                                                        <h4 className="font-semibold text-zinc-950 mb-3 flex items-center gap-2">
                                                            <MessageSquare className="h-4 w-4 text-orange-600" />
                                                            Share Your Experience
                                                        </h4>
                                                        <form onSubmit={(e) => { e.preventDefault(); handleTestimonialSubmit(order.id, order.numeric_id); }} className="space-y-3">
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                    Your Feedback
                                                                </label>
                                                                <textarea
                                                                    value={testimonialData.content}
                                                                    onChange={(e) => setTestimonialData({...testimonialData, content: e.target.value})}
                                                                    rows={3}
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                                    placeholder="Tell us about your dining experience..."
                                                                    required
                                                                />
                                                            </div>
                                                            
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                    Rating
                                                                </label>
                                                                <div className="flex gap-2">
                                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                                        <button
                                                                            key={star}
                                                                            type="button"
                                                                            onClick={() => setTestimonialData({...testimonialData, rating: star})}
                                                                            className={`p-1 rounded ${testimonialData.rating >= star ? 'text-orange-500' : 'text-gray-300'} hover:text-orange-600 transition`}
                                                                        >
                                                                            <Star className="h-4 w-4 fill-current" />
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="flex gap-2">
                                                                <button
                                                                    type="submit"
                                                                    className="bg-orange-600 text-white px-4 py-2 rounded-md font-medium hover:bg-orange-700 transition"
                                                                >
                                                                    Submit Testimonial
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setShowTestimonialForm(null)}
                                                                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md font-medium hover:bg-gray-400 transition"
                                                                >
                                                                    Cancel
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                )}

                                                {!showTestimonialForm && order.status === 'delivered' && !order.has_testimonial && (
                                                    <button
                                                        onClick={() => setShowTestimonialForm(order.id)}
                                                        className="mt-4 bg-orange-100 text-orange-700 px-4 py-2 rounded-md font-medium hover:bg-orange-200 transition flex items-center gap-2"
                                                    >
                                                        <MessageSquare className="h-4 w-4" />
                                                        Share Your Experience
                                                    </button>
                                                )}

                                                {/* Display existing testimonial */}
                                                {order.has_testimonial && order.testimonial && (
                                                    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                                                        <h4 className="font-semibold text-zinc-950 mb-3 flex items-center gap-2">
                                                            <MessageSquare className="h-4 w-4 text-green-600" />
                                                            Your Testimonial
                                                        </h4>
                                                        <div className="space-y-2">
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-medium text-zinc-950">{order.testimonial!.author}</span>
                                                                <span className="text-sm text-gray-500">({order.testimonial!.role})</span>
                                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                                    order.testimonial!.status
                                                                        ? 'bg-green-100 text-green-800'
                                                                        : 'bg-yellow-100 text-yellow-800'
                                                                }`}>
                                                                    {order.testimonial!.status ? 'Published' : 'Pending Review'}
                                                                </span>
                                                            </div>
                                                            <div className="flex gap-1">
                                                                {[1, 2, 3, 4, 5].map((star) => (
                                                                    <Star
                                                                        key={star}
                                                                        className={`h-4 w-4 ${
                                                                            star <= (order.testimonial?.rating || 0)
                                                                                ? 'text-yellow-500 fill-current'
                                                                                : 'text-gray-300'
                                                                        }`}
                                                                    />
                                                                ))}
                                                            </div>
                                                            <p className="text-gray-700 text-sm">{order.testimonial!.content}</p>
                                                            <p className="text-xs text-gray-500">
                                                                Submitted on {new Date(order.testimonial!.created_at).toLocaleDateString()}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {safeOrders.length === 0 && (
                        <div className="text-center py-16">
                            <h3 className="text-xl font-bold text-zinc-950 mb-2">No orders yet</h3>
                            <p className="text-gray-500 mb-6">Start ordering to see your order history here</p>
                            <a
                                href="/menu"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-xl font-medium hover:bg-orange-700 transition"
                            >
                                Browse Menu
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
