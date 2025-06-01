import axiosInstance from "./axios";

export const createSubscription = async ({ userId, email }) => {
    const response = await axiosInstance.post('/api/stripe/create-subscription', {
        userId,
        email,
    });
    return response.data;
};

export const createSubscriptionAfterSetup = async ({ customerId, paymentMethodId }) => {
    const response = await axiosInstance.post('/api/stripe/create-subscription-after-setup', {
        customerId,
        paymentMethodId,
    });
    return response.data;
};

export const createPlan = async ({ name, description, price, interval, userId }) => {
    try {
        const response = await axiosInstance.post('/api/stripe/plans', {
            name,
            description,
            price,
            interval,
            userId,
        });
        return response.data;
    } catch (error) {
        console.error("Error creating plan:", error);
        throw error;
    }
};

export const createCoupon = async (data) => {
    const response = await axiosInstance.post("/api/stripe/coupons", data);
    return response.data;
};

export const getStripePlans = async () => {
    const response = await axiosInstance.get("/api/stripe/plans");
    return response.data;
};

export const getAllCoupons = async ()=>{
    const response = await axiosInstance.get("/api/stripe/coupons/all");
    return response.data;
}