"use client";

import { useState, useEffect } from 'react';
import { quoteService } from '../../../services/quoteService';
import { useAuth } from '../../../context/AuthContext';

import type { QuoteRequest } from '../../../types';

export const useProfile = () => {
  const { user, isLoggedIn } = useAuth();
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [loadingQuotes, setLoadingQuotes] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchQuotes = async () => {
      setLoadingQuotes(true);
      try {
        const data = await quoteService.getUserQuotes();
        setQuotes(data as any[]);
      } catch {
        setQuotes([]);
      } finally {
        setLoadingQuotes(false);
      }
    };

    fetchQuotes();
  }, [isLoggedIn]);

  const handleDeleteAccount = () => {
    if (confirm("Hesabınızı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.")) {
      alert("Hesabınız siliniyor...");
    }
  };

  // Map API user data to display format
  const profileUser = user ? {
    name: user.company_name || '',
    email: user.email || '',
    role: 'Satın Alma Sorumlusu',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80'
  } : {
    name: '',
    email: '',
    role: '',
    avatar: ''
  };

  // Map quotes for profile display
  const displayQuotes = quotes.map(q => {
    const statusMap: Record<string, string> = {
      pending: 'Beklemede',
      responded: 'Cevaplandı',
      rejected: 'Reddedildi'
    };
    return {
      id: `QT-${q.id}`,
      date: new Date(q.created_at).toLocaleDateString('tr-TR'),
      status: statusMap[q.status] || q.status,
      items: q.items?.length || 0,
      totalEstimate: q.total_price > 0 ? `${q.total_price.toLocaleString('tr-TR')} TL` : 'Teklif Bekleniyor'
    };
  });

  return {
    user: profileUser,
    quotes: displayQuotes,
    loadingQuotes,
    handleDeleteAccount
  };
};
