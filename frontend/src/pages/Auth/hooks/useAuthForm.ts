"use client";

import { useState } from 'react';

export const useAuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Registration fields
  const [firmaAdi, setFirmaAdi] = useState('');
  const [firmaUnvan, setFirmaUnvan] = useState('');
  const [vergiDairesi, setVergiDairesi] = useState('');
  const [vergiNo, setVergiNo] = useState('');
  const [firmaBuyuklugu, setFirmaBuyuklugu] = useState('');

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
    firmaAdi,
    setFirmaAdi,
    firmaUnvan,
    setFirmaUnvan,
    vergiDairesi,
    setVergiDairesi,
    vergiNo,
    setVergiNo,
    firmaBuyuklugu,
    setFirmaBuyuklugu,
    isLoading,
    handleSubmit
  };
};
