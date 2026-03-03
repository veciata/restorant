<?php

use App\Http\Middleware\EnsureUserIsAuthenticated;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\HasRole;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->web(append: [
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);

        $middleware->alias([
            'auth' => EnsureUserIsAuthenticated::class,
            'role' => HasRole::class,
        ]);

        // Exclude development routes from CSRF verification
        $middleware->validateCsrfTokens(except: [
            'dev/switch-role',
            'dev/create-dummy-order',
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
