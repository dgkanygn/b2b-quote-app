"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AdminData {
  email: string;
  name: string;
  role: 'superadmin' | 'editor';
}

interface AdminAuthContextType {
  isAdminLoggedIn: boolean;
  admin: AdminData | null;
  adminLogin: (email: string, password: string) => Promise<boolean>;
  adminLogout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const DUMMY_ADMIN: AdminData = {
  email: 'admin@nexusb2b.com',
  name: 'Nexus Admin',
  role: 'superadmin'
};

export const AdminAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [admin, setAdmin] = useState<AdminData | null>(null);

  // For demo purposes, check local storage or similar
  useEffect(() => {
    const savedAdmin = localStorage.getItem('isAdminLoggedIn');
    if (savedAdmin === 'true') {
      setIsAdminLoggedIn(true);
      setAdmin(DUMMY_ADMIN);
    }
  }, []);

  const adminLogin = async (email: string, password: string) => {
    // Demo implementation
    if (email === 'admin@nexusb2b.com' && password === 'admin123') {
      setIsAdminLoggedIn(true);
      setAdmin(DUMMY_ADMIN);
      localStorage.setItem('isAdminLoggedIn', 'true');
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    setAdmin(null);
    localStorage.removeItem('isAdminLoggedIn');
  };

  return (
    <AdminAuthContext.Provider value={{ isAdminLoggedIn, admin, adminLogin, adminLogout }}>
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
