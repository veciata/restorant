<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;

class ImageController extends Controller
{
    /**
     * Serve optimized and cached images
     */
    public function show(Request $request, $path)
    {
        // Generate cache key
        $cacheKey = 'image_' . md5($path . $request->getQueryString());
        
        // Try to get from cache first
        $cachedImage = Cache::get($cacheKey);
        
        if ($cachedImage) {
            return response($cachedImage['content'])
                ->header('Content-Type', $cachedImage['mime'])
                ->header('Cache-Control', 'public, max-age=31536000') // Cache for 1 year
                ->header('Expires', now()->addYear()->toRfc1123String());
        }

        // Check if image exists in storage
        if (!Storage::disk('public')->exists($path)) {
            abort(404, 'Image not found');
        }

        // Get the original image
        $imageContent = Storage::disk('public')->get($path);
        $mimeType = Storage::disk('public')->mimeType($path);

        // Only process if it's an image
        if (!str_starts_with($mimeType, 'image/')) {
            return response($imageContent)
                ->header('Content-Type', $mimeType)
                ->header('Cache-Control', 'public, max-age=31536000');
        }

        // Process and optimize the image
        $processedImage = $this->processImage($imageContent, $request);

        // Cache the processed image
        Cache::put($cacheKey, [
            'content' => $processedImage,
            'mime' => $mimeType
        ], now()->addYear());

        return response($processedImage)
            ->header('Content-Type', $mimeType)
            ->header('Cache-Control', 'public, max-age=31536000')
            ->header('Expires', now()->addYear()->toRfc1123String());
    }

    /**
     * Process image based on query parameters
     */
    private function processImage($imageContent, Request $request)
    {
        $image = Image::make($imageContent);
        
        // Handle resizing
        if ($request->has('w') || $request->has('h')) {
            $width = $request->get('w');
            $height = $request->get('h');
            
            if ($width && $height) {
                $image->fit($width, $height, function ($constraint) {
                    $constraint->upsize();
                });
            } elseif ($width) {
                $image->resize($width, null, function ($constraint) {
                    $constraint->aspectRatio();
                    $constraint->upsize();
                });
            } elseif ($height) {
                $image->resize(null, $height, function ($constraint) {
                    $constraint->aspectRatio();
                    $constraint->upsize();
                });
            }
        }

        // Handle quality optimization
        $quality = $request->get('q', 85);
        $quality = min(100, max(1, (int) $quality));

        // Handle format conversion
        $format = $request->get('format', 'auto');
        if ($format === 'webp') {
            return $image->encode('webp', $quality);
        } elseif ($format === 'jpg' || $format === 'jpeg') {
            return $image->encode('jpg', $quality);
        } elseif ($format === 'png') {
            return $image->encode('png');
        } else {
            // Auto-detect best format
            if ($image->mime() === 'image/png' && $image->width() > 500) {
                return $image->encode('jpg', $quality);
            }
            return $image->encode(null, $quality);
        }
    }

    /**
     * Clear image cache
     */
    public function clearCache()
    {
        $keys = Cache::getRedis()->keys('image_*');
        
        foreach ($keys as $key) {
            Cache::forget($key);
        }

        return response()->json(['message' => 'Image cache cleared successfully']);
    }
}
