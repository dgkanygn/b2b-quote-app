"use client";

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Container from '../../components/Container';
import QuantitySelector from '../../components/QuantitySelector';
import { HiOutlineTrash, HiOutlineCloudDownload, HiOutlineChevronDoubleRight, HiOutlineArchive } from 'react-icons/hi';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import QuoteModal from './components/QuoteModal';
import { useCart } from './hooks/useCart';
import { quoteService } from '../../services/quoteService';
import toast from 'react-hot-toast';

const CartPage: React.FC = () => {
  const { items, updateQuantity, removeItem, isEmpty, clearCart } = useCart();
  const { isLoggedIn } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQuoteRequest = async (formData: any) => {
    setIsSubmitting(true);
    try {
      const payload: any = {
        note: formData.note || '',
        items: items.map((item: any) => ({
          product_id: Number(item.product.id),
          quantity: item.quantity,
        })),
      };

      if (!isLoggedIn) {
        payload.guest_email = formData.guest_email;
        payload.guest_company_name = formData.guest_company_name;
      }

      await quoteService.create(payload);

      clearCart();
      setIsModalOpen(false);
      toast.success('Teklif talebiniz başarıyla oluşturuldu!');
    } catch (err: any) {
      const message = err?.response?.data?.error || 'Teklif oluşturulurken bir hata oluştu.';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleExcelDownload = () => {
    alert("Excel dosyası hazırlanıyor ve indiriliyor...");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-black">
      <Navbar />
      
      <main className="flex-1 py-12 lg:py-24">
        <Container>
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* List Section */}
            <div className="flex-1 space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
               <div className="flex items-center justify-between border-b border-gray-100 dark:border-white/5 pb-8">
                  <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white uppercase tracking-wider">
                    Sepetiniz <span className="text-blue-600">({items.length} Ürün)</span>
                  </h1>
                  <button 
                    onClick={handleExcelDownload}
                    className="group flex items-center gap-3 px-6 py-3 bg-emerald-500/10 text-emerald-600 rounded-2xl text-sm font-bold uppercase transition-all hover:bg-emerald-500 hover:text-white cursor-pointer active:scale-95"
                  >
                     <HiOutlineCloudDownload className="w-5 h-5 group-hover:animate-bounce" />
                     Excel İndir
                  </button>
               </div>

               {isEmpty ? (
                 <div className="py-32 flex flex-col items-center justify-center space-y-8 glass-card rounded-[3rem]">
                    <div className="w-24 h-24 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center">
                       <HiOutlineArchive className="text-4xl text-gray-400" />
                    </div>
                    <p className="text-2xl font-bold text-gray-400">Sepetiniz boş.</p>
                    <Link href="/products" className="px-10 py-4 bg-blue-600 text-white rounded-2xl text-lg font-bold hover:bg-blue-700 transition-all cursor-pointer">
                       Alışverişe Başla
                    </Link>
                 </div>
               ) : (
                 <div className="space-y-6">
                    {items.map((item: any) => (
                      <div 
                        key={item.product.id} 
                        className="group flex flex-col sm:flex-row items-center gap-8 p-8 bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-gray-100 dark:border-white/5 hover:border-blue-500/30 transition-all duration-300 premium-shadow"
                      >
                         <div className="w-32 h-32 rounded-3xl overflow-hidden shrink-0 bg-gray-50 dark:bg-black border border-gray-100 dark:border-white/5 shadow-md">
                            <img src={item.product.images?.[0] || ''} alt="" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                         </div>
                         
                         <div className="flex-1 flex flex-col gap-2 text-center sm:text-left">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                {item.product.name}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                               Kategori: {item.product.category}
                            </p>
                            <p className="text-xs text-blue-600 font-bold uppercase tracking-widest mt-1">
                               Stok: {item.product.stock}
                            </p>
                         </div>

                         <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
                            <QuantitySelector 
                               quantity={item.quantity} 
                               onChange={(qty) => updateQuantity(item.product.id, qty)}
                               className="h-14 px-4 w-full sm:w-auto" 
                            />
                            <button 
                              onClick={() => removeItem(item.product.id)}
                              className="p-4 bg-red-50 dark:bg-red-900/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all cursor-pointer active:scale-90"
                            >
                               <HiOutlineTrash className="w-6 h-6" />
                            </button>
                         </div>
                      </div>
                    ))}
                 </div>
               )}
            </div>

            {/* Sticky Summary / Checkout */}
            {!isEmpty && (
              <div className="lg:w-96 animate-in fade-in slide-in-from-right-8 duration-700">
                 <div className="sticky top-32 p-10 bg-white dark:bg-zinc-900 rounded-[3rem] border border-gray-100 dark:border-white/5 space-y-8 premium-shadow">
                    <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight uppercase">Özet</h2>
                    
                    <div className="space-y-4 font-medium">
                       <div className="flex justify-between text-gray-500">
                          <span>Toplam Ürün</span>
                          <span className="font-bold text-gray-900 dark:text-white">{items.length} Kalem</span>
                       </div>
                       <div className="flex justify-between text-gray-500">
                          <span>Toplam Miktar</span>
                           <span className="font-bold text-gray-900 dark:text-white">{items.reduce((a: number, b: any) => a + b.quantity, 0)} Adet</span>
                        </div>
                       <div className="pt-6 border-t border-gray-100 dark:border-white/5 flex justify-between">
                          <span className="text-xl font-extrabold text-gray-900 dark:text-white">Genel Toplam</span>
                          <span className="text-blue-600 font-extrabold text-xl">Fiyat Teklifi İçin...</span>
                       </div>
                    </div>

                    <button 
                      onClick={() => setIsModalOpen(true)}
                      className="group w-full flex items-center justify-center gap-4 px-10 py-6 bg-blue-600 text-white rounded-[2rem] text-xl font-bold hover:bg-blue-700 transition-all cursor-pointer shadow-xl shadow-blue-600/30 active:scale-95"
                    >
                      Tümünü Teklif Al
                      <HiOutlineChevronDoubleRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </button>
                    
                    <p className="text-[10px] text-gray-400 text-center font-medium uppercase tracking-[0.2em]">KDV Hariçtir • Ücretsiz Danışmanlık</p>
                 </div>
              </div>
            )}
          </div>
        </Container>
      </main>

      <QuoteModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isLoggedIn={isLoggedIn}
        onSubmit={handleQuoteRequest}
      />

      <footer className="py-12 bg-white dark:bg-zinc-950 border-t border-gray-100 dark:border-white/5">
        <Container>
           <p className="text-center text-xs text-gray-400 font-bold uppercase tracking-widest leading-loose">Nexus Quote Services • Global Enterprise Marketplace</p>
        </Container>
      </footer>
    </div>
  );
};

export default CartPage;
