"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { HiOutlineUser, HiOutlineShoppingBag, HiOutlineShoppingCart, HiOutlineMenuAlt4, HiOutlineLogout, HiOutlineLogin, HiOutlineX } from 'react-icons/hi';
import Container from '../Container';
import { useAuth } from '../../context/AuthContext';
import { useCartContext } from '../../context/CartContext';

const Navbar: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();
  const { totalItems } = useCartContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-black/95 backdrop-blur-md border-b border-gray-100 dark:border-white/10 premium-shadow">
        <Container>
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 cursor-pointer group">
              <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-xl uppercase tracking-wider">N</span>
              </div>
              <span className="text-xl font-extrabold tracking-tighter text-gray-900 dark:text-white uppercase">Nexus Quote</span>
            </Link>

            {/* Desktop Icons */}
            <div className="hidden md:flex items-center gap-2">
              {/* Market Button */}
              <Link 
                href="/products" 
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all cursor-pointer shadow-md shadow-blue-500/10 active:scale-95 group mr-2"
              >
                <HiOutlineShoppingBag className="w-5 h-5" />
                <span className="text-sm font-bold">Market</span>
              </Link>

              <Link href={isLoggedIn ? "/profile" : "/auth"} className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer group text-gray-600 dark:text-gray-300">
                <HiOutlineUser className="w-6 h-6 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
              </Link>

              <Link href="/cart" className="relative p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer group text-gray-600 dark:text-gray-300">
                <HiOutlineShoppingCart className="w-6 h-6 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                {totalItems > 0 && (
                  <span className="absolute top-1 right-1 w-5 h-5 bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white dark:border-black animate-bounce group-hover:animate-none">
                    {totalItems}
                  </span>
                )}
              </Link>

              {isLoggedIn && (
                <button 
                  onClick={async () => { await logout(); window.location.href = '/'; }}
                  title="Çıkış Yap"
                  className="p-2.5 rounded-full hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors cursor-pointer group text-gray-600 dark:text-gray-300"
                >
                  <HiOutlineLogout className="w-6 h-6 group-hover:text-red-600 transition-colors" />
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMenu}
              className="md:hidden p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer text-gray-600 dark:text-gray-300"
            >
              <HiOutlineMenuAlt4 className="w-6 h-6" />
            </button>
          </div>
        </Container>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div 
        className={`fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleMenu}
      />

      {/* Mobile Sidebar */}
      <div 
        className={`fixed top-0 right-0 z-[70] h-full w-[280px] bg-white dark:bg-zinc-900 shadow-2xl transition-transform duration-300 transform md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full p-8">
          <div className="flex justify-end mb-8">
            <button 
              onClick={toggleMenu}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer text-gray-600 dark:text-gray-300"
            >
              <HiOutlineX className="w-7 h-7" />
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <Link 
              href="/products" 
              onClick={toggleMenu}
              className="flex items-center gap-4 p-4 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
            >
              <HiOutlineShoppingBag className="w-6 h-6" />
              <span className="font-bold">Market</span>
            </Link>

            <Link 
              href={isLoggedIn ? "/profile" : "/auth"} 
              onClick={toggleMenu}
              className="flex items-center gap-4 p-4 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5 rounded-2xl transition-all font-bold"
            >
              <HiOutlineUser className="w-6 h-6 text-blue-600" />
              Profil
            </Link>

            <Link 
              href="/cart" 
              onClick={toggleMenu}
              className="flex items-center gap-4 p-4 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5 rounded-2xl transition-all font-bold relative"
            >
              <HiOutlineShoppingCart className="w-6 h-6 text-indigo-600" />
              Sepetim
              {totalItems > 0 && (
                <span className="ml-auto w-6 h-6 bg-blue-600 text-white text-[12px] font-bold flex items-center justify-center rounded-full leading-none">
                  {totalItems}
                </span>
              )}
            </Link>

            {isLoggedIn && (
              <button 
                onClick={async () => { await logout(); window.location.href = '/'; }}
                className="flex items-center gap-4 p-4 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-2xl transition-all font-bold mt-auto"
              >
                <HiOutlineLogout className="w-6 h-6" />
                Çıkış Yap
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
