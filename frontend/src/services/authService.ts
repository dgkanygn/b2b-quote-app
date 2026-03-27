import api from '../utils/axiosInstance';
import type { User } from '../types';

interface RegisterData {
  email: string;
  password: string;
  company_name: string;
  company_title?: string;
  tax_office?: string;
  tax_number?: string;
  company_size?: string;
}

export const authService = {
  login: async (email: string, password: string): Promise<User> => {
    const { data } = await api.post('/auth/login', { email, password });
    return data.user;
  },

  register: async (registerData: RegisterData): Promise<User> => {
    const { data } = await api.post('/auth/register', registerData);
    return data.user;
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },

  getMe: async (): Promise<User> => {
    const { data } = await api.get('/auth/me');
    return data.user;
  },
};

export type { RegisterData };
