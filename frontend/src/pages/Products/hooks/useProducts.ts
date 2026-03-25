"use client";

import { useState, useMemo } from 'react';

export interface Product {
  id: string;
  ad: string;
  kategori: string;
  aciklama: string;
  stok: number;
  gorseller: string[];
}

const DUMMY_PRODUCTS: Product[] = [
  {
    id: '1',
    ad: 'Endüstriyel Robot Kol v4',
    kategori: 'Endüstriyel',
    aciklama: '6 eksenli yüksek hassasiyetli üretim robotu. Ağır yük kapasiteli ve enerji verimli.',
    stok: 12,
    gorseller: [
      'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80'
    ]
  },
  {
    id: '2',
    ad: 'Hassas Lazer Kesim Masası',
    kategori: 'Endüstriyel',
    aciklama: 'CNC kontrollü 3000W fiber lazer kesim ünitesi. Çelik ve alüminyum için ideal.',
    stok: 5,
    gorseller: [
      'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80'
    ]
  },
  {
    id: '3',
    ad: 'Nexus Pro İş İstasyonu',
    kategori: 'Elektronik',
    aciklama: '32 çekirdekli işlemci, 128GB RAM ve RTX 4090 GPU ile donatılmış mühendislik bilgisayarı.',
    stok: 25,
    gorseller: [
      'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80'
    ]
  },
  {
    id: '4',
    ad: 'ErgoDesign Akıllı Ofis Koltuğu',
    kategori: 'Mobilya',
    aciklama: 'Vücut ısısına duyarlı file yapılı, bel destekli ve 4D kolçaklı premium tasarım.',
    stok: 50,
    gorseller: [
      'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80'
    ]
  },
  {
    id: '5',
    ad: 'UltraScale Hassas Terazi',
    kategori: 'Laboratuvar',
    aciklama: '0.0001g hassasiyetle ölçüm yapabilen, kalibrasyon sertifikalı laboratuvar terazisi.',
    stok: 8,
    gorseller: [
      'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80'
    ]
  },
  {
    id: '6',
    ad: 'SmartHub Veri Toplama Terminali',
    kategori: 'Elektronik',
    aciklama: 'IoT uyumlu kablosuz sensör ağ geçidi. Çoklu protokol desteği ve bulut entegrasyonu.',
    stok: 42,
    gorseller: [
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
      .filter(p => p.ad.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter(p => (category ? p.kategori === category : true))
      .sort((a, b) => {
        if (sortBy === 'asc') return a.ad.localeCompare(b.ad);
        if (sortBy === 'desc') return b.ad.localeCompare(a.ad);
        if (sortBy === 'stock') return b.stok - a.stok;
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
