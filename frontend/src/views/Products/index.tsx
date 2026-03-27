"use client";

import React from 'react';
import Navbar from '../../components/Navbar';
import Container from '../../components/Container';
import FilterBar from '../../components/FilterBar';
import ProductCard from '../../components/ProductCard';
import { useProducts } from './hooks/useProducts';

const ProductsPage: React.FC = () => {
  const { products, setSearchTerm, setCategory, setSortBy, isLoading, error } = useProducts();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-black">
      <Navbar />
      
      <main className="flex-1 py-12 lg:py-20">
        <Container>
          {/* Header */}
          <div className="flex flex-col gap-4 mb-16 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Endüstriyel <span className="text-blue-600">Ürün Portföyü</span>
            </h1>
            <p className="max-w-2xl text-lg text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
              Aradığınız tüm profesyonel ürünleri buradan listeleyebilir, filtreleme yaparak ihtiyacınız olanı bulabilirsiniz.
            </p>
          </div>

          {/* Filters */}
          <FilterBar 
            onSearchChange={setSearchTerm} 
            onCategoryChange={setCategory} 
            onSortChange={setSortBy} 
          />

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12 mt-16">
            {isLoading ? (
              <div className="col-span-full flex items-center justify-center py-32">
                <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : error ? (
              <div className="col-span-full py-40 flex flex-col items-center justify-center space-y-6">
                <p className="text-xl font-bold text-red-400">{error}</p>
              </div>
            ) : products.length > 0 ? (
              products.map((product) => (
                <div key={product.id} className="animate-in fade-in slide-in-from-bottom-8 duration-500">
                  <ProductCard product={product} />
                </div>
              ))
            ) : (
              <div className="col-span-full py-40 flex flex-col items-center justify-center space-y-6">
                <div className="w-24 h-24 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center">
                  <span className="text-4xl opacity-50">🔍</span>
                </div>
                <p className="text-xl font-bold text-gray-400">Ürün bulunamadı.</p>
              </div>
            )}
          </div>
        </Container>
      </main>

      {/* Footer minimal */}
      <footer className="py-12 border-t border-gray-100 dark:border-white/5 bg-white dark:bg-zinc-950">
        <Container>
           <p className="text-center text-gray-400 text-sm font-medium">© 2026 Nexus B2B Inc. Tüm hakları saklıdır.</p>
        </Container>
      </footer>
    </div>
  );
};

export default ProductsPage;
