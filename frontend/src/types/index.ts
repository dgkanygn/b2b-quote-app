// ---- Auth ----
export interface User {
  id: number | string;
  email: string;
  company_name: string;
  company_title: string | null;
  tax_office: string | null;
  tax_number: string | null;
  company_size: string | null;
  created_at: string;
}

export interface AdminUser {
  id: number | string;
  email: string;
  name: string;
  role: 'superadmin' | 'editor';
}

// ---- Products ----
export interface Product {
  id: number | string;
  name: string;
  category: string;
  description: string;
  stock: number;
  images: string[];
  status: 'active' | 'out_of_stock' | 'draft';
  created_at: string;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
}

// ---- Quotes ----
export interface RequestItem {
  id: number | string;
  request_id: number | string;
  product_id: number | string;
  quantity: number;
  offered_price: number;
  product_name?: string;
  product_category?: string;
  product_images?: string[];
  product?: Product;
}

export interface QuoteRequest {
  id: number | string;
  customer_id: number | string | null;
  guest_email: string | null;
  guest_company_name: string | null;
  customer_email?: string | null;
  customer_company_name?: string | null;
  note: string;
  status: 'pending' | 'responded' | 'rejected';
  total_price: number;
  created_at: string;
  items?: RequestItem[];
  request_items_count?: number;
}
