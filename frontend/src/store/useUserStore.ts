import axios from "axios";
import { create } from "zustand";
import { API_URL } from "../constants";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user";
}

interface UserStore {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  loadingUser: boolean;
  logout: () => void;
   loadUser: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isAuthenticated: false,
  loadingUser: true,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: true,
    }),

  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),

  loadUser: async () => {
    try {
      const res = await axios.get(`${API_URL}/api/auth/me`, {
        withCredentials: true,
      });

      set({
        user: res.data.user,
        isAuthenticated: true,
        loadingUser: false,
      });
    } catch (error) {
      set({ user: null, isAuthenticated: false, loadingUser: false });
    }
  },
}));
