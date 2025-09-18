'use client';

import { useEffect } from 'react';

interface ImagePreloaderProps {
  images: string[];
}

export function ImagePreloader({ images }: ImagePreloaderProps) {
  useEffect(() => {
    if (!images.length) return;

    const preloadedLinks: HTMLLinkElement[] = [];

    // Preload critical images with better performance
    images.forEach((src, index) => {
      // Only preload first 3 images to avoid over-preloading
      if (index >= 3) return;

      // Try WebP version first
      let optimizedSrc = src;
      if (src.match(/\.(jpg|jpeg|png)$/i)) {
        optimizedSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      }

      // Check if already preloaded
      const existingLink = document.querySelector(`link[href="${optimizedSrc}"]`);
      if (existingLink) return;

      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = optimizedSrc;
      link.crossOrigin = 'anonymous';

      // Add fallback for browsers that don't support WebP
      link.onerror = () => {
        if (optimizedSrc !== src) {
          const fallbackLink = document.createElement('link');
          fallbackLink.rel = 'preload';
          fallbackLink.as = 'image';
          fallbackLink.href = src;
          fallbackLink.crossOrigin = 'anonymous';
          document.head.appendChild(fallbackLink);
          preloadedLinks.push(fallbackLink);
        }
      };

      document.head.appendChild(link);
      preloadedLinks.push(link);
    });

    // Cleanup function to remove preload links when component unmounts
    return () => {
      preloadedLinks.forEach(link => {
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      });
    };
  }, [images]);

  return null; // This component doesn't render anything
}
