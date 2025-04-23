import axiosInstance from "./axios";

export const uploadDocument = async (userId, file) => {
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("pdf", file);

    const response = await axiosInstance.post("/api/documents/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
};

export const startChat = async (userId, documentId, title) => {
    const response = await axiosInstance.post("/api/chats", {
        userId,
        documentId,
        title,
    });

    return response.data;
};

export const sendChatMessage = async ({ chatId, userId, message,}) => {
    const response = await axiosInstance.post(`/api/chats/${chatId}/messages`, {
        userId,
        message,
    });
    return response.data;
};

export const getChatByUserId = async ({ chatId, userId }) => {
    const response = await axiosInstance.get(`/api/chats/${chatId}`, {
      params: { userId },
    });
    return response.data;
  };
  