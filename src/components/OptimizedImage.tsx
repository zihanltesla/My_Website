'use client';

import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
  style?: React.CSSProperties;
  onLoad?: () => void;
  onError?: () => void;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes,
  fill = false,
  style,
  onLoad,
  onError,
  ...props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(() => {
    // Try to use WebP version first
    if (src.match(/\.(jpg|jpeg|png)$/i)) {
      const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      return webpSrc;
    }
    return src;
  });

  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError && imgSrc !== src) {
      // Fallback to original image if WebP fails
      setHasError(true);
      setImgSrc(src);
    } else {
      onError?.();
    }
  };

  const handleLoad = () => {
    onLoad?.();
  };

  const imageProps = {
    src: imgSrc,
    alt,
    className,
    priority,
    sizes,
    style,
    onLoad: handleLoad,
    onError: handleError,
    ...props,
  };

  if (fill) {
    return <Image {...imageProps} fill />;
  }

  if (width && height) {
    return <Image {...imageProps} width={width} height={height} />;
  }

  // For responsive images without explicit dimensions
  return (
    <Image
      {...imageProps}
      width={0}
      height={0}
      style={{
        width: '100%',
        height: 'auto',
        ...style,
      }}
    />
  );
}
