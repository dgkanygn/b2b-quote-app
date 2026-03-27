import api from '../utils/axiosInstance';
import type { User } from '../types';

export const profileService = {
  /** Get the current user's company profile */
  getProfile: async (): Promise<User> => {
    const { data } = await api.get('/user/profile');
    return data.user || data;
  },

  /** Update company profile fields (all optional) */
  updateProfile: async (updates: Partial<User>): Promise<User> => {
    const { data } = await api.put('/user/profile', updates);
    return data.user || data;
  },
};
