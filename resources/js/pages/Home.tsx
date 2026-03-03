import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Quote, ChevronRight, Play } from 'lucide-react';

export default function Home() {
    return (
        <Layout>
            <Head title="Regal Resto - Fine Dining Reinvented" />

            {/* Split Hero Section */}
            <div className="relative min-h-[92vh] flex items-center overflow-hidden bg-orange-50 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-10 z-10"
                    >
                        <div className="space-y-4">
                            <span className="text-orange-600 font-bold uppercase tracking-[0.4em] text-[10px] pl-1">A Masterpiece in Every Bite</span>
                            <h1 className="text-8xl font-black tracking-tighter leading-[0.9] text-zinc-950">
                                Crafted <br />
                                <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-rose-600 bg-clip-text text-transparent">Culinary</span> <br />
                                Perfection.
                            </h1>
                        </div>

                        <p className="text-xl text-gray-500 max-w-lg leading-relaxed font-medium">
                            Experience the symphony of flavors in our award-winning restaurant. From locally-sourced ingredients to avant-garde presentation.
                        </p>

                        <div className="flex items-center gap-6">
                            <Link
                                href="/menu"
                                className="bg-zinc-950 text-white px-10 py-5 rounded-full font-bold text-lg flex items-center gap-3 shadow-2xl shadow-black/30 hover:scale-105 transition active:scale-95"
                            >
                                Explorer Menu
                                <ChevronRight className="h-5 w-5" />
                            </Link>
                            <button className="flex items-center gap-4 group p-1 pr-6 hover:bg-zinc-100 rounded-full transition">
                                <span className="h-14 w-14 bg-white border border-zinc-200 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                                    <Play className="h-4 w-4 fill-orange-600 text-orange-600 ml-1" />
                                </span>
                                <span className="font-bold text-sm tracking-widest uppercase text-zinc-950">The Story</span>
                            </button>
                        </div>

                        <div className="pt-12 grid grid-cols-3 gap-12 border-t border-zinc-100">
                            <Stat label="Michelin Stars" value="3" />
                            <Stat label="Happy Guests" value="50K+" />
                            <Stat label="Artisan Dishes" value="120+" />
                        </div>
                    </motion.div>

                    <div className="relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="aspect-square rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] ring-[20px] ring-white"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1559333086-b0a262b5a48c?q=80&w=1200&auto=format&fit=crop"
                                className="h-full w-full object-cover grayscale-[0.1]"
                                alt="Signature Dish"
                            />
                        </motion.div>
                        {/* Floating elements */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-10 -right-10 bg-white p-6 rounded-3xl shadow-2xl shadow-black/10 flex items-center gap-4 border border-zinc-100 z-20"
                        >
                            <div className="bg-emerald-500/10 p-3 rounded-2xl">
                                <Star className="h-6 w-6 text-emerald-500 fill-emerald-500" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase text-gray-400">Guest Review</p>
                                <p className="font-bold text-sm italic pr-6 group-hover:text-orange-600 transition">"Unforgettable Night!"</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Scrolling Banner */}
            <div className="bg-white py-10 overflow-hidden border-y border-zinc-800">
                <div className="flex animate-marquee whitespace-nowrap gap-20 items-center">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="flex gap-20 items-center">
                            <span className="text-5xl font-black text-zinc-900/5 uppercase tracking-tighter">Locally Sourced</span>
                            <div className="h-2 w-2 rounded-full bg-orange-600" />
                            <span className="text-5xl font-black text-zinc-900/5 uppercase tracking-tighter">Award Winning Chef</span>
                            <div className="h-2 w-2 rounded-full bg-orange-600" />
                            <span className="text-5xl font-black text-zinc-900/5 uppercase tracking-tighter">3D Table Booking</span>
                            <div className="h-2 w-2 rounded-full bg-orange-600" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Testimonial Section */}
            <div className="bg-orange-50">
                <div className="py-32 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12">
                    <div className="lg:col-span-5 flex flex-col justify-center gap-8">
                        <Quote className="h-16 w-16 text-orange-200 -ml-2" />
                        <h2 className="text-4xl font-black tracking-tight leading-snug text-zinc-950">What our guests say about our <span className="text-orange-600">signature experiences.</span></h2>
                        <p className="text-gray-500 text-lg">Read through hundreds of verified reviews from our international food critics and regular guests.</p>
                        <button className="underline underline-offset-8 font-bold text-sm uppercase tracking-widest text-gray-900 hover:text-orange-600 transition">View All 1,240 Reviews</button>
                    </div>

                    <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <TestimonialCard
                        name="Sophia Chen"
                        role="Food Blogger"
                        text="The 3D table selection made our anniversary booking so much more exciting. We picked exactly where we wanted to sit!"
                    />
                    <TestimonialCard
                        name="Julian Rossi"
                        role="Regular Guest"
                        text="The seasonal menu always surprises me. The Salmon Fillet is a masterpiece of precision and flavor balance."
                        delay={0.2}
                    />
                </div>
            </div>
            </div>
        </Layout>
    );
}

function Stat({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex flex-col gap-1">
            <span className="text-3xl font-black tracking-tighter text-zinc-950">{value}</span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</span>
        </div>
    );
}

function TestimonialCard({ name, role, text, delay = 0 }: { name: string; role: string; text: string; delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.6 }}
            className="bg-white p-10 rounded-[2.5rem] border border-zinc-100 shadow-xl shadow-black/5 flex flex-col gap-6"
        >
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-3 w-3 text-orange-500 fill-orange-500" />)}
            </div>
            <p className="text-gray-600 font-medium leading-relaxed italic">"{text}"</p>
            <div className="flex items-center gap-4 border-t border-zinc-50 pt-6 mt-2">
                <div className="h-10 w-10 bg-zinc-100 rounded-full" />
                <div>
                    <h4 className="font-black text-sm text-zinc-900 uppercase tracking-tight">{name}</h4>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{role}</span>
                </div>
            </div>
        </motion.div>
    );
}
