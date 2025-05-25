import axiosInstance from "./axios";
export const signupUser = async (data) => {
    const response = await axiosInstance.post('/api/auth/signup', data);
    return response.data;
};
export const loginUser = async (data) => {
    const response = await axiosInstance.post('/api/auth/login', data);
    return response.data;
};

export const deleteAccount = async (userId) => {
    const response = await axiosInstance.delete(`/api/auth/delete/${userId}`);
    return response.data;
};

export const getUserById = async (userId) => {
    const response = await axiosInstance.get(`/api/auth/user/${userId}`);
    return response.data;
};

export const changeUserNameByUserId = async (userId, newUserName) => {
    const response = await axiosInstance.put(`/api/auth/user/${userId}/username`, {
        newUserName
    });
    return response.data;
};