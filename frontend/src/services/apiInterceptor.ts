import axios from "axios";

const BaseUrl = import.meta.env.VITE_API_URL;
export const axiosInstanceNoInterceptor = axios.create({
  baseURL: BaseUrl,
});

const axiosInstance = axios.create({
  baseURL: BaseUrl,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access");

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    console.error("request error : ", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem("refresh");

      if (!refreshToken) {
        alert("Kindly  re-login In.");
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        // Attempt to refresh the access token
        const res = await axiosInstanceNoInterceptor.post(
          `/auth/token/refresh/`,
          {
            refresh: refreshToken,
          }
        );

        // Store new access token
        localStorage.setItem("access", res.data.access);

        // Clone the original request and update Authorization header
        const originalRequest = error.config;
        originalRequest.headers["Authorization"] = `Bearer ${res.data.access}`;

        // Retry the original request with new token
        return axiosInstance(originalRequest);
      } catch (refreshError: any) {
        if (
          refreshError.response?.data?.code === "token_not_valid" ||
          refreshError.response?.status === 401
        ) {
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          alert("Session expired, kindly log in again.");
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
