import React from 'react';
import { HiOutlineLightningBolt, HiOutlineCloudUpload, HiOutlineThumbUp, HiOutlineRefresh } from 'react-icons/hi';
import Container from '../../../../components/Container';

const features = [
  {
    title: "Süper Hızlı Teklifleme",
    description: "Zamanınız kıymetli. Dakikalar içinde fiyat teklifinizi alın ve süreçlerinizi hızlandırın.",
    icon: <HiOutlineLightningBolt className="w-8 h-8" />,
    color: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-900/20"
  },
  {
    title: "Excel ile Entegrasyon",
    description: "Tekliflerini Excel olarak indirip ERP sistemlerinize kolayca aktarabilirsiniz.",
    icon: <HiOutlineCloudUpload className="w-8 h-8" />,
    color: "text-indigo-600",
    bg: "bg-indigo-50 dark:bg-indigo-900/20"
  },
  {
    title: "Güvenilir Çözüm Ortağı",
    description: "Yılların tecrübesi ve %100 müşteri memnuniyeti ile yanınızdayız.",
    icon: <HiOutlineThumbUp className="w-8 h-8" />,
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-900/20"
  },
  {
    title: "Anlık Stok Takibi",
    description: "Güncel stok durumunu anasayfadan görebilir, buna göre sipariş verebilirsiniz.",
    icon: <HiOutlineRefresh className="w-8 h-8" />,
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-900/20"
  }
];

const Features: React.FC = () => {
  return (
    <section className="bg-gray-50 dark:bg-black/95 py-24 border-y border-gray-100 dark:border-white/5">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group p-8 bg-white dark:bg-zinc-900/50 rounded-3xl border border-gray-100 dark:border-white/5 hover:border-blue-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 cursor-pointer"
            >
              <div className={`w-16 h-16 ${feature.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <span className={`${feature.color}`}>{feature.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Features;
