export class ImageService {
  private static instance: ImageService;
  private imageCache: Map<string, string> = new Map();

  private constructor() {}

  static getInstance(): ImageService {
    if (!ImageService.instance) {
      ImageService.instance = new ImageService();
    }
    return ImageService.instance;
  }

  // Optimize image URL for different sizes
  optimizeImageUrl(url: string, width: number = 400, height: number = 400, quality: number = 80): string {
    if (!url) return '/placeholder-image.jpg';
    
    // If it's a local image, return as is
    if (url.startsWith('/') || url.startsWith('data:')) {
      return url;
    }

    // For external images, you can integrate with image CDN here
    // Example: Cloudinary, Imgix, or your own image optimization service
    const cacheKey = `${url}-${width}x${height}-q${quality}`;
    
    if (this.imageCache.has(cacheKey)) {
      return this.imageCache.get(cacheKey)!;
    }

    // Simple URL manipulation for demonstration
    // In real project, use proper image CDN
    const optimizedUrl = this.addImageParams(url, width, height, quality);
    this.imageCache.set(cacheKey, optimizedUrl);
    
    return optimizedUrl;
  }

  private addImageParams(url: string, width: number, height: number, quality: number): string {
    try {
      const urlObj = new URL(url);
      urlObj.searchParams.set('w', width.toString());
      urlObj.searchParams.set('h', height.toString());
      urlObj.searchParams.set('q', quality.toString());
      urlObj.searchParams.set('fit', 'cover');
      return urlObj.toString();
    } catch {
      // If URL parsing fails, return original
      return url;
    }
  }

  // Preload images for better performance
  preloadImages(urls: string[]): void {
    urls.forEach(url => {
      const img = new Image();
      img.src = this.optimizeImageUrl(url, 100, 100, 30); // Preload low quality
    });
  }

  // Clear cache
  clearCache(): void {
    this.imageCache.clear();
  }

  // Lazy load image
  lazyLoadImage(element: HTMLImageElement, src: string, placeholder: string = '/placeholder-image.jpg'): void {
    element.src = placeholder;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const optimizedSrc = this.optimizeImageUrl(src);
          element.src = optimizedSrc;
          observer.unobserve(element);
        }
      });
    });

    observer.observe(element);
  }
}

export const imageService = ImageService.getInstance();