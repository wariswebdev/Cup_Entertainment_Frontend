const API_BASE_URL = "http://localhost:3000";

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;

    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);

      // Handle different response types
      const contentType = response.headers.get("content-type");
      let data;

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        throw new Error(data.message || data || "Request failed");
      }

      return data;
    } catch (error) {
      console.error("API Request Error:", error);
      throw error;
    }
  }

  // Auth endpoints
  async signup(userData) {
    return this.request("/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  }

  async login(credentials) {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  }

  async logout() {
    return this.request("/auth/logout", {
      method: "POST",
    });
  }

  async getProfile() {
    return this.request("/auth/profile");
  }

  async updateProfile(userData) {
    return this.request("/auth/profile", {
      method: "PUT",
      body: JSON.stringify(userData),
    });
  }

  async changePassword(passwordData) {
    return this.request("/auth/change-password", {
      method: "POST",
      body: JSON.stringify(passwordData),
    });
  }

  async forgotPassword(email) {
    return this.request("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  }

  async resetPassword(token, newPassword) {
    return this.request("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ token, newPassword }),
    });
  }
}

export default new ApiService();
