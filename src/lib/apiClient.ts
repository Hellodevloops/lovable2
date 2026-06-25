import axios from "axios";

/* ================= BASE URL ================= */

// Production: same-origin (/api) when frontend + backend are served together
// Development: localhost backend unless VITE_API_BASE_URL is set
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ??
  (import.meta.env.PROD ? "" : "http://localhost:4000");

export { API_BASE_URL };

/* ================= AXIOS INSTANCE ================= */

export const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // ✅ prevent hanging requests
});

/* ================= REQUEST INTERCEPTOR ================= */

apiClient.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem("auth_token");

      if (token) {
        config.headers.set("Authorization", `Bearer ${token}`);
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.warn("Token read error:", error);
    }

    return config;
  },
  (error) => Promise.reject(error)
);


/* ================= RESPONSE INTERCEPTOR ================= */

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API ERROR:", error?.response || error);

    // ✅ Prevent dashboard crash
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        console.warn("Unauthorized - redirecting to login");

        if (typeof window !== "undefined") {
          localStorage.removeItem("auth_token");
          localStorage.removeItem("auth_user");
          window.location.href = "/login";
        }
      }
    }

    // ✅ Always return safe fallback
    return Promise.reject(error);
  }
);