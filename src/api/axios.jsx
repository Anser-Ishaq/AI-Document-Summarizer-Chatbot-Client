  // src/api/axios.ts
  import axios from "axios";
  import BASE_URL from "../Config/api";

  // Create Axios instance
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 60000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        console.warn("Unauthorized - maybe redirect to login?");
      }
      return Promise.reject(error);
    }
  );

  export default axiosInstance;
