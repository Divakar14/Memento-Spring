const API_BASE_URL = import.meta.env.VITE_USER_SERVICE_URL

class ApiService {
  constructor(baseURL) {
    this.baseURL = baseURL
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: response.statusText }))
      const err = new Error(error.message || `HTTP ${response.status}`)
      err.status = response.status
      err.data = error
      throw err
    }

    return response.json()
  }

  // User Profile Endpoints
  getUserProfile(token) {
    return this.request('/users/profile', {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  updateUserProfile(token, profileData) {
    return this.request('/users/profile', {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(profileData),
    })
  }

  getUserStats(token) {
    return this.request('/users/stats', {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  getSpecificUserProfile(token, userId) {
    return this.request(`/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  getSpecificUserStats(token, userId) {
    return this.request(`/users/${userId}/stats`, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  // Health check
  healthCheck() {
    return this.request('/users/health')
  }
}

export default new ApiService(API_BASE_URL)
