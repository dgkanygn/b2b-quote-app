"use client";

import React from 'react';
import { HiMinus, HiPlus } from 'react-icons/hi';

interface QuantitySelectorProps {
  quantity: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ 
  quantity, 
  onChange, 
  min = 1, 
  max = 999,
  className = ""
}) => {
  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity > min) onChange(quantity - 1);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity < max) onChange(quantity + 1);
  };

  return (
    <div className={`flex items-center gap-2 bg-gray-100 dark:bg-zinc-800 p-1 rounded-xl border border-gray-200 dark:border-white/10 ${className}`}>
      <button 
        onClick={handleDecrement}
        disabled={quantity <= min}
        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white dark:hover:bg-zinc-700 transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed text-gray-700 dark:text-gray-300"
      >
        <HiMinus className="w-4 h-4" />
      </button>
      
      <span className="w-8 text-center text-sm font-bold text-gray-900 dark:text-white tabular-nums">
        {quantity}
      </span>

      <button 
        onClick={handleIncrement}
        disabled={quantity >= max}
        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white dark:hover:bg-zinc-700 transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed text-gray-700 dark:text-gray-300"
      >
        <HiPlus className="w-4 h-4" />
      </button>
    </div>
  );
};

export default QuantitySelector;
