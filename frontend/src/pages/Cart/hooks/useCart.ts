"use client";

import { useState, useMemo } from 'react';

export const useCart = () => {
  const [items, setItems] = useState([
    {
      product: {
        id: '1',
        ad: 'Endüstriyel Robot Kol v4',
        kategori: 'Endüstriyel',
        aciklama: '6 eksenli yüksek hassasiyetli üretim robotu.',
        stok: 12,
        gorseller: ['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80']
      },
      quantity: 2
    },
    {
      product: {
        id: '3',
        ad: 'Nexus Pro İş İstasyonu',
        kategori: 'Elektronik',
        aciklama: 'Mühendislik bilgisayarı.',
        stok: 25,
        gorseller: ['https://images.unsplash.com/photo-1587202377405-836167b1dec7?auto=format&fit=crop&q=80']
      },
      quantity: 1
    }
  ]);

  const updateQuantity = (id: string, qty: number) => {
    setItems(prev => prev.map(item => item.product.id === id ? { ...item, quantity: qty } : item));
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.product.id !== id));
  };

  return {
    items,
    updateQuantity,
    removeItem,
    totalItems: items.reduce((acc, curr) => acc + curr.quantity, 0),
    isEmpty: items.length === 0
  };
};
