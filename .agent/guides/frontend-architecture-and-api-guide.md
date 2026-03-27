# Nexus B2B - Frontend Architecture & API Design Guide

Bu doküman, Nexus B2B frontend projesinin mevcut mimarisini, durum yönetimini (state management), klasör yapısını ve gelecekte geliştirilecek olan backend API için gerekli olan endpoint tasarımlarını açıklamaktadır.

## 1. Mimari ve Teknoloji Yığını (Tech Stack)

Frontend projesi güncel ve modern web teknolojileri üzerine inşa edilmiştir:

- **Framework:** Next.js 16.x (App Router mimarisi kullanılıyor)
- **Dil:** TypeScript (Sıkı tip güvenliği)
- **Stil Yönetimi:** Tailwind CSS (Yardımcı sınıflarla hızlı ve modern tasarım)
- **İkonlar:** `react-icons` (özellikle `Fi` - Feather Icons seti)
- **Durum Yönetimi (State):** React Context API (Auth, AdminAuth, Cart)
- **Routing:** Klasör tabanlı yönlendirme (`src/app/`)
- **Veri Tutma:** Şu anda geçici olarak (dummy data) ve `localStorage` (Sepet ve Oturum için) kullanılmaktadır.

---

## 2. Klasör Yapısı ve Modüler Tasarım

Uygulamanın temel gücü, her sayfa ve bileşenin kendi içinde modülerleştirilmiş (`index.tsx`, `components/`, `hooks/`) dizinlerinden gelmesidir.

```text
frontend/src/
├── app/                  # Next.js App Router (Sayfa yönlendirmeleri)
├── components/           # Uygulama genelinde paylaşılan bileşenler (Navbar, Footer, Container vb.)
├── context/              # Global State yönetimi (AuthContext, AdminAuthContext, CartContext)
└── views/                # Sayfaların ana mantık ve görünümleri
    ├── AdminDashboard/   # Yönetim Paneli (Ürün, Teklif ve Excel yönetimi)
    ├── AdminLogin/       # Yönetici Giriş Sayfası
    ├── Auth/             # Müşteri Giriş / Kayıt Sayfası
    ├── Cart/             # Sepet ve Teklif İsteme Ekranı
    ├── Home/             # Ana Sayfa / Landing Page
    ├── ProductDetail/    # Ürün Detay Sayfası
    ├── Products/         # Ürün Listeleme, Filtreleme ve Arama
    └── Profile/          # Müşteri Profil Sayfası
```

### Kurallar (User Rules)
1. **İş Mantığı (Business Logic):** Bileşenlerin içerisindeki karmaşık veri işleme adımları `hooks/` klasörü altındaki custom hook'lara (örn. `useProducts.ts`) taşınmıştır.
2. **Bileşen Modülerliği:** Uzun bileşenler daha küçük alt bileşenlere ayrılmıştır (`views/AdminDashboard/components/`).
3. **Yönlendirmeler:** `src/app/` içerisindeki sayfalar (`page.tsx`), doğrudan `src/views/` altındaki ilgili sayfayı render eder.

---

## 3. Global Durum Yönetimi (Context API)

Mevcut uygulamada API olmadığı için veriler Context API içerisinde `DUMMY_DATA` olarak yönetilmektedir.

### 3.1. AuthContext (Kullanıcı Oturumu)
- **Görevi:** B2B müşterilerinin giriş yapması ve oturum bilgilerinin tutulması.
- **Mevcut Durum:** `DUMMY_USER` kullanılarak (email, firma adı, vergi numarası vb.) sahte login işlemi yapılmaktadır.

### 3.2. AdminAuthContext (Yönetici Oturumu)
- **Görevi:** Yönetim paneline (`/admin`) giriş. yetkilendirme işlemleri.
- **Mevcut Durum:** Statik email (`admin@nexusb2b.com`) ve şifre (`admin123`) kontrolü yapılarak yetkilendirme sağlanır. `localStorage` üzerinde state tutulur.

