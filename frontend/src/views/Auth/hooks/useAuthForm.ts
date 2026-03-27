"use client";

import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

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

  const { login, register } = useAuth();
  const router = useRouter();

  const toggleMode = () => setIsLogin(!isLogin);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLogin && password !== confirmPassword) {
      toast.error("Şifreler eşleşmiyor!");
      return;
    }

    setIsLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
        toast.success('Giriş başarılı! Hoş geldiniz.');
        router.push('/products');
      } else {
        await register({
          email,
          password,
          company_name: companyName,
          company_title: companyTitle || undefined,
          tax_office: taxOffice || undefined,
          tax_number: taxNumber || undefined,
          company_size: companySize || undefined,
        });
        toast.success('Kayıt başarılı! Hoş geldiniz.');
        router.push('/products');
      }
    } catch (err: any) {
      const message = err?.response?.data?.error || 'Bir hata oluştu. Lütfen tekrar deneyin.';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
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
