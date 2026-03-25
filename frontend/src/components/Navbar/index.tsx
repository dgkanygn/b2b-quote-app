"use client";

import React from 'react';
import Link from 'next/link';
import { HiOutlineUser, HiOutlineShoppingBag, HiOutlineSearch, HiOutlineMenuAlt4, HiOutlineLogout, HiOutlineLogin } from 'react-icons/hi';
import Container from '../Container';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const { isLoggedIn, toggleAuth } = useAuth();

  return (
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/products" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
              Ürünler
            </Link>
            <Link href="/cart" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
              Teklif Al
            </Link>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            {/* Auth Toggle for Debugging */}
            <button 
              onClick={toggleAuth}
              className="px-3 py-1 text-[10px] font-bold border rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              {isLoggedIn ? 'LOGOUT (DEV)' : 'LOGIN (DEV)'}
            </button>

            <button className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer group text-gray-600 dark:text-gray-300">
              <HiOutlineSearch className="w-6 h-6 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
            </button>
            <Link href={isLoggedIn ? "/profile" : "/auth"} className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer group text-gray-600 dark:text-gray-300">
              <HiOutlineUser className="w-6 h-6 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
            </Link>
            <Link href="/cart" className="relative p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer group text-gray-600 dark:text-gray-300">
              <HiOutlineShoppingBag className="w-6 h-6 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
              <span className="absolute top-1 right-1 w-5 h-5 bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white dark:border-black animate-bounce">
                2
              </span>
            </Link>
            <button className="md:hidden p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer text-gray-600 dark:text-gray-300">
              <HiOutlineMenuAlt4 className="w-6 h-6" />
            </button>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
