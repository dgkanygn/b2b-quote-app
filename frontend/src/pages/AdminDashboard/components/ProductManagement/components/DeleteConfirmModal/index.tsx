import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { HiOutlineTrash, HiOutlineExclamation, HiOutlineX } from 'react-icons/hi';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message 
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={onClose} 
      />
      
      <div className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-300 border border-gray-100 p-10 text-center space-y-8">
        <div className="w-20 h-20 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-100 shadow-sm animate-bounce duration-[2000ms]">
          <HiOutlineExclamation className="w-10 h-10" />
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-extrabold text-gray-900 uppercase tracking-tight leading-none">{title}</h2>
          <p className="text-sm text-gray-400 font-bold uppercase tracking-widest leading-relaxed px-4">{message}</p>
        </div>

        <div className="flex flex-col gap-4 pt-4">
          <button 
            type="button"
            onClick={onConfirm}
            className="w-full h-16 bg-red-600 text-white rounded-2xl text-lg font-bold hover:bg-red-700 transition-all flex items-center justify-center gap-3 shadow-lg shadow-red-500/20 active:scale-95"
          >
            <HiOutlineTrash className="w-6 h-6" />
            Evet, Sil
          </button>
          
          <button 
            type="button"
            onClick={onClose}
            className="w-full h-16 bg-gray-50 border border-gray-100 text-gray-500 rounded-2xl text-lg font-bold hover:bg-white transition-all border-none hover:bg-gray-100 active:scale-95"
          >
            İptal
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default DeleteConfirmModal;
