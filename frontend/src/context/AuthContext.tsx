"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserData {
  email: string;
  companyName: string;
  companyTitle: string;
  taxOffice: string;
  taxNumber: string;
  companySize: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: UserData | null;
  login: () => void;
  logout: () => void;
  toggleAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DUMMY_USER: UserData = {
  email: 'iletisim@nexusb2b.com',
  companyName: 'Nexus Global Ticaret',
  companyTitle: 'Nexus Global İç ve Dış Ticaret LTD. ŞTİ.',
  taxOffice: 'Beyoğlu V.D.',
  taxNumber: '1234567890',
  companySize: 'Büyük (250+ Çalışan)'
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserData | null>(DUMMY_USER);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);
  const toggleAuth = () => setIsLoggedIn(prev => !prev);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, toggleAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
