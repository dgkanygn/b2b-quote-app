import api from '../utils/axiosInstance';
import type { QuoteRequest } from '../types';

interface CreateQuotePayload {
  guest_email?: string;
  guest_company_name?: string;
  note?: string;
  items: { product_id: number; quantity: number }[];
}

interface UpdateStatusPayload {
  status: 'pending' | 'responded' | 'rejected';
  total_price?: number;
  items?: { id: number; offered_price: number }[];
}

export const quoteService = {
  /** Create a new quote request (from cart) */
  create: async (payload: CreateQuotePayload): Promise<any> => {
    const { data } = await api.post('/quotes', payload);
    return data.quote;
  },

  /** Admin: get all quote requests */
  getAll: async (): Promise<QuoteRequest[]> => {
    const { data } = await api.get('/quotes');
    return data.quotes || [];
  },

  /** Get a single quote with full item details */
  getById: async (id: number | string): Promise<QuoteRequest> => {
    const { data } = await api.get(`/quotes/${id}`);
    return data.quote;
  },

  /** Customer: get own quotes */
  getUserQuotes: async (): Promise<QuoteRequest[]> => {
    const { data } = await api.get('/quotes/user');
    return data.quotes || [];
  },

  /** Admin: update quote status */
  updateStatus: async (id: number | string, payload: UpdateStatusPayload): Promise<QuoteRequest> => {
    const { data } = await api.put(`/quotes/${id}/status`, payload);
    return data.quote;
  },
};

export type { CreateQuotePayload, UpdateStatusPayload };
