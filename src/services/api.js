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
  async sendOTP(email, type = "signup") {
    return this.request("/auth/send-otp", {
      method: "POST",
      body: JSON.stringify({ email, type }),
    });
  }

  async verifyOTP(email, otp, type = "signup") {
    return this.request("/auth/verify-otp", {
      method: "POST",
      body: JSON.stringify({ email, otp, type }),
    });
  }

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

  // Movies endpoints
  async getAllMovies() {
    const response = await this.request("/movies");
    // Extract movies array from the response based on API structure
    // Expected response: { success: true, message: "...", movies: [...], count: N }
    if (response && response.movies) {
      return response.movies;
    }
    // Fallback: if response is already an array, return it directly
    return Array.isArray(response) ? response : [];
  }

  async getMovieById(movieId) {
    return this.request(`/movies/${movieId}`);
  }

  async addMovie(movieData) {
    return this.request("/movies", {
      method: "POST",
      body: JSON.stringify(movieData),
    });
  }

  async updateMovie(movieId, movieData) {
    return this.request(`/movies/${movieId}`, {
      method: "PUT",
      body: JSON.stringify(movieData),
    });
  }

  async deleteMovie(movieId) {
    return this.request(`/movies/${movieId}`, {
      method: "DELETE",
    });
  }

  // TV Shows endpoints
  async getAllTVShows() {
    const response = await this.request("/tv-shows");
    // Extract tvShows array from the response based on API structure
    // Expected response: { success: true, message: "...", tvShows: [...], count: N }
    if (response && response.tvShows) {
      return response.tvShows;
    }
    // Fallback: if response is already an array, return it directly
    return Array.isArray(response) ? response : [];
  }

  async getTVShowById(tvShowId) {
    return this.request(`/tv-shows/${tvShowId}`);
  }

  async addTVShow(tvShowData) {
    return this.request("/tv-shows", {
      method: "POST",
      body: JSON.stringify(tvShowData),
    });
  }

  async updateTVShow(tvShowId, tvShowData) {
    return this.request(`/tv-shows/${tvShowId}`, {
      method: "PUT",
      body: JSON.stringify(tvShowData),
    });
  }

  async deleteTVShow(tvShowId) {
    return this.request(`/tv-shows/${tvShowId}`, {
      method: "DELETE",
    });
  }

  // Categories endpoints
  async getAllCategories() {
    return this.request("/categories");
  }

  async addCategory(categoryData) {
    return this.request("/categories", {
      method: "POST",
      body: JSON.stringify(categoryData),
    });
  }

  async updateCategory(categoryId, categoryData) {
    return this.request(`/categories/${categoryId}`, {
      method: "PUT",
      body: JSON.stringify(categoryData),
    });
  }

  async deleteCategory(categoryId) {
    return this.request(`/categories/${categoryId}`, {
      method: "DELETE",
    });
  }
}

export default new ApiService();
