"use client";

import React, { useState } from 'react';
import { HiOutlineShoppingCart, HiOutlineDocumentText, HiOutlineEye, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import Link from 'next/link';
import QuantitySelector from '../QuantitySelector';
import { useCartContext } from '../../context/CartContext';

interface ProductCardProps {
  product: {
    id: string | number;
    name: string;
    category: string;
    description: string;
    stock: number;
    images: string[];
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCartContext();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsAdding(true);
    
    addToCart({ ...product, id: String(product.id) }, quantity);
    
    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <div className="group bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-gray-100 dark:border-white/5 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 flex flex-col h-full premium-shadow">
      {/* Image Section */}
      <Link href={`/products/${product.id}`} className="relative aspect-square overflow-hidden bg-gray-50 dark:bg-zinc-800 cursor-pointer">
        <img 
          src={product.images[currentImageIndex] || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop"} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Navigation Overlays */}
        {product.images.length > 1 && (
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
              onClick={prevImage}
              className="w-10 h-10 bg-white/50 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white transition-colors cursor-pointer text-gray-800"
            >
              <HiChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={nextImage}
              className="w-10 h-10 bg-white/50 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white transition-colors cursor-pointer text-gray-800"
            >
              <HiChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-6 left-6 flex flex-col gap-2">
          <span className="px-4 py-1.5 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-blue-600 shadow-sm border border-white/20">
            {product.category}
          </span>
          {product.stock < 10 && (
            <span className="px-4 py-1.5 bg-red-500/90 text-white rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm">
              Son {product.stock} Adet
            </span>
          )}
        </div>
      </Link>

      {/* Content Section */}
      <div className="p-8 flex flex-col flex-1 gap-6">
        <Link href={`/products/${product.id}`} className="flex flex-col gap-2 cursor-pointer">
          <h3 className="text-xl font-extrabold text-gray-900 dark:text-white line-clamp-1 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed font-medium">
            {product.description}
          </p>
        </Link>

        <div className="mt-auto pt-6 border-t border-gray-100 dark:border-white/5 flex items-center justify-between gap-4">
          <QuantitySelector 
            quantity={quantity} 
            onChange={setQuantity} 
            className="flex-1 max-w-[120px]" 
          />
          <div className="flex items-center gap-2">
            <button 
              onClick={handleAddToCart}
              disabled={isAdding}
              title="Sepete Ekle"
              className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all cursor-pointer shadow-lg shadow-blue-600/20 active:scale-95 disabled:bg-gray-400"
            >
              <HiOutlineShoppingCart className="w-5 h-5" />
            </button>
            <button 
              title="Teklif Al"
              className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all cursor-pointer shadow-lg shadow-indigo-600/20 active:scale-95"
            >
              <HiOutlineDocumentText className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
