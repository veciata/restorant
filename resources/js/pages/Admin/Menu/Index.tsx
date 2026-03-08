import { Head, usePage, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ChefHat, Plus, Edit, Trash2, ToggleLeft, ToggleRight, X } from 'lucide-react';
import React, { useState } from 'react';
import AdminLayout from '../../../components/AdminLayout';

export default function Index() {
    const { menuItems, categories } = usePage().props as any;
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);

    const addForm = useForm({
        name: '',
        description: '',
        price: '',
        category_id: '',
        image_url: '',
    });

    const editForm = useForm({
        name: '',
        description: '',
        price: '',
        category_id: '',
        image_url: '',
    });

    const handleAddItem = (e: React.FormEvent) => {
        e.preventDefault();
        addForm.post('/admin/menu', {
            onSuccess: () => {
                setShowAddModal(false);
                addForm.reset();
            },
        });
    };

    const handleEditItem = (item: any) => {
        setEditingItem(item);
        editForm.setData({
            name: item.name,
            description: item.description || '',
            price: item.price.toString(),
            category_id: item.category_id.toString(),
            image_url: item.image_url || '',
        });
    };

    const handleUpdateItem = (e: React.FormEvent) => {
        e.preventDefault();
        editForm.put(`/admin/menu/${editingItem.id}`, {
            onSuccess: () => {
                setEditingItem(null);
                editForm.reset();
            },
        });
    };

    const handleDeleteItem = (item: any) => {
        if (confirm(`Are you sure you want to delete "${item.name}"?`)) {
            // Use fetch for DELETE request since Inertia doesn't have delete method
            fetch(`/admin/menu/${item.id}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
            })
            .then(() => {
                window.location.reload();
            })
            .catch(error => {
                console.error('Delete error:', error);
                alert('Failed to delete menu item');
            });
        }
    };

    const handleToggleAvailability = (item: any) => {
        fetch(`/admin/menu/${item.id}/toggle`, {
            method: 'PATCH',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
            },
        })
        .then(() => {
            window.location.reload();
        })
        .catch(error => {
            console.error('Toggle error:', error);
            alert('Failed to toggle availability');
        });
    };

    return (
        <AdminLayout>
            <Head title="Menu Management - Regal Resto" />

            <div className="space-y-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between"
                >
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <ChefHat className="h-8 w-8 text-orange-600" />
                            <h1 className="text-3xl font-black tracking-tight text-zinc-950 dark:text-zinc-100">Menu Management</h1>
                        </div>
                        <p className="text-gray-600 dark:text-zinc-400">
                            Manage your restaurant's menu items
                        </p>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-xl font-medium hover:bg-orange-700 transition"
                    >
                        <Plus className="h-4 w-4" />
                        Add Menu Item
                    </motion.button>
                </motion.div>

                {/* Statistics */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    <div className="bg-white dark:bg-zinc-800 p-6 rounded-3xl border border-zinc-100 dark:border-zinc-700 shadow-xl shadow-black/5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-zinc-400">Total Items</p>
                                <p className="text-3xl font-bold text-zinc-950 dark:text-zinc-100 mt-2">{menuItems.length}</p>
                            </div>
                            <ChefHat className="h-8 w-8 text-orange-600" />
                        </div>
                    </div>

                    <div className="bg-white dark:bg-zinc-800 p-6 rounded-3xl border border-zinc-100 dark:border-zinc-700 shadow-xl shadow-black/5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-zinc-400">Available</p>
                                <p className="text-3xl font-bold text-zinc-950 dark:text-zinc-100 mt-2">
                                    {menuItems.filter((item: any) => item.is_available).length}
                                </p>
                            </div>
                            <ToggleRight className="h-8 w-8 text-green-600" />
                        </div>
                    </div>

                    <div className="bg-white dark:bg-zinc-800 p-6 rounded-3xl border border-zinc-100 dark:border-zinc-700 shadow-xl shadow-black/5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-zinc-400">Categories</p>
                                <p className="text-3xl font-bold text-zinc-950 dark:text-zinc-100 mt-2">{categories.length}</p>
                            </div>
                            <ChefHat className="h-8 w-8 text-blue-600" />
                        </div>
                    </div>
                </motion.div>

                {/* Menu Items by Category */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-8"
                >
                    {Object.entries(menuItems as Record<string, any[]>).map(([categoryName, items], categoryIndex) => (
                        <div key={categoryName} className="bg-white dark:bg-zinc-800 rounded-3xl border border-zinc-100 dark:border-zinc-700 shadow-xl shadow-black/5 overflow-hidden">
                            <div className="p-6 border-b border-zinc-100 dark:border-zinc-700">
                                <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-100 flex items-center gap-2">
                                    <ChefHat className="h-5 w-5 text-orange-600" />
                                    {categoryName} ({items.length} items)
                                </h2>
                            </div>

                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {items.map((item, itemIndex) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: (categoryIndex * 0.1) + (itemIndex * 0.05) }}
                                            className="bg-zinc-50 dark:bg-zinc-700 rounded-xl p-4"
                                        >
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-zinc-950 dark:text-zinc-100">{item.name}</h3>
                                                    <p className="text-sm text-gray-600 dark:text-zinc-400 mt-1 line-clamp-2">
                                                        {item.description || 'No description'}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-2 ml-4">
                                                    <span className="font-bold text-orange-600">${item.price}</span>
                                                    <button
                                                        onClick={() => handleToggleAvailability(item)}
                                                        className={`p-1 rounded ${item.is_available ? 'text-green-600 hover:text-green-800' : 'text-gray-400 hover:text-gray-600'}`}
                                                        title={item.is_available ? 'Make unavailable' : 'Make available'}
                                                    >
                                                        {item.is_available ? <ToggleRight className="h-5 w-5" /> : <ToggleLeft className="h-5 w-5" />}
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="flex gap-2 mt-4">
                                                <button
                                                    onClick={() => handleEditItem(item)}
                                                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteItem(item)}
                                                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                    Delete
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Add Item Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={() => setShowAddModal(false)} />

                        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-zinc-800 shadow-xl rounded-2xl">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-zinc-950 dark:text-zinc-100">Add Menu Item</h3>
                                <button
                                    onClick={() => setShowAddModal(false)}
                                    className="p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <form onSubmit={handleAddItem}>
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="add_name" className="block text-sm font-medium text-zinc-950 dark:text-zinc-100 mb-2">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="add_name"
                                            value={addForm.data.name}
                                            onChange={(e) => addForm.setData('name', e.target.value)}
                                            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-950 dark:text-zinc-100 focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                                            required
                                        />
                                        {addForm.errors.name && (
                                            <p className="mt-1 text-sm text-red-600">{addForm.errors.name}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="add_description" className="block text-sm font-medium text-zinc-950 dark:text-zinc-100 mb-2">
                                            Description
                                        </label>
                                        <textarea
                                            id="add_description"
                                            value={addForm.data.description}
                                            onChange={(e) => addForm.setData('description', e.target.value)}
                                            rows={3}
                                            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-950 dark:text-zinc-100 focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="add_price" className="block text-sm font-medium text-zinc-950 dark:text-zinc-100 mb-2">
                                            Price ($)
                                        </label>
                                        <input
                                            type="number"
                                            id="add_price"
                                            step="0.01"
                                            min="0.01"
                                            max="999.99"
                                            value={addForm.data.price}
                                            onChange={(e) => addForm.setData('price', e.target.value)}
                                            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-950 dark:text-zinc-100 focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                                            required
                                        />
                                        {addForm.errors.price && (
                                            <p className="mt-1 text-sm text-red-600">{addForm.errors.price}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="add_category" className="block text-sm font-medium text-zinc-950 dark:text-zinc-100 mb-2">
                                            Category
                                        </label>
                                        <select
                                            id="add_category"
                                            value={addForm.data.category_id}
                                            onChange={(e) => addForm.setData('category_id', e.target.value)}
                                            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-950 dark:text-zinc-100 focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                                            required
                                        >
                                            <option value="">Select a category</option>
                                            {categories.map((category: any) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                        {addForm.errors.category_id && (
                                            <p className="mt-1 text-sm text-red-600">{addForm.errors.category_id}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="add_image_url" className="block text-sm font-medium text-zinc-950 dark:text-zinc-100 mb-2">
                                            Image URL (optional)
                                        </label>
                                        <input
                                            type="url"
                                            id="add_image_url"
                                            value={addForm.data.image_url}
                                            onChange={(e) => addForm.setData('image_url', e.target.value)}
                                            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-950 dark:text-zinc-100 focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-3 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddModal(false)}
                                        className="flex-1 px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-700 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-600 transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={addForm.processing}
                                        className="flex-1 px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                    >
                                        {addForm.processing ? 'Adding...' : 'Add Item'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Item Modal */}
            {editingItem && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={() => setEditingItem(null)} />

                        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-zinc-800 shadow-xl rounded-2xl">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-zinc-950 dark:text-zinc-100">Edit Menu Item</h3>
                                <button
                                    onClick={() => setEditingItem(null)}
                                    className="p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <form onSubmit={handleUpdateItem}>
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="edit_name" className="block text-sm font-medium text-zinc-950 dark:text-zinc-100 mb-2">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="edit_name"
                                            value={editForm.data.name}
                                            onChange={(e) => editForm.setData('name', e.target.value)}
                                            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-950 dark:text-zinc-100 focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                                            required
                                        />
                                        {editForm.errors.name && (
                                            <p className="mt-1 text-sm text-red-600">{editForm.errors.name}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="edit_description" className="block text-sm font-medium text-zinc-950 dark:text-zinc-100 mb-2">
                                            Description
                                        </label>
                                        <textarea
                                            id="edit_description"
                                            value={editForm.data.description}
                                            onChange={(e) => editForm.setData('description', e.target.value)}
                                            rows={3}
                                            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-950 dark:text-zinc-100 focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="edit_price" className="block text-sm font-medium text-zinc-950 dark:text-zinc-100 mb-2">
                                            Price ($)
                                        </label>
                                        <input
                                            type="number"
                                            id="edit_price"
                                            step="0.01"
                                            min="0.01"
                                            max="999.99"
                                            value={editForm.data.price}
                                            onChange={(e) => editForm.setData('price', e.target.value)}
                                            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-950 dark:text-zinc-100 focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                                            required
                                        />
                                        {editForm.errors.price && (
                                            <p className="mt-1 text-sm text-red-600">{editForm.errors.price}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="edit_category" className="block text-sm font-medium text-zinc-950 dark:text-zinc-100 mb-2">
                                            Category
                                        </label>
                                        <select
                                            id="edit_category"
                                            value={editForm.data.category_id}
                                            onChange={(e) => editForm.setData('category_id', e.target.value)}
                                            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-950 dark:text-zinc-100 focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                                            required
                                        >
                                            <option value="">Select a category</option>
                                            {categories.map((category: any) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                        {editForm.errors.category_id && (
                                            <p className="mt-1 text-sm text-red-600">{editForm.errors.category_id}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="edit_image_url" className="block text-sm font-medium text-zinc-950 dark:text-zinc-100 mb-2">
                                            Image URL (optional)
                                        </label>
                                        <input
                                            type="url"
                                            id="edit_image_url"
                                            value={editForm.data.image_url}
                                            onChange={(e) => editForm.setData('image_url', e.target.value)}
                                            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-950 dark:text-zinc-100 focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-3 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => setEditingItem(null)}
                                        className="flex-1 px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-700 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-600 transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={editForm.processing}
                                        className="flex-1 px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                    >
                                        {editForm.processing ? 'Updating...' : 'Update Item'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
