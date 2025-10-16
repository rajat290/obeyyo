import { useEffect, useRef, useCallback, useState } from 'react';

export const usePerformance = () => {
  const renderCount = useRef(0);
  const componentName = useRef('');

  useEffect(() => {
    renderCount.current++;
    console.log(`[Performance] ${componentName.current} rendered: ${renderCount.current} times`);
  });

  const setComponentName = useCallback((name: string) => {
    componentName.current = name;
  }, []);

  const measureFunction = useCallback(async <T>(
    fn: () => Promise<T>,
    operationName: string
  ): Promise<{ result: T; duration: number }> => {
    const start = performance.now();
    const result = await fn();
    const end = performance.now();
    const duration = end - start;
    
    console.log(`[Performance] ${operationName} took ${duration.toFixed(2)}ms`);
    
    return { result, duration };
  }, []);

  return {
    setComponentName,
    measureFunction,
    renderCount: renderCount.current,
  };
};

// Debounce hook for search and filter operations
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Throttle hook for scroll and resize events
export const useThrottle = <T>(value: T, limit: number): T => {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastRan = useRef(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= limit) {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }
    }, limit - (Date.now() - lastRan.current));

    return () => {
      clearTimeout(handler);
    };
  }, [value, limit]);

  return throttledValue;
};