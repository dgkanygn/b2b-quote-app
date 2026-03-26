"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '../../context/AdminAuthContext';

export default function AdminPage() {
  const { isAdminLoggedIn } = useAdminAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAdminLoggedIn) {
      router.push('/admin/dashboard');
    } else {
      router.push('/admin/login');
    }
  }, [isAdminLoggedIn, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
