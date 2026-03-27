# Nexus B2B - API Entegrasyon Rehberi

Bu doküman, geliştirilen Node.js/Express (ES Modules) API'sinin Frontend (Next.js) tarafına bağlanması sırasında ihtiyaç duyacağınız tüm sözleşmeleri, endpoint'leri ve yetkilendirme (auth) mekanizmalarını içermektedir.

---

## 1. Temel Yapılandırma ve Kurallar

- **Base URL:** `http://localhost:5000/api`
- **Görsel Sunucusu (Statik URL):** Sunucuya yüklenen tüm ürün görselleri `http://localhost:5000` dizini üzerinden public olarak sunulur. Endpoint'ten size `images: ["/uploads/image-123.jpg"]` döndüğünde, frontend'de resmi göstermek için Base URL'i önüne eklemelisiniz (`http://localhost:5000/uploads/image-123.jpg`).
- **Veri Tipi:** Tüm API isteklerinde ve yanıtlarında veri yapısı JSON formatındadır (`application/json`), form/dosya yükleme istisnadır.

### 🛑 Kimlik Doğrulama (Auth) & CORS Önemli Notu:
API, JWT token'ı localStorage'da **tutmaz**. Güvenli olması amacıyla Login işleminden sonra tarayıcıya otomatik olarak `http-only` bir cookie (`token`) gönderir. 

Cookie'lerin frontend'den backend'e uçabilmesi için fetch/axios isteklerinizde kimlik bilgilerini içermesini söylemeniz **zorunludur**:

**Fetch kullanıyorsanız:**
```javascript
fetch('http://localhost:5000/api/auth/me', {
  method: 'GET',
  credentials: 'include', // <--- ÇOK ÖNEMLİ
  headers: { 'Content-Type': 'application/json' }
})
```

**Axios kullanıyorsanız:**
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true // <--- ÇOK ÖNEMLİ
});
```

---

## 2. API Endpoint Detayları

Aşağıdaki tüm yollar `http://localhost:5000/api` kök dizinine eklenerek okunmalıdır.

### 🧑‍💼 Müşteri & Ziyaretçi (Auth) İşlemleri
Müşteri girişi ve kaydı içindir.

| HTTP Metodu | Endpoint | Açıklama |
| :--- | :--- | :--- |
| `POST` | `/auth/register` | Yeni müşteri oluşturur. Token cookie'sini set eder. |
| `POST` | `/auth/login` | Müşteri girişi. Token cookie'sini set eder. |
| `POST` | `/auth/logout` | Çıkış. Cookie'yi siler. |
| `GET` | `/auth/me` | Giriş yapmış olan müşterinin oturum bilgilerini döner. |

**POST `/auth/register` Örnek Body:**
```json
{
  "email": "info@example.com",
  "password": "pass",
  "company_name": "Example Corp",
  "company_title": "Example Corporation LTD",
  "tax_office": "Istanbul",
  "tax_number": "123456789",
  "company_size": "10-50"
}
```

### 🛡️ Yönetici (Admin) İşlemleri
Admin Paneli'ne yönelik işlemlerdir.

| HTTP Metodu | Endpoint | Açıklama |
| :--- | :--- | :--- |
| `POST` | `/admin/login` | Admin girişi (`admin@nexusb2b.com` / `admin123`). Cookie set eder. |
| `POST` | `/admin/logout` | Çıkış. Cookie siler. |
| `GET` | `/admin/me` | Yetkili admin bilgilerini döner. |

### 🏢 Şirket Profili (Müşteri için)
Frontend `Profile` sayfasında kullanılacak endpoint'ler. `credentials: 'include'` ile çağrılmalıdır.

| HTTP Metodu | Endpoint | Açıklama |
| :--- | :--- | :--- |
| `GET` | `/user/profile` | Güncel şirket bilgilerini getirir. |
| `PUT` | `/user/profile` | Şirket bilgilerini günceller. |

**PUT `/user/profile` Örnek Body:**
*(Tüm alanlar opsiyoneldir, sadece istenen alanı gönderebilirsiniz)*
```json
{
  "company_name": "Yeni İsim",
  "tax_office": "Ankara"
}
```

---

### 📦 Ürün (Product) Yönetimi
Müşteriler için `GET` işlemleri public'tir. Ekleme ve silme işlemleri admin hesabıyla (`cookie`) yapılmalıdır.

