// ---- Auth ----
export interface User {
  id: number;
  email: string;
  company_name: string;
  company_title: string | null;
  tax_office: string | null;
  tax_number: string | null;
  company_size: string | null;
  created_at: string;
}

export interface AdminUser {
  id: number;
  email: string;
  name: string;
  role: 'superadmin' | 'editor';
}

// ---- Products ----
export interface Product {
  id: number;
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
  id: number;
  request_id: number;
  product_id: number;
  quantity: number;
  offered_price: number;
  product_name?: string;
  product_category?: string;
  product_images?: string[];
}

export interface QuoteRequest {
  id: number;
  customer_id: number | null;
  guest_email: string | null;
  guest_company_name: string | null;
  customer_email?: string;
  customer_company_name?: string;
  note: string;
  status: 'pending' | 'responded' | 'rejected';
  total_price: number;
  created_at: string;
  items?: RequestItem[];
  request_items_count?: number;
}
