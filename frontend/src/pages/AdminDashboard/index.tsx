"use client";

import React from 'react';
import { useAdminDashboard } from './hooks/useAdminDashboard';
import Sidebar from './components/Sidebar';
import ProductManagement from './components/ProductManagement';
import ExcelUpload from './components/ExcelUpload';
import QuoteManagement from './components/QuoteManagement';
import { FiBell, FiSearch, FiSettings, FiUser } from 'react-icons/fi';

const AdminDashboard = () => {
  const { 
    activeTab, 
    changeTab, 
    isSidebarOpen, 
    toggleSidebar, 
    admin, 
    handleLogout 
  } = useAdminDashboard();

  const renderContent = () => {
    switch (activeTab) {
      case 'products':
        return <ProductManagement />;
      case 'excel-upload':
        return <ExcelUpload />;
      case 'quotes':
        return <QuoteManagement />;
      default:
        return <ProductManagement />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f1f3f6] font-sans selection:bg-blue-100/50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        onChangeTab={changeTab} 
        isOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar}
        onLogout={handleLogout}
        adminName={admin?.name}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Navbar */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center space-x-4 flex-1 max-w-xl">
             <div className="relative w-full">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Hızlı arama..." 
                  className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all outline-none text-sm"
                />
             </div>
          </div>

          <div className="flex items-center space-x-6 ml-6">
            <button className="p-3 text-gray-400 hover:bg-gray-50 hover:text-blue-600 rounded-xl transition-all cursor-pointer relative group">
              <FiBell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white group-hover:scale-125 transition-transform animate-pulse"></span>
            </button>
            <button className="p-3 text-gray-400 hover:bg-gray-50 hover:text-blue-600 rounded-xl transition-all cursor-pointer">
              <FiSettings className="w-5 h-5" />
            </button>
            <div className="h-8 w-px bg-gray-100"></div>
            <div className="flex items-center space-x-3 group cursor-pointer p-1.5 hover:bg-gray-50 rounded-xl transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold group-hover:rotate-6 transition-transform">
                {admin?.name.charAt(0) || <FiUser />}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-bold text-gray-900 leading-tight">{admin?.name || 'Nexus Admin'}</p>
                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{admin?.role || 'Süper Admin'}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
           <div className="max-w-[1440px] mx-auto">
             {renderContent()}
           </div>
           
           <footer className="mt-12 py-8 border-t border-gray-200 text-center text-gray-400 text-sm">
             <p>© 2026 Nexus B2B Yönetim Sistemi • v1.0.4</p>
           </footer>
        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f3f6;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
