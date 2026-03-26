"use client";

import React, { useState } from 'react';
import { FiUploadCloud, FiFileText, FiX, FiCheckCircle } from 'react-icons/fi';

const ExcelUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setIsDone(false);
    }
  };

  const handleUpload = () => {
    if (!file) return;
    setIsUploading(true);
    // Simulate upload
    setTimeout(() => {
      setIsUploading(false);
      setIsDone(true);
      setFile(null);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom duration-500">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Excel ile Toplu Yükleme</h2>
        <p className="text-gray-500 text-sm">Ürünleri Excel dosyası (.xlsx, .csv) kullanarak sisteme toplu olarak aktarın.</p>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center space-y-6">
        <label 
          className={`
            w-full border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center space-y-4 transition-all cursor-pointer
            ${file ? 'border-blue-500 bg-blue-50/10' : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50/50'}
          `}
        >
          <input type="file" className="hidden" onChange={handleFileChange} accept=".xlsx,.xls,.csv" />
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
            <FiUploadCloud className="w-8 h-8" />
          </div>
          <div className="text-center">
            <span className="block font-semibold text-gray-900 text-lg">Dosya Seçin veya Sürükleyin</span>
            <span className="block text-gray-400 text-sm mt-1">Sadece .xlsx, .csv formatları desteklenir. Max 10MB.</span>
          </div>
        </label>

        {file && (
          <div className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FiFileText className="text-blue-600 w-5 h-5" />
              <span className="text-sm font-medium text-gray-700">{file.name}</span>
              <span className="text-xs text-gray-400">({(file.size / 1024).toFixed(1)} KB)</span>
            </div>
            <button onClick={() => setFile(null)} className="text-gray-400 hover:text-red-600 cursor-pointer">
              <FiX className="w-5 h-5" />
            </button>
          </div>
        )}

        {isDone && (
          <div className="w-full p-4 bg-green-50 border border-green-100 rounded-xl flex items-center justify-center space-x-3 text-green-700 font-semibold">
            <FiCheckCircle className="w-5 h-5" />
            <span>Dosya başarıyla yüklendi! Ürünler içe aktarıldı.</span>
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={!file || isUploading}
          className={`
            w-full py-4 rounded-xl font-bold transition-all shadow-lg cursor-pointer
            ${!file || isUploading 
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none' 
              : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100'}
          `}
        >
          {isUploading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Dosya İşleniyor...</span>
            </div>
          ) : (
            'Yüklemeyi Başlat'
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-3">
          <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center font-bold">1</div>
          <h4 className="font-bold text-gray-900">Şablonu İndirin</h4>
          <p className="text-sm text-gray-500 leading-relaxed text-justify">Doğru veri formatı için örnek Excel şablonumuzu kullanarak dosyanızı hazırlayın.</p>
          <button className="text-blue-600 font-semibold text-sm hover:underline cursor-pointer">Şablonu İndir →</button>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-3">
           <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center font-bold">2</div>
          <h4 className="font-bold text-gray-900">Exceli Doldurun</h4>
          <p className="text-sm text-gray-500 leading-relaxed text-justify">Ürün adı, Stok, Kategori ve Fiyat bilgilerini eksiksiz girdiğinizden emin olun.</p>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-3">
           <div className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center font-bold">3</div>
          <h4 className="font-bold text-gray-900">Yükleyin</h4>
          <p className="text-sm text-gray-500 leading-relaxed text-justify">Dosyanızı sisteme yükleyip onaylayın. Ürünler anında listelenecektir.</p>
        </div>
      </div>
    </div>
  );
};

export default ExcelUpload;
