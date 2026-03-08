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

        // Parse allowed roles - split on pipe instead of comma
        $allowedRoles = array_map('trim', explode('|', $roles));

        // Get user role as string
        $userRoleString = $user->role instanceof \App\Enums\UserRole
            ? $user->role->value
            : (string) $user->role;

        // Debug logging
        \Log::info('HasRole Check', [
            'user_id' => $user->id,
            'user_role_raw' => $user->role,
            'user_role_string' => $userRoleString,
            'roles_param' => $roles,
            'allowed_roles' => $allowedRoles,
            'is_allowed' => in_array($userRoleString, $allowedRoles),
            'path' => $request->path(),
        ]);

        if (! in_array($userRoleString, $allowedRoles)) {
            \Log::error('ACCESS DENIED', [
                'user_id' => $user->id,
                'user_role_string' => $userRoleString,
                'allowed_roles' => $allowedRoles,
                'request_path' => $request->path(),
            ]);
            abort(403, 'Unauthorized access - Role: ' . $userRoleString . ', Required: ' . implode(',', $allowedRoles));
        }

        \Log::info('ACCESS GRANTED', [
            'user_id' => $user->id,
            'user_role' => $userRoleString,
            'request_path' => $request->path(),
        ]);

        return $next($request);
    }
}