| HTTP Metodu | Endpoint | Auth Req | Açıklama |
| :--- | :--- | :--- | :--- |
| `GET` | `/products` | Hayır | Tüm ürünleri sayfalayarak listeler. |
| `GET` | `/products/categories` | Hayır | `['Elektronik', 'Kırtasiye']` gibi benzersiz kategorileri döner. |
| `GET` | `/products/:id` | Hayır | Tek bir ürünün detayı. |
| `POST` | `/products` | Admin | (Yönetici) Yeni ürün ekler. |
| `PUT` | `/products/:id` | Admin | (Yönetici) Ürün bilgisini günceller. |
| `DELETE` | `/products/:id` | Admin | (Yönetici) Ürünü siler. |
| `POST` | `/products/:id/images`| Admin | (Yönetici) Ürüne çoklu görsel yükler. |

**GET `/products` Query Parametreleri (Filtreleme):**
- `?page=1` (Sayfa numarası, varsayılan: 1)
- `?limit=20` (Sayfa başına ürün)
- `?category="Elektronik"`
- `?search="laptop"` (Title veya description'da arar)
- `?status="active"` (Admin paneli dışındaki public gösterimler için bu query eklenmelidir. İsteğe bağlıdır)

**POST `/products/:id/images` Örnek:**
Bu endpoint'e JSON değil `multipart/form-data` atılmalıdır. Frontend'den dosya seçildiğinde:
```javascript
const formData = new FormData();
// Dosyaları "images" key'ine ekleyin
files.forEach(file => formData.append('images', file)); 

// axios ile gönderim (büyük dosya gönderimlerinde bu metot gereklidir)
axios.post(`http://localhost:5000/api/products/${productId}/images`, formData, {
  withCredentials: true,
  headers: { "Content-Type": "multipart/form-data" }
});
```

---

### 📝 Teklif (Quote / Request) Yönetimi
Kayıtlı kullanıcı `credentials` ile yaparsa teklif onun hesabına yazılır. Ziyaretçi olarak atanacaksa `guest_email` boş geçilmemelidir.

| HTTP Metodu | Endpoint | Auth Req | Açıklama |
| :--- | :--- | :--- | :--- |
| `POST` | `/quotes` | Opsiyonel | Yeni bir teklif talebi oluşturur (Sepetten). |
| `GET` | `/quotes` | Admin | (Yönetici) Sisteme düşen tüm teklifleri sayfalayarak getirir. |
| `GET` | `/quotes/user` | Customer | (Müşteri) Sadece kendi oluşturduğu geçmiş teklifleri getirir. |
| `GET` | `/quotes/:id` | Admin/Cst. | Teklif ve altındaki sepet/istek (items) kalemlerinin tamamını getirir. |
| `PUT` | `/quotes/:id/status`| Admin | (Yönetici) Teklif durunu ve verilen fiyatları günceller. |

**POST `/quotes` (Misafir Sepet Onayı) Örnek Body:**
```json
{
  "guest_email": "hello@guest.com",
  "guest_company_name": "Ghost Bilişim",
  "note": "Aylık toptan alım fiyat listesi rica ediyorum.",
  "items": [
    { "product_id": 1, "quantity": 100 },
    { "product_id": 4, "quantity": 50 }
  ]
}
```

**PUT `/quotes/:id/status` (Admin Teklif Yanıtlama) Örnek Body:**
`status` için sadece şu durumlar kabul edilir: `pending`, `responded`, `rejected`.
```json
{
  "status": "responded",
  "total_price": 5500.00,
  "items": [
    { "id": 1, "offered_price": 2500.00 },
    { "id": 2, "offered_price": 3000.00 }
  ]
}
```

---

## 3. Frontend - Backend Geçişinde İzlenecek Yol

Şu anda frontend tarafında veriler `src/context/` altındaki API'lerde `DUMMY_DATA` veya `localStorage` ile simüle edilmektedir. Bunu gerçek API'ye bağlamak için:

1. Frontend'de `src/utils/axiosInstance.ts` veya `fetch` altyapısı kurun (İçinde `withCredentials: true` olacak).
2. `AuthContext.tsx` dosyasındaki sahte `login` fonksiyonunu güncelleyip `/api/auth/login` isteği atacak şekilde değiştirin ve gelen `user` objesini state'de saklayın.
3. Uygulama her açıldığında `useEffect` içerisinde gizli bir `/api/auth/me` çağrısı yaparak sunucudan tarayıcıdaki Cookie'nin geçerli olup olmadığını sorgulayın. Otomatik Login mekanizmasını bu şekilde kurun.
4. `CartContext.tsx` içindeki "Teklif Oluştur/Onayla" metodunu `POST /api/quotes` ile bağlayıp, dönen 201 Success yanıtına göre sepeti temizleyin (`localStorage`'dan veya state'den).
5. Tüm veri çağırma adımlarında `try-catch` kullanın ve state'e `loading` ile birlikte `error` yapısını eklemeyi unutmayın. Backend, hatalı girişlerde veya yetkisiz işlemlerde HTTP Code `400`, `401`, `403` ve `{ error: "Hata mesajı" }` şeklinde bir payload dönecektir.
