<?php

namespace App\Http\Middleware;

use App\Models\SiteSettings;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $siteSettings = SiteSettings::first();
        $workingHours = $siteSettings?->working_hours ?? [
            'mon_thu' => ['start' => '11:00', 'end' => '22:00'],
            'fri_sat' => ['start' => '11:00', 'end' => '23:30'],
            'sunday' => ['start' => '12:00', 'end' => '21:00']
        ];

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user(),
            ],
            'url' => $request->getPathInfo(),
            'workingHours' => $workingHours,
        ];
    }
}
