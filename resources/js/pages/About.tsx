import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import React from 'react';
import Layout from '../components/Layout';

export default function About() {
    return (
        <Layout>
            <Head title="Our Story - Regal Resto" />
            <div className="bg-orange-50 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-6 py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center gap-10"
                    >
                        <h1 className="text-6xl font-black tracking-tighter text-zinc-950 dark:text-gray-200">Our Culinary Journey</h1>
                        <p className="text-xl text-gray-500 dark:text-gray-200 max-w-3xl text-center leading-relaxed font-medium">
                            Since 1985, Regal Resto has been the benchmark for fine dining and hospitality. Our philosophy is simple: perfection in every detail, from the selection of the finest ingredients to the final touch on your plate.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
                            <img
                                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop"
                                className="rounded-3xl shadow-2xl grayscale-[0.2] hover:grayscale-0 transition duration-700"
                            />
                            <div className="flex flex-col justify-center gap-8 px-6">
                                <h3 className="text-3xl font-black text-zinc-950 dark:text-gray-200">Sustainable Sourcing</h3>
                                <p className="text-gray-500 dark:text-gray-200 leading-relaxed font-medium">We partner with local farmers and artisans to ensure every ingredient is fresh, seasonal, and ethically produced. Our commitment to sustainability is woven into the fabric of our kitchen.</p>
                                <div className="flex gap-4">
                                    <span className="bg-orange-600/10 text-orange-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">Farm to Table</span>
                                    <span className="bg-orange-600/10 text-orange-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">Organic First</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </Layout>
    );
}
