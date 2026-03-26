import React from 'react';
import { HiOutlineX, HiOutlineMail, HiOutlineOfficeBuilding, HiOutlineChatAlt2, HiOutlineCheckCircle } from 'react-icons/hi';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
  onSubmit: (data: any) => void;
}

const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, isLoggedIn, onSubmit }) => {
  const schema = yup.object().shape({
    guest_email: isLoggedIn ? yup.string() : yup.string().email('Geçerli bir e-posta girin').required('E-posta zorunludur'),
    guest_company_name: isLoggedIn ? yup.string() : yup.string().required('Firma adı zorunludur'),
    note: yup.string()
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });

  if (!isOpen) return null;

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={onClose} 
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-300 border border-gray-100 dark:border-white/5">
        <div className="p-8 sm:p-12 space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white uppercase tracking-wider">Teklif Talebi</h2>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Nexus Pro Services</p>
            </div>
            <button 
              onClick={onClose}
              className="p-3 hover:bg-gray-100 dark:hover:bg-white/5 rounded-2xl transition-all cursor-pointer text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <HiOutlineX className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            {!isLoggedIn && (
              <div className="space-y-4">
                <div className="relative group">
                  <HiOutlineMail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                  <input 
                    {...register('guest_email')}
                    type="email" 
                    placeholder="E-posta Adresiniz" 
                    className={`w-full h-14 pl-14 pr-5 bg-gray-50 dark:bg-black border ${errors.guest_email ? 'border-red-500' : 'border-gray-200 dark:border-white/10'} rounded-xl outline-none focus:border-blue-600/50 transition-all font-semibold text-sm text-gray-900 dark:text-white`}
                  />
                  {errors.guest_email && <p className="text-[10px] text-red-500 mt-1 ml-2 font-bold uppercase">{errors.guest_email.message as string}</p>}
                </div>

                <div className="relative group">
                  <HiOutlineOfficeBuilding className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                  <input 
                    {...register('guest_company_name')}
                    type="text" 
                    placeholder="Firma Adınız" 
                    className={`w-full h-14 pl-14 pr-5 bg-gray-50 dark:bg-black border ${errors.guest_company_name ? 'border-red-500' : 'border-gray-200 dark:border-white/10'} rounded-xl outline-none focus:border-blue-600/50 transition-all font-semibold text-sm text-gray-900 dark:text-white`}
                  />
                  {errors.guest_company_name && <p className="text-[10px] text-red-500 mt-1 ml-2 font-bold uppercase">{errors.guest_company_name.message as string}</p>}
                </div>
              </div>
            )}

            <div className="relative group">
              <HiOutlineChatAlt2 className="absolute left-5 top-5 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
              <textarea 
                {...register('note')}
                placeholder="Özel Notunuz (Tercihen özellikler, termin süresi vb.)" 
                rows={4}
                className="w-full pl-14 pr-5 py-4 bg-gray-50 dark:bg-black border border-gray-200 dark:border-white/10 rounded-xl outline-none focus:border-blue-600/50 transition-all font-semibold text-sm text-gray-900 dark:text-white resize-none"
              />
            </div>

            <button 
              type="submit"
              className="w-full h-16 flex items-center justify-center gap-3 bg-blue-600 text-white rounded-2xl text-lg font-bold hover:bg-blue-700 transition-all cursor-pointer shadow-lg shadow-blue-600/20 active:scale-95"
            >
              <span>Talebi Gönder</span>
              <HiOutlineCheckCircle className="w-6 h-6" />
            </button>

            <p className="text-[10px] text-center text-gray-400 font-bold uppercase tracking-widest pt-4">
              Talebiniz uzman ekiplerimiz tarafından 24 saat içerisinde değerlendirilecektir.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuoteModal;
