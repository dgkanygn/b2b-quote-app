"use client";

import React from 'react';
import { 
  FiPackage, 
  FiFilePlus, 
  FiCreditCard, 
  FiLogOut, 
  FiGrid, 
  FiChevronLeft, 
  FiChevronRight,
  FiMenu
} from 'react-icons/fi';
import { DashboardTab } from '../../hooks/useAdminDashboard';

interface SidebarProps {
  activeTab: DashboardTab;
  onChangeTab: (tab: DashboardTab) => void;
  isOpen: boolean;
  toggleSidebar: () => void;
  onLogout: () => void;
  adminName?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  onChangeTab, 
  isOpen, 
  toggleSidebar, 
  onLogout,
  adminName
}) => {
  return (
    <aside className={`
      fixed lg:relative bg-white border-r border-gray-100 min-h-screen transition-all duration-300 z-50 overflow-hidden
      ${isOpen 
        ? 'translate-x-0 w-64 opacity-100' 
        : '-translate-x-full lg:translate-x-0 w-64 lg:w-20'
      }
    `}>
      <div className={`flex flex-col h-full ${!isOpen ? 'lg:w-20' : 'w-64'}`}>
        {/* Header */}
        <div className="p-6 flex items-center justify-between border-b border-gray-50">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold text-xl mx-auto">N</div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-8 space-y-4">
          <SidebarItem 
            icon={<FiPackage />} 
            label="Ürün Yönetimi" 
            isActive={activeTab === 'products'} 
            isOpen={isOpen}
            onClick={() => onChangeTab('products')} 
          />
          <SidebarItem 
            icon={<FiFilePlus />} 
            label="Excel Yükle" 
            isActive={activeTab === 'excel-upload'} 
            isOpen={isOpen}
            onClick={() => onChangeTab('excel-upload')} 
          />
          <SidebarItem 
            icon={<FiCreditCard />} 
            label="Teklif Yönetimi" 
            isActive={activeTab === 'quotes'} 
            isOpen={isOpen}
            onClick={() => onChangeTab('quotes')} 
          />
        </nav>

        {/* User / Logout */}
        <div className="p-6 border-t border-gray-50 mt-auto">
          {isOpen && (
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-semibold uppercase">
                  {adminName?.charAt(0) || 'A'}
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-semibold text-gray-900 truncate">{adminName || 'Admin'}</p>
                  <p className="text-xs text-gray-400 truncate">Sistem Yöneticisi</p>
                </div>
              </div>
              <button 
                onClick={onLogout}
                className="flex items-center space-x-2 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all cursor-pointer w-full"
              >
                <FiLogOut className="w-5 h-5" />
                <span className="font-medium">Oturumu Kapat</span>
              </button>
            </div>
          )}
          {!isOpen && (
             <button 
               onClick={onLogout}
               className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-all cursor-pointer mx-auto flex items-center justify-center"
               title="Oturumu Kapat"
             >
               <FiLogOut className="w-5 h-5 " />
             </button>
          )}
        </div>
      </div>
      
      {/* Desktop Toggle Button */}
      <button 
        onClick={toggleSidebar}
        className="hidden lg:flex absolute -right-3 top-10 w-6 h-6 bg-white border border-gray-100 rounded-full shadow-sm items-center justify-center text-gray-400 hover:text-blue-500 cursor-pointer"
      >
        {isOpen ? <FiChevronLeft className="w-4 h-4" /> : <FiChevronRight className="w-4 h-4" />}
      </button>
    </aside>
  );
};

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  isOpen: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, isActive, isOpen, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        flex items-center space-x-4 px-4 py-3.5 rounded-xl transition-all cursor-pointer
        ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}
        ${!isOpen && 'justify-center px-0'}
      `}
      title={!isOpen ? label : ''}
    >
      <div className="text-xl">
        {icon}
      </div>
      {isOpen && (
        <span className="font-medium whitespace-nowrap overflow-hidden text-ellipsis">
          {label}
        </span>
      )}
    </div>
  );
};

export default Sidebar;
