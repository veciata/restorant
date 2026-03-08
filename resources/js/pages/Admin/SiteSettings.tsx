import { Head, usePage, Link, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Save, ArrowLeft, Image, Type, Star, MessageSquare, Plus, Trash2, Edit } from 'lucide-react';
import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

interface SiteSettingsPageProps {
    settings: {
        site_name: string;
        site_description: string;
        hero_title: string;
        hero_subtitle: string;
        hero_description: string;
        hero_image: string;
        michelin_stars: number;
        happy_guests: string;
        artisan_dishes: string;
        testimonial_text: string;
        testimonial_author: string;
        testimonial_role: string;
        banner_texts: string[];
    };
    testimonials: Array<{
        id: number;
        name: string;
        role: string;
        text: string;
        status: boolean;
        sort_order: number;
    }>;
    [key: string]: any;
}

export default function SiteSettings() {
    const { props } = usePage<SiteSettingsPageProps>();
    const { settings, testimonials } = props;
    const [formData, setFormData] = useState(settings);
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        router.patch('/admin/site-settings', formData, {
            onSuccess: () => {
                setIsSaving(false);
                // Show success message
                alert('Site settings updated successfully!');
            },
            onError: (errors) => {
                setIsSaving(false);
                console.error('Error updating settings:', errors);
                alert('Error updating site settings. Please try again.');
            }
        });
    };

    const handleChange = (field: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const addBannerText = () => {
        setFormData(prev => ({
            ...prev,
            banner_texts: [...(prev.banner_texts || []), '']
        }));
    };

    const removeBannerText = (index: number) => {
        setFormData(prev => ({
            ...prev,
            banner_texts: prev.banner_texts?.filter((_, i) => i !== index) || []
        }));
    };

    const updateBannerText = (index: number, text: string) => {
        setFormData(prev => {
            const updatedTexts = [...(prev.banner_texts || [])];
            updatedTexts[index] = text;
            return {
                ...prev,
                banner_texts: updatedTexts
            };
        });
    };

    return (
        <AdminLayout>
            <Head title="Site Settings - Admin" />

            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-4xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <Link
                                href="/admin/dashboard"
                                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back to Dashboard
                            </Link>
                            <h1 className="text-3xl font-bold text-gray-900">Site Settings</h1>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Basic Site Info */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                    <Type className="h-5 w-5 text-gray-600" />
                                    Basic Information
                                </h2>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Site Name
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.site_name}
                                            onChange={(e) => handleChange('site_name', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Site Description
                                        </label>
                                        <textarea
                                            value={formData.site_description}
                                            onChange={(e) => handleChange('site_description', e.target.value)}
                                            rows={3}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Homepage Content */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                    <Image className="h-5 w-5 text-gray-600" />
                                    Homepage Content
                                </h2>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Hero Title
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.hero_title}
                                            onChange={(e) => handleChange('hero_title', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Hero Subtitle
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.hero_subtitle}
                                            onChange={(e) => handleChange('hero_subtitle', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                    </div>
                                    
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Hero Description
                                        </label>
                                        <textarea
                                            value={formData.hero_description}
                                            onChange={(e) => handleChange('hero_description', e.target.value)}
                                            rows={3}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Hero Image URL
                                        </label>
                                        <input
                                            type="url"
                                            value={formData.hero_image}
                                            onChange={(e) => handleChange('hero_image', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                    <Star className="h-5 w-5 text-gray-600" />
                                    Statistics
                                </h2>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Michelin Stars
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            max="5"
                                            value={formData.michelin_stars}
                                            onChange={(e) => handleChange('michelin_stars', parseInt(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Happy Guests
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.happy_guests}
                                            onChange={(e) => handleChange('happy_guests', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Artisan Dishes
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.artisan_dishes}
                                            onChange={(e) => handleChange('artisan_dishes', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Banner Texts */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                    <MessageSquare className="h-5 w-5 text-gray-600" />
                                    Banner Texts (Scrolling)
                                </h2>
                                
                                <div className="space-y-3">
                                    {formData.banner_texts?.map((text, index) => (
                                        <div key={index} className="flex gap-2 items-center">
                                            <input
                                                type="text"
                                                value={text}
                                                onChange={(e) => updateBannerText(index, e.target.value)}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                placeholder={`Banner text ${index + 1}`}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeBannerText(index)}
                                                className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={addBannerText}
                                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                                    >
                                        Add Banner Text
                                    </button>
                                </div>
                            </div>

                            {/* Testimonial */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                    <MessageSquare className="h-5 w-5 text-gray-600" />
                                    Featured Testimonial
                                </h2>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Author
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.testimonial_author}
                                            onChange={(e) => handleChange('testimonial_author', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Role
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.testimonial_role}
                                            onChange={(e) => handleChange('testimonial_role', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                    </div>
                                    
                                    <div className="md:col-span-3">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Testimonial Text
                                        </label>
                                        <textarea
                                            value={formData.testimonial_text}
                                            onChange={(e) => handleChange('testimonial_text', e.target.value)}
                                            rows={3}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Testimonials Management */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                    <MessageSquare className="h-5 w-5 text-gray-600" />
                                    Testimonials Management
                                </h2>
                                
                                <div className="space-y-4">
                                    {testimonials?.map((testimonial) => (
                                        <div key={testimonial.id} className="border border-gray-200 rounded-lg p-4">
                                            <div className="flex justify-between items-start mb-3">
                                                <div>
                                                    <h4 className="font-semibold">{testimonial.name}</h4>
                                                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button className="text-blue-600 hover:text-blue-800">
                                                        <Edit className="h-4 w-4" />
                                                    </button>
                                                    <button className="text-red-600 hover:text-red-800">
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>
                                            <p className="text-gray-600 italic">"{testimonial.content}"</p>
                                            <div className="mt-2 flex items-center gap-4 text-sm">
                                                <span className={`px-2 py-1 rounded ${testimonial.status ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                                                    {testimonial.status ? 'Active' : 'Inactive'}
                                                </span>
                                                <span className="text-gray-500">Order: {testimonial.sort_order}</span>
                                            </div>
                                        </div>
                                    ))}
                                    
                                    <button className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition">
                                        <Plus className="h-4 w-4" />
                                        Add New Testimonial
                                    </button>
                                </div>
                            </div>

                            {/* Save Button */}
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="bg-orange-600 text-white px-6 py-3 rounded-md font-medium hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2"
                                >
                                    <Save className="h-4 w-4" />
                                    {isSaving ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </AdminLayout>
    );
}
