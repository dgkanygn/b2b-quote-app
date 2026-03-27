import api from '../utils/axiosInstance';

import type { AdminUser } from '../types';

export const adminService = {
  login: async (email: string, password: string): Promise<AdminUser | null> => {
    try {
      const { data } = await api.post('/admin/login', { email, password });
      return data.admin || data.user;
    } catch {
      return null;
    }
  },

  logout: async (): Promise<void> => {
    await api.post('/admin/logout');
  },

  getMe: async (): Promise<AdminUser | null> => {
    try {
      const { data } = await api.get('/admin/me');
      return data.admin || data.user;
    } catch {
      return null;
    }
  },
};

export type { AdminUser };
