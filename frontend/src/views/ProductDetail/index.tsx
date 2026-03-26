"use client";

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Container from '../../components/Container';
import QuantitySelector from '../../components/QuantitySelector';
import { HiOutlineBadgeCheck, HiOutlineShoppingBag, HiOutlineDocumentReport, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { useProductDetail } from './hooks/useProductDetail';
import { useParams } from 'next/navigation';
import { useCartContext } from '../../context/CartContext';

const ProductDetailPage: React.FC = () => {
  const params = useParams();
  const id = params?.id as string;
  const { product } = useProductDetail(id);
  const { addToCart } = useCartContext();
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, quantity);
    setTimeout(() => setIsAdding(false), 800);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black">
      <Navbar />
      
      <main className="flex-1 py-12 lg:py-32">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Gallery Section */}
            <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-left-8 duration-700">
               <div className="relative aspect-square rounded-[3rem] overflow-hidden bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-white/10 group shadow-2xl">
                  <img 
                    src={product.images[currentImage]} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.05]"
                  />
                  {/* Prev/Next buttons */}
                  {product.images.length > 1 && (
                     <>
                        <button 
                          onClick={() => setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length)}
                          className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 dark:bg-black/80 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all text-gray-900 dark:text-white"
                        >
                          <HiChevronLeft className="w-8 h-8" />
                        </button>
                        <button 
                          onClick={() => setCurrentImage((prev) => (prev + 1) % product.images.length)}
                          className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 dark:bg-black/80 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all text-gray-900 dark:text-white"
                        >
                          <HiChevronRight className="w-8 h-8" />
                        </button>
                     </>
                  )}
               </div>

               {/* Thumbnails */}
               <div className="flex items-center gap-6 overflow-x-auto pb-4 px-2 scrollbar-none">
                  {product.images.map((img, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setCurrentImage(idx)}
                      className={`relative w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all shrink-0 hover:scale-105 active:scale-95 shadow-md ${currentImage === idx ? 'border-blue-600 ring-4 ring-blue-600/10' : 'border-transparent opacity-60 hover:opacity-100'}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
               </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-col space-y-10 animate-in fade-in slide-in-from-right-8 duration-700">
               {/* Label & Status */}
               <div className="flex items-center gap-4">
                  <span className="px-6 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-xs font-bold uppercase tracking-widest border border-blue-100 dark:border-blue-800">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-2 text-emerald-500 font-bold text-xs uppercase tracking-widest px-6 py-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-full border border-emerald-100 dark:border-emerald-800">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    Stokta: {product.stock} adet
                  </div>
               </div>

               <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.1]">
                 {product.name}
               </h1>

               <div className="text-xl text-gray-500 dark:text-gray-400 font-medium leading-relaxed max-w-xl">
                 {product.description}
               </div>

               {/* Features / Specs */}
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                  <div className="flex items-center gap-3 group p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-white/5">
                     <HiOutlineBadgeCheck className="w-8 h-8 text-blue-600 transition-transform group-hover:scale-110" />
                     <span className="font-bold text-gray-700 dark:text-gray-300 uppercase text-xs tracking-wider">Garanti: 2 Yıl</span>
                  </div>
                  <div className="flex items-center gap-3 group p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-white/5">
                     <HiOutlineDocumentReport className="w-8 h-8 text-indigo-600 transition-transform group-hover:scale-110" />
                     <span className="font-bold text-gray-700 dark:text-gray-300 uppercase text-xs tracking-wider">Sertifikalı Üretim</span>
                  </div>
               </div>

               {/* Actions */}
               <div className="pt-10 flex flex-col gap-8">
                  <div className="flex flex-col gap-3">
                     <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Miktar Seçin</span>
                     <QuantitySelector 
                        quantity={quantity} 
                        onChange={setQuantity}
                        className="w-full max-w-xs h-16 px-4" 
                     />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                     <button 
                       onClick={handleAddToCart}
                       disabled={isAdding}
                       className="flex-1 flex items-center justify-center gap-4 px-10 py-5 bg-blue-600 text-white rounded-2xl text-xl font-bold hover:bg-blue-700 transition-all cursor-pointer shadow-xl shadow-blue-600/25 active:scale-[0.98] disabled:bg-gray-400"
                     >
                        <HiOutlineShoppingBag className="w-7 h-7" />
                        {isAdding ? 'Ekleniyor...' : 'Sepete Ekle'}
                     </button>
                     <button className="flex-1 flex items-center justify-center gap-4 px-10 py-5 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white border-2 border-gray-100 dark:border-white/10 rounded-2xl text-xl font-bold hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all cursor-pointer shadow-sm active:scale-[0.98]">
                        <HiOutlineDocumentReport className="w-7 h-7" />
                        Teklif İste
                     </button>
                  </div>
               </div>
            </div>
          </div>
        </Container>
      </main>

      <footer className="py-16 border-t border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-zinc-950">
        <Container>
           <p className="text-center text-gray-400 font-bold uppercase tracking-widest text-xs">Nexus B2B Çözümleri</p>
        </Container>
      </footer>
    </div>
  );
};

export default ProductDetailPage;
