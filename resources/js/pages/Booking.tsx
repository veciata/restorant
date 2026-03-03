import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import Layout from '../components/Layout';
import TableScene from '../components/booking/TableScene';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, Clock, ArrowRight, CheckCircle2, MapPin } from 'lucide-react';

export default function Booking() {
    // Mock data for tables
    const tables = [
        { id: 1, number: '1', position: [0, 0, 0], status: 'available', capacity: 2 },
        { id: 2, number: '2', position: [4, 0, 0], status: 'available', capacity: 4 },
        { id: 3, number: '3', position: [-4, 0, 0], status: 'reserved', capacity: 2 },
        { id: 4, number: '4', position: [0, 0, 4], status: 'available', capacity: 6 },
        { id: 5, number: '5', position: [4, 0, 4], status: 'occupied', capacity: 4 },
        { id: 6, number: '6', position: [-4, 0, 4], status: 'available', capacity: 2 },
        { id: 7, number: 'VIP 1', position: [0, 0, -5], status: 'available', capacity: 10 },
    ];

    const [selectedTableId, setSelectedTableId] = useState<number | null>(null);
    const [step, setStep] = useState(1);
    const selectedTable = tables.find(t => t.id === selectedTableId);

    return (
        <Layout>
            <Head title="Reserve Your Table" />
            <div className="max-w-[1400px] mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 h-[80vh]">
                    {/* Left Sidebar - Selection Box */}
                    <div className="lg:col-span-4 flex flex-col gap-8 pr-12">
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                            <h2 className="text-4xl font-extrabold tracking-tight mb-3">Find Your Perfect Table</h2>
                            <p className="text-gray-500 text-lg">Interactive 3D Seating Map</p>
                        </motion.div>

                        <div className="flex flex-col gap-6">
                            <AnimatePresence mode="wait">
                                {step === 1 ? (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.02 }}
                                        className="space-y-4"
                                    >
                                        <div className="glass-card p-8 rounded-3xl bg-zinc-50 border border-zinc-100 dark:bg-zinc-950 dark:border-zinc-800 shadow-xl shadow-black/5 ring-1 ring-black/5">
                                            <div className="flex items-center gap-4 mb-8">
                                                <div className="h-12 w-12 bg-orange-100 dark:bg-orange-950/30 rounded-2xl flex items-center justify-center">
                                                    <Calendar className="h-6 w-6 text-orange-600" />
                                                </div>
                                                <h3 className="font-bold text-lg">Select Date & Time</h3>
                                            </div>

                                            <div className="space-y-6">
                                                <div className="flex flex-col gap-2">
                                                    <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Reservation Date</label>
                                                    <div className="flex items-center gap-3 p-4 bg-white dark:bg-black rounded-xl border border-zinc-200 dark:border-zinc-800 font-medium">
                                                        <input type="date" className="bg-transparent w-full focus:outline-none" defaultValue="2026-03-01" />
                                                    </div>
                                                </div>

                                                <div className="flex flex-col gap-2">
                                                    <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Guest Count</label>
                                                    <div className="flex items-center gap-3 p-2 bg-white dark:bg-black rounded-xl border border-zinc-200 dark:border-zinc-800">
                                                        {[1, 2, 4, 6, 8].map(n => (
                                                            <button
                                                                key={n}
                                                                className={`flex-1 py-3 text-sm font-bold rounded-lg transition ${n === 4 ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30 ring-2 ring-orange-500/20' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-gray-400'}`}
                                                            >
                                                                {n}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={() => setStep(2)}
                                                    className="w-full bg-zinc-900 dark:bg-zinc-200 dark:text-zinc-900 text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 group transition"
                                                >
                                                    Browse View
                                                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition" />
                                                </motion.button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="glass-card p-10 rounded-3xl bg-zinc-50 border border-zinc-100 dark:bg-zinc-950 dark:border-zinc-800 shadow-2xl shadow-orange-600/5 ring-1 ring-orange-100/20"
                                    >
                                        {!selectedTableId ? (
                                            <div className="text-center py-12 flex flex-col items-center gap-6">
                                                <div className="h-20 w-20 bg-orange-100 dark:bg-orange-950/20 rounded-full flex items-center justify-center animate-pulse">
                                                    <MapPin className="h-10 w-10 text-orange-600" />
                                                </div>
                                                <p className="font-bold text-sm text-gray-400 uppercase tracking-widest px-8 leading-loose">Choose a highlight table on the 3D map</p>
                                            </div>
                                        ) : (
                                            <div className="space-y-10">
                                                <div className="flex items-start justify-between">
                                                    <div className="space-y-2">
                                                        <h4 className="text-4xl font-black tracking-tighter">Table {selectedTable?.number}</h4>
                                                        <div className="flex gap-2">
                                                            <span className="bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 text-[10px] font-black uppercase px-2 py-0.5 rounded shadow-sm">Available</span>
                                                            <span className="bg-zinc-200 dark:bg-zinc-800 text-gray-500 text-[10px] font-black uppercase px-2 py-0.5 rounded shadow-sm">{selectedTable?.capacity} Guests</span>
                                                        </div>
                                                    </div>
                                                    <button onClick={() => setSelectedTableId(null)} className="text-gray-300 hover:text-gray-500 text-[10px] uppercase font-black transition">Change</button>
                                                </div>

                                                <div className="space-y-4">
                                                    <div className="p-4 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl flex items-center gap-4 shadow-sm">
                                                        <Clock className="h-5 w-5 text-zinc-400" />
                                                        <span className="font-bold text-sm">7:30 PM PM Reservation</span>
                                                    </div>
                                                    <p className="text-xs text-center text-gray-400 px-6 font-medium leading-relaxed uppercase tracking-tighter">Confirming will hold this table for 15 minutes while you complete the request</p>
                                                </div>

                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className="w-full bg-orange-600 text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-2xl shadow-orange-600/40"
                                                >
                                                    Confirm Booking
                                                    <CheckCircle2 className="h-6 w-6" />
                                                </motion.button>
                                            </div>
                                        )}
                                        {/* Back arrow */}
                                        <button
                                            onClick={() => setStep(1)}
                                            className="mt-8 text-xs font-bold text-gray-400 flex items-center gap-2 hover:text-gray-600 transition uppercase tracking-widest"
                                        >
                                            <ArrowRight className="h-4 w-4 rotate-180" />
                                            Back to Settings
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Right Panel - 3D Scene */}
                    <div className="lg:col-span-8 h-full">
                        <TableScene
                            tables={tables as any}
                            selectedTableId={selectedTableId}
                            onTableSelect={(id) => {
                                setSelectedTableId(id);
                                if (step === 1) setStep(2);
                            }}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
}
