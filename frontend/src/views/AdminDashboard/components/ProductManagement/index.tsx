"use client";

import React, { useState } from 'react';
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiBox } from 'react-icons/fi';
import ProductModal from './components/ProductModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  stock: number;
  images: string[];
  status: 'active' | 'out_of_stock' | 'draft';
}

const DUMMY_PRODUCTS: Product[] = [
  { 
    id: '1', 
    name: 'Mermer Plaka - Carrara', 
    category: 'Plaka', 
    description: 'Italyan beyaz mermer plaka 2cm', 
    stock: 45, 
    images: ['https://images.unsplash.com/photo-1558346490-a72e53ae2d4f'],
    status: 'active' 
  },
  { 
    id: '2', 
    name: 'Traverten Karo - Light Beige', 
    category: 'Karo', 
    description: 'Hassas kesim traverten karo', 
    stock: 0, 
    images: ['https://images.unsplash.com/photo-1558346490-a72e53ae2d4f'],
    status: 'out_of_stock' 
  },
  { 
    id: '3', 
    name: 'Granit Tezgah - Black Pearl', 
    category: 'Tezgah', 
    description: 'Siyah inci granit mutfak tezgahı', 
    stock: 12, 
    images: ['https://images.unsplash.com/photo-1558346490-a72e53ae2d4f'],
    status: 'active' 
  },
  { 
    id: '4', 
    name: 'Mozaik Duvar Kaplaması', 
    category: 'Dekorasyon', 
    description: 'Dekoratif cam mozaik', 
    stock: 120, 
    images: ['https://images.unsplash.com/photo-1558346490-a72e53ae2d4f'],
    status: 'active' 
  },
  { 
    id: '5', 
    name: 'Bej Mermer Blok', 
    category: 'Blok', 
    description: 'İşlenmemiş ham blok mermer', 
    stock: 5, 
    images: ['https://images.unsplash.com/photo-1558346490-a72e53ae2d4f'],
    status: 'draft' 
  },
];

const ProductManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState(DUMMY_PRODUCTS);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setIsProductModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleDeleteProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const onProductSubmit = (data: Product) => {
    if (selectedProduct) {
      setProducts(prev => prev.map(p => p.id === selectedProduct.id ? { ...data, id: p.id } : p));
    } else {
      const newProduct = { ...data, id: Math.random().toString(36).substr(2, 9) };
      setProducts(prev => [...prev, newProduct]);
    }
    setIsProductModalOpen(false);
  };

  const onConfirmDelete = () => {
    if (selectedProduct) {
      setProducts(prev => prev.filter(p => p.id !== selectedProduct.id));
      setIsDeleteModalOpen(false);
      setSelectedProduct(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Ürün Yönetimi</h2>
          <p className="text-gray-500 text-sm">Ürünleri ekleyin, düzenleyin veya kaldırın.</p>
        </div>
        <button 
          onClick={handleAddProduct}
          className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-md shadow-blue-100 cursor-pointer"
        >
          <FiPlus className="w-5 h-5" />
          <span className="font-semibold text-sm">Yeni Ürün Ekle</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Ürün adı veya kategori ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Ürün</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Kategori</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Fiyat</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Stok</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Durum</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                         <FiBox className="w-5 h-5" />
                      </div>
                      <span className="font-medium text-gray-900">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md text-sm font-medium">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    -- (Teklif Bazlı)
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm ${product.stock < 10 ? 'text-orange-600 font-bold' : 'text-gray-600'}`}>
                      {product.stock} Adet
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={product.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        onClick={() => handleEditProduct(product)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all cursor-pointer"
                      >
                        <FiEdit2 className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleDeleteProduct(product)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ProductModal 
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onSubmit={onProductSubmit}
        initialData={selectedProduct}
      />

      <DeleteConfirmModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={onConfirmDelete}
        title="Ürünü Sil"
        message={`"${selectedProduct?.name}" ürününü silmek üzeresiniz. Bu işlem geri alınamaz.`}
      />
    </div>
  );
};

const StatusBadge = ({ status }: { status: Product['status'] }) => {
  const config = {
    active: { text: 'Aktif', bg: 'bg-green-100', color: 'text-green-700' },
    out_of_stock: { text: 'Stok Yok', bg: 'bg-red-100', color: 'text-red-700' },
    draft: { text: 'Taslak', bg: 'bg-gray-100', color: 'text-gray-700' }
  };
  const { text, bg, color } = config[status];
  return (
    <span className={`px-2.5 py-1 ${bg} ${color} rounded-md text-xs font-bold uppercase`}>
      {text}
    </span>
  );
};

export default ProductManagement;
