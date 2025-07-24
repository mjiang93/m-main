interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  created_at?: string;
}

class ApiService {
  private baseURL: string;

  constructor(baseURL: string = 'http://localhost:5000') {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
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

  // Health check
  async checkHealth(): Promise<ApiResponse> {
    return this.request('/health');
  }

  // User operations
  async getUsers(): Promise<ApiResponse<User[]>> {
    return this.request<User[]>('/api/users');
  }

  async getUser(id: number): Promise<ApiResponse<User>> {
    return this.request<User>(`/api/users/${id}`);
  }

  async createUser(userData: Omit<User, 'id'>): Promise<ApiResponse<User>> {
    return this.request<User>('/api/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async updateUser(id: number, userData: Partial<User>): Promise<ApiResponse<User>> {
    return this.request<User>(`/api/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async deleteUser(id: number): Promise<ApiResponse> {
    return this.request(`/api/users/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();
export type { User, ApiResponse };