### 3.3. CartContext (Alışveriş/Teklif Sepeti)
- **Görevi:** Ürünlerin sepete eklenmesi, miktarlarının güncellenmesi ve sepetin temizlenmesi.
- **Veri Modeli:** `items: { product: Product, quantity: number }[]`
- **Mevcut Durum:** Değişiklikler anlık olarak tarayıcının `localStorage` (nexus-cart key'i ile) belleğine senkronize edilir.

---

## 4. Kullanıcı Arayüzü (Views) & Beklenen API Gereksinimleri

Frontend tarafında işlenen sahte verilerin, gerçek bir veritabanı ile değiştirilebilmesi için aşağıdaki API uç noktalarına (endpoints) ihtiyaç vardır.

### 4.1. Ürün Yönetimi (Products)
Frontend'de `Product` modeli şu şekildedir:
```typescript
{
  id: string;
  name: string;
  category: string;
  description: string;
  stock: number;
  images: string[];
  status: 'active' | 'out_of_stock' | 'draft';
}
```

**Gereken Endpoints:**
- `GET /api/products` : Ürünleri listelemek, aramak(search) ve kategorilere göre filtrelemek için. (Müşteri ve Admin listesi)
- `GET /api/products/:id` : Tekil ürün detayı çekmek için.
- `POST /api/products` : (Admin) Yeni ürün eklemek için.
- `PUT /api/products/:id` : (Admin) Ürün bilgilerini (stok, görsel, açıklama) güncellemek için.
- `DELETE /api/products/:id` : (Admin) Ürünü silmek veya pasife almak için.

### 4.2. Kimlik Doğrulama ve Profil (Auth & Users)
**Gereken Endpoints:**
- `POST /api/auth/login` : Kullanıcı girişi. (JWT token veya session dönmeli)
- `POST /api/auth/register` : Yeni kurum/kullanıcı kaydı. (Firma unvanı, V.D., Vergi No gibi kurumsal bilgiler toplanıyor).
- `POST /api/admin/login` : Admin yetkili personel girişi.
- `GET /api/user/profile` : Giriş yapmış olan müşterinin güncel firma detaylarını çekmek için.
- `PUT /api/user/profile` : Şirket bilgilerini güncellemek için.

### 4.3. Teklif Talepleri (Quotes)
Uygulamanın temel amacı direkt satıştan ziyade, müşterilerin sepet oluşturup "Teklif İste" (Get Quote) adımına gitmesidir.
Frontend Quote Modeli:
```typescript
{
  id: string,
  customer_id: string | null, // Kayıtlı ise
  guest_email: string | null, // Misafir (kayıtsız) ise
  guest_company_name: string | null,
  note: string, // Müşteri notu
  status: 'pending' | 'responded' | 'rejected',
  request_items: [ { product_id, quantity, offered_price } ]
}
```

**Gereken Endpoints:**
- `POST /api/quotes` : (Kullanıcı veya Misafir) Sepetteki ürün sepetini ve müşteri iletişim/not bilgilerini alıp backend'de bir teklif talebi yaratır.
- `GET /api/quotes` : (Admin) Gelen tüm teklif isteklerini listeler.
- `GET /api/quotes/user` : (Kullanıcı) Müşterinin kendi oluşturduğu geçmiş teklifleri listeler (Profil kısmında).
- `GET /api/quotes/:id` : (Admin/Kullanıcı) Bir teklifin tüm alt kalemlerini ve detayını getirir.
- `PUT /api/quotes/:id/status` : (Admin) Teklifi "Yanıtlandı" (Responded) veya "Reddedildi" (Rejected) konumuna çeker, fiyat (offered_price) teklifi tanımlar.

---

## 5. Frontend Geliştiricisinin Notları & Backend'den Beklentiler

1. **Performans ve SSR:** Mevcut uygulama bir Next.js **Client Component** (`"use client"`) yoğunluklu yapıdır. İleride API bağlandığında, Public olan Ürün Sayfaları için `fetch` kullanılarak SEO uyumlu Server Side Rendering (SSR) veya Static Generation (SSG) metodolojileri eklenebilir. Backend listeleme endpointlerinin (pagination) sayfalama desteği olması faydalı olacaktır.
2. **Görsel Yönetimi:** Backend'in resim yüklemeleri (upload) için bir endpoint sağlaması ve resimlerin public klasör üzerinden bir URL dönmesi, `images: string[]` modelinin çalışması için kritiktir.
3. **Rol Yönetimi (RBAC):** Backend tarafında JWT içerisine kullanıcının `admin`, `superadmin` veya `customer` olup olmadığı eklenmeli ve buna göre endpointler korunmalıdır (Protected Routes). 

Bu dokümantasyon, projenin sadece tasarım aşamasından çıkıp, full-stack bir yapıya kavuşması için gerekli olan sözleşmeyi (contract) tanımlamaktadır. Backend geliştirimine bu modüller baz alınarak başlanabilir.
