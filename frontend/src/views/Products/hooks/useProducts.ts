"use client";

import { useState, useEffect, useCallback } from 'react';
import { productService } from '../../../services/productService';
import type { Product } from '../../../types';

export type { Product };

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('asc');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { products: data } = await productService.getAll({
        search: searchTerm || undefined,
        category: category || undefined,
        status: 'active',
      });

      // Client-side sorting
      data.sort((a: Product, b: Product) => {
        if (sortBy === 'asc') return a.name.localeCompare(b.name);
        if (sortBy === 'desc') return b.name.localeCompare(a.name);
        if (sortBy === 'stock') return b.stock - a.stock;
        if (sortBy === 'newest') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        return 0;
      });

      setProducts(data);
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Ürünler yüklenirken bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, category, sortBy]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchProducts();
    }, 300);
    return () => clearTimeout(debounce);
  }, [fetchProducts]);

  return {
    products,
    setSearchTerm,
    setCategory,
    setSortBy,
    isLoading,
    error
  };
};
