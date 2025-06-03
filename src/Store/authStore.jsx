// Updated useAuthStore.js
import { create } from 'zustand';
import { getActiveSubscription } from '../api/stripeApi';

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  subscription: null,
  allowedFileTypes: ['pdf'], // Default to PDF for free users
  isInitialized: false,

  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  setSubscription: (subscription) => set({ subscription }),

  login: async ({ user, token }) => {
    // Get active subscription
    const subscription = await getActiveSubscription(user.id);
    const allowedFileTypes = subscription?.plan?.features || ['pdf'];
    
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("authToken", token);
    localStorage.setItem("subscription", JSON.stringify(subscription));
    localStorage.setItem("allowedFileTypes", JSON.stringify(allowedFileTypes));
    
    set({ user, token, subscription, allowedFileTypes });
  },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    localStorage.removeItem("subscription");
    localStorage.removeItem("allowedFileTypes");
    localStorage.removeItem("chatId");
    localStorage.removeItem("documentId");
    set({ user: null, token: null, subscription: null, allowedFileTypes: ['pdf'] });
  },

  initializeAuth: async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("authToken");
    const storedSubscription = JSON.parse(localStorage.getItem("subscription"));
    const storedFileTypes = JSON.parse(localStorage.getItem("allowedFileTypes")) || ['pdf'];
    
    // Refresh subscription if user exists
    if (storedUser && storedToken) {
      try {
        const subscription = await getActiveSubscription(storedUser.id);
        const allowedFileTypes = subscription?.plan?.features || ['pdf'];
        
        localStorage.setItem("subscription", JSON.stringify(subscription));
        localStorage.setItem("allowedFileTypes", JSON.stringify(allowedFileTypes));
        
        set({
          user: storedUser,
          token: storedToken,
          subscription,
          allowedFileTypes,
          isInitialized: true,
        });
        return;
      } catch (error) {
        console.error("Failed to refresh subscription:", error);
      }
    }
    
    set({
      user: storedUser || null,
      token: storedToken || null,
      subscription: storedSubscription || null,
      allowedFileTypes: storedFileTypes,
      isInitialized: true,
    });
  },

  refreshSubscription: async (userId) => {
    try {
      const subscription = await getActiveSubscription(userId);
      const allowedFileTypes = subscription?.plan?.features || ['pdf'];
      
      localStorage.setItem("subscription", JSON.stringify(subscription));
      localStorage.setItem("allowedFileTypes", JSON.stringify(allowedFileTypes));
      
      set({ subscription, allowedFileTypes });
      return subscription;
    } catch (error) {
      console.error("Failed to refresh subscription:", error);
      throw error;
    }
  }
}));

export default useAuthStore;