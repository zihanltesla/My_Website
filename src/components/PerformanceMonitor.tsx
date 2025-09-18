'use client';

import { useEffect } from 'react';

export function PerformanceMonitor() {
  useEffect(() => {
    // Only run in production and on client side
    if (process.env.NODE_ENV !== 'production' || typeof window === 'undefined') {
      return;
    }

    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const { name, value } = entry as any;
        
        // Log performance metrics (you can send these to analytics)
        console.log(`Performance metric: ${name}`, value);
        
        // You can send these to Google Analytics, Vercel Analytics, etc.
        // Example: gtag('event', name, { value: Math.round(value) });
      }
    });

    // Observe Core Web Vitals
    try {
      observer.observe({ entryTypes: ['measure', 'navigation', 'paint'] });
    } catch (e) {
      // Fallback for browsers that don't support all entry types
      console.warn('Performance observer not fully supported');
    }

    // Monitor resource loading
    const resourceObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const resource = entry as PerformanceResourceTiming;
        
        // Log slow resources
        if (resource.duration > 1000) {
          console.warn(`Slow resource: ${resource.name} took ${resource.duration}ms`);
        }
      }
    });

    try {
      resourceObserver.observe({ entryTypes: ['resource'] });
    } catch (e) {
      console.warn('Resource observer not supported');
    }

    // Cleanup
    return () => {
      observer.disconnect();
      resourceObserver.disconnect();
    };
  }, []);

  return null; // This component doesn't render anything
}
