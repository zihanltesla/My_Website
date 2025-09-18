'use client';

import { useEffect } from 'react';

interface ImagePreloaderProps {
  images: string[];
}

export function ImagePreloader({ images }: ImagePreloaderProps) {
  useEffect(() => {
    // Preload critical images
    images.forEach((src) => {
      // Try WebP version first
      let optimizedSrc = src;
      if (src.match(/\.(jpg|jpeg|png)$/i)) {
        optimizedSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      }

      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = optimizedSrc;
      link.type = 'image/webp';
      
      // Add fallback for browsers that don't support WebP
      link.onerror = () => {
        if (optimizedSrc !== src) {
          const fallbackLink = document.createElement('link');
          fallbackLink.rel = 'preload';
          fallbackLink.as = 'image';
          fallbackLink.href = src;
          document.head.appendChild(fallbackLink);
        }
      };
      
      document.head.appendChild(link);
    });
  }, [images]);

  return null; // This component doesn't render anything
}
