"use client";

import { useState, useEffect } from 'react';
import { productService } from '../../../services/productService';
import type { Product } from '../../../types';

export const useProductDetail = (id: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const p = await productService.getById(id);
        setProduct(p);
      } catch (err: any) {
        setError(err?.response?.data?.error || 'Ürün detayı yüklenirken bir hata oluştu.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return {
    product,
    isLoading,
    error
  };
};
