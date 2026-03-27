"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { FiFileText, FiChevronRight, FiCheckCircle, FiClock, FiXCircle, FiTrendingUp, FiLoader } from 'react-icons/fi';
import QuoteDetailModal from './components/QuoteDetailModal';
import { quoteService } from '../../../../services/quoteService';
import toast from 'react-hot-toast';

interface QuoteRequest {
  id: number;
  customer_id: number | null;
  guest_email: string | null;
  guest_company_name: string | null;
  customer_email?: string;
  customer_company_name?: string;
  note: string;
  status: 'pending' | 'responded' | 'rejected';
  total_price: number;
  created_at: string;
  items?: any[];
}

const QuoteManagement = () => {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchQuotes = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await quoteService.getAll();
      setQuotes(data as QuoteRequest[]);
    } catch {
      toast.error('Teklifler yüklenemedi.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuotes();
  }, [fetchQuotes]);

  const stats = useMemo(() => {
    const pending = quotes.filter(q => q.status === 'pending').length;
    const responded = quotes.filter(q => q.status === 'responded').length;
    const rejected = quotes.filter(q => q.status === 'rejected').length;
    return { pending, responded, rejected };
  }, [quotes]);

  const handleUpdateStatus = async (id: number | string, newStatus: QuoteRequest['status']) => {
    try {
      await quoteService.updateStatus(id, { status: newStatus });
      toast.success('Durum güncellendi.');
      
      // Update local state
      setQuotes(prev => prev.map(q => q.id === Number(id) ? { ...q, status: newStatus } : q));
      if (selectedQuote && selectedQuote.id === Number(id)) {
        setSelectedQuote(prev => prev ? { ...prev, status: newStatus } : null);
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.error || 'Durum güncellenemedi.');
    }
  };

  const openDetail = async (quote: QuoteRequest) => {
    try {
      const fullQuote = await quoteService.getById(quote.id);
      
      // Map items for the modal
      const mappedQuote: QuoteRequest = {
        ...(fullQuote as any),
        items: ((fullQuote as any).items || []).map((item: any) => ({
          id: String(item.id),
          request_id: String(item.request_id),
          product_id: String(item.product_id),
          quantity: item.quantity,
          offered_price: item.offered_price || 0,
          product: {
            id: String(item.product_id),
            name: item.product_name || 'Bilinmeyen Ürün',
            category: item.product_category || '',
            images: item.product_images || [],
          },
        })),
      };

      setSelectedQuote(mappedQuote);
      setIsModalOpen(true);
    } catch {
      toast.error('Teklif detayı yüklenemedi.');
    }
  };

  const getDisplayName = (q: QuoteRequest) => {
    return q.guest_company_name || q.customer_company_name || 'Kayıtlı Kullanıcı';
  };

  const getDisplayEmail = (q: QuoteRequest) => {
    return q.guest_email || q.customer_email || 'Profil üzerinden';
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleString('tr-TR', {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit'
      });
    } catch {
      return dateStr;
    }
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
        <StatCard label="Bekleyen Talepler" value={String(stats.pending)} icon={<FiClock className="text-orange-600" />} color="bg-orange-50 border-orange-100" />
        <StatCard label="Yanıtlanan Talepler" value={String(stats.responded)} icon={<FiCheckCircle className="text-green-600" />} color="bg-green-50 border-green-100" />
        <StatCard label="Reddedilenler" value={String(stats.rejected)} icon={<FiXCircle className="text-red-600" />} color="bg-red-50 border-red-100" />
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <FiLoader className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      ) : quotes.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-16 text-center text-gray-400 font-medium">
          Henüz teklif talebi bulunmuyor.
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
          {quotes.map((quote) => (
            <div key={quote.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-gray-50/50 transition-all cursor-pointer group">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:shadow-sm transition-all">
                  <FiFileText className="w-6 h-6 group-hover:text-blue-600" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-gray-900 flex items-center">
                    #{quote.id} - {getDisplayName(quote)}
                    <StatusBadge status={quote.status} className="ml-3 hidden md:inline-flex" />
                  </h4>
                  <p className="text-sm text-gray-400 font-medium">{getDisplayEmail(quote)}</p>
                </div>
              </div>

              <div className="flex items-center md:items-end flex-wrap gap-4 md:gap-8 min-w-fit">
                <div className="text-center md:text-right">
                  <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Talep Tarihi</span>
                  <span className="font-bold text-gray-700">{formatDate(quote.created_at)}</span>
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
      )}

      <QuoteDetailModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        quote={selectedQuote as any}
        onStatusUpdate={handleUpdateStatus as any}
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
  const { text, bg, color } = config[status as keyof typeof config] || config.pending;
  return (
    <span className={`px-2.5 py-1 ${bg} ${color} rounded-md text-[10px] font-black uppercase tracking-widest ${className}`}>
      {text}
    </span>
  );
};

export default QuoteManagement;
