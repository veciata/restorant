import React from 'react';
import { Head, usePage, Link } from '@inertiajs/react';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { Quote, Star, ArrowLeft } from 'lucide-react';

interface Testimonial {
    id: number;
    name: string;
    role: string;
    content: string;
    status: boolean;
    sort_order: number;
    created_at: string;
}

interface TestimonialsPageProps {
    testimonials: Testimonial[];
    total_count: number;
    [key: string]: any;
}

export default function Testimonials() {
    const { props } = usePage<TestimonialsPageProps>();
    const { testimonials, total_count } = props;

    return (
        <Layout>
            <Head title="Testimonials - Guest Reviews" />

            {/* Hero Section */}
            <div className="bg-orange-50 py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-center"
                    >
                        <div className="flex justify-center mb-8">
                            <Quote className="h-16 w-16 text-orange-200" />
                        </div>
                        <h1 className="text-5xl font-black tracking-tight text-zinc-950 mb-4">
                            What Our <span className="text-orange-600">Guests</span> Say
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Read through {total_count}+ verified reviews from our international food critics and regular guests.
                        </p>
                        <div className="flex justify-center gap-4 mt-8">
                            <Link
                                href="/"
                                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back to Homepage
                            </Link>
                            {(props.auth?.user?.role === 'ceo' || props.auth?.user?.role === 'editor') && (
                                <Link
                                    href="/admin/testimonials"
                                    className="bg-orange-600 text-white px-6 py-3 rounded-full font-medium hover:bg-orange-700 transition"
                                >
                                    Manage Testimonials
                                </Link>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Testimonials Grid */}
            <div className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={testimonial.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                className="flex flex-col gap-6 rounded-[2.5rem] border border-zinc-100 bg-white p-10 shadow-xl shadow-black/5 hover:shadow-2xl hover:shadow-black/10 transition-shadow"
                            >
                                <div className="flex gap-1 mb-4">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <Star key={i} className="h-4 w-4 fill-orange-500 text-orange-500" />
                                    ))}
                                </div>
                                <p className="leading-relaxed font-medium text-gray-600 italic text-lg mb-6">"{testimonial.content}"</p>
                                <div className="mt-auto flex items-center gap-4 border-t border-zinc-50 pt-6">
                                    <div className="h-12 w-12 rounded-full bg-zinc-100" />
                                    <div>
                                        <h4 className="text-sm font-black tracking-tight text-zinc-900 uppercase">{testimonial.name}</h4>
                                        <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">{testimonial.role}</span>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                testimonial.status 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-gray-100 text-gray-600'
                                            }`}>
                                                {testimonial.status ? 'Published' : 'Draft'}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {new Date(testimonial.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {testimonials.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <Quote className="h-16 w-16 mx-auto mb-6 text-gray-300" />
                            <h3 className="text-2xl font-semibold text-gray-900 mb-4">No Testimonials Yet</h3>
                            <p className="text-gray-600 max-w-md mx-auto">
                                Be the first to share your dining experience with us. Check back soon for guest reviews!
                            </p>
                        </motion.div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
