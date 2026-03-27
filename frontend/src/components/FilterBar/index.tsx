"use client";

import React, { useState, useEffect } from 'react';
import { HiOutlineSearch, HiOutlineAdjustments, HiOutlineChevronDown } from 'react-icons/hi';
import { productService } from '../../services/productService';

interface FilterBarProps {
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ 
  onSearchChange, 
  onCategoryChange, 
  onSortChange 
}) => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const cats = await productService.getCategories();
        setCategories(cats);
      } catch {
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row items-center gap-6 p-8 bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-gray-100 dark:border-white/5 premium-shadow">
      {/* Search Input */}
      <div className="relative flex-1 w-full">
        <HiOutlineSearch className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
        <input 
          type="text" 
          placeholder="Ürün Ara..." 
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full h-16 pl-16 pr-6 bg-gray-50 dark:bg-black border border-gray-100 dark:border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600/50 transition-all font-semibold text-gray-900 dark:text-white" 
        />
      </div>

      {/* Category Selection */}
      <div className="flex items-center gap-4 w-full lg:w-auto">
        <div className="relative flex-1 lg:w-48">
          <select 
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full h-16 px-6 bg-gray-50 dark:bg-black border border-gray-100 dark:border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600/50 transition-all font-semibold text-gray-900 dark:text-white appearance-none cursor-pointer"
          >
            <option value="">Tüm Kategoriler</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <HiOutlineChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>

        {/* Sort Select */}
        <div className="relative flex-1 lg:w-48">
          <select 
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full h-16 px-6 bg-gray-50 dark:bg-black border border-gray-100 dark:border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600/50 transition-all font-semibold text-gray-900 dark:text-white appearance-none cursor-pointer"
          >
            <option value="asc">A - Z Sırala</option>
            <option value="desc">Z - A Sırala</option>
            <option value="stock">Stok Sayısı</option>
            <option value="newest">En Yeni</option>
          </select>
          <HiOutlineAdjustments className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
