<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Image Caching Configuration
    |--------------------------------------------------------------------------
    |
    | This file contains configuration for the image caching system.
    | You can customize cache duration, quality settings, and more.
    |
    */

    'cache' => [
        'driver' => env('IMAGE_CACHE_DRIVER', 'redis'),
        'prefix' => 'images:',
        'ttl' => env('IMAGE_CACHE_TTL', 31536000), // 1 year in seconds
    ],

    'quality' => [
        'default' => 85,
        'thumbnails' => 75,
        'hero' => 90,
        'gallery' => 80,
    ],

    'formats' => [
        'default' => 'auto',
        'force_webp' => false,
        'supported' => ['webp', 'jpg', 'jpeg', 'png'],
    ],

    'dimensions' => [
        'thumbnail' => [
            'width' => 150,
            'height' => 150,
        ],
        'small' => [
            'width' => 400,
            'height' => 300,
        ],
        'medium' => [
            'width' => 800,
            'height' => 600,
        ],
        'large' => [
            'width' => 1200,
            'height' => 900,
        ],
        'hero' => [
            'width' => 1920,
            'height' => 1080,
        ],
    ],

    'optimization' => [
        'auto_orient' => true,
        'sharpen' => true,
        'interlace' => true,
    ],

    'security' => [
        'max_width' => 3000,
        'max_height' => 3000,
        'allowed_domains' => [
            'images.unsplash.com',
            'picsum.photos',
            'localhost',
        ],
    ],
];
