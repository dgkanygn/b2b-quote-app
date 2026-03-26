"use client";

import { useMemo } from 'react';

// Normally would be fetched from API
const DUMMY_PRODUCTS = [
  {
    id: '1',
    name: 'Endüstriyel Robot Kol v4',
    category: 'Endüstriyel',
    description: '6 eksenli yüksek hassasiyetli üretim robotu. Ağır yük kapasiteli ve enerji verimli. 1.2 metre erişim mesafesi, 10kg taşıma kapasitesi ve gelişmiş çarpışma algılama sistemi ile donatılmıştır.',
    stock: 12,
    images: ['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1544724569-5f546fa602b5?auto=format&fit=crop&q=80']
  },
  // ... other products
];

export const useProductDetail = (id: string) => {
  const product = useMemo(() => {
    return DUMMY_PRODUCTS.find(p => p.id === id) || DUMMY_PRODUCTS[0];
  }, [id]);

  return {
    product,
    isLoading: false,
    error: null
  };
};
