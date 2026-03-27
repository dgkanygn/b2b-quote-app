import api, { STATIC_URL } from '../utils/axiosInstance';
import type { Product, PaginationInfo } from '../types';

interface GetProductsParams {
  search?: string;
  category?: string;
  status?: string;
  page?: number;
  limit?: number;
}

interface GetProductsResponse {
  products: Product[];
  pagination: PaginationInfo;
}

/** Prefix relative image paths with the static server URL */
const prefixImages = (product: Product): Product => ({
  ...product,
  images: (product.images || []).map((img: string) =>
    img.startsWith('http') ? img : `${STATIC_URL}${img}`
  ),
});

export const productService = {
  getAll: async (params: GetProductsParams = {}): Promise<GetProductsResponse> => {
    const { data } = await api.get('/products', { params });
    return {
      products: (data.products || []).map(prefixImages),
      pagination: data.pagination,
    };
  },

  getById: async (id: string | number): Promise<Product> => {
    const { data } = await api.get(`/products/${id}`);
    return prefixImages(data.product);
  },

  getCategories: async (): Promise<string[]> => {
    const { data } = await api.get('/products/categories');
    return data.categories || [];
  },

  create: async (product: Partial<Product>): Promise<Product> => {
    const { data } = await api.post('/products', product);
    return data.product;
  },

  update: async (id: number | string, product: Partial<Product>): Promise<Product> => {
    const { data } = await api.put(`/products/${id}`, product);
    return data.product;
  },

  remove: async (id: number | string): Promise<void> => {
    await api.delete(`/products/${id}`);
  },

  uploadImages: async (id: number | string, files: File[]): Promise<Product> => {
    const formData = new FormData();
    files.forEach((file) => formData.append('images', file));

    const { data } = await api.post(`/products/${id}/images`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.product;
  },
};
