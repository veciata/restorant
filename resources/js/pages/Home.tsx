import { Head, Link, usePage, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Star, Quote, ChevronRight, Play, Edit3, Save, X, Copy } from 'lucide-react';
import React, { useState } from 'react';
import Layout from '../components/Layout';
import OptimizedImage from '../components/OptimizedImage';

interface HomePageProps {
    settings: {
        site_name: string;
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
        name: string;
        role: string;
        text: string;
    }>;
    [key: string]: any; // Required for Inertia PageProps
}

export default function Home() {
    const { props } = usePage<HomePageProps>();
    const { settings, testimonials } = props;
    const { auth } = usePage().props;

    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState(settings);
    const [isSaving, setIsSaving] = useState(false);

    const [templates, setTemplates] = useState([]);

    const handleEdit = () => {
        setEditData(settings);
        setTemplates(loadTemplates());
        setIsEditing(true);
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await router.patch('/admin/site-settings', editData, {
                onSuccess: () => {
                    setIsEditing(false);
                    setIsSaving(false);
                    // Save as template
                    saveAsTemplate(editData);
                },
                onError: () => {
                    setIsSaving(false);
                    alert('Error saving changes');
                },
            });
        } catch {
            setIsSaving(false);
            alert('Error saving changes');
        }
    };

    const handleSaveTemplate = () => {
        saveAsTemplate(editData);
        alert('Template saved successfully!');
    };

    const addBannerText = () => {
        const newText = prompt('Enter new banner text:');
        if (newText && newText.trim()) {
            setEditData({
                ...editData,
                banner_texts: [...(editData.banner_texts || []), newText.trim()],
            });
        }
    };

    const removeBannerText = (index: number) => {
        setEditData({
            ...editData,
            banner_texts: editData.banner_texts?.filter((_, i) => i !== index) || [],
        });
    };

    const updateBannerText = (index: number, text: string) => {
        const updatedTexts = [...(editData.banner_texts || [])];
        updatedTexts[index] = text;
        setEditData({
            ...editData,
            banner_texts: updatedTexts,
        });
    };

    const saveAsTemplate = (data: typeof settings) => {
        const templates = JSON.parse(localStorage.getItem('homepageTemplates') || '[]');
        const newTemplate = {
            id: Date.now(),
            name: `Template ${new Date().toLocaleDateString()}`,
            data: data,
            createdAt: new Date().toISOString(),
        };
        templates.push(newTemplate);
        localStorage.setItem('homepageTemplates', JSON.stringify(templates));
    };

    const loadTemplates = () => {
        const templates = JSON.parse(localStorage.getItem('homepageTemplates') || '[]');
        console.log('Available templates:', templates);
        return templates;
    };

    return (
        <Layout>
            <Head title={`${settings.site_name} - Fine Dining Reinvented`} />

            {/* Split Hero Section */}
            <div className="relative flex min-h-[92vh] items-center overflow-hidden bg-orange-50 dark:bg-gray-900">
                <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-20 px-6 lg:grid-cols-2">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="z-10 space-y-10">
                        <div className="space-y-4">
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={editData.hero_subtitle}
                                    onChange={(e) => setEditData({ ...editData, hero_subtitle: e.target.value })}
                                    className="border-b border-orange-300 bg-transparent pl-1 text-[10px] font-bold tracking-[0.4em] text-orange-600 uppercase focus:border-orange-500 focus:outline-none"
                                />
                            ) : (
                                <span className="pl-1 text-[10px] font-bold tracking-[0.4em] text-orange-600 uppercase">
                                    {settings.hero_subtitle}
                                </span>
                            )}
                            <h1 className="text-8xl leading-[0.9] font-black tracking-tighter text-zinc-950">
                                Crafted <br />
                                <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-rose-600 bg-clip-text text-transparent">
                                    Culinary
                                </span>{' '}
                                <br />
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editData.hero_title}
                                        onChange={(e) => setEditData({ ...editData, hero_title: e.target.value })}
                                        className="border-b border-orange-300 bg-transparent focus:border-orange-500 focus:outline-none"
                                    />
                                ) : (
                                    settings.hero_title
                                )}
                            </h1>
                        </div>

                        {isEditing ? (
                            <textarea
                                value={editData.hero_description}
                                onChange={(e) => setEditData({ ...editData, hero_description: e.target.value })}
                                className="max-w-lg border-b border-orange-300 bg-transparent text-xl leading-relaxed font-medium text-gray-500 focus:border-orange-500 focus:outline-none"
                                rows={2}
                            />
                        ) : (
                            <p className="max-w-lg text-xl leading-relaxed font-medium text-gray-500">{settings.hero_description}</p>
                        )}

                        <div className="flex items-center gap-6">
                            <Link
                                href="/menu"
                                className="flex items-center gap-3 rounded-full bg-zinc-950 px-10 py-5 text-lg font-bold text-white shadow-2xl shadow-black/30 transition hover:scale-105 active:scale-95">
                                Explorer Menu
                                <ChevronRight className="h-5 w-5" />
                            </Link>
                            <button className="group flex items-center gap-4 rounded-full p-1 pr-6 transition hover:bg-zinc-100">
                                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-zinc-200 bg-white shadow-lg transition group-hover:scale-110">
                                    <Play className="ml-1 h-4 w-4 fill-orange-600 text-orange-600" />
                                </span>
                                <span className="text-sm font-bold tracking-widest text-zinc-950 uppercase">The Story</span>
                            </button>
                        </div>

                        <div className="grid grid-cols-3 gap-12 border-t border-zinc-100 pt-12">
                            {isEditing ? (
                                <>
                                    <div className="flex flex-col gap-1">
                                        <input
                                            type="number"
                                            value={editData.michelin_stars}
                                            onChange={(e) => setEditData({ ...editData, michelin_stars: parseInt(e.target.value) })}
                                            className="w-20 border-b border-orange-300 bg-transparent text-3xl font-black tracking-tighter text-zinc-950 focus:border-orange-500 focus:outline-none"
                                        />
                                        <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                                            Michelin Stars
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <input
                                            type="text"
                                            value={editData.happy_guests}
                                            onChange={(e) => setEditData({ ...editData, happy_guests: e.target.value })}
                                            className="w-20 border-b border-orange-300 bg-transparent text-3xl font-black tracking-tighter text-zinc-950 focus:border-orange-500 focus:outline-none"
                                        />
                                        <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Happy Guests</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <input
                                            type="text"
                                            value={editData.artisan_dishes}
                                            onChange={(e) => setEditData({ ...editData, artisan_dishes: e.target.value })}
                                            className="w-20 border-b border-orange-300 bg-transparent text-3xl font-black tracking-tighter text-zinc-950 focus:border-orange-500 focus:outline-none"
                                        />
                                        <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                                            Artisan Dishes
                                        </span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Stat label="Michelin Stars" value={settings.michelin_stars.toString()} />
                                    <Stat label="Happy Guests" value={settings.happy_guests} />
                                    <Stat label="Artisan Dishes" value={settings.artisan_dishes} />
                                </>
                            )}
                        </div>
                    </motion.div>

                    <div className="relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="aspect-square overflow-hidden rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] ring-[20px] ring-white">
                            <OptimizedImage
                                src={settings.hero_image}
                                alt="Signature Dish"
                                width={800}
                                height={800}
                                quality={90}
                                format="webp"
                                className="h-full w-full object-cover grayscale-[0.1]"
                            />
                        </motion.div>
                        {/* Floating elements */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute -top-10 -right-10 z-20 flex items-center gap-4 rounded-3xl border border-zinc-100 bg-white p-6 shadow-2xl shadow-black/10">
                            <div className="rounded-2xl bg-emerald-500/10 p-3">
                                <Star className="h-6 w-6 fill-emerald-500 text-emerald-500" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-gray-300 uppercase">Guest Review</p>
                                <p className="pr-6 text-sm font-bold text-gray-400 italic transition group-hover:text-orange-600">
                                    "{testimonials?.[0]?.text || settings.testimonial_text}"
                                </p>
                                {testimonials?.[0] && (
                                    <p className="mt-1 text-xs text-gray-500">
                                        - {testimonials[0].name}, {testimonials[0].role}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Scrolling Banner */}
            <div className="overflow-hidden border-y border-zinc-800 bg-white py-10">
                {isEditing && (
                    <div className="mx-auto mb-4 max-w-7xl px-6">
                        <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                            <h3 className="mb-4 font-semibold text-gray-400">Edit Banner Texts</h3>
                            <div className="space-y-3">
                                {editData.banner_texts?.map((text, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            value={text}
                                            onChange={(e) => updateBannerText(index, e.target.value)}
                                            className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-gray-400 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                                            placeholder={`Banner text ${index + 1}`}
                                        />
                                        <button
                                            onClick={() => removeBannerText(index)}
                                            className="rounded-md bg-red-500 px-3 py-2 text-white transition hover:bg-red-600">
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                <button
                                    onClick={addBannerText}
                                    className="rounded-md bg-green-500 px-4 py-2 text-white transition hover:bg-green-600">
                                    Add Banner Text
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                <div className="animate-marquee flex items-center gap-20 whitespace-nowrap">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-center gap-20 text-gray-400">
                            {isEditing
                                ? editData.banner_texts?.map((text, index) => (
                                    <React.Fragment key={index}>
                                        <span className="text-5xl font-black tracking-tighter text-zinc-300/5 uppercase">{text}</span>
                                        <div className="h-2 w-2 rounded-full bg-orange-600" />
                                    </React.Fragment>
                                ))
                                : settings.banner_texts?.map((text, index) => (
                                    <React.Fragment key={index}>
                                        <span className="text-5xl font-black tracking-tighter text-zinc-100/5 uppercase">{text}</span>
                                        <div className="h-2 w-2 rounded-full bg-orange-600" />
                                    </React.Fragment>
                                ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* Testimonial Section */}
            <div className="bg-orange-50">
                <div className="mx-auto grid max-w-7xl grid-cols-1 px-6 py-32 lg:grid-cols-12">
                    <div className="flex flex-col justify-center gap-8 lg:col-span-5">
                        <Quote className="-ml-2 h-16 w-16 text-orange-200" />
                        <h2 className="text-4xl leading-snug font-black tracking-tight text-zinc-950">
                            What our guests say about our <span className="text-orange-600">signature experiences.</span>
                        </h2>
                        <p className="text-lg text-gray-500">
                            Read through hundreds of verified reviews from our international food critics and regular guests.
                        </p>
                        <Link
                            href="/testimonials"
                            className="text-sm font-bold tracking-widest text-gray-900 uppercase underline underline-offset-8 transition hover:text-orange-600"
                        >
                            View All {testimonials?.length || 0} Reviews
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:col-span-7">
                        {testimonials?.map((testimonial, index) => (
                            <TestimonialCard
                                key={index}
                                name={testimonial.name}
                                role={testimonial.role}
                                text={testimonial.text}
                                delay={index * 0.2}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {isEditing && templates.length > 0 && (
                <div className="fixed top-4 right-4 z-50 max-w-xs rounded-lg bg-white p-4 shadow-lg">
                    <h3 className="mb-2 font-semibold">Templates</h3>
                    <div className="max-h-48 space-y-2 overflow-y-auto">
                        {templates.map((template: any) => (
                            <button
                                key={template.id}
                                onClick={() => setEditData(template.data)}
                                className="w-full rounded bg-gray-100 px-3 py-2 text-left text-sm transition hover:bg-gray-200">
                                <div className="font-medium">{template.name}</div>
                                <div className="text-xs text-gray-500">{new Date(template.createdAt).toLocaleDateString()}</div>
                            </button>
                        ))}
                    </div>
                </div>
            )}
            {(auth?.user?.role === 'ceo' || auth?.user?.role === 'editor') && (
                <div className="fixed right-8 bottom-8 z-50 flex gap-2">
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleSaveTemplate}
                                className="rounded-full bg-blue-600 p-4 text-white shadow-lg transition-all hover:scale-110 hover:bg-blue-700"
                                title="Save as Template">
                                <Copy className="h-6 w-6" />
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="rounded-full bg-red-600 p-4 text-white shadow-lg transition-all hover:scale-110 hover:bg-red-700"
                                title="Cancel Editing">
                                <X className="h-6 w-6" />
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="rounded-full bg-green-600 p-4 text-white shadow-lg transition-all hover:scale-110 hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                                title="Save Changes">
                                <Save className="h-6 w-6" />
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={handleEdit}
                            className="rounded-full bg-orange-600 p-4 text-white shadow-lg transition-all hover:scale-110 hover:bg-orange-700"
                            title="Edit Homepage">
                            <Edit3 className="h-6 w-6" />
                        </button>
                    )}
                </div>
            )}
        </Layout>
    );
}

function Stat({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex flex-col gap-1">
            <span className="text-3xl font-black tracking-tighter text-zinc-950">{value}</span>
            <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">{label}</span>
        </div>
    );
}

function TestimonialCard({
    name,
    role,
    text,
    delay = 0,
}: {
    name: string;
    role: string;
    text: string;
    delay?: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.6 }}
            className="flex flex-col gap-6 rounded-[2.5rem] border border-zinc-100 bg-white p-10 shadow-xl shadow-black/5">
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-3 w-3 fill-orange-500 text-orange-500" />
                ))}
            </div>
            <p className="leading-relaxed font-medium text-gray-600 italic">"{text}"</p>
            <div className="mt-2 flex items-center gap-4 border-t border-zinc-50 pt-6">
                <div className="h-10 w-10 rounded-full bg-zinc-100" />
                <div>
                    <h4 className="text-sm font-black tracking-tight text-zinc-900 uppercase">{name}</h4>
                    <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">{role}</span>
                </div>
            </div>
        </motion.div>
    );
}
