import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isInitialized: false,

  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),

  login: ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("authToken", token);
    set({ user, token });
  },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    localStorage.removeItem("chatId");
    localStorage.removeItem("documentId");
    set({ user: null, token: null });
  },

  initializeAuth: () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("authToken");
    // if (storedUser && storedToken) {
      set({
        user: storedUser || null,
        token: storedToken || null,
        isInitialized: true,
      });
    // }
  }
}));

export default useAuthStore;
