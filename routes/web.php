<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminMenuController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\TestimonialController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\OrderEventsController;
use App\Http\Controllers\OrdersController;
use App\Http\Controllers\SiteSettingsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/testimonials', [HomeController::class, 'testimonials'])->name('testimonials');
Route::get('/menu', [MenuController::class, 'index'])->name('menu');
Route::get('/booking', [BookingController::class, 'index'])->name('booking');
Route::post('/booking', [BookingController::class, 'store'])->name('booking.store');
Route::inertia('/about', 'About')->name('about');
Route::inertia('/track-order', 'TrackOrder')->name('track-order');
Route::inertia('/terms', 'Terms')->name('terms');
Route::inertia('/privacy', 'Privacy')->name('privacy');

// Image Caching Routes
Route::get('/images/{path}', [ImageController::class, 'show'])->where('path', '.*')->name('images.show')->middleware('image.cache');
Route::post('/admin/images/clear-cache', [ImageController::class, 'clearCache'])->name('images.clear-cache');

// Order Creation
Route::middleware(['auth'])->group(function () {
    Route::get('/make-order', [OrdersController::class, 'create'])->name('orders.create');
    Route::post('/make-order', [OrdersController::class, 'store'])->name('orders.store');
    Route::get('/orders', [OrdersController::class, 'index'])->name('orders');
    Route::post('/orders/{order}/testimonial', [OrdersController::class, 'createTestimonial'])->name('orders.testimonial');
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

// Real-time Order Events (Server-Sent Events)
Route::get('/orders/events', [OrderEventsController::class, 'stream'])->name('orders.events');

// Admin Routes (unified for all staff roles)
Route::middleware(['auth', 'role:chef|waiter|editor|ceo'])->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    Route::get('/admin/orders', [AdminController::class, 'orders'])->name('admin.orders');
    Route::patch('/admin/orders/{orderId}/status', [AdminController::class, 'updateOrderStatus'])->name('admin.orders.update-status');
    Route::get('/admin/testimonials', [TestimonialController::class, 'index'])->name('admin.testimonials.index');
    Route::post('/admin/testimonials', [TestimonialController::class, 'store'])->name('admin.testimonials.store');
    Route::patch('/admin/testimonials/{testimonial}', [TestimonialController::class, 'update'])->name('admin.testimonials.update');
    Route::patch('/admin/testimonials/{testimonial}/toggle', [TestimonialController::class, 'toggle'])->name('admin.testimonials.toggle');
    Route::delete('/admin/testimonials/{testimonial}', [TestimonialController::class, 'destroy'])->name('admin.testimonials.destroy');
    Route::get('/admin/site-settings', [SiteSettingsController::class, 'edit'])->name('admin.site-settings');
    Route::patch('/admin/site-settings', [SiteSettingsController::class, 'update'])->name('admin.site-settings.update');
});
