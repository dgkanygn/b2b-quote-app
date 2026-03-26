"use client";

import React, { useState } from 'react';
import { FiFileText, FiChevronRight, FiCheckCircle, FiClock, FiXCircle, FiTrendingUp } from 'react-icons/fi';
import QuoteDetailModal from './components/QuoteDetailModal';

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
  product?: Product; // For display
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
  request_items_count: number;
  request_items?: RequestItem[]; // Detailed items
}

const DUMMY_QUOTES: QuoteRequest[] = [
  { 
    id: 'REQ-A1B2', 
    customer_id: null, 
    guest_email: 'ahmet@yilmaz.com', 
    guest_company_name: 'Yılmaz İnşaat Ltd.', 
    note: 'Carrara mermer plaka için teklif rica ediyoruz. Projemiz için 2 adet robot kol ve 3 adet lazer kesim masası ihtiyacımız var.',
    status: 'pending',
    total_price: 0,
    created_at: '2026-03-24 14:30',
    request_items_count: 3,
    request_items: [
      { id: '1', request_id: 'REQ-A1B2', product_id: '1', quantity: 2, offered_price: 0, product: { id: '1', name: 'Endüstriyel Robot Kol v4', category: 'Endüstriyel', images: ['https://images.unsplash.com/photo-1558346490-a72e53ae2d4f'] } },
      { id: '2', request_id: 'REQ-A1B2', product_id: '2', quantity: 3, offered_price: 0, product: { id: '2', name: 'Hassas Lazer Kesim Masası', category: 'Endüstriyel', images: ['https://images.unsplash.com/photo-1558346490-a72e53ae2d4f'] } }
    ]
  },
  { 
    id: 'REQ-C3D4', 
    customer_id: 'CUST-001', 
    guest_email: 'elif@global.com', 
    guest_company_name: 'Global Dizayn', 
    note: 'Traverten karo siparişi hakkında ek bilgi istiyoruz.',
    status: 'responded',
    total_price: 15400,
    created_at: '2026-03-24 11:15',
    request_items_count: 5,
    request_items: [
      { id: '3', request_id: 'REQ-C3D4', product_id: '3', quantity: 5, offered_price: 2100, product: { id: '3', name: 'Nexus Pro İş İstasyonu', category: 'Elektronik', images: ['https://images.unsplash.com/photo-1558346490-a72e53ae2d4f'] } }
    ]
  },
  { 
    id: 'REQ-E5F6', 
    customer_id: null, 
    guest_email: 'can@mert.com', 
    guest_company_name: 'Mert Yapı Market', 
    note: 'Hızlı teslimat mümkün mü?',
    status: 'pending',
    total_price: 0,
    created_at: '2026-03-23 09:45',
    request_items_count: 2,
    request_items: [
      { id: '4', request_id: 'REQ-E5F6', product_id: '4', quantity: 20, offered_price: 0, product: { id: '4', name: 'ErgoDesign Akıllı Ofis Koltuğu', category: 'Mobilya', images: ['https://images.unsplash.com/photo-1558346490-a72e53ae2d4f'] } }
    ]
  },
];

const QuoteManagement = () => {
  const [quotes, setQuotes] = useState(DUMMY_QUOTES);
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpdateStatus = (id: string, newStatus: QuoteRequest['status']) => {
    setQuotes(prev => prev.map(q => q.id === id ? { ...q, status: newStatus } : q));
    if (selectedQuote?.id === id) {
      setSelectedQuote(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const openDetail = (quote: QuoteRequest) => {
    setSelectedQuote(quote);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Teklif Talepleri</h2>
          <p className="text-gray-500 text-sm">Gelen teklif taleplerini inceleyin ve yanıtlayın.</p>
        </div>
        <div className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-xl font-semibold border border-blue-100">
          <FiTrendingUp className="w-5 h-5" />
          <span className="text-sm">Toplam: {quotes.length} Talep</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Bekleyen Talepler" value="2" icon={<FiClock className="text-orange-600" />} color="bg-orange-50 border-orange-100" />
        <StatCard label="Yanıtlanan Talepler" value="1" icon={<FiCheckCircle className="text-green-600" />} color="bg-green-50 border-green-100" />
        <StatCard label="Reddedilenler" value="1" icon={<FiXCircle className="text-red-600" />} color="bg-red-50 border-red-100" />
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
        {quotes.map((quote) => (
          <div key={quote.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-gray-50/50 transition-all cursor-pointer group">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:shadow-sm transition-all">
                <FiFileText className="w-6 h-6 group-hover:text-blue-600" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-gray-900 flex items-center">
                  #{quote.id} - {quote.guest_company_name || 'Kayıtlı Kullanıcı'}
                  <StatusBadge status={quote.status} className="ml-3 hidden md:inline-flex" />
                </h4>
                <p className="text-sm text-gray-400 font-medium">{quote.guest_email || 'Profil üzerinden'}</p>
              </div>
            </div>

            <div className="flex items-center md:items-end flex-wrap gap-4 md:gap-8 min-w-fit">
               <div className="text-center md:text-right">
                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Ürün Sayısı</span>
                <span className="font-bold text-gray-900">{quote.request_items_count} Kalem</span>
              </div>
              <div className="text-center md:text-right">
                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Talep Tarihi</span>
                <span className="font-bold text-gray-700">{quote.created_at}</span>
              </div>
              <button 
                onClick={() => openDetail(quote)}
                className="flex items-center space-x-2 px-6 py-3 bg-white border border-gray-200 text-gray-900 rounded-xl hover:border-blue-600 hover:text-blue-600 hover:shadow-lg hover:shadow-blue-50 transition-all cursor-pointer font-bold text-sm"
              >
                <span>Detay Gör</span>
                <FiChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <QuoteDetailModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        quote={selectedQuote}
        onStatusUpdate={handleUpdateStatus}
      />
    </div>
  );
};

const StatCard = ({ label, value, icon, color }: any) => (
  <div className={`p-6 rounded-2xl border ${color} flex items-center justify-between shadow-sm`}>
    <div className="space-y-1">
      <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{label}</span>
      <h3 className="text-3xl font-black text-gray-900">{value}</h3>
    </div>
    <div className="p-3 bg-white rounded-xl shadow-sm text-2xl">
      {icon}
    </div>
  </div>
);

const StatusBadge = ({ status, className }: any) => {
  const config = {
    pending: { text: 'Bekliyor', bg: 'bg-orange-100', color: 'text-orange-700' },
    responded: { text: 'Yanıtlandı', bg: 'bg-green-100', color: 'text-green-700' },
    rejected: { text: 'Reddedildi', bg: 'bg-red-100', color: 'text-red-700' }
  };
  const { text, bg, color } = config[status as keyof typeof config];
  return (
    <span className={`px-2.5 py-1 ${bg} ${color} rounded-md text-[10px] font-black uppercase tracking-widest ${className}`}>
      {text}
    </span>
  );
};

export default QuoteManagement;
