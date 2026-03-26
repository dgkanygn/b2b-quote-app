"use client";

import { useState, useCallback, useEffect } from 'react';
import { useAdminAuth } from '../../../context/AdminAuthContext';
import { useRouter } from 'next/navigation';

export type DashboardTab = 'products' | 'excel-upload' | 'quotes';

export const useAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('products');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { isAdminLoggedIn, adminLogout, admin } = useAdminAuth();
  const router = useRouter();

  // Protect route
  useEffect(() => {
    if (!isAdminLoggedIn) {
      router.push('/admin/login');
    }
  }, [isAdminLoggedIn, router]);

  const toggleSidebar = useCallback(() => setIsSidebarOpen(prev => !prev), []);
  const changeTab = useCallback((tab: DashboardTab) => setActiveTab(tab), []);

  const handleLogout = useCallback(() => {
    adminLogout();
    router.push('/admin/login');
  }, [adminLogout, router]);

  return {
    activeTab,
    changeTab,
    isSidebarOpen,
    toggleSidebar,
    admin,
    handleLogout
  };
};
