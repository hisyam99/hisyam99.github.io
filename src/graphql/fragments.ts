// GraphQL Fragments for reusability and consistency

// User Fragments
export const USER_CORE_FRAGMENT = `
  fragment UserCore on User {
    id
    name
    email
    role
    isActive
    createdAt
    updatedAt
  }
`;

export const USER_FULL_FRAGMENT = `
  fragment UserFull on User {
    ...UserCore
    lastLogin
    projects {
      id
      title
      description
      createdAt
    }
  }
  ${USER_CORE_FRAGMENT}
`;

// Category Fragments
export const CATEGORY_CORE_FRAGMENT = `
  fragment CategoryCore on Category {
    id
    name
    description
    createdAt
    updatedAt
  }
`;

export const CATEGORY_WITH_CONTENT_FRAGMENT = `
  fragment CategoryWithContent on Category {
    ...CategoryCore
    resumeContents {
      id
      title
      description
      detail
      createdAt
    }
  }
  ${CATEGORY_CORE_FRAGMENT}
`;

// Resume Content Fragments
export const RESUME_CONTENT_CORE_FRAGMENT = `
  fragment ResumeContentCore on ResumeContent {
    id
    title
    description
    detail
    categoryId
    createdAt
    updatedAt
  }
`;

export const RESUME_CONTENT_WITH_CATEGORY_FRAGMENT = `
  fragment ResumeContentWithCategory on ResumeContent {
    ...ResumeContentCore
    category {
      ...CategoryCore
    }
  }
  ${RESUME_CONTENT_CORE_FRAGMENT}
  ${CATEGORY_CORE_FRAGMENT}
`;

// Project Fragments
export const PROJECT_CORE_FRAGMENT = `
  fragment ProjectCore on Project {
    id
    title
    description
    userId
    createdAt
    updatedAt
  }
`;

export const PROJECT_WITH_USER_FRAGMENT = `
  fragment ProjectWithUser on Project {
    ...ProjectCore
    user {
      ...UserCore
    }
  }
  ${PROJECT_CORE_FRAGMENT}
  ${USER_CORE_FRAGMENT}
`;

// Blog Fragments
export const BLOG_CORE_FRAGMENT = `
  fragment BlogCore on Blog {
    id
    title
    content
    summary
    slug
    author
    publishedAt
    status
    tags
    metaDescription
    createdAt
    updatedAt
  }
`;

export const BLOG_PREVIEW_FRAGMENT = `
  fragment BlogPreview on Blog {
    id
    title
    summary
    slug
    author
    publishedAt
    status
    tags
    createdAt
  }
`;

// Pagination Fragment
export const PAGINATION_FRAGMENT = `
  fragment Pagination on PaginationInfo {
    page
    pageSize
    total
    totalPages
  }
`;

// Token Fragment
export const TOKEN_FRAGMENT = `
  fragment TokenInfo on TokenPair {
    accessToken
    refreshToken
    expiresIn
    tokenType
  }
`;

// Auth Response Fragment
export const LOGIN_RESPONSE_FRAGMENT = `
  fragment LoginResponse on LoginResponse {
    user {
      ...UserCore
    }
    tokens {
      ...TokenInfo
    }
  }
  ${USER_CORE_FRAGMENT}
  ${TOKEN_FRAGMENT}
`;