<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AdminUsersController extends Controller
{
    /**
     * Display all users for CEO management.
     */
    public function index()
    {
        $users = User::select('id', 'name', 'email', 'role', 'created_at')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'member_since' => $user->created_at->format('M d, Y'),
                    'total_orders' => $user->orders()->count(),
                    'total_spent' => $user->orders()->sum('total_price'),
                ];
            });

        return inertia('Admin/Users/Index', [
            'users' => $users,
        ]);
    }

    /**
     * Give bonus to a user.
     */
    public function giveBonus(Request $request, User $user)
    {
        $request->validate([
            'bonus_amount' => 'required|numeric|min:0.01|max:999.99',
            'bonus_reason' => 'required|string|max:255',
        ]);

        // Here you could add bonus logic - for now just log it
        \Log::info('Bonus given to user', [
            'user_id' => $user->id,
            'user_name' => $user->name,
            'bonus_amount' => $request->bonus_amount,
            'bonus_reason' => $request->bonus_reason,
            'given_by' => auth()->user()->name,
        ]);

        // In a real app, you'd save this to a bonuses table
        // For now, just return success
        return back()->with('success', "Bonus of $${$request->bonus_amount} given to {$user->name} for: {$request->bonus_reason}");
    }
}
