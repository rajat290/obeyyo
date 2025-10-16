import React, { useRef, useEffect, useState } from 'react';
import { imageService } from '../services/imageService';

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  placeholder = '/placeholder-image.jpg',
  onLoad,
  onError,
}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [optimizedSrc, setOptimizedSrc] = useState(placeholder);

  useEffect(() => {
    if (!imgRef.current) return;

    const optimizedUrl = imageService.optimizeImageUrl(src, width, height);
    setOptimizedSrc(optimizedUrl);

    imageService.lazyLoadImage(imgRef.current, src, placeholder);
  }, [src, width, height, placeholder]);

  const handleLoad = (): void => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = (): void => {
    console.error(`Failed to load image: ${src}`);
    setIsLoaded(false);
    onError?.();
  };

  return (
    <img
      ref={imgRef}
      src={optimizedSrc}
      alt={alt}
      width={width}
      height={height}
      className={`transition-opacity duration-300 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      } ${className}`}
      onLoad={handleLoad}
      onError={handleError}
      loading="lazy"
      decoding="async"
    />
  );
};

export default LazyImage;