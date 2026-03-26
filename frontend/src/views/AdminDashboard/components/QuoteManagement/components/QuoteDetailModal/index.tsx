import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { HiOutlineX, HiOutlineUser, HiOutlineCube, HiOutlineChatAlt2, HiOutlineCheckCircle, HiOutlineClock, HiOutlineBan } from 'react-icons/hi';

interface Product {
  id: string;
  name: string;
  category: string;
  images: string[];
}

interface RequestItem {
  id: string;
  request_id: string;
  product_id: string;
  quantity: number;
  offered_price: number;
  // Join for UI display
  product?: Product;
}

interface QuoteRequest {
  id: string;
  customer_id: string | null;
  guest_email: string | null;
  guest_company_name: string | null;
  note: string;
  status: 'pending' | 'responded' | 'rejected';
  total_price: number;
  created_at: string;
  request_items?: RequestItem[]; // Items array for detail view
}

interface QuoteDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  quote: QuoteRequest | null;
  onStatusUpdate: (id: string, newStatus: QuoteRequest['status']) => void;
}

const QuoteDetailModal: React.FC<QuoteDetailModalProps> = ({ isOpen, onClose, quote, onStatusUpdate }) => {
  const [activeTab, setActiveTab] = useState<'customer' | 'products' | 'notes'>('customer');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !quote || !mounted) return null;

  const tabs = [
    { id: 'customer', label: 'Müşteri Bilgisi', icon: HiOutlineUser },
    { id: 'products', label: 'Ürün Listesi', icon: HiOutlineCube },
    { id: 'notes', label: 'Talep Notu', icon: HiOutlineChatAlt2 },
  ];

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={onClose} 
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-300 border border-gray-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-8 sm:p-10 border-b border-gray-50 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-extrabold text-gray-900 uppercase tracking-wider">Talep Detayı</h2>
              <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                quote.status === 'pending' ? 'bg-orange-50 text-orange-600 border border-orange-100' :
                quote.status === 'responded' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                'bg-red-50 text-red-600 border border-red-100'
              }`}>
                {quote.status}
              </span>
            </div>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Ref: {quote.id}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-3 hover:bg-gray-100 rounded-2xl transition-all cursor-pointer text-gray-400 hover:text-gray-900"
          >
            <HiOutlineX className="w-6 h-6" />
          </button>
        </div>

        {/* Tabs & Content Area */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Navigation */}
          <div className="flex px-10 border-b border-gray-100 overflow-x-auto gap-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-3 py-6 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="text-sm font-extrabold uppercase tracking-widest">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
            {activeTab === 'customer' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <InfoItem label="Müşteri ID / Tip" value={quote.customer_id ? `Kayıtlı (${quote.customer_id})` : 'Misafir Kullanıcı'} />
                  <InfoItem label="Firma Adı" value={quote.guest_company_name || '---'} />
                  <InfoItem label="E-posta" value={quote.guest_email || '---'} />
                  <InfoItem label="Talep Tarihi" value={quote.created_at} />
                </div>
                {quote.customer_id && (
                  <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                    <p className="text-sm text-blue-800 font-medium">Bu bir kayıtlı üyedir. Panelden tüm firma detaylarına (Vergi No, Unvan vb.) müşteri rehberi üzerinden erişebilirsiniz.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'products' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                {quote.request_items?.map((item) => (
                  <div key={item.id} className="flex items-center gap-6 p-6 bg-gray-50 rounded-3xl border border-gray-50 shadow-sm">
                    <div className="w-16 h-16 bg-white rounded-2xl overflow-hidden border border-gray-100">
                      <img src={item.product?.images[0]} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 uppercase text-sm">{item.product?.name}</h4>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">{item.product?.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Miktar</p>
                      <p className="text-lg font-black text-blue-600">{item.quantity} Adet</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'notes' && (
              <div className="animate-in fade-in duration-300 h-full flex flex-col gap-6">
                <div className="p-8 bg-gray-50 rounded-[2rem] border border-gray-100 italic text-gray-600 min-h-[150px] font-medium leading-relaxed">
                  "{quote.note || 'Müşteri herhangi bir not bırakmamış.'}"
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-8 sm:p-10 border-t border-gray-100 bg-gray-50/50 flex flex-wrap gap-4 items-center justify-between">
           <div className="flex gap-3">
              <button 
                onClick={() => onStatusUpdate(quote.id, 'responded')}
                className="flex items-center gap-3 px-6 py-3 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all cursor-pointer shadow-lg shadow-emerald-500/20 active:scale-95"
              >
                <HiOutlineCheckCircle className="w-5 h-5" />
                Yanıtlandı Olarak İşaretle
              </button>
              <button 
                onClick={() => onStatusUpdate(quote.id, 'rejected')}
                className="flex items-center gap-3 px-6 py-3 bg-red-50 text-red-600 rounded-xl text-sm font-bold hover:bg-red-600 hover:text-white transition-all cursor-pointer border border-red-200 active:scale-95"
              >
                <HiOutlineBan className="w-5 h-5" />
                Reddet
              </button>
           </div>
           
           <button 
             onClick={() => onStatusUpdate(quote.id, 'pending')}
             className="flex items-center gap-3 px-6 py-3 bg-white text-gray-500 rounded-xl text-sm font-bold hover:bg-gray-100 transition-all cursor-pointer border border-gray-200 active:scale-95"
           >
              <HiOutlineClock className="w-5 h-5" />
              Beklemeye Al
           </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div className="space-y-1">
    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</span>
    <p className="text-gray-900 font-bold leading-tight">{value}</p>
  </div>
);

export default QuoteDetailModal;
