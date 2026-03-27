import api from '../utils/axiosInstance';

interface AdminData {
  id: number;
  email: string;
  name: string;
  role: 'superadmin' | 'editor';
}

export const adminService = {
  login: async (email: string, password: string): Promise<AdminData | null> => {
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

  getMe: async (): Promise<AdminData | null> => {
    try {
      const { data } = await api.get('/admin/me');
      return data.admin || data.user;
    } catch {
      return null;
    }
  },
};

export type { AdminData };
