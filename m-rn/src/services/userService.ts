import {ApiResponse, User, PaginationParams, PaginatedResponse} from '@types/index';
import {apiClient} from './apiClient';

class UserService {
  async getProfile(userId?: string): Promise<ApiResponse<User>> {
    const url = userId ? `/users/${userId}` : '/users/profile';
    const response = await apiClient.get<ApiResponse<User>>(url);
    return response.data;
  }

  async updateProfile(userData: Partial<User>): Promise<ApiResponse<User>> {
    const response = await apiClient.put<ApiResponse<User>>('/users/profile', userData);
    return response.data;
  }

  async uploadAvatar(imageData: FormData): Promise<ApiResponse<{avatarUrl: string}>> {
    const response = await apiClient.upload<ApiResponse<{avatarUrl: string}>>('/users/avatar', imageData);
    return response.data;
  }

  async deleteAccount(): Promise<ApiResponse<boolean>> {
    const response = await apiClient.delete<ApiResponse<boolean>>('/users/profile');
    return response.data;
  }

  async getUsers(params: PaginationParams): Promise<ApiResponse<PaginatedResponse<User>>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<User>>>('/users', {params});
    return response.data;
  }

  async searchUsers(query: string, params?: PaginationParams): Promise<ApiResponse<PaginatedResponse<User>>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<User>>>('/users/search', {
      params: {query, ...params},
    });
    return response.data;
  }

  async followUser(userId: string): Promise<ApiResponse<boolean>> {
    const response = await apiClient.post<ApiResponse<boolean>>(`/users/${userId}/follow`);
    return response.data;
  }

  async unfollowUser(userId: string): Promise<ApiResponse<boolean>> {
    const response = await apiClient.delete<ApiResponse<boolean>>(`/users/${userId}/follow`);
    return response.data;
  }

  async getFollowers(userId: string, params?: PaginationParams): Promise<ApiResponse<PaginatedResponse<User>>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<User>>>(`/users/${userId}/followers`, {params});
    return response.data;
  }

  async getFollowing(userId: string, params?: PaginationParams): Promise<ApiResponse<PaginatedResponse<User>>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<User>>>(`/users/${userId}/following`, {params});
    return response.data;
  }
}

export const userService = new UserService();
export default userService;