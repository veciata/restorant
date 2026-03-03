<?php

use App\Http\Controllers\AdminMenuController;
use App\Http\Controllers\AdminUsersController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CEODashboardController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\OrdersController;
use App\Http\Controllers\SiteSettingsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'Home')->name('home');
Route::get('/menu', [MenuController::class, 'index'])->name('menu');
Route::inertia('/booking', 'Booking')->name('booking');
Route::inertia('/about', 'About')->name('about');
Route::inertia('/track-order', 'TrackOrder')->name('track-order');

// Order Creation
Route::middleware(['auth'])->group(function () {
    Route::get('/make-order', [OrdersController::class, 'create'])->name('orders.create');
    Route::post('/make-order', [OrdersController::class, 'store'])->name('orders.store');
    Route::get('/orders', [OrdersController::class, 'index'])->name('orders');
});

// Authentication Routes
Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login'])->name('login.post');
Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
Route::post('/register', [AuthController::class, 'register'])->name('register.post');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

// Development Routes (always available for now)
Route::post('/dev/switch-role', function (Request $request) {
    $request->validate(['role' => 'required|in:customer,chef,waiter,editor,ceo']);

    if (Auth::check()) {
        Auth::user()->update(['role' => $request->role]);

        return response()->json(['success' => true, 'role' => $request->role]);
    }

    return response()->json(['error' => 'Not authenticated'], 401);
});

// Development Routes for Orders (always available)
Route::post('/dev/create-dummy-order', [OrdersController::class, 'createDummyOrder'])->name('dev.create-dummy-order');

// Dashboard (for all authenticated users)
Route::middleware(['auth'])->group(function () {
    Route::get('/admin/dashboard', [CEODashboardController::class, 'index'])->name('admin.dashboard');
    Route::get('/admin/orders', [OrdersController::class, 'adminIndex'])->name('admin.orders');
});

// CEO Only Routes
Route::middleware(['auth', 'role:ceo'])->group(function () {
    Route::get('/admin/users', [AdminUsersController::class, 'index'])->name('admin.users');
    Route::post('/admin/users/{user}/bonus', [AdminUsersController::class, 'giveBonus'])->name('admin.users.bonus');
    // Menu Management
    Route::get('/admin/menu', [AdminMenuController::class, 'index'])->name('admin.menu');
    Route::post('/admin/menu', [AdminMenuController::class, 'store'])->name('admin.menu.store');
    Route::put('/admin/menu/{menuItem}', [AdminMenuController::class, 'update'])->name('admin.menu.update');
    Route::delete('/admin/menu/{menuItem}', [AdminMenuController::class, 'destroy'])->name('admin.menu.destroy');
    Route::patch('/admin/menu/{menuItem}/toggle', [AdminMenuController::class, 'toggleAvailability'])->name('admin.menu.toggle');
});

// Staff Routes (Chef, Waiter, Editor, CEO)
Route::middleware(['auth', 'role:chef,waiter,editor,ceo'])->group(function () {
    Route::patch('/admin/orders/{order}/status', [OrdersController::class, 'updateStatus'])->name('admin.orders.update-status');
});

Route::middleware(['auth', 'role:ceo,editor'])->group(function () {
    Route::get('/admin/settings', [SiteSettingsController::class, 'edit'])->name('admin.settings');
    Route::put('/admin/settings', [SiteSettingsController::class, 'update'])->name('admin.settings.update');
});

Route::middleware(['auth', 'role:editor'])->group(function () {
    Route::get('/admin/content', function () {
        return inertia('Admin/Content');
    })->name('admin.content');
});

// Role-specific Dashboards (following README)
Route::middleware(['auth', 'role:chef'])->group(function () {
    Route::inertia('/chef/dashboard', 'Chef/Dashboard')->name('chef.dashboard');
});

Route::middleware(['auth', 'role:waiter'])->group(function () {
    Route::inertia('/waiter/dashboard', 'Waiter/Dashboard')->name('waiter.dashboard');
});

Route::middleware(['auth', 'role:ceo'])->group(function () {
    Route::inertia('/ceo/dashboard', 'CEO/Dashboard')->name('ceo.dashboard');
});
