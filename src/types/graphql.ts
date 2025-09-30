// GraphQL Schema Types
// Generated based on the backend GraphQL schema

// Enums
export enum UserRole {
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR', 
  VIEWER = 'VIEWER',
  GUEST = 'GUEST'
}

export enum BlogStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED'
}

export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC'
}

// Core Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
  projects: Project[];
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  resumeContents: ResumeContent[];
}

export interface ResumeContent {
  id: string;
  title: string;
  description?: string;
  detail?: string;
  categoryId: string;
  category: Category;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  title: string;
  description?: string;
  userId?: string;
  user?: User;
  createdAt: string;
  updatedAt: string;
}

export interface Blog {
  id: string;
  title: string;
  content: string;
  summary?: string;
  slug: string;
  author?: string;
  publishedAt?: string;
  status: BlogStatus;
  tags: string[];
  metaDescription?: string;
  createdAt: string;
  updatedAt: string;
}

// Pagination
export interface PaginationInfo {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

// Connection Types
export interface UserConnection {
  data: User[];
  pagination: PaginationInfo;
}

export interface CategoryConnection {
  data: Category[];
  pagination: PaginationInfo;
}

export interface ResumeContentConnection {
  data: ResumeContent[];
  pagination: PaginationInfo;
}

export interface ProjectConnection {
  data: Project[];
  pagination: PaginationInfo;
}

export interface BlogConnection {
  data: Blog[];
  pagination: PaginationInfo;
}

// Auth Types
export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}

export interface LoginResponse {
  user: User;
  tokens: TokenPair;
}

// Input Types
export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

export interface ChangePasswordInput {
  oldPassword: string;
  newPassword: string;
}

export interface CreateUserInput {
  name: string;
  email: string;
  role?: UserRole;
}

export interface UpdateUserInput {
  name?: string;
  email?: string;
  role?: UserRole;
  isActive?: boolean;
}

export interface CreateCategoryInput {
  name: string;
  description?: string;
}

export interface UpdateCategoryInput {
  name?: string;
  description?: string;
}

export interface CreateResumeContentInput {
  title: string;
  description?: string;
  detail?: string;
  categoryId: string;
}

export interface UpdateResumeContentInput {
  title?: string;
  description?: string;
  detail?: string;
  categoryId?: string;
}

export interface CreateProjectInput {
  title: string;
  description?: string;
  userId?: string;
}

export interface UpdateProjectInput {
  title?: string;
  description?: string;
  userId?: string;
}

export interface CreateBlogInput {
  title: string;
  content: string;
  summary?: string;
  slug: string;
  author?: string;
  status?: BlogStatus;
  tags?: string[];
  metaDescription?: string;
}

export interface UpdateBlogInput {
  title?: string;
  content?: string;
  summary?: string;
  slug?: string;
  author?: string;
  status?: BlogStatus;
  tags?: string[];
  metaDescription?: string;
}

// Query Variables Types
export interface ListVariables {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: SortDirection;
}

export interface GetByIdVariables {
  id: string;
}

export interface GetBlogBySlugVariables {
  slug: string;
}

export interface GetResumeContentsByCategoryVariables extends ListVariables {
  categoryId: string;
}

export interface GetProjectsByUserVariables extends ListVariables {
  userId: string;
}

export interface GetBlogsByStatusVariables extends ListVariables {
  status: BlogStatus;
}

// Mutation Variables Types
export interface CreateUserVariables {
  input: CreateUserInput;
}

export interface UpdateUserVariables {
  id: string;
  input: UpdateUserInput;
}

export interface DeleteUserVariables {
  id: string;
}

export interface CreateCategoryVariables {
  input: CreateCategoryInput;
}

export interface UpdateCategoryVariables {
  id: string;
  input: UpdateCategoryInput;
}

export interface DeleteCategoryVariables {
  id: string;
}

export interface CreateResumeContentVariables {
  input: CreateResumeContentInput;
}

export interface UpdateResumeContentVariables {
  id: string;
  input: UpdateResumeContentInput;
}

export interface DeleteResumeContentVariables {
  id: string;
}

export interface CreateProjectVariables {
  input: CreateProjectInput;
}

export interface UpdateProjectVariables {
  id: string;
  input: UpdateProjectInput;
}

export interface DeleteProjectVariables {
  id: string;
}

export interface CreateBlogVariables {
  input: CreateBlogInput;
}

export interface UpdateBlogVariables {
  id: string;
  input: UpdateBlogInput;
}

export interface DeleteBlogVariables {
  id: string;
}

export interface LoginVariables {
  input: LoginInput;
}

export interface RegisterVariables {
  input: RegisterInput;
}

export interface RefreshTokenVariables {
  refreshToken: string;
}

export interface ChangePasswordVariables {
  input: ChangePasswordInput;
}

export interface UpdateUserRoleVariables {
  userId: string;
  role: UserRole;
}

export interface DeactivateUserVariables {
  userId: string;
}

// Response Types for better type safety
export interface QueryResponse<T> {
  data?: T;
  error?: Error;
  fetching: boolean;
  stale: boolean;
}

export interface MutationResponse<T> {
  data?: T;
  error?: Error;
  fetching: boolean;
}

// Utility Types
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

// Error Types
export interface GraphQLError {
  message: string;
  locations?: Array<{
    line: number;
    column: number;
  }>;
  path?: Array<string | number>;
  extensions?: {
    code?: string;
    [key: string]: unknown;
  };
}

export interface NetworkError {
  name: string;
  message: string;
  networkError?: Error;
}

// Context Types for Qwik
export interface AuthContext {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (input: LoginInput) => Promise<{ success: boolean; user: User }>;
  register: (input: RegisterInput) => Promise<{ success: boolean; user: User }>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  reinitialize: () => Promise<void>;
}

// Form Types for components
export interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  isValid: boolean;
}

// Filter Types for advanced queries
export interface BlogFilters {
  status?: BlogStatus;
  author?: string;
  tags?: string[];
  dateFrom?: string;
  dateTo?: string;
}

export interface ProjectFilters {
  userId?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface UserFilters {
  role?: UserRole;
  isActive?: boolean;
  dateFrom?: string;
  dateTo?: string;
}

// Component Props Types
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export interface SortingProps {
  sortBy: string;
  sortDirection: SortDirection;
  onSort: (field: string) => void;
}

export interface LoadingState {
  isLoading: boolean;
  isError: boolean;
  error?: string;
}

// API Response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}