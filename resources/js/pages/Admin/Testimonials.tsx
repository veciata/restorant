import { Head, usePage, Link, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Save, ArrowLeft, MessageSquare, Plus, Trash2, Edit, Eye, EyeOff, ChevronUp, ChevronDown } from 'lucide-react';
import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

interface Testimonial {
    id: number;
    author: string;
    role: string;
    content: string;
    status: boolean;
    sort_order: number;
    created_at: string;
}

interface TestimonialsPageProps {
    testimonials: Testimonial[];
    [key: string]: any;
}

export default function Testimonials() {
    const { props } = usePage<TestimonialsPageProps>();
    const { testimonials } = props;
    const [isCreating, setIsCreating] = useState(false);
    const [newTestimonial, setNewTestimonial] = useState({
        author: '',
        role: '',
        content: '',
        status: true,
        sort_order: testimonials.length + 2,
    });

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        setIsCreating(true);

        router.post('/admin/testimonials', newTestimonial, {
            onSuccess: () => {
                setIsCreating(false);
                setNewTestimonial({
                    author: '',
                    role: '',
                    content: '',
                    is_active: true,
                    sort_order: testimonials.length + 2,
                });
            },
            onError: () => {
                setIsCreating(false);
                alert('Error creating testimonial');
            }
        });
    };

    const handleToggle = (testimonial: Testimonial) => {
        router.patch(`/admin/testimonials/${testimonial.id}/toggle`, {}, {
            onSuccess: () => {
                // Success handled by redirect
            },
            onError: () => {
                alert('Error updating testimonial status');
            }
        });
    };

    const handleDelete = (testimonial: Testimonial) => {
        if (confirm(`Are you sure you want to delete testimonial from ${testimonial.author}?`)) {
            router.delete(`/admin/testimonials/${testimonial.id}`, {
                onSuccess: () => {
                    // Success handled by redirect
                },
                onError: () => {
                    alert('Error deleting testimonial');
                }
            });
        }
    };

    const moveUp = (index: number) => {
        if (index > 0) {
            const testimonial = testimonials[index];
            const prevTestimonial = testimonials[index - 1];
            
            router.patch(`/admin/testimonials/${testimonial.id}`, {
                sort_order: prevTestimonial.sort_order
            });
            
            router.patch(`/admin/testimonials/${prevTestimonial.id}`, {
                sort_order: testimonial.sort_order
            });
        }
    };

    const moveDown = (index: number) => {
        if (index < testimonials.length - 1) {
            const testimonial = testimonials[index];
            const nextTestimonial = testimonials[index + 1];
            
            router.patch(`/admin/testimonials/${testimonial.id}`, {
                sort_order: nextTestimonial.sort_order
            });
            
            router.patch(`/admin/testimonials/${nextTestimonial.id}`, {
                sort_order: testimonial.sort_order
            });
        }
    };

    return (
        <AdminLayout>
            <Head title="Testimonials Management - Admin" />

            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-6xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <Link
                                    href="/admin/dashboard"
                                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    Back to Dashboard
                                </Link>
                                <h1 className="text-3xl font-bold text-gray-900">Testimonials Management</h1>
                            </div>
                            <Link
                                href="/admin/site-settings"
                                className="text-orange-600 hover:text-orange-700 font-medium"
                            >
                                Back to Site Settings
                            </Link>
                        </div>

                        {/* Create New Testimonial */}
                        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                <Plus className="h-5 w-5 text-gray-600" />
                                Create New Testimonial
                            </h2>
                            
                            <form onSubmit={handleCreate} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Author Name
                                        </label>
                                        <input
                                            type="text"
                                            value={newTestimonial.author}
                                            onChange={(e) => setNewTestimonial({...newTestimonial, author: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                            placeholder="e.g., John Smith"
                                            required
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Role/Title
                                        </label>
                                        <input
                                            type="text"
                                            value={newTestimonial.role}
                                            onChange={(e) => setNewTestimonial({...newTestimonial, role: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                            placeholder="e.g., Food Critic"
                                            required
                                        />
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Testimonial Content
                                    </label>
                                    <textarea
                                        value={newTestimonial.content}
                                        onChange={(e) => setNewTestimonial({...newTestimonial, content: e.target.value})}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        placeholder="What did they say about your restaurant?"
                                        required
                                    />
                                </div>
                                
                                <div className="flex items-center gap-4">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={newTestimonial.status}
                                            onChange={(e) => setNewTestimonial({...newTestimonial, status: e.target.checked})}
                                            className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                                        />
                                        <span className="text-sm font-medium text-gray-700">Active</span>
                                    </label>
                                    
                                    <button
                                        type="submit"
                                        disabled={isCreating}
                                        className="bg-orange-600 text-white px-6 py-2 rounded-md font-medium hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2"
                                    >
                                        <Save className="h-4 w-4" />
                                        {isCreating ? 'Creating...' : 'Create Testimonial'}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Testimonials List */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                <MessageSquare className="h-5 w-5 text-gray-600" />
                                All Testimonials ({testimonials.length})
                            </h2>
                            
                            <div className="space-y-4">
                                {testimonials.map((testimonial, index) => (
                                    <motion.div
                                        key={testimonial.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-gray-900">{testimonial.author}</h3>
                                                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                                                    
                                                    <div className="flex items-center gap-1">
                                                        <button
                                                            onClick={() => moveUp(index)}
                                                            disabled={index === 0}
                                                            className="text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed p-1"
                                                            title="Move up"
                                                        >
                                                            <ChevronUp className="h-4 w-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => moveDown(index)}
                                                            disabled={index === testimonials.length - 1}
                                                            className="text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed p-1"
                                                            title="Move down"
                                                        >
                                                            <ChevronDown className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                                
                                                <p className="text-gray-600 italic leading-relaxed">"{testimonial.content}"</p>
                                                
                                                <div className="flex items-center gap-4 mt-3 text-sm">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                        testimonial.status 
                                                            ? 'bg-green-100 text-green-800' 
                                                            : 'bg-gray-100 text-gray-600'
                                                    }`}>
                                                        {testimonial.status ? 'Published' : 'Draft'}
                                                    </span>
                                                    <span className="text-gray-500">Order: {testimonial.sort_order}</span>
                                                    <span className="text-gray-500">
                                                        Added: {new Date(testimonial.created_at).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center gap-2 ml-4">
                                                <button
                                                    onClick={() => handleToggle(testimonial)}
                                                    className={`p-2 rounded-md transition-colors ${
                                                        testimonial.status
                                                            ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                            : 'bg-green-100 text-green-600 hover:bg-green-200'
                                                    }`}
                                                    title={testimonial.status ? 'Deactivate' : 'Activate'}
                                                >
                                                    {testimonial.status ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                </button>
                                                
                                                <Link
                                                    href={`/admin/testimonials/${testimonial.id}/edit`}
                                                    className="p-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                                
                                                <button
                                                    onClick={() => handleDelete(testimonial)}
                                                    className="p-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                                
                                {testimonials.length === 0 && (
                                    <div className="text-center py-12 text-gray-500">
                                        <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                                        <p className="text-lg font-medium">No testimonials yet</p>
                                        <p className="text-sm">Create your first testimonial using the form above.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </AdminLayout>
    );
}
