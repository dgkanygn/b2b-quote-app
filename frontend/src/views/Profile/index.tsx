"use client";

import React from 'react';
import Navbar from '../../components/Navbar';
import Container from '../../components/Container';
import { 
  HiOutlineUserCircle, 
  HiOutlineIdentification, 
  HiOutlineCalendar, 
  HiOutlineStatusOnline, 
  HiOutlineTrash, 
  HiOutlineLogout,
  HiOutlineLocationMarker,
  HiOutlineUserGroup,
  HiOutlineOfficeBuilding
} from 'react-icons/hi';
import { useProfile } from './hooks/useProfile';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';

const ProfilePage: React.FC = () => {
  const { user: profileUser, quotes, handleDeleteAccount, loadingQuotes } = useProfile();
  const { user: authUser, isLoggedIn, logout } = useAuth();
  
  const profileData = {
    ...profileUser,
    name: authUser?.company_name || profileUser.name,
    email: authUser?.email || profileUser.email,
    companyTitle: authUser?.company_title || '',
    taxOffice: authUser?.tax_office || '',
    taxNumber: authUser?.tax_number || '',
    companySize: authUser?.company_size || '',
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-black">
      <Navbar />

      <main className="flex-1 py-12 lg:py-24">
        <Container>
          {!isLoggedIn ? (
            <div className="text-center py-20 flex flex-col items-center gap-6">
              <HiOutlineIdentification className="w-20 h-20 text-gray-300" />
              <h1 className="text-3xl font-bold text-gray-400 uppercase tracking-widest">Lütfen giriş yapın</h1>
              <Link href="/auth" className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all cursor-pointer">Giriş Yap</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Sidebar: Profile Info */}
              <div className="lg:col-span-4 space-y-12 animate-in fade-in slide-in-from-left-8 duration-700">
                <div className="relative group p-12 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 rounded-[3rem] text-white space-y-8 shadow-2xl overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-[40px] translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-1000" />
                  <div className="relative flex flex-col items-center text-center space-y-6">
                    <div className="w-32 h-32 rounded-[2.5rem] border-4 border-white/20 p-2 overflow-hidden shadow-xl hover:rotate-6 transition-transform group cursor-pointer flex items-center justify-center bg-white/10 backdrop-blur-sm">
                      <HiOutlineOfficeBuilding className="w-16 h-16 text-white" />
                    </div>
                    <div className="space-y-2">
                       <h1 className="text-2xl font-extrabold tracking-tight uppercase tracking-wider line-clamp-2">{profileData.name}</h1>
                       <p className="text-blue-100 font-bold opacity-80 uppercase text-[10px] tracking-[0.3em]">{profileData.role}</p>
                    </div>
                  </div>
                  <div className="relative pt-8 border-t border-white/10 space-y-6">
                    <button onClick={async () => { await logout(); window.location.href = '/'; }} className="w-full flex items-center gap-4 group cursor-pointer hover:bg-white/5 p-4 rounded-2xl transition-all">
                      <HiOutlineLogout className="w-6 h-6 text-blue-200" />
                      <span className="font-bold">Oturumu Kapat</span>
                    </button>
                    <button onClick={handleDeleteAccount} className="w-full flex items-center gap-4 p-4 text-red-300 hover:text-white hover:bg-red-500/20 rounded-2xl transition-all cursor-pointer font-bold">
                       <HiOutlineTrash className="w-6 h-6" />
                       <span>Hesabı Sil</span>
                    </button>
                  </div>
                </div>

                {/* Firma Bilgileri */}
                <div className="p-10 bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-gray-100 dark:border-white/5 space-y-8 premium-shadow">
                  <h3 className="text-lg font-extrabold text-gray-900 dark:text-white uppercase tracking-wider border-b pb-4">Firma Bilgileri</h3>
                   <div className="space-y-6">
                      <div className="flex flex-col gap-1">
                         <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">E-posta</span>
                         <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 font-bold text-sm">
                            <HiOutlineUserCircle className="w-5 h-5 text-blue-600" />
                            <span className="truncate">{profileData.email}</span>
                         </div>
                      </div>
                      <div className="flex flex-col gap-1">
                         <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Unvan</span>
                         <div className="flex items-start gap-3 text-gray-600 dark:text-gray-300 font-bold text-sm leading-relaxed">
                            <HiOutlineIdentification className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" />
                            <span>{profileData.companyTitle || '-'}</span>
                         </div>
                      </div>
                      <div className="flex flex-col gap-1">
                         <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Vergi Dairesi / No</span>
                         <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 font-bold text-sm">
                            <HiOutlineLocationMarker className="w-5 h-5 text-emerald-600" />
                            <span>{profileData.taxOffice || '-'} - {profileData.taxNumber || '-'}</span>
                         </div>
                      </div>
                      <div className="flex flex-col gap-1">
                         <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Firma Büyüklüğü</span>
                         <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 font-bold text-sm">
                            <HiOutlineUserGroup className="w-5 h-5 text-amber-600" />
                            <span>{profileData.companySize || '-'}</span>
                         </div>
                      </div>
                   </div>
                </div>
              </div>

              {/* Main: Past Quotes */}
              <div className="lg:col-span-8 space-y-12 animate-in fade-in slide-in-from-right-8 duration-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white uppercase tracking-wider">Geçmiş Teklifler</h2>
                </div>
                <div className="space-y-6">
                  {quotes.map((quote) => (
                    <div key={quote.id} className="group flex flex-col md:flex-row items-center justify-between gap-6 p-10 bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-gray-100 dark:border-white/5 hover:border-blue-500/30 transition-all duration-300 cursor-pointer premium-shadow">
                      <div className="flex items-center gap-8 w-full md:w-auto">
                        <div className={`w-20 h-20 rounded-[1.5rem] flex items-center justify-center text-2xl font-bold uppercase transition-transform group-hover:scale-110 duration-500 ${quote.status === 'Beklemede' ? 'bg-amber-50 text-amber-500' : quote.status === 'Cevaplandı' ? 'bg-emerald-50 text-emerald-500' : 'bg-blue-50 text-blue-600'}`}>
                           {quote.id.substring(8)}
                        </div>
                        <div className="space-y-2">
                           <p className="font-extrabold text-gray-900 dark:text-white uppercase text-lg tracking-wider">{quote.id}</p>
                           <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-gray-400">
                              <div className="flex items-center gap-2"><HiOutlineCalendar className="w-4 h-4" />{quote.date}</div>
                              <div className="flex items-center gap-2"><HiOutlineStatusOnline className="w-4 h-4" />{quote.items} Parça Ürün</div>
                           </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                        <div className="text-right">
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Tahmini Değer</p>
                          <p className="text-xl font-extrabold text-gray-900 dark:text-white uppercase">{quote.totalEstimate}</p>
                        </div>
                        <div className={`px-6 py-2 rounded-full font-bold uppercase text-[10px] tracking-widest border ${quote.status === 'Beklemede' ? 'border-amber-200 text-amber-600 bg-amber-50' : quote.status === 'Cevaplandı' ? 'border-emerald-200 text-emerald-600 bg-emerald-50' : 'border-blue-200 text-blue-600 bg-blue-50'}`}>
                           {quote.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Container>
      </main>

      <footer className="py-12 bg-white dark:bg-zinc-950 border-t border-gray-100 dark:border-white/5 text-center px-4">
        <Container>
           <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em] leading-loose">Premium B2B Enterprise Workspace</p>
        </Container>
      </footer>
    </div>
  );
};

export default ProfilePage;
