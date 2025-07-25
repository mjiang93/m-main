import {ApiResponse, LoginForm, RegisterForm, User} from '@types/index';
import {apiClient} from './apiClient';

interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

class AuthService {
  async login(credentials: LoginForm): Promise<ApiResponse<AuthResponse>> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/login', credentials);
    return response.data;
  }

  async register(userData: RegisterForm): Promise<ApiResponse<AuthResponse>> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/register', userData);
    return response.data;
  }

  async logout(): Promise<ApiResponse<boolean>> {
    const response = await apiClient.post<ApiResponse<boolean>>('/auth/logout');
    return response.data;
  }

  async refreshToken(): Promise<ApiResponse<{token: string; user?: User}>> {
    const response = await apiClient.post<ApiResponse<{token: string; user?: User}>>('/auth/refresh');
    return response.data;
  }

  async forgotPassword(email: string): Promise<ApiResponse<boolean>> {
    const response = await apiClient.post<ApiResponse<boolean>>('/auth/forgot-password', {email});
    return response.data;
  }

  async resetPassword(token: string, password: string): Promise<ApiResponse<boolean>> {
    const response = await apiClient.post<ApiResponse<boolean>>('/auth/reset-password', {
      token,
      password,
    });
    return response.data;
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<ApiResponse<boolean>> {
    const response = await apiClient.post<ApiResponse<boolean>>('/auth/change-password', {
      currentPassword,
      newPassword,
    });
    return response.data;
  }

  async verifyEmail(token: string): Promise<ApiResponse<boolean>> {
    const response = await apiClient.post<ApiResponse<boolean>>('/auth/verify-email', {token});
    return response.data;
  }

  async resendVerification(email: string): Promise<ApiResponse<boolean>> {
    const response = await apiClient.post<ApiResponse<boolean>>('/auth/resend-verification', {email});
    return response.data;
  }
}

export const authService = new AuthService();
export default authService;