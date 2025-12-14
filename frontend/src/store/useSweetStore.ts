import { create } from "zustand";
import axios from "axios";
import { API_URL } from "../constants";
import type { Sweet } from "../types";

interface SweetStore {
  sweets: Sweet[];
  loading: boolean;
  error: string | null;

  fetchSweets: (query?: string) => Promise<void>;
  addSweet: (sweet: Sweet) => void;
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

  addSweet: (sweet) =>
    set((state) => ({
      sweets: [...state.sweets, sweet],
    })),

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
