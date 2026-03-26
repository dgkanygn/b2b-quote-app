"use client";

import { useState } from 'react';

export const useAuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Registration fields
  const [companyName, setCompanyName] = useState('');
  const [companyTitle, setCompanyTitle] = useState('');
  const [taxOffice, setTaxOffice] = useState('');
  const [taxNumber, setTaxNumber] = useState('');
  const [companySize, setCompanySize] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const toggleMode = () => setIsLogin(!isLogin);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLogin && password !== confirmPassword) {
      alert("Şifreler eşleşmiyor!");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert(`${isLogin ? 'Giriş yapıldı' : 'Kayıt talebiniz alındı'}! Hoş geldiniz.`);
    }, 1500);
  };

  return {
    isLogin,
    toggleMode,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    showPassword,
    togglePasswordVisibility,
    companyName,
    setCompanyName,
    companyTitle,
    setCompanyTitle,
    taxOffice,
    setTaxOffice,
    taxNumber,
    setTaxNumber,
    companySize,
    setCompanySize,
    isLoading,
    handleSubmit
  };
};
