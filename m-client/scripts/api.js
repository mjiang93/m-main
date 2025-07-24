/**
 * API Client for M-Server Backend
 */
class APIClient {
    constructor(baseURL = 'http://localhost:5000') {
        this.baseURL = baseURL;
    }

    /**
     * Make HTTP request to API
     */
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || `HTTP error! status: ${response.status}`);
            }
            
            return data;
        } catch (error) {
            console.error('API Request failed:', error);
            throw error;
        }
    }

    /**
     * Check API health status
     */
    async checkHealth() {
        return this.request('/health');
    }

    /**
     * Get all users
     */
    async getUsers() {
        return this.request('/api/users');
    }

    /**
     * Get user by ID
     */
    async getUser(id) {
        return this.request(`/api/users/${id}`);
    }

    /**
     * Create new user
     */
    async createUser(userData) {
        return this.request('/api/users', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    }

    /**
     * Update user
     */
    async updateUser(id, userData) {
        return this.request(`/api/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(userData)
        });
    }

    /**
     * Delete user
     */
    async deleteUser(id) {
        return this.request(`/api/users/${id}`, {
            method: 'DELETE'
        });
    }
}

// Create global API client instance
const api = new APIClient();