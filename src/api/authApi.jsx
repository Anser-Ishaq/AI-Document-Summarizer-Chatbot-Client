import axiosInstance from "./axios";
export const signupUser = async (data) => {
    const response = await axiosInstance.post('/api/auth/signup', data);
    return response.data;
};
export const loginUser = async (data) => {
    const response = await axiosInstance.post('/api/auth/login', data);
    return response.data;
};
