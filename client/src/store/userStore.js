import { create } from "zustand";
import { persist } from "zustand/middleware";

export const userAuthStore = create(
  persist(
    (set) => ({
      user: JSON.parse(localStorage.getItem("user")) || null,
      loggedIn: !!localStorage.getItem("user"),
      setUser: (user) => set({ user, loggedIn: !!user }),
      logout: () => {
        localStorage.removeItem("user");
        set({ user: null, loggedIn: false });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
