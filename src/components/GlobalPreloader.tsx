'use client';

import { useEffect } from 'react';

interface GlobalPreloaderProps {
  criticalResources?: string[];
}

export function GlobalPreloader({ criticalResources = [] }: GlobalPreloaderProps) {
  useEffect(() => {
    // Global critical resources that should be preloaded on every page
    const globalCriticalResources = [
      '/images/avatar.jpg', // User avatar - used on most pages
      '/images/ai-assistant-avatar.jpg', // Chatbot avatar
      ...criticalResources
    ];

    const preloadedLinks: HTMLLinkElement[] = [];

    globalCriticalResources.forEach((src, index) => {
      // Only preload first 4 global resources to avoid over-preloading
      if (index >= 4) return;

      // Try WebP version first for images
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

    // Cleanup function
    return () => {
      preloadedLinks.forEach(link => {
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      });
    };
  }, [criticalResources]);

  return null;
}
