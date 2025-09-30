import {
  USER_CORE_FRAGMENT,
  USER_FULL_FRAGMENT,
  CATEGORY_CORE_FRAGMENT,
  CATEGORY_WITH_CONTENT_FRAGMENT,
  RESUME_CONTENT_CORE_FRAGMENT,
  RESUME_CONTENT_WITH_CATEGORY_FRAGMENT,
  PROJECT_CORE_FRAGMENT,
  PROJECT_WITH_USER_FRAGMENT,
  BLOG_CORE_FRAGMENT,
  BLOG_PREVIEW_FRAGMENT,
  PAGINATION_FRAGMENT,
} from './fragments';

// Auth Queries
export const ME_QUERY = `
  query Me {
    me {
      ...UserFull
    }
  }
  ${USER_FULL_FRAGMENT}
`;

// User Queries
export const GET_USERS_QUERY = `
  query GetUsers($page: Int, $pageSize: Int, $sortBy: String, $sortDirection: SortDirection) {
    users(page: $page, pageSize: $pageSize, sortBy: $sortBy, sortDirection: $sortDirection) {
      data {
        ...UserCore
      }
      pagination {
        ...Pagination
      }
    }
  }
  ${USER_CORE_FRAGMENT}
  ${PAGINATION_FRAGMENT}
`;

export const GET_USER_QUERY = `
  query GetUser($id: ID!) {
    user(id: $id) {
      ...UserFull
    }
  }
  ${USER_FULL_FRAGMENT}
`;

// Category Queries
export const GET_CATEGORIES_QUERY = `
  query GetCategories($page: Int, $pageSize: Int, $sortBy: String, $sortDirection: SortDirection) {
    categories(page: $page, pageSize: $pageSize, sortBy: $sortBy, sortDirection: $sortDirection) {
      data {
        ...CategoryCore
      }
      pagination {
        ...Pagination
      }
    }
  }
  ${CATEGORY_CORE_FRAGMENT}
  ${PAGINATION_FRAGMENT}
`;

export const GET_CATEGORY_QUERY = `
  query GetCategory($id: ID!) {
    category(id: $id) {
      ...CategoryWithContent
    }
  }
  ${CATEGORY_WITH_CONTENT_FRAGMENT}
`;

// Resume Content Queries
export const GET_RESUME_CONTENTS_QUERY = `
  query GetResumeContents($page: Int, $pageSize: Int, $sortBy: String, $sortDirection: SortDirection) {
    resumeContents(page: $page, pageSize: $pageSize, sortBy: $sortBy, sortDirection: $sortDirection) {
      data {
        ...ResumeContentWithCategory
      }
      pagination {
        ...Pagination
      }
    }
  }
  ${RESUME_CONTENT_WITH_CATEGORY_FRAGMENT}
  ${PAGINATION_FRAGMENT}
`;

export const GET_RESUME_CONTENT_QUERY = `
  query GetResumeContent($id: ID!) {
    resumeContent(id: $id) {
      ...ResumeContentWithCategory
    }
  }
  ${RESUME_CONTENT_WITH_CATEGORY_FRAGMENT}
`;

export const GET_RESUME_CONTENTS_BY_CATEGORY_QUERY = `
  query GetResumeContentsByCategory($categoryId: ID!, $page: Int, $pageSize: Int, $sortBy: String, $sortDirection: SortDirection) {
    resumeContentsByCategory(categoryId: $categoryId, page: $page, pageSize: $pageSize, sortBy: $sortBy, sortDirection: $sortDirection) {
      data {
        ...ResumeContentCore
      }
      pagination {
        ...Pagination
      }
    }
  }
  ${RESUME_CONTENT_CORE_FRAGMENT}
  ${PAGINATION_FRAGMENT}
`;

// Project Queries
export const GET_PROJECTS_QUERY = `
  query GetProjects($page: Int, $pageSize: Int, $sortBy: String, $sortDirection: SortDirection) {
    projects(page: $page, pageSize: $pageSize, sortBy: $sortBy, sortDirection: $sortDirection) {
      data {
        ...ProjectWithUser
      }
      pagination {
        ...Pagination
      }
    }
  }
  ${PROJECT_WITH_USER_FRAGMENT}
  ${PAGINATION_FRAGMENT}
`;

export const GET_PROJECT_QUERY = `
  query GetProject($id: ID!) {
    project(id: $id) {
      ...ProjectWithUser
    }
  }
  ${PROJECT_WITH_USER_FRAGMENT}
`;

export const GET_PROJECTS_BY_USER_QUERY = `
  query GetProjectsByUser($userId: ID!, $page: Int, $pageSize: Int, $sortBy: String, $sortDirection: SortDirection) {
    projectsByUser(userId: $userId, page: $page, pageSize: $pageSize, sortBy: $sortBy, sortDirection: $sortDirection) {
      data {
        ...ProjectCore
      }
      pagination {
        ...Pagination
      }
    }
  }
  ${PROJECT_CORE_FRAGMENT}
  ${PAGINATION_FRAGMENT}
`;

// Blog Queries
export const GET_BLOGS_QUERY = `
  query GetBlogs($page: Int, $pageSize: Int, $sortBy: String, $sortDirection: SortDirection) {
    blogs(page: $page, pageSize: $pageSize, sortBy: $sortBy, sortDirection: $sortDirection) {
      data {
        ...BlogPreview
      }
      pagination {
        ...Pagination
      }
    }
  }
  ${BLOG_PREVIEW_FRAGMENT}
  ${PAGINATION_FRAGMENT}
`;

export const GET_BLOG_QUERY = `
  query GetBlog($id: ID!) {
    blog(id: $id) {
      ...BlogCore
    }
  }
  ${BLOG_CORE_FRAGMENT}
`;

export const GET_BLOG_BY_SLUG_QUERY = `
  query GetBlogBySlug($slug: String!) {
    blogBySlug(slug: $slug) {
      ...BlogCore
    }
  }
  ${BLOG_CORE_FRAGMENT}
`;

export const GET_PUBLISHED_BLOGS_QUERY = `
  query GetPublishedBlogs($page: Int, $pageSize: Int, $sortBy: String, $sortDirection: SortDirection) {
    publishedBlogs(page: $page, pageSize: $pageSize, sortBy: $sortBy, sortDirection: $sortDirection) {
      data {
        ...BlogPreview
      }
      pagination {
        ...Pagination
      }
    }
  }
  ${BLOG_PREVIEW_FRAGMENT}
  ${PAGINATION_FRAGMENT}
`;

export const GET_BLOGS_BY_STATUS_QUERY = `
  query GetBlogsByStatus($status: BlogStatus!, $page: Int, $pageSize: Int, $sortBy: String, $sortDirection: SortDirection) {
    blogsByStatus(status: $status, page: $page, pageSize: $pageSize, sortBy: $sortBy, sortDirection: $sortDirection) {
      data {
        ...BlogPreview
      }
      pagination {
        ...Pagination
      }
    }
  }
  ${BLOG_PREVIEW_FRAGMENT}
  ${PAGINATION_FRAGMENT}
`;