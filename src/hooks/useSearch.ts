import { useState, useEffect, useMemo } from 'react';
import { useDebounce } from './usePerformance';
import productService from '../services/productService';
import { Product, ProductFilters } from '../types';

interface UseSearchOptions {
  initialQuery?: string;
  debounceDelay?: number;
  maxResults?: number;
}

export const useSearch = (options: UseSearchOptions = {}) => {
  const {
    initialQuery = '',
    debounceDelay = 300,
    maxResults = 50,
  } = options;

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [filters, setFilters] = useState<ProductFilters>({});

  const debouncedQuery = useDebounce(query, debounceDelay);

  const searchProducts = async (searchQuery: string, searchFilters: ProductFilters = {}): Promise<void> => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await productService.searchProducts(searchQuery, {
        ...searchFilters,
        limit: maxResults,
      });

      setResults(response.data?.data || []);
    } catch (err: any) {
      setError('Search failed. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (debouncedQuery.trim()) {
      searchProducts(debouncedQuery, filters);
    } else {
      setResults([]);
    }
  }, [debouncedQuery, filters]);

  const clearSearch = (): void => {
    setQuery('');
    setResults([]);
    setError('');
  };

  const updateFilters = (newFilters: Partial<ProductFilters>): void => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const memoizedResults = useMemo(() => results, [results]);

  return {
    query,
    setQuery,
    results: memoizedResults,
    loading,
    error,
    filters,
    updateFilters,
    clearSearch,
    searchProducts,
  };
};