<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ImageCacheHeaders
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);
        
        // Add cache headers for image requests
        if ($request->is('images/*') && $response->isSuccessful()) {
            $response->headers->set('Cache-Control', 'public, max-age=31536000');
            $response->headers->set('Expires', now()->addYear()->toRfc1123String());
            $response->headers->set('X-CDN-Cache-Control', 'public, max-age=31536000');
        }
        
        return $response;
    }
}
