import {
  USER_CORE_FRAGMENT,
  CATEGORY_CORE_FRAGMENT,
  RESUME_CONTENT_CORE_FRAGMENT,
  PROJECT_CORE_FRAGMENT,
  BLOG_CORE_FRAGMENT,
  LOGIN_RESPONSE_FRAGMENT,
  TOKEN_FRAGMENT,
} from './fragments';

// Auth Mutations
export const LOGIN_MUTATION = `
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      ...LoginResponse
    }
  }
  ${LOGIN_RESPONSE_FRAGMENT}
`;

export const REGISTER_MUTATION = `
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      ...LoginResponse
    }
  }
  ${LOGIN_RESPONSE_FRAGMENT}
`;

export const REFRESH_TOKEN_MUTATION = `
  mutation RefreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      ...TokenInfo
    }
  }
  ${TOKEN_FRAGMENT}
`;

export const CHANGE_PASSWORD_MUTATION = `
  mutation ChangePassword($input: ChangePasswordInput!) {
    changePassword(input: $input)
  }
`;

export const UPDATE_USER_ROLE_MUTATION = `
  mutation UpdateUserRole($userId: ID!, $role: UserRole!) {
    updateUserRole(userId: $userId, role: $role) {
      ...UserCore
    }
  }
  ${USER_CORE_FRAGMENT}
`;

export const DEACTIVATE_USER_MUTATION = `
  mutation DeactivateUser($userId: ID!) {
    deactivateUser(userId: $userId)
  }
`;

// User Mutations
export const CREATE_USER_MUTATION = `
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      ...UserCore
    }
  }
  ${USER_CORE_FRAGMENT}
`;

export const UPDATE_USER_MUTATION = `
  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      ...UserCore
    }
  }
  ${USER_CORE_FRAGMENT}
`;

export const DELETE_USER_MUTATION = `
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

// Category Mutations
export const CREATE_CATEGORY_MUTATION = `
  mutation CreateCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      ...CategoryCore
    }
  }
  ${CATEGORY_CORE_FRAGMENT}
`;

export const UPDATE_CATEGORY_MUTATION = `
  mutation UpdateCategory($id: ID!, $input: UpdateCategoryInput!) {
    updateCategory(id: $id, input: $input) {
      ...CategoryCore
    }
  }
  ${CATEGORY_CORE_FRAGMENT}
`;

export const DELETE_CATEGORY_MUTATION = `
  mutation DeleteCategory($id: ID!) {
    deleteCategory(id: $id)
  }
`;

// Resume Content Mutations
export const CREATE_RESUME_CONTENT_MUTATION = `
  mutation CreateResumeContent($input: CreateResumeContentInput!) {
    createResumeContent(input: $input) {
      ...ResumeContentCore
    }
  }
  ${RESUME_CONTENT_CORE_FRAGMENT}
`;

export const UPDATE_RESUME_CONTENT_MUTATION = `
  mutation UpdateResumeContent($id: ID!, $input: UpdateResumeContentInput!) {
    updateResumeContent(id: $id, input: $input) {
      ...ResumeContentCore
    }
  }
  ${RESUME_CONTENT_CORE_FRAGMENT}
`;

export const DELETE_RESUME_CONTENT_MUTATION = `
  mutation DeleteResumeContent($id: ID!) {
    deleteResumeContent(id: $id)
  }
`;

// Project Mutations
export const CREATE_PROJECT_MUTATION = `
  mutation CreateProject($input: CreateProjectInput!) {
    createProject(input: $input) {
      ...ProjectCore
    }
  }
  ${PROJECT_CORE_FRAGMENT}
`;

export const UPDATE_PROJECT_MUTATION = `
  mutation UpdateProject($id: ID!, $input: UpdateProjectInput!) {
    updateProject(id: $id, input: $input) {
      ...ProjectCore
    }
  }
  ${PROJECT_CORE_FRAGMENT}
`;

export const DELETE_PROJECT_MUTATION = `
  mutation DeleteProject($id: ID!) {
    deleteProject(id: $id)
  }
`;

// Blog Mutations
export const CREATE_BLOG_MUTATION = `
  mutation CreateBlog($input: CreateBlogInput!) {
    createBlog(input: $input) {
      ...BlogCore
    }
  }
  ${BLOG_CORE_FRAGMENT}
`;

export const UPDATE_BLOG_MUTATION = `
  mutation UpdateBlog($id: ID!, $input: UpdateBlogInput!) {
    updateBlog(id: $id, input: $input) {
      ...BlogCore
    }
  }
  ${BLOG_CORE_FRAGMENT}
`;

export const DELETE_BLOG_MUTATION = `
  mutation DeleteBlog($id: ID!) {
    deleteBlog(id: $id)
  }
`;