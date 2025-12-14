import { create } from "zustand";
import axios from "axios";
import { API_URL } from "../constants";

export interface Sweet {
  _id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  image: string;
}

interface SweetStore {
  sweets: Sweet[];
  loading: boolean;
  error: string | null;

  fetchSweets: (query?: string) => Promise<void>;
  clearError: () => void;
  removeSweet: (id: string) => void;
  updateSweet: (sweet: Sweet) => void;
}

export const useSweetStore = create<SweetStore>((set) => ({
  sweets: [],
  loading: false,
  error: null,

  fetchSweets: async () => {
    try {
      set({ loading: true, error: null });

      const res = await axios.get(`${API_URL}/api/sweets`, {
        withCredentials: true,
      });

      set({
        sweets: res.data.sweets,
        loading: false,
      });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to fetch sweets",
        loading: false,
      });
    }
  },

  clearError: () => set({ error: null }),

  removeSweet: (id) =>
    set((state) => ({
      sweets: state.sweets.filter((s) => s._id !== id),
    })),
  updateSweet: (updatedSweet) =>
    set((state) => ({
      sweets: state.sweets.map((s) =>
        s._id === updatedSweet._id ? updatedSweet : s
      ),
    })),
}));
