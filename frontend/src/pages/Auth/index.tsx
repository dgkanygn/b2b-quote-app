"use client";

import React from 'react';
import Navbar from '../../components/Navbar';
import Container from '../../components/Container';
import { 
  HiOutlineMail, 
  HiOutlineLockClosed, 
  HiOutlineArrowSmRight, 
  HiOutlineShieldCheck, 
  HiOutlineSparkles, 
  HiOutlineEye, 
  HiOutlineEyeOff,
  HiOutlineOfficeBuilding,
  HiOutlineIdentification,
  HiOutlineLocationMarker,
  HiOutlineUserGroup
} from 'react-icons/hi';
import { useAuthForm } from './hooks/useAuthForm';

const AuthPage: React.FC = () => {
  const { 
    isLogin, 
    toggleMode, 
    setEmail, 
    setPassword, 
    setConfirmPassword,
    showPassword,
    togglePasswordVisibility,
    setFirmaAdi,
    setFirmaUnvan,
    setVergiDairesi,
    setVergiNo,
    setFirmaBuyuklugu,
    isLoading, 
    handleSubmit 
  } = useAuthForm();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-black overflow-hidden">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-6 relative">
        {/* Simplified Background */}
        <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-blue-600/5 dark:bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
        
        <Container className="max-w-xl relative animate-in fade-in zoom-in duration-700">
           <div className="p-8 md:p-12 bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-xl space-y-8">
              <div className="text-center space-y-2">
                 <div className="inline-flex p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-2xl mb-2">
                    {isLogin ? <HiOutlineShieldCheck className="w-8 h-8" /> : <HiOutlineSparkles className="w-8 h-8" />}
                 </div>
                 <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white uppercase tracking-wider">
                    {isLogin ? 'Giriş Yap' : 'Kayıt Ol'}
                 </h1>
                 <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    {isLogin ? 'Kaldığınız yerden devam edin' : 'Nexus ekosistemine katılın'}
                 </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                 <div className="space-y-4">
                    {/* Common Field: Email */}
                    <div className="relative">
                       <HiOutlineMail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                       <input 
                         type="email" 
                         required
                         placeholder="E-posta" 
                         onChange={(e) => setEmail(e.target.value)}
                         className="w-full h-14 pl-14 pr-5 bg-gray-50 dark:bg-black border border-gray-200 dark:border-white/10 rounded-xl outline-none focus:border-blue-600/50 transition-all font-semibold text-sm text-gray-900 dark:text-white" 
                       />
                    </div>

                    {!isLogin && (
                      <>
                        {/* New Field: Firma Adı */}
                        <div className="relative">
                          <HiOutlineOfficeBuilding className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input 
                            type="text" 
                            required
                            placeholder="Firma Adı" 
                            onChange={(e) => setFirmaAdi(e.target.value)}
                            className="w-full h-14 pl-14 pr-5 bg-gray-50 dark:bg-black border border-gray-200 dark:border-white/10 rounded-xl outline-none focus:border-blue-600/50 transition-all font-semibold text-sm text-gray-900 dark:text-white" 
                          />
                        </div>
                        {/* New Field: Firma Unvan */}
                        <div className="relative">
                          <HiOutlineIdentification className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input 
                            type="text" 
                            required
                            placeholder="Firma Unvanı" 
                            onChange={(e) => setFirmaUnvan(e.target.value)}
                            className="w-full h-14 pl-14 pr-5 bg-gray-50 dark:bg-black border border-gray-200 dark:border-white/10 rounded-xl outline-none focus:border-blue-600/50 transition-all font-semibold text-sm text-gray-900 dark:text-white" 
                          />
                        </div>
                        {/* New Field: Vergi Dairesi & Vergi No */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="relative">
                            <HiOutlineLocationMarker className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input 
                              type="text" 
                              required
                              placeholder="Vergi Dairesi" 
                              onChange={(e) => setVergiDairesi(e.target.value)}
                              className="w-full h-14 pl-14 pr-5 bg-gray-50 dark:bg-black border border-gray-200 dark:border-white/10 rounded-xl outline-none focus:border-blue-600/50 transition-all font-semibold text-sm text-gray-900 dark:text-white" 
                            />
                          </div>
                          <div className="relative">
                            <input 
                              type="text" 
                              required
                              placeholder="Vergi No" 
                              onChange={(e) => setVergiNo(e.target.value)}
                              className="w-full h-14 px-5 bg-gray-50 dark:bg-black border border-gray-200 dark:border-white/10 rounded-xl outline-none focus:border-blue-600/50 transition-all font-semibold text-sm text-gray-900 dark:text-white" 
                            />
                          </div>
                        </div>
                        {/* New Field: Firma Büyüklüğü */}
                        <div className="relative">
                          <HiOutlineUserGroup className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <select 
                            required
                            onChange={(e) => setFirmaBuyuklugu(e.target.value)}
                            className="w-full h-14 pl-14 pr-5 bg-gray-50 dark:bg-black border border-gray-200 dark:border-white/10 rounded-xl outline-none focus:border-blue-600/50 transition-all font-semibold text-sm text-gray-900 dark:text-white appearance-none cursor-pointer"
                          >
                             <option value="">Firma Büyüklüğü Seçin</option>
                             <option value="Mini (1-10)">Mini (1-10 Çalışan)</option>
                             <option value="Küçük (10-50)">Küçük (10-50 Çalışan)</option>
                             <option value="Orta (50-250)">Orta (50-250 Çalışan)</option>
                             <option value="Büyük (250+)">Büyük (250+ Çalışan)</option>
                          </select>
                        </div>
                      </>
                    )}

                    {/* Common Field: Password */}
                    <div className="relative">
                       <HiOutlineLockClosed className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                       <input 
                         type={showPassword ? "text" : "password"} 
                         required
                         placeholder="Şifre" 
                         onChange={(e) => setPassword(e.target.value)}
                         className="w-full h-14 pl-14 pr-14 bg-gray-50 dark:bg-black border border-gray-200 dark:border-white/10 rounded-xl outline-none focus:border-blue-600/50 transition-all font-semibold text-sm text-gray-900 dark:text-white" 
                       />
                       <button 
                         type="button"
                         onClick={togglePasswordVisibility}
                         className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                       >
                         {showPassword ? <HiOutlineEyeOff className="w-5 h-5" /> : <HiOutlineEye className="w-5 h-5" />}
                       </button>
                    </div>

                    {!isLogin && (
                       <div className="relative">
                          <HiOutlineLockClosed className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input 
                            type={showPassword ? "text" : "password"} 
                            required
                            placeholder="Şifre Tekrar" 
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full h-14 pl-14 pr-5 bg-gray-50 dark:bg-black border border-gray-200 dark:border-white/10 rounded-xl outline-none focus:border-blue-600/50 transition-all font-semibold text-sm text-gray-900 dark:text-white" 
                          />
                       </div>
                    )}
                 </div>

                 <button 
                   type="submit" 
                   disabled={isLoading}
                   className="w-full h-16 flex items-center justify-center gap-3 bg-blue-600 text-white rounded-2xl text-lg font-bold hover:bg-blue-700 transition-all cursor-pointer shadow-lg shadow-blue-600/20 active:scale-95 disabled:bg-gray-400"
                 >
                    {isLoading ? '...' : (
                      <>
                        {isLogin ? 'Oturum Aç' : 'Hesap Oluştur'}
                        <HiOutlineArrowSmRight className="w-6 h-6" />
                      </>
                    )}
                 </button>
              </form>

              <div className="pt-6 border-t border-gray-100 dark:border-white/5 text-center">
                 <button 
                   onClick={toggleMode}
                   className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
                 >
                    {isLogin ? 'Hemen kayıt olun' : 'Zaten hesabınız var mı?'}
                 </button>
              </div>
           </div>
        </Container>
      </main>

      <footer className="py-8 bg-white dark:bg-zinc-950 border-t border-gray-100 dark:border-white/5 text-center">
        <Container>
           <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Nexus B2B Architecture</p>
        </Container>
      </footer>
    </div>
  );
};

export default AuthPage;
