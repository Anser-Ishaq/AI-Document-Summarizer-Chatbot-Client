import { create } from "zustand";
import { getStripePlans } from "../api/stripeApi";


const useStripeStore = create((set) => ({
  plans: [],
  loadingPlans: false,
  plansError: null,

  fetchPlans: async () => {
    set({ loadingPlans: true, plansError: null });

    try {
      const res = await getStripePlans();

      if (res.success) {
        set({ plans: res.data, loadingPlans: false });
      } else {
        set({
          plansError: res.message || "Failed to fetch plans",
          loadingPlans: false,
        });
      }
    } catch (error) {
      set({
        plansError:
          error.response?.data?.message ||
          error.message ||
          "Something went wrong",
        loadingPlans: false,
      });
    }
  },

  resetPlans: () => {
    set({ plans: [], loadingPlans: false, plansError: null });
  },
}));

export default useStripeStore;
