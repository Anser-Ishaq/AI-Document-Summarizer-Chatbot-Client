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