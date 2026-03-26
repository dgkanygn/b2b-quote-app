import React from 'react';
import Link from 'next/link';
import { HiArrowRight, HiOutlineLightningBolt, HiOutlineShieldCheck, HiOutlineSupport } from 'react-icons/hi';
import Container from '../../../../components/Container';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full h-full overflow-hidden bg-white dark:bg-black py-20 lg:py-32">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-blue-600/10 dark:bg-blue-600/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-indigo-600/10 dark:bg-indigo-600/20 rounded-full blur-[80px]" />

      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Main Copy */}
          <div className="flex-1 text-center lg:text-left space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-widest hover:scale-105 transition-transform cursor-pointer shadow-sm">
              <HiOutlineLightningBolt className="w-4 h-4 text-blue-600" />
              <span>Yeni Nesil B2B Teklifleme</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.1]">
              İstediğiniz Ürünleri <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Tek Tıkla</span> <br />
              Teklif Alın
            </h1>
            
            <p className="max-w-xl mx-auto lg:mx-0 text-lg md:text-xl text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
              Profesyonel ürün portföyümüzde aradığınızı bulun, sepetinizi oluşturun ve dakikalar içinde size özel teklifinizi alın. Modern ticaretin en hızlı hali.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link href="/products" className="group flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-2xl text-lg font-bold hover:bg-blue-700 transition-all cursor-pointer shadow-lg shadow-blue-600/25 active:scale-95">
                Ürünleri İncele
                <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/cart" className="flex items-center justify-center gap-3 px-8 py-4 bg-white dark:bg-white/5 text-gray-900 dark:text-white border-2 border-gray-100 dark:border-white/10 rounded-2xl text-lg font-bold hover:bg-gray-50 dark:hover:bg-white/10 transition-all cursor-pointer shadow-sm active:scale-95">
                Sepetim
              </Link>
            </div>

            {/* Micro Stats/Trust Indicators */}
            <div className="pt-8 flex flex-wrap items-center justify-center lg:justify-start gap-8 opacity-70">
              <div className="flex items-center gap-2 group cursor-pointer hover:opacity-100 transition-opacity">
                <HiOutlineShieldCheck className="w-6 h-6 text-emerald-500" />
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 tracking-wide uppercase">%100 Güvenli</span>
              </div>
              <div className="flex items-center gap-2 group cursor-pointer hover:opacity-100 transition-opacity">
                <HiOutlineSupport className="w-6 h-6 text-amber-500" />
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 tracking-wide uppercase">7/24 Destek</span>
              </div>
            </div>
          </div>

          {/* Visual Side */}
          <div className="relative flex-1 group hidden md:block">
            <div className="relative z-10 w-full aspect-square rounded-[3rem] bg-gradient-to-tr from-blue-600 to-indigo-600 overflow-hidden shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
              {/* Dynamic Overlay */}
              <div className="absolute inset-0 bg-white/5 dark:bg-black/10 backdrop-blur-[2px] backdrop-saturate-150" />
              
              {/* Floating Cards (CSS only for now) */}
              <div className="absolute top-1/4 -right-10 w-64 h-32 glass-card rounded-2xl animate-bounce-slow flex flex-col justify-center px-6 gap-2">
                <div className="w-1/2 h-4 bg-blue-600/20 rounded-full" />
                <div className="w-3/4 h-3 bg-gray-400/20 rounded-full" />
              </div>

              <div className="absolute bottom-1/4 -left-10 w-72 h-40 glass-card rounded-2xl animate-pulse flex flex-col items-center justify-center gap-4">
                 <div className="w-16 h-16 bg-gradient-to-tr from-emerald-500 to-blue-500 rounded-full flex items-center justify-center">
                    <HiOutlineShieldCheck className="text-white w-8 h-8" />
                 </div>
                 <div className="w-1/2 h-2 bg-gray-400/20 rounded-full" />
              </div>

              {/* Central Abstract Shape */}
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-1/2 h-1/2 border-4 border-white/30 rounded-full animate-ping-slow" />
                 <div className="absolute w-1/3 h-1/3 border-2 border-white/20 rounded-full rotate-45" />
                 <div className="absolute w-1/4 h-1/4 bg-white/10 backdrop-blur-3xl rounded-3xl" />
              </div>
            </div>

            {/* Bottom Glow */}
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-indigo-500/30 dark:bg-indigo-500/20 rounded-full blur-[80px]" />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
