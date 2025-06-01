import { create } from "zustand";
import { getAllCoupons } from "../api/stripeApi";


const useCouponsStore = create((set) => ({
  coupons: [],
  loadingCoupons: false,
  couponsError: null,

  fetchAllCoupons: async () => {
    set({ loadingCoupons: true, couponsError: null });

    try {
      const res = await getAllCoupons();

      if (res.success) {
        set({ coupons: res.data, loadingCoupons: false });
      } else {
        set({
          couponsError: res.message || "Failed to fetch plans",
          loadingCoupons: false,
        });
      }
    } catch (error) {
      set({
        couponsError:
          error.response?.data?.message ||
          error.message ||
          "Something went wrong",
        loadingCoupons: false,
      });
    }
  },

  resetPlans: () => {
    set({ coupons: [], loadingCoupons: false, couponsError: null });
  },
}));

export default useCouponsStore;
