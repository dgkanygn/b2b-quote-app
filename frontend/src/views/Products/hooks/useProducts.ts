"use client";

import { useState, useMemo } from 'react';

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  stock: number;
  images: string[];
}

const DUMMY_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Endüstriyel Robot Kol v4',
    category: 'Endüstriyel',
    description: '6 eksenli yüksek hassasiyetli üretim robotu. Ağır yük kapasiteli ve enerji verimli.',
    stock: 12,
    images: [
      'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80'
    ]
  },
  {
    id: '2',
    name: 'Hassas Lazer Kesim Masası',
    category: 'Endüstriyel',
    description: 'CNC kontrollü 3000W fiber lazer kesim ünitesi. Çelik ve alüminyum için ideal.',
    stock: 5,
    images: [
      'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80'
    ]
  },
  {
    id: '3',
    name: 'Nexus Pro İş İstasyonu',
    category: 'Elektronik',
    description: '32 çekirdekli işlemci, 128GB RAM ve RTX 4090 GPU ile donatılmış mühendislik bilgisayarı.',
    stock: 25,
    images: [
      'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80'
    ]
  },
  {
    id: '4',
    name: 'ErgoDesign Akıllı Ofis Koltuğu',
    category: 'Mobilya',
    description: 'Vücut ısısına duyarlı file yapılı, bel destekli ve 4D kolçaklı premium tasarım.',
    stock: 50,
    images: [
      'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80'
    ]
  },
  {
    id: '5',
    name: 'UltraScale Hassas Terazi',
    category: 'Laboratuvar',
    description: '0.0001g hassasiyetle ölçüm yapabilen, kalibrasyon sertifikalı laboratuvar terazisi.',
    stock: 8,
    images: [
      'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80'
    ]
  },
  {
    id: '6',
    name: 'SmartHub Veri Toplama Terminali',
    category: 'Elektronik',
    description: 'IoT uyumlu kablosuz sensör ağ geçidi. Çoklu protokol desteği ve bulut entegrasyonu.',
    stock: 42,
    images: [
      'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80'
    ]
  }
];

export const useProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('asc');

  const filteredProducts = useMemo(() => {
    return DUMMY_PRODUCTS
      .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter(p => (category ? p.category === category : true))
      .sort((a, b) => {
        if (sortBy === 'asc') return a.name.localeCompare(b.name);
        if (sortBy === 'desc') return b.name.localeCompare(a.name);
        if (sortBy === 'stock') return b.stock - a.stock;
        return 0;
      });
  }, [searchTerm, category, sortBy]);

  return {
    products: filteredProducts,
    setSearchTerm,
    setCategory,
    setSortBy,
    isLoading: false
  };
};
