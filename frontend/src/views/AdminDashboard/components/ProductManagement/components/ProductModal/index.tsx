import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { HiOutlineX, HiOutlinePlus, HiOutlinePhotograph, HiOutlineTrash } from 'react-icons/hi';

interface Product {
  id: string | number;
  name: string;
  category: string;
  description: string;
  stock: number;
  images: string[];
  status: 'active' | 'out_of_stock' | 'draft';
}

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: Product | null;
}

const schema = yup.object().shape({
  name: yup.string().required('Ürün adı zorunludur'),
  category: yup.string().required('Kategori zorunludur'),
  description: yup.string().required('Açıklama zorunludur'),
  stock: yup.number().typeError('Geçerli bir stok miktarı girin').min(0, 'Stok 0\'dan küçük olamaz').required('Stok zorunludur'),
  status: yup.string().oneOf(['active', 'out_of_stock', 'draft']).required(),
});

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [mounted, setMounted] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      status: 'active'
    }
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        category: initialData.category,
        description: initialData.description,
        stock: initialData.stock,
        status: initialData.status,
      });
      setImages(initialData.images || []);
    } else {
      reset({
        name: '',
        category: '',
        description: '',
        stock: 0,
        status: 'active'
      });
      setImages([]);
    }
  }, [initialData, reset]);


  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleFormSubmit = (data: any) => {
    onSubmit({ ...data, images, id: initialData?.id });
    onClose();
  };

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose} />
      
      <div className="relative w-full max-w-3xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-300 border border-gray-100 flex flex-col max-h-[90vh]">
        <div className="p-8 border-b border-gray-50 flex items-center justify-between">
          <h2 className="text-2xl font-extrabold text-gray-900 uppercase tracking-wider">
            {initialData ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'}
          </h2>
          <button onClick={onClose} className="p-3 hover:bg-gray-100 rounded-2xl transition-all text-gray-400 hover:text-gray-900">
            <HiOutlineX className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Ürün Adı</label>
                <input 
                  {...register('name')}
                  className="w-full h-14 px-6 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-blue-500 transition-all font-semibold"
                />
                {errors.name && <p className="text-[10px] text-red-500 font-bold uppercase">{errors.name.message as string}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Kategori</label>
                <select 
                  {...register('category')}
                  className="w-full h-14 px-6 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-blue-500 transition-all font-semibold appearance-none"
                >
                  <option value="">Kategori Seçin</option>
                  <option value="Plaka">Plaka</option>
                  <option value="Karo">Karo</option>
                  <option value="Blok">Blok</option>
                  <option value="Dekorasyon">Dekorasyon</option>
                  <option value="Tezgah">Tezgah</option>
                </select>
                {errors.category && <p className="text-[10px] text-red-500 font-bold uppercase">{errors.category.message as string}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Stok Miktarı</label>
                <input 
                  type="number"
                  {...register('stock')}
                  className="w-full h-14 px-6 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-blue-500 transition-all font-semibold"
                />
                {errors.stock && <p className="text-[10px] text-red-500 font-bold uppercase">{errors.stock.message as string}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Durum</label>
                <select 
                  {...register('status')}
                  className="w-full h-14 px-6 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-blue-500 transition-all font-semibold appearance-none"
                >
                  <option value="active">Aktif</option>
                  <option value="out_of_stock">Stok Yok</option>
                  <option value="draft">Taslak</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Açıklama</label>
              <textarea 
                {...register('description')}
                rows={3}
                className="w-full p-6 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-blue-500 transition-all font-semibold resize-none"
              />
              {errors.description && <p className="text-[10px] text-red-500 font-bold uppercase">{errors.description.message as string}</p>}
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 block">Görseller (Maks. 5)</label>
                <span className="text-[10px] font-bold text-gray-400 uppercase bg-gray-50 px-3 py-1 rounded-full border border-gray-100 italic">
                  {images.length} / 5 Seçildi
                </span>
              </div>
              
              {images.length < 5 && (
                <div className="relative group">
                  <input 
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      const remainingSlots = 5 - images.length;
                      const allowedFiles = files.slice(0, remainingSlots);
                      
                      allowedFiles.forEach(file => {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setImages(prev => [...prev, reader.result as string].slice(0, 5));
                        };
                        reader.readAsDataURL(file);
                      });
                    }}
                    className="absolute inset-0 w-full h-32 opacity-0 cursor-pointer z-10"
                  />
                  <div className="w-full h-32 border-2 border-dashed border-gray-100 rounded-2xl flex flex-col items-center justify-center text-gray-400 group-hover:border-blue-500 group-hover:text-blue-500 transition-all bg-gray-50/50">
                    <HiOutlinePhotograph className="w-8 h-8 mb-2" />
                    <span className="text-xs font-bold uppercase tracking-widest">Görsel Seç veya Sürükle</span>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                {images.map((img, idx) => (
                  <div key={idx} className="relative group aspect-square rounded-2xl overflow-hidden border border-gray-100 shadow-sm transition-all hover:scale-[1.02]">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                      <button 
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="p-3 bg-red-600 text-white rounded-xl hover:scale-110 transition-transform shadow-lg"
                      >
                        <HiOutlineTrash className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
                {images.length === 0 && (
                  <div className="col-span-full py-12 border-2 border-dashed border-gray-100 rounded-3xl flex flex-col items-center justify-center text-gray-400 space-y-2 opacity-30">
                    <HiOutlinePhotograph className="w-8 h-8" />
                    <span className="text-xs font-bold uppercase tracking-widest">Görsel Bulunmuyor</span>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>

        <div className="p-8 border-t border-gray-50 bg-gray-50/50 flex gap-4 justify-end">
          <button 
            type="button"
            onClick={onClose}
            className="px-8 h-14 bg-white border border-gray-200 text-gray-500 rounded-2xl font-bold hover:bg-gray-100 transition-all shadow-sm"
          >
            İptal
          </button>
          <button 
            type="button"
            onClick={handleSubmit(handleFormSubmit)}
            className="px-12 h-14 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
          >
            {initialData ? 'Güncelle' : 'Kaydet'}
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default ProductModal;
