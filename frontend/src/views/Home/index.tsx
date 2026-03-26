import React from 'react';
import Navbar from '../../components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Container from '../../components/Container';
import { HiOutlineArrowCircleRight } from 'react-icons/hi';
import Link from 'next/link';

// Simple CTA Section for Home page
const CTASection = () => (
  <section className="py-24 bg-white dark:bg-black overflow-hidden relative">
    <Container>
      <div className="relative z-10 p-12 lg:p-20 rounded-[4rem] bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 flex flex-col items-center justify-center text-center space-y-10 shadow-2xl shadow-blue-900/40">
        {/* Animated Rings Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 border-[40px] border-white/20 rounded-full -translate-x-1/2 -translate-y-1/2 animate-ping-slow" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] border-[60px] border-indigo-200/20 rounded-full translate-x-1/3 translate-y-1/3 rotate-45" />
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight max-w-4xl leading-tight">
          Ticaretinize Hız Kazandırın, <br />
          Zamanı Akıllıca Kullanın.
        </h2>

        <p className="max-w-xl text-xl text-blue-100 font-medium opacity-90 leading-relaxed">
          Nexus Quote ile dijitalleşmeye bugün başlayın. Kurumsal çözümlerimizle işinizi büyütün.
        </p>

        <div className="flex flex-wrap items-center gap-6 justify-center">
          <Link href="/products" className="group flex items-center justify-center gap-3 px-12 py-5 bg-white text-blue-700 rounded-3xl text-xl font-bold hover:bg-blue-50 transition-all cursor-pointer shadow-xl hover:scale-[1.03] active:scale-95">
            Hemen Başla
            <HiOutlineArrowCircleRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/auth" className="flex items-center justify-center gap-3 px-10 py-5 bg-transparent text-white border-2 border-white/30 rounded-3xl text-xl font-bold hover:bg-white/10 transition-all cursor-pointer active:scale-95">
            Bize Katılın
          </Link>
        </div>
      </div>
    </Container>
  </section>
);

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <CTASection />
      </main>

      {/* Footer (Simplified) */}
      <footer className="bg-gray-50 dark:bg-zinc-950 py-16 border-t border-gray-100 dark:border-white/5">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 opacity-60">
            <span className="text-gray-900 dark:text-white font-bold text-lg uppercase tracking-widest">Nexus Quote</span>
            <div className="flex items-center gap-12 font-semibold text-sm">
              <span className="cursor-pointer hover:text-blue-600 transition-colors">Şartlar</span>
              <span className="cursor-pointer hover:text-blue-600 transition-colors">Gizlilik</span>
              <span className="cursor-pointer hover:text-blue-600 transition-colors">Bize Ulaşın</span>
            </div>
            <p className="text-sm font-medium">© 2026 Nexus B2B Inc.</p>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default HomePage;
