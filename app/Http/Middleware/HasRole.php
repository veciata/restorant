<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class HasRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $roles): Response
    {
        if (! Auth::check()) {
            return redirect()->route('login');
        }

        $user = Auth::user();

        // Debug logging
        \Log::info('HasRole Middleware Check', [
            'user_id' => $user->id,
            'user_role' => $user->role,
            'required_roles' => $roles,
        ]);

        // Support multiple roles separated by commas
        $allowedRoles = explode(',', $roles);
        $allowedRoles = array_map('trim', $allowedRoles);

        \Log::info('Parsed allowed roles', ['roles' => $allowedRoles]);

        if (! in_array($user->role, $allowedRoles)) {
            \Log::info('Access denied', ['user_role' => $user->role, 'allowed' => $allowedRoles]);
            abort(403, 'Unauthorized access');
        }

        \Log::info('Access granted');

        return $next($request);
    }
}
