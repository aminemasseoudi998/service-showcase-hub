import { PortfolioProject, PortfolioProjectInput, AuthResponse, User } from '@/types/portfolio';

// Configure your external API base URL here
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

class ApiService {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('auth_token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      (headers as Record<string, string>)['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem('auth_token', token);
    } else {
      localStorage.removeItem('auth_token');
    }
  }

  getToken() {
    return this.token;
  }

  // Auth endpoints
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    this.setToken(response.token);
    return response;
  }

  async register(name: string, email: string, password: string): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
    this.setToken(response.token);
    return response;
  }

  async logout() {
    this.setToken(null);
  }

  async getCurrentUser(): Promise<User> {
    return this.request<User>('/auth/me');
  }

  // Portfolio endpoints
  async getPortfolioProjects(): Promise<PortfolioProject[]> {
    return this.request<PortfolioProject[]>('/portfolio');
  }

  async getPortfolioProject(id: string): Promise<PortfolioProject> {
    return this.request<PortfolioProject>(`/portfolio/${id}`);
  }

  async createPortfolioProject(project: PortfolioProjectInput): Promise<PortfolioProject> {
    return this.request<PortfolioProject>('/portfolio', {
      method: 'POST',
      body: JSON.stringify(project),
    });
  }

  async updatePortfolioProject(id: string, project: Partial<PortfolioProjectInput>): Promise<PortfolioProject> {
    return this.request<PortfolioProject>(`/portfolio/${id}`, {
      method: 'PUT',
      body: JSON.stringify(project),
    });
  }

  async deletePortfolioProject(id: string): Promise<void> {
    return this.request<void>(`/portfolio/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();
export default apiService;
