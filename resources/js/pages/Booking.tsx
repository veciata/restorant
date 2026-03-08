import { Head, usePage, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, Clock, ArrowRight, CheckCircle2, MapPin } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import TableScene from '../components/booking/TableScene';
import Layout from '../components/Layout';

export default function Booking() {
    const { tables, workingHours, filters } = usePage().props as any;
    
    const [selectedTableId, setSelectedTableId] = useState<number | null>(null);
    const [step, setStep] = useState(1);
    const [date, setDate] = useState(filters?.date || new Date().toISOString().split('T')[0]);
    const [time, setTime] = useState(filters?.time || '19:30');
    const [guests, setGuests] = useState(filters?.guests || 2);
    
    const prevFiltersRef = useRef({ date, time, guests });
    
    // Reset table selection when filters change
    useEffect(() => {
        const { date: prevDate, time: prevTime, guests: prevGuests } = prevFiltersRef.current;
        
        if (prevDate !== date || prevTime !== time || prevGuests !== guests) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSelectedTableId(currentId => {
                // Only reset if there's currently a table selected
                return currentId ? null : currentId;
            });
        }
        
        prevFiltersRef.current = { date, time, guests };
    }, [date, time, guests]);
    
    // Working hours from database
    const workingHoursData = workingHours || {
        mon_thu: { start: '11:00', end: '22:00' },
        fri_sat: { start: '11:00', end: '23:30' },
        sunday: { start: '12:00', end: '21:00' }
    };
    
    // Generate 30-minute time slots
    const generateTimeSlots = () => {
        const slots = [];
        for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                slots.push(timeStr);
            }
        }
        return slots;
    };
    
    const timeSlots = generateTimeSlots();
    
    const selectedTable = tables?.find((t: any) => t.id === selectedTableId);
    
    // Check if time is within working hours
    const isWithinWorkingHours = (timeStr: string, dateStr: string) => {
        const [hours, minutes] = timeStr.split(':').map(Number);
        const selectedDate = new Date(dateStr);
        const dayOfWeek = selectedDate.getDay(); // 0 = Sunday, 6 = Saturday
        
        let startHour, startMinute, endHour, endMinute;
        
        if (dayOfWeek >= 1 && dayOfWeek <= 4) { // Monday - Thursday
            [startHour, startMinute] = workingHoursData.mon_thu.start.split(':').map(Number);
            [endHour, endMinute] = workingHoursData.mon_thu.end.split(':').map(Number);
        } else if (dayOfWeek >= 5 && dayOfWeek <= 6) { // Friday - Saturday
            [startHour, startMinute] = workingHoursData.fri_sat.start.split(':').map(Number);
            [endHour, endMinute] = workingHoursData.fri_sat.end.split(':').map(Number);
        } else { // Sunday
            [startHour, startMinute] = workingHoursData.sunday.start.split(':').map(Number);
            [endHour, endMinute] = workingHoursData.sunday.end.split(':').map(Number);
        }
        
        const timeInMinutes = hours * 60 + minutes;
        const startInMinutes = startHour * 60 + startMinute;
        const endInMinutes = endHour * 60 + endMinute;
        
        return timeInMinutes >= startInMinutes && timeInMinutes <= endInMinutes;
    };
    
    // Check time slot availability for selected table
    const isTimeSlotAvailable = (timeStr: string, tableId: number) => {
        // Check if any existing booking conflicts with this time slot
        return !tables?.some((table: any) => {
            if (table.id !== tableId) return false;
            
            // This would require checking actual bookings, but for now we'll simulate
            // In a real implementation, you'd query the bookings table
            return table.status === 'occupied';
        });
    };
    
    // Function to refresh tables with new filters
    const updateFilters = () => {
        router.get('/booking', { date, time, guests }, { preserveState: false });
    };

    return (
        <Layout>
            <Head title="Reserve Your Table" />
            <div className="max-w-[1400px] mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 h-[80vh]">
                    {/* Left Sidebar - Selection Box */}
                    <div className="lg:col-span-4 flex flex-col gap-8 pr-12">
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                            <h2 className="text-4xl font-extrabold tracking-tight mb-3 text-gray-900 dark:text-white">Find Your Perfect Table</h2>
                            <p className="text-gray-500 text-lg dark:text-gray-400">Interactive 3D Seating Map</p>
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
                                                <h3 className="font-bold text-lg text-gray-900 dark:text-white">Select Date & Time</h3>
                                            </div>

                                            <div className="space-y-6">
                                                <div className="flex flex-col gap-2">
                                                    <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Reservation Date</label>
                                                    <div className="flex items-center gap-3 p-4 bg-white dark:bg-black rounded-xl border border-zinc-200 dark:border-zinc-800">
                                                        <Calendar className="h-5 w-5 text-gray-400 pointer-events-none" />
                                                        <input 
                                                            type="date" 
                                                            className="bg-transparent w-full focus:outline-none text-gray-900 dark:text-white cursor-pointer" 
                                                            value={date}
                                                            onChange={(e) => setDate(e.target.value)}
                                                            min={new Date().toISOString().split('T')[0]}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex flex-col gap-2">
                                                    <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Reservation Time</label>
                                                    <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto p-2 bg-white dark:bg-black rounded-xl border border-zinc-200 dark:border-zinc-800">
                                                        {timeSlots.map(slot => {
                                                            const isWorkingHours = isWithinWorkingHours(slot, date);
                                                            const isAvailable = selectedTableId ? isTimeSlotAvailable(slot, selectedTableId) : true;
                                                            const isSelected = time === slot;
                                                            
                                                            return (
                                                                <button
                                                                    key={slot}
                                                                    onClick={() => setTime(slot)}
                                                                    disabled={!isWorkingHours || (selectedTableId && !isAvailable) || false}
                                                                    className={`py-2 px-1 text-xs font-medium rounded transition text-center ${
                                                                        isSelected
                                                                            ? 'bg-orange-600 text-white'
                                                                            : !isWorkingHours
                                                                            ? 'bg-yellow-100 text-yellow-700 cursor-not-allowed opacity-60'
                                                                            : selectedTableId && !isAvailable
                                                                            ? 'bg-red-100 text-red-700 cursor-not-allowed opacity-60'
                                                                            : 'bg-zinc-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                                                                    }`}
                                                                >
                                                                    {slot}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                    <div className="flex gap-4 mt-2 text-xs">
                                                        <div className="flex items-center gap-1">
                                                            <div className="w-3 h-3 bg-zinc-100 dark:bg-zinc-800 rounded"></div>
                                                            <span className="text-gray-500 dark:text-gray-400">Available</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <div className="w-3 h-3 bg-yellow-100 rounded"></div>
                                                            <span className="text-gray-500 dark:text-gray-400">Closed</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <div className="w-3 h-3 bg-red-100 rounded"></div>
                                                            <span className="text-gray-500 dark:text-gray-400">Booked</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col gap-2">
                                                    <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Guest Count</label>
                                                    <div className="flex items-center gap-3 p-2 bg-white dark:bg-black rounded-xl border border-zinc-200 dark:border-zinc-800">
                                                        {[1, 2, 4, 6, 8].map(n => (
                                                            <button
                                                                key={n}
                                                                onClick={() => setGuests(n)}
                                                                className={`flex-1 py-3 text-sm font-bold rounded-lg transition ${n === guests ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30 ring-2 ring-orange-500/20' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-gray-600 dark:text-gray-400'}`}
                                                            >
                                                                {n}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={() => {
                                                        updateFilters();
                                                        setStep(2);
                                                    }}
                                                    className="w-full bg-zinc-900 dark:bg-zinc-200 dark:text-zinc-900 text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 group transition"
                                                >
                                                    Check Availability
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
                                                        <h4 className="text-4xl font-black tracking-tighter text-gray-900 dark:text-white">Table {selectedTable?.number}</h4>
                                                        <div className="flex gap-2">
                                                            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded shadow-sm ${
                                                                selectedTable?.status === 'available' 
                                                                    ? 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600' 
                                                                    : selectedTable?.status === 'occupied'
                                                                    ? 'bg-red-100 dark:bg-red-950/50 text-red-600'
                                                                    : 'bg-yellow-100 dark:bg-yellow-950/50 text-yellow-600'
                                                            }`}>
                                                                {selectedTable?.status === 'available' ? 'Available' : selectedTable?.status === 'occupied' ? 'Occupied' : 'Maintenance'}
                                                            </span>
                                                            <span className="bg-zinc-200 dark:bg-zinc-800 text-gray-500 text-[10px] font-black uppercase px-2 py-0.5 rounded shadow-sm">{selectedTable?.capacity} Guests</span>
                                                        </div>
                                                    </div>
                                                    <button onClick={() => setSelectedTableId(null)} className="text-gray-300 hover:text-gray-500 text-[10px] uppercase font-black transition">Change</button>
                                                </div>

                                                <div className="space-y-4">
                                                    <div className="p-4 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl flex items-center gap-4 shadow-sm">
                                                        <Calendar className="h-5 w-5 text-zinc-400" />
                                                        <span className="font-bold text-sm text-gray-900 dark:text-white">{new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                                    </div>
                                                    <div className="p-4 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl flex items-center gap-4 shadow-sm">
                                                        <Clock className="h-5 w-5 text-zinc-400" />
                                                        <span className="font-bold text-sm text-gray-900 dark:text-white">{time} Reservation</span>
                                                    </div>
                                                    <div className="p-4 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl flex items-center gap-4 shadow-sm">
                                                        <Users className="h-5 w-5 text-zinc-400" />
                                                        <span className="font-bold text-sm text-gray-900 dark:text-white">{guests} Guests</span>
                                                    </div>
                                                    <p className="text-xs text-center text-gray-400 px-6 font-medium leading-relaxed uppercase tracking-tighter">Confirming will hold this table for 15 minutes while you complete the request</p>
                                                </div>

                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={() => {
                                                        if (selectedTable?.status !== 'available') {
                                                            alert('This table is not available for booking.');
                                                            return;
                                                        }
                                                        
                                                        const formData = new FormData();
                                                        formData.append('table_id', selectedTable.id.toString());
                                                        formData.append('date', date);
                                                        formData.append('time', time);
                                                        formData.append('guests_count', guests.toString());
                                                        
                                                        router.post('/booking', formData);
                                                    }}
                                                    disabled={selectedTable?.status !== 'available'}
                                                    className={`w-full py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-2xl transition ${
                                                        selectedTable?.status === 'available'
                                                            ? 'bg-orange-600 text-white shadow-orange-600/40 hover:bg-orange-700'
                                                            : 'bg-zinc-300 text-zinc-500 cursor-not-allowed'
                                                    }`}
                                                >
                                                    {selectedTable?.status === 'available' ? (
                                                        <>
                                                            Confirm Booking
                                                            <CheckCircle2 className="h-6 w-6" />
                                                        </>
                                                    ) : (
                                                        <>
                                                            Table Not Available
                                                        </>
                                                    )}
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
                            tables={tables || []}
                            selectedTableId={selectedTableId}
                            onTableSelect={(id) => {
                                const table = tables?.find((t: any) => t.id === id);
                                if (table?.status === 'available') {
                                    setSelectedTableId(id);
                                    if (step === 1) setStep(2);
                                } else {
                                    const isWorkingHours = isWithinWorkingHours(time, date);
                                    if (!isWorkingHours) {
                                        alert('This time is outside working hours.');
                                    } else {
                                        alert('This table is not available for the selected time.');
                                    }
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
}
