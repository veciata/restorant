import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Package, Truck, Clock, CheckCircle2, ChevronRight, Search } from 'lucide-react';
import React, { useState } from 'react';
import Layout from '../components/Layout';

export default function TrackOrder() {
    const [orderId, setOrderId] = useState('');
    const [found, setFound] = useState(false);

    return (
        <Layout>
            <Head title="Track Your Order - Regal Resto" />

            <div className="max-w-4xl mx-auto px-6 py-32 overflow-hidden">
                <div className="flex flex-col items-center gap-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
                        <h1 className="text-6xl font-black tracking-tighter">Your Order Journey</h1>
                        <p className="text-gray-500 font-medium">Real-time tracking for your culinary experience.</p>
                    </motion.div>

                    <div className="w-full bg-white dark:bg-zinc-950 p-3 rounded-3xl flex items-center border border-zinc-200 dark:border-zinc-800 shadow-2xl shadow-black/5 ring-1 ring-black/5 mt-8">
                        <Search className="h-6 w-6 text-gray-400 ml-6 mr-4" />
                        <input
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                            type="text"
                            placeholder="Enter Order Reference # (e.g. RR-9842)"
                            className="bg-transparent border-none flex-1 py-5 text-lg font-bold focus:outline-none focus:ring-0"
                        />
                        <button
                            onClick={() => setFound(true)}
                            className="bg-orange-600 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition"
                        >
                            Track
                        </button>
                    </div>

                    {found && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-full mt-20 space-y-16"
                        >
                            <div className="flex justify-between items-center bg-zinc-50 dark:bg-zinc-900/40 p-10 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-900 border-dashed">
                                <div className="space-y-2">
                                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Order Reference</p>
                                    <h3 className="text-4xl font-black tracking-tight">{orderId || 'RR-9842'}</h3>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <span className="bg-orange-600/10 text-orange-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">Preparing in Kitchen</span>
                                    <p className="text-sm font-bold text-gray-500 flex items-center gap-2"><Clock className="h-4 w-4" /> Est. Time: 12 mins</p>
                                </div>
                            </div>

                            <div className="relative h-2 bg-zinc-100 dark:bg-zinc-900 rounded-full w-full">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '45%' }}
                                    transition={{ duration: 1.5, ease: "circOut" }}
                                    className="absolute inset-y-0 bg-orange-600 rounded-full shadow-lg shadow-orange-600/50"
                                />
                                <div className="absolute inset-0 flex justify-between items-center -translate-y-10">
                                    <StatusStep icon={<CheckCircle2 />} label="Placed" active />
                                    <StatusStep icon={<Package />} label="Preparing" active />
                                    <StatusStep icon={<Truck />} label="In Route" />
                                    <StatusStep icon={<ChevronRight />} label="Delivered" />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </Layout>
    );
}

function StatusStep({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
    return (
        <div className={`flex flex-col items-center gap-3 ${active ? 'text-zinc-950 dark:text-zinc-50' : 'text-gray-300'}`}>
            <div className={`h-12 w-12 rounded-2xl flex items-center justify-center border-4 border-white dark:border-zinc-950 shadow-xl ${active ? 'bg-orange-600 text-white shadow-orange-600/30' : 'bg-gray-100 dark:bg-zinc-900'}`}>
                {icon}
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">{label}</span>
        </div>
    );
}
