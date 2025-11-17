import axios from "axios";

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: "https://play-247.in/games",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: attach access token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle refresh token automatically and logout on 403
axiosInstance.interceptors.response.use(
  (response) => response.data, // Return only the data
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    // Logout on 403 Forbidden
    if (status === 403) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/login";
      return Promise.reject(error);
    }

    // Handle 401 Unauthorized with refresh token
    if (
      status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem("refreshToken")
    ) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const res = await axios.post(
          "https://play-247.in/games/login/gamma/refresh-token",
          { refreshToken },
          { headers: { "Content-Type": "application/json" } }
        );

        if (res.data.accessToken) {
          localStorage.setItem("authToken", res.data.accessToken);
          localStorage.setItem("refreshToken", res.data.refreshToken);

          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (err) {
        // Refresh failed -> logout
        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
