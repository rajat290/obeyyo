import React, { useMemo, useRef, useEffect } from 'react';
import { Product } from '../types';
import { formatPrice } from '../utils/helpers';
import LazyImage from './LazyImage';

interface VirtualizedProductListProps {
  products: Product[];
  itemHeight?: number;
  containerHeight?: number;
  overscan?: number;
  onProductClick?: (product: Product) => void;
}

const VirtualizedProductList: React.FC<VirtualizedProductListProps> = ({
  products,
  itemHeight = 200,
  containerHeight = 600,
  overscan = 5,
  onProductClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = React.useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = (): void => {
      setScrollTop(container.scrollTop);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const visibleRange = useMemo(() => {
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const endIndex = Math.min(
      products.length - 1,
      Math.floor((scrollTop + containerHeight) / itemHeight) + overscan
    );
    return { startIndex, endIndex };
  }, [scrollTop, products.length, itemHeight, containerHeight, overscan]);

  const visibleProducts = useMemo(() => {
    return products.slice(visibleRange.startIndex, visibleRange.endIndex + 1);
  }, [products, visibleRange.startIndex, visibleRange.endIndex]);

  const totalHeight = products.length * itemHeight;

  return (
    <div
      ref={containerRef}
      className="overflow-auto"
      style={{ height: containerHeight }}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        {visibleProducts.map((product, index) => {
          const actualIndex = visibleRange.startIndex + index;
          const top = actualIndex * itemHeight;

          return (
            <div
              key={product.id}
              style={{
                position: 'absolute',
                top,
                height: itemHeight,
                width: '100%',
              }}
              className="border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => onProductClick?.(product)}
            >
              <div className="flex p-4 h-full">
                <div className="flex-shrink-0">
                  <LazyImage
                    src={product.images[0]}
                    alt={product.name}
                    width={120}
                    height={120}
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {product.brand}
                  </p>
                  <div className="flex items-center mt-2">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-4 h-4 ${
                            star <= Math.floor(product.rating)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-1 text-sm text-gray-600">
                      ({product.reviewCount})
                    </span>
                  </div>
                  <p className="text-lg font-bold text-gray-900 mt-2">
                    {formatPrice(product.price)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VirtualizedProductList;