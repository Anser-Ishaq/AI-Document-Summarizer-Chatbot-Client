import axiosInstance from "./axios";

export const createSubscription = async ({ userId, email, planId, couponCode }) => {
    const response = await axiosInstance.post('/api/stripe/create-subscription', {
        userId,
        email,
        planId,
        couponCode,
    });
    return response.data;
};

export const createSubscriptionAfterSetup = async ({ customerId, paymentMethodId, couponCode }) => {
    const response = await axiosInstance.post('/api/stripe/create-subscription-after-setup', {
        customerId,
        paymentMethodId,
        couponCode,
    });
    return response.data;
};


export const createPlan = async ({ name, description, price, interval, userId, features = [] }) => {
    try {
        const response = await axiosInstance.post('/api/stripe/plans', {
            name,
            description,
            price,
            interval,
            userId,
            features
        });
        return response.data;
    } catch (error) {
        console.error("Error creating plan:", error);
        throw error;
    }
};

export const updatePlan = async (planId, updates) => {
    const response = await axiosInstance.put(`/api/stripe/plans/${planId}`, updates);
    return response.data;
};

export const deletePlan = async (planId) => {
    const response = await axiosInstance.delete(`/api/stripe/plans/${planId}`);
    return response.data;
}

export const createCoupon = async (data) => {
    const response = await axiosInstance.post("/api/stripe/coupons", data);
    return response.data;
};

export const getStripePlans = async () => {
    const response = await axiosInstance.get("/api/stripe/plans");
    return response.data;
};

export const getAllCoupons = async () => {
    const response = await axiosInstance.get("/api/stripe/coupons/all");
    return response.data;
}

export const getAllSubscriptions = async () => {
    const response = await axiosInstance.get("/api/stripe/subscriptions/all");
    return response.data;
}

export const validateCoupons = async (couponCode) => {
    const response = await axiosInstance.get(`/api/stripe/coupons/validate/${couponCode.toUpperCase()}`);
    return response.data;
}

export const getActiveSubscription = async (userId) => {
    try {
        const response = await axiosInstance.get(`/api/stripe/subscriptions/active?user_id=${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching subscription:", error);
        return null;
    }
};