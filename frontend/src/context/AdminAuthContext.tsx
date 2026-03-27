"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { adminService } from '../services/adminService';
import type { AdminData } from '../services/adminService';

interface AdminAuthContextType {
  isAdminLoggedIn: boolean;
  admin: AdminData | null;
  loading: boolean;
  adminLogin: (email: string, password: string) => Promise<boolean>;
  adminLogout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);

  const isAdminLoggedIn = !!admin;

  // On mount, check for existing admin session via cookie
  useEffect(() => {
    const checkSession = async () => {
      const me = await adminService.getMe();
      setAdmin(me);
      setLoading(false);
    };
    checkSession();
  }, []);

  const adminLogin = useCallback(async (email: string, password: string): Promise<boolean> => {
    const result = await adminService.login(email, password);
    if (result) {
      setAdmin(result);
      return true;
    }
    return false;
  }, []);

  const adminLogout = useCallback(async () => {
    await adminService.logout();
    setAdmin(null);
  }, []);

  return (
    <AdminAuthContext.Provider value={{ isAdminLoggedIn, admin, loading, adminLogin, adminLogout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
