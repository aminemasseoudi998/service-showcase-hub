export interface PortfolioProject {
  _id: string;
  title: string;
  description: string;
  category: string;
  techStack: string[];
  results: string;
  clientName?: string;
  clientLogo?: string;
  projectUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PortfolioProjectInput {
  title: string;
  description: string;
  category: string;
  techStack: string[];
  results: string;
  clientName?: string;
  clientLogo?: string;
  projectUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  featured?: boolean;
}

export interface User {
  _id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface ApiError {
  message: string;
  status: number;
}
