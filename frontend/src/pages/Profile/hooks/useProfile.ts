"use client";

import { useState } from 'react';

export const useProfile = () => {
  const [user, setUser] = useState({
    name: 'Doğukan B2B',
    email: 'dogukan@nexus.com',
    role: 'Satın Alma Sorumlusu',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80'
  });

  const [quotes, setQuotes] = useState([
    { id: 'QT-2026-001', date: '2026-03-20', status: 'Cevaplandı', items: 5, totalEstimate: '12.500 TL' },
    { id: 'QT-2026-002', date: '2026-03-24', status: 'Beklemede', items: 2, totalEstimate: '4.200 TL' },
    { id: 'QT-2026-003', date: '2026-03-25', status: 'Hazırlanıyor', items: 12, totalEstimate: '45.000 TL' }
  ]);

  const handleDeleteAccount = () => {
    if (confirm("Hesabınızı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.")) {
      alert("Hesabınız siliniyor...");
    }
  };

  return {
    user,
    quotes,
    handleDeleteAccount
  };
};
