import { usePage } from '@inertiajs/react';
import React from 'react';

interface OptimizedImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    quality?: number;
    format?: 'auto' | 'webp' | 'jpg' | 'png';
    className?: string;
    loading?: 'lazy' | 'eager';
    onLoad?: () => void;
    onError?: () => void;
}

export default function OptimizedImage({
    src,
    alt,
    width,
    height,
    quality = 85,
    format = 'auto',
    className = '',
    loading = 'lazy',
    onLoad,
    onError,
}: OptimizedImageProps) {
    const { url } = usePage().props as any;
    const [imageSrc, setImageSrc] = React.useState('');
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [hasError, setHasError] = React.useState(false);

    React.useEffect(() => {
        // Generate optimized image URL
        const params = new URLSearchParams();
        
        if (width) params.append('w', width.toString());
        if (height) params.append('h', height.toString());
        if (quality !== 85) params.append('q', quality.toString());
        if (format !== 'auto') params.append('format', format);
        
        const queryString = params.toString();
        const baseUrl = src.startsWith('http') ? src : `${url}/images/${src}`;
        const optimizedUrl = queryString ? `${baseUrl}?${queryString}` : baseUrl;
        
        setImageSrc(optimizedUrl);
    }, [src, width, height, quality, format, url]);

    const handleLoad = () => {
        setIsLoaded(true);
        onLoad?.();
    };

    const handleError = () => {
        setHasError(true);
        onError?.();
    };

    // Fallback for external images (not hosted on our server)
    const isExternalImage = src.startsWith('http');
    const finalSrc = isExternalImage ? src : imageSrc;

    if (hasError) {
        return (
            <div className={`flex items-center justify-center bg-gray-200 ${className}`}>
                <span className="text-gray-500 text-sm">Image not available</span>
            </div>
        );
    }

    return (
        <div className={`relative ${className}`}>
            {!isLoaded && (
                <div className="absolute inset-0 bg-gray-100 animate-pulse rounded" />
            )}
            <img
                src={finalSrc}
                alt={alt}
                width={width}
                height={height}
                loading={loading}
                onLoad={handleLoad}
                onError={handleError}
                className={`transition-opacity duration-300 ${
                    isLoaded ? 'opacity-100' : 'opacity-0'
                } ${className}`}
            />
        </div>
    );
}

// Hook for generating image URLs
export function useOptimizedImage() {
    const { url } = usePage().props as any;

    const getImageUrl = (
        src: string,
        options?: {
            width?: number;
            height?: number;
            quality?: number;
            format?: 'auto' | 'webp' | 'jpg' | 'png';
        }
    ) => {
        // For external images, return as-is
        if (src.startsWith('http')) {
            return src;
        }

        const params = new URLSearchParams();
        
        if (options?.width) params.append('w', options.width.toString());
        if (options?.height) params.append('h', options.height.toString());
        if (options?.quality && options.quality !== 85) params.append('q', options.quality.toString());
        if (options?.format && options.format !== 'auto') params.append('format', options.format);
        
        const queryString = params.toString();
        const baseUrl = `${url}/images/${src}`;
        
        return queryString ? `${baseUrl}?${queryString}` : baseUrl;
    };

    return { getImageUrl };
}
