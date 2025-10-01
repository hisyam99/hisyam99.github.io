import * as $$Data from "./data.js";
import * as $$Scalar from "./scalar.js";
import type { Schema as $ } from "graffle/utilities-for-generated";
import type * as $$Utilities from "graffle/utilities-for-generated";

export namespace Schema {
  //
  //
  //
  //
  //
  //
  // ==================================================================================================
  //                                                Root
  // ==================================================================================================
  //
  //
  //
  //
  //
  //

  //                                               Query
  // --------------------------------------------------------------------------------------------------
  //

  export interface Query {
    kind: "Object";
    name: "Query";
    fields: {
      __typename: Query.__typename;
      me: Query.me;
      users: Query.users;
      user: Query.user;
      categories: Query.categories;
      category: Query.category;
      resumeContents: Query.resumeContents;
      resumeContent: Query.resumeContent;
      resumeContentsByCategory: Query.resumeContentsByCategory;
      projects: Query.projects;
      project: Query.project;
      projectsByUser: Query.projectsByUser;
      blogs: Query.blogs;
      blog: Query.blog;
      blogBySlug: Query.blogBySlug;
      publishedBlogs: Query.publishedBlogs;
      blogsByStatus: Query.blogsByStatus;
    };
  }

  export namespace Query {
    export interface __typename {
      kind: "OutputField";
      name: "__typename";
      arguments: {};
      inlineType: [1];
      namedType: {
        kind: "__typename";
        value: "Query";
      };
    }

    export interface me {
      kind: "OutputField";
      name: "me";
      arguments: {};
      inlineType: [0];
      namedType: $$NamedTypes.$$User;
    }

    export interface users {
      kind: "OutputField";
      name: "users";
      arguments: {
        page: {
          kind: "InputField";
          name: "page";
          inlineType: [0];
          namedType: $$NamedTypes.$$Int;
        };
        pageSize: {
          kind: "InputField";
          name: "pageSize";
          inlineType: [0];
          namedType: $$NamedTypes.$$Int;
        };
        sortBy: {
          kind: "InputField";
          name: "sortBy";
          inlineType: [0];
          namedType: $$NamedTypes.$$String;
        };
        sortDirection: {
          kind: "InputField";
          name: "sortDirection";
          inlineType: [0];
          namedType: $$NamedTypes.$$SortDirection;
        };
      };
      inlineType: [1];
      namedType: $$NamedTypes.$$UserConnection;
    }

    export interface user {
      kind: "OutputField";
      name: "user";
      arguments: {
        id: {
          kind: "InputField";
          name: "id";
          inlineType: [1];
          namedType: $$NamedTypes.$$ID;
        };
      };
      inlineType: [0];
      namedType: $$NamedTypes.$$User;
    }

    export interface categories {
      kind: "OutputField";
      name: "categories";
      arguments: {
        page: {
          kind: "InputField";
          name: "page";
          inlineType: [0];
          namedType: $$NamedTypes.$$Int;
        };
        pageSize: {
          kind: "InputField";
          name: "pageSize";
          inlineType: [0];
          namedType: $$NamedTypes.$$Int;
        };
        sortBy: {
          kind: "InputField";
          name: "sortBy";
          inlineType: [0];
          namedType: $$NamedTypes.$$String;
        };
        sortDirection: {
          kind: "InputField";
          name: "sortDirection";
          inlineType: [0];
          namedType: $$NamedTypes.$$SortDirection;
        };
      };
      inlineType: [1];
      namedType: $$NamedTypes.$$CategoryConnection;
    }

    export interface category {
      kind: "OutputField";
      name: "category";
      arguments: {
        id: {
          kind: "InputField";
          name: "id";
          inlineType: [1];
          namedType: $$NamedTypes.$$ID;
        };
      };
      inlineType: [0];
      namedType: $$NamedTypes.$$Category;
    }

    export interface resumeContents {
      kind: "OutputField";
      name: "resumeContents";
      arguments: {
        page: {
          kind: "InputField";
          name: "page";
          inlineType: [0];
          namedType: $$NamedTypes.$$Int;
        };
        pageSize: {
          kind: "InputField";
          name: "pageSize";
          inlineType: [0];
          namedType: $$NamedTypes.$$Int;
        };
        sortBy: {
          kind: "InputField";
          name: "sortBy";
          inlineType: [0];
          namedType: $$NamedTypes.$$String;
        };
        sortDirection: {
          kind: "InputField";
          name: "sortDirection";
          inlineType: [0];
          namedType: $$NamedTypes.$$SortDirection;
        };
      };
      inlineType: [1];
      namedType: $$NamedTypes.$$ResumeContentConnection;
    }

    export interface resumeContent {
      kind: "OutputField";
      name: "resumeContent";
      arguments: {
        id: {
          kind: "InputField";
          name: "id";
          inlineType: [1];
          namedType: $$NamedTypes.$$ID;
        };
      };
      inlineType: [0];
      namedType: $$NamedTypes.$$ResumeContent;
    }

    export interface resumeContentsByCategory {
      kind: "OutputField";
      name: "resumeContentsByCategory";
      arguments: {
        categoryId: {
          kind: "InputField";
          name: "categoryId";
          inlineType: [1];
          namedType: $$NamedTypes.$$ID;
        };
        page: {
          kind: "InputField";
          name: "page";
          inlineType: [0];
          namedType: $$NamedTypes.$$Int;
        };
        pageSize: {
          kind: "InputField";
          name: "pageSize";
          inlineType: [0];
          namedType: $$NamedTypes.$$Int;
        };
        sortBy: {
          kind: "InputField";
          name: "sortBy";
          inlineType: [0];
          namedType: $$NamedTypes.$$String;
        };
        sortDirection: {
          kind: "InputField";
          name: "sortDirection";
          inlineType: [0];
          namedType: $$NamedTypes.$$SortDirection;
        };
      };
      inlineType: [1];
      namedType: $$NamedTypes.$$ResumeContentConnection;
    }

    export interface projects {
      kind: "OutputField";
      name: "projects";
      arguments: {
        page: {
          kind: "InputField";
          name: "page";
          inlineType: [0];
          namedType: $$NamedTypes.$$Int;
        };
        pageSize: {
          kind: "InputField";
          name: "pageSize";
          inlineType: [0];
          namedType: $$NamedTypes.$$Int;
        };
        sortBy: {
          kind: "InputField";
          name: "sortBy";
          inlineType: [0];
          namedType: $$NamedTypes.$$String;
        };
        sortDirection: {
          kind: "InputField";
          name: "sortDirection";
          inlineType: [0];
          namedType: $$NamedTypes.$$SortDirection;
        };
      };
      inlineType: [1];
      namedType: $$NamedTypes.$$ProjectConnection;
    }

    export interface project {
      kind: "OutputField";
      name: "project";
      arguments: {
        id: {
          kind: "InputField";
          name: "id";
          inlineType: [1];
          namedType: $$NamedTypes.$$ID;
        };
      };
      inlineType: [0];
      namedType: $$NamedTypes.$$Project;
    }

    export interface projectsByUser {
      kind: "OutputField";
      name: "projectsByUser";
      arguments: {
        userId: {
          kind: "InputField";
          name: "userId";
          inlineType: [1];
          namedType: $$NamedTypes.$$ID;
        };
        page: {
          kind: "InputField";
          name: "page";
          inlineType: [0];
          namedType: $$NamedTypes.$$Int;
        };
        pageSize: {
          kind: "InputField";
          name: "pageSize";
          inlineType: [0];
          namedType: $$NamedTypes.$$Int;
        };
        sortBy: {
          kind: "InputField";
          name: "sortBy";
          inlineType: [0];
          namedType: $$NamedTypes.$$String;
        };
        sortDirection: {
          kind: "InputField";
          name: "sortDirection";
          inlineType: [0];
          namedType: $$NamedTypes.$$SortDirection;
        };
      };
      inlineType: [1];
      namedType: $$NamedTypes.$$ProjectConnection;
    }

    export interface blogs {
      kind: "OutputField";
      name: "blogs";
      arguments: {
        page: {
          kind: "InputField";
          name: "page";
          inlineType: [0];
          namedType: $$NamedTypes.$$Int;
        };
        pageSize: {
          kind: "InputField";
          name: "pageSize";
          inlineType: [0];
          namedType: $$NamedTypes.$$Int;
        };
        sortBy: {
          kind: "InputField";
          name: "sortBy";
          inlineType: [0];
          namedType: $$NamedTypes.$$String;
        };
        sortDirection: {
          kind: "InputField";
          name: "sortDirection";
          inlineType: [0];
          namedType: $$NamedTypes.$$SortDirection;
        };
      };
      inlineType: [1];
      namedType: $$NamedTypes.$$BlogConnection;
    }

    export interface blog {
      kind: "OutputField";
      name: "blog";
      arguments: {
        id: {
          kind: "InputField";
          name: "id";
          inlineType: [1];
          namedType: $$NamedTypes.$$ID;
        };
      };
      inlineType: [0];
      namedType: $$NamedTypes.$$Blog;
    }

    export interface blogBySlug {
      kind: "OutputField";
      name: "blogBySlug";
      arguments: {
        slug: {
          kind: "InputField";
          name: "slug";
          inlineType: [1];
          namedType: $$NamedTypes.$$String;
        };
      };
      inlineType: [0];
      namedType: $$NamedTypes.$$Blog;
    }

    export interface publishedBlogs {
      kind: "OutputField";
      name: "publishedBlogs";
      arguments: {
        page: {
          kind: "InputField";
          name: "page";
          inlineType: [0];
          namedType: $$NamedTypes.$$Int;
        };
        pageSize: {
          kind: "InputField";
          name: "pageSize";
          inlineType: [0];
          namedType: $$NamedTypes.$$Int;
        };
        sortBy: {
          kind: "InputField";
          name: "sortBy";
          inlineType: [0];
          namedType: $$NamedTypes.$$String;
        };
        sortDirection: {
          kind: "InputField";
          name: "sortDirection";
          inlineType: [0];
          namedType: $$NamedTypes.$$SortDirection;
        };
      };
      inlineType: [1];
      namedType: $$NamedTypes.$$BlogConnection;
    }

    export interface blogsByStatus {
      kind: "OutputField";
      name: "blogsByStatus";
      arguments: {
        status: {
          kind: "InputField";
          name: "status";
          inlineType: [1];
          namedType: $$NamedTypes.$$BlogStatus;
        };
        page: {
          kind: "InputField";
          name: "page";
          inlineType: [0];
          namedType: $$NamedTypes.$$Int;
        };
        pageSize: {
          kind: "InputField";
          name: "pageSize";
          inlineType: [0];
          namedType: $$NamedTypes.$$Int;
        };
        sortBy: {
          kind: "InputField";
          name: "sortBy";
          inlineType: [0];
          namedType: $$NamedTypes.$$String;
        };
        sortDirection: {
          kind: "InputField";
          name: "sortDirection";
          inlineType: [0];
          namedType: $$NamedTypes.$$SortDirection;
        };
      };
      inlineType: [1];
      namedType: $$NamedTypes.$$BlogConnection;
    }
  }

  //                                              Mutation
  // --------------------------------------------------------------------------------------------------
  //

  export interface Mutation {
    kind: "Object";
    name: "Mutation";
    fields: {
      __typename: Mutation.__typename;
      login: Mutation.login;
      register: Mutation.register;
      refreshToken: Mutation.refreshToken;
      changePassword: Mutation.changePassword;
      updateUserRole: Mutation.updateUserRole;
      deactivateUser: Mutation.deactivateUser;
      createUser: Mutation.createUser;
      updateUser: Mutation.updateUser;
      deleteUser: Mutation.deleteUser;
      createCategory: Mutation.createCategory;
      updateCategory: Mutation.updateCategory;
      deleteCategory: Mutation.deleteCategory;
      createResumeContent: Mutation.createResumeContent;
      updateResumeContent: Mutation.updateResumeContent;
      deleteResumeContent: Mutation.deleteResumeContent;
      createProject: Mutation.createProject;
      updateProject: Mutation.updateProject;
      deleteProject: Mutation.deleteProject;
      createBlog: Mutation.createBlog;
      updateBlog: Mutation.updateBlog;
      deleteBlog: Mutation.deleteBlog;
    };
  }

  export namespace Mutation {
    export interface __typename {
      kind: "OutputField";
      name: "__typename";
      arguments: {};
      inlineType: [1];
      namedType: {
        kind: "__typename";
        value: "Mutation";
      };
    }

    export interface login {
      kind: "OutputField";
      name: "login";
      arguments: {
        input: {
          kind: "InputField";
          name: "input";
          inlineType: [1];
          namedType: $$NamedTypes.$$LoginInput;
        };
      };
      inlineType: [1];
      namedType: $$NamedTypes.$$LoginResponse;
    }

    export interface register {
      kind: "OutputField";
      name: "register";
      arguments: {
        input: {
          kind: "InputField";
          name: "input";
          inlineType: [1];
          namedType: $$NamedTypes.$$RegisterInput;
        };
      };
      inlineType: [1];
      namedType: $$NamedTypes.$$LoginResponse;
    }

    export interface refreshToken {
      kind: "OutputField";
      name: "refreshToken";
      arguments: {
        refreshToken: {
          kind: "InputField";
          name: "refreshToken";
          inlineType: [1];
          namedType: $$NamedTypes.$$String;
        };
      };
      inlineType: [1];
      namedType: $$NamedTypes.$$TokenPair;
    }

    export interface changePassword {
      kind: "OutputField";
      name: "changePassword";
      arguments: {
        input: {
          kind: "InputField";
          name: "input";
          inlineType: [1];
          namedType: $$NamedTypes.$$ChangePasswordInput;
        };
      };
      inlineType: [1];
      namedType: $$NamedTypes.$$Boolean;
    }

    export interface updateUserRole {
      kind: "OutputField";
      name: "updateUserRole";
      arguments: {
        userId: {
          kind: "InputField";
          name: "userId";
          inlineType: [1];
          namedType: $$NamedTypes.$$ID;
        };
        role: {
          kind: "InputField";
          name: "role";
          inlineType: [1];
          namedType: $$NamedTypes.$$UserRole;
        };
      };
      inlineType: [1];
      namedType: $$NamedTypes.$$User;
    }

    export interface deactivateUser {
      kind: "OutputField";
      name: "deactivateUser";
      arguments: {
        userId: {
          kind: "InputField";
          name: "userId";
          inlineType: [1];
          namedType: $$NamedTypes.$$ID;
        };
      };
      inlineType: [1];
      namedType: $$NamedTypes.$$Boolean;
    }

    export interface createUser {
      kind: "OutputField";
      name: "createUser";
      arguments: {
        input: {
          kind: "InputField";
          name: "input";
          inlineType: [1];
          namedType: $$NamedTypes.$$CreateUserInput;
        };
      };
      inlineType: [1];
      namedType: $$NamedTypes.$$User;
    }

    export interface updateUser {
      kind: "OutputField";
      name: "updateUser";
      arguments: {
        id: {
          kind: "InputField";
          name: "id";
          inlineType: [1];
          namedType: $$NamedTypes.$$ID;
        };
        input: {
          kind: "InputField";
          name: "input";
          inlineType: [1];
          namedType: $$NamedTypes.$$UpdateUserInput;
        };
      };
      inlineType: [1];
      namedType: $$NamedTypes.$$User;
    }

    export interface deleteUser {
      kind: "OutputField";
      name: "deleteUser";
      arguments: {
        id: {
          kind: "InputField";
          name: "id";
          inlineType: [1];
          namedType: $$NamedTypes.$$ID;
        };
      };
      inlineType: [1];
      namedType: $$NamedTypes.$$Boolean;
    }

    export interface createCategory {
      kind: "OutputField";
      name: "createCategory";
      arguments: {
        input: {
          kind: "InputField";
          name: "input";
          inlineType: [1];
          namedType: $$NamedTypes.$$CreateCategoryInput;
        };
      };
      inlineType: [1];
      namedType: $$NamedTypes.$$Category;
    }

    export interface updateCategory {
      kind: "OutputField";
      name: "updateCategory";
      arguments: {
        id: {
          kind: "InputField";
          name: "id";
          inlineType: [1];
          namedType: $$NamedTypes.$$ID;
        };
        input: {
          kind: "InputField";
          name: "input";
          inlineType: [1];
          namedType: $$NamedTypes.$$UpdateCategoryInput;
        };
      };
      inlineType: [1];
      namedType: $$NamedTypes.$$Category;
    }

    export interface deleteCategory {
      kind: "OutputField";
      name: "deleteCategory";
      arguments: {
        id: {
          kind: "InputField";
          name: "id";
          inlineType: [1];
          namedType: $$NamedTypes.$$ID;
        };
      };
      inlineType: [1];
      namedType: $$NamedTypes.$$Boolean;
    }

    export interface createResumeContent {
      kind: "OutputField";
      name: "createResumeContent";
      arguments: {
        input: {
          kind: "InputField";
          name: "input";
          inlineType: [1];
          namedType: $$NamedTypes.$$CreateResumeContentInput;
        };
      };
      inlineType: [1];
      namedType: $$NamedTypes.$$ResumeContent;
    }

    export interface updateResumeContent {
      kind: "OutputField";
      name: "updateResumeContent";
      arguments: {
        id: {
          kind: "InputField";
          name: "id";
          inlineType: [1];
          namedType: $$NamedTypes.$$ID;
        };
        input: {
          kind: "InputField";
          name: "input";
          inlineType: [1];
          namedType: $$NamedTypes.$$UpdateResumeContentInput;
        };
      };
      inlineType: [1];
      namedType: $$NamedTypes.$$ResumeContent;
    }

    export interface deleteResumeContent {
      kind: "OutputField";
      name: "deleteResumeContent";
      arguments: {
        id: {
          kind: "InputField";
          name: "id";
          inlineType: [1];
          namedType: $$NamedTypes.$$ID;
        };
      };
      inlineType: [1];
      namedType: $$NamedTypes.$$Boolean;
    }

    export interface createProject {
      kind: "OutputField";
      name: "createProject";
      arguments: {
        input: {
          kind: "InputField";
          name: "input";
          inlineType: [1];
          namedType: $$NamedTypes.$$CreateProjectInput;
        };
      };
      inlineType: [1];
      namedType: $$NamedTypes.$$Project;
    }

    export interface updateProject {
      kind: "OutputField";
      name: "updateProject";
      arguments: {
        id: {
          kind: "InputField";
          name: "id";
          inlineType: [1];
          namedType: $$NamedTypes.$$ID;
        };
        input: {
          kind: "InputField";
          name: "input";
          inlineType: [1];
          namedType: $$NamedTypes.$$UpdateProjectInput;
        };
      };
      inlineType: [1];
      namedType: $$NamedTypes.$$Project;
    }

    export interface deleteProject {
      kind: "OutputField";
      name: "deleteProject";
      arguments: {
        id: {
          kind: "InputField";
          name: "id";
          inlineType: [1];
          namedType: $$NamedTypes.$$ID;
        };
      };
      inlineType: [1];
      namedType: $$NamedTypes.$$Boolean;
    }

    export interface createBlog {
      kind: "OutputField";
      name: "createBlog";
      arguments: {
        input: {
          kind: "InputField";
          name: "input";
          inlineType: [1];
          namedType: $$NamedTypes.$$CreateBlogInput;
        };
      };
      inlineType: [1];
      namedType: $$NamedTypes.$$Blog;
    }

    export interface updateBlog {
      kind: "OutputField";
      name: "updateBlog";
      arguments: {
        id: {
          kind: "InputField";
          name: "id";
          inlineType: [1];
          namedType: $$NamedTypes.$$ID;
        };
        input: {
          kind: "InputField";
          name: "input";
          inlineType: [1];
          namedType: $$NamedTypes.$$UpdateBlogInput;
        };
      };
      inlineType: [1];
      namedType: $$NamedTypes.$$Blog;
    }

    export interface deleteBlog {
      kind: "OutputField";
      name: "deleteBlog";
      arguments: {
        id: {
          kind: "InputField";
          name: "id";
          inlineType: [1];
          namedType: $$NamedTypes.$$ID;
        };
      };
      inlineType: [1];
      namedType: $$NamedTypes.$$Boolean;
    }
  }

  //
  //
  //
  //
  //
  //
  // ==================================================================================================
  //                                            OutputObject
  // ==================================================================================================
  //
  //
  //
  //
  //
  //

  //                                           PaginationInfo
  // --------------------------------------------------------------------------------------------------
  //

  export interface PaginationInfo {
    kind: "Object";
    name: "PaginationInfo";
    fields: {
      __typename: PaginationInfo.__typename;
      page: PaginationInfo.page;
      pageSize: PaginationInfo.pageSize;
      total: PaginationInfo.total;
      totalPages: PaginationInfo.totalPages;
    };
  }

  export namespace PaginationInfo {
    export interface __typename {
      kind: "OutputField";
      name: "__typename";
      arguments: {};
      inlineType: [1];
      namedType: {
        kind: "__typename";
        value: "PaginationInfo";
      };
    }

    export interface page {
      kind: "OutputField";
      name: "page";
      arguments: {};
      inlineType: [1];
      namedType: $$NamedTypes.$$Int;
    }

    export interface pageSize {
      kind: "OutputField";
      name: "pageSize";
      arguments: {};
      inlineType: [1];
      namedType: $$NamedTypes.$$Int;
    }

    export interface total {
      kind: "OutputField";
      name: "total";
      arguments: {};
      inlineType: [1];
      namedType: $$NamedTypes.$$Int;
    }

    export interface totalPages {
      kind: "OutputField";
      name: "totalPages";
      arguments: {};
      inlineType: [1];
      namedType: $$NamedTypes.$$Int;
    }
  }

  //                                           LoginResponse
  // --------------------------------------------------------------------------------------------------
  //

  export interface LoginResponse {
    kind: "Object";
    name: "LoginResponse";
    fields: {
      __typename: LoginResponse.__typename;
      user: LoginResponse.user;
      tokens: LoginResponse.tokens;
    };
  }

  export namespace LoginResponse {
    export interface __typename {
      kind: "OutputField";
      name: "__typename";
      arguments: {};
      inlineType: [1];
      namedType: {
        kind: "__typename";
        value: "LoginResponse";
      };
    }

    export interface user {
      kind: "OutputField";
      name: "user";
      arguments: {};
      inlineType: [1];
      namedType: $$NamedTypes.$$User;
    }

    export interface tokens {
      kind: "OutputField";
      name: "tokens";
      arguments: {};
      inlineType: [1];
      namedType: $$NamedTypes.$$TokenPair;
    }
  }

  //                                             TokenPair
  // --------------------------------------------------------------------------------------------------
  //

  export interface TokenPair {
    kind: "Object";
    name: "TokenPair";
    fields: {
      __typename: TokenPair.__typename;
      accessToken: TokenPair.accessToken;
      refreshToken: TokenPair.refreshToken;
      expiresIn: TokenPair.expiresIn;
      tokenType: TokenPair.tokenType;
    };
  }

  export namespace TokenPair {
    export interface __typename {
      kind: "OutputField";
      name: "__typename";
      arguments: {};
      inlineType: [1];
      namedType: {
        kind: "__typename";
        value: "TokenPair";
      };
    }

    export interface accessToken {
      kind: "OutputField";
      name: "accessToken";
      arguments: {};
      inlineType: [1];
      namedType: $$NamedTypes.$$String;
    }

    export interface refreshToken {
      kind: "OutputField";
      name: "refreshToken";
      arguments: {};
      inlineType: [1];
      namedType: $$NamedTypes.$$String;
    }

    export interface expiresIn {
      kind: "OutputField";
      name: "expiresIn";
      arguments: {};
      inlineType: [1];
      namedType: $$NamedTypes.$$Int;
    }

    export interface tokenType {
      kind: "OutputField";
      name: "tokenType";
      arguments: {};
      inlineType: [1];
      namedType: $$NamedTypes.$$String;
    }
  }

  //                                                User
  // --------------------------------------------------------------------------------------------------
  //

  export interface User {
    kind: "Object";
    name: "User";
    fields: {
      __typename: User.__typename;
      id: User.id;
      name: User.name;
      email: User.email;
      role: User.role;
      isActive: User.isActive;
      lastLogin: User.lastLogin;
      createdAt: User.createdAt;
      updatedAt: User.updatedAt;
      projects: User.projects;
    };
  }

  export namespace User {
    export interface __typename {
      kind: "OutputField";
      name: "__typename";
      arguments: {};
      inlineType: [1];
      namedType: {
        kind: "__typename";
        value: "User";
      };
    }

    export interface id {
      kind: "OutputField";
      name: "id";
      arguments: {};
      inlineType: [1];
      namedType: $$NamedTypes.$$ID;
    }

    export interface name {
      kind: "OutputField";
      name: "name";
      arguments: {};
      inlineType: [1];
      namedType: $$NamedTypes.$$String;
    }

    export interface email {
      kind: "OutputField";
      name: "email";
      arguments: {};
      inlineType: [1];
      namedType: $$NamedTypes.$$String;
    }

    export interface role {
      kind: "OutputField";
      name: "role";
      arguments: {};
      inlineType: [1];
      namedType: $$NamedTypes.$$UserRole;
    }

    export interface isActive {
      kind: "OutputField";
      name: "isActive";
      arguments: {};
      inlineType: [1];
      namedType: $$NamedTypes.$$Boolean;
    }

    export interface lastLogin {
      kind: "OutputField";
      name: "lastLogin";
      arguments: {};
      inlineType: [0];
      namedType: $$NamedTypes.$$String;
    }

    export interface createdAt {
      kind: "OutputField";
      name: "createdAt";
      arguments: {};
      inlineType: [1];
      namedType: $$NamedTypes.$$String;
    }

    export interface updatedAt {
      kind: "OutputField";
      name: "updatedAt";
      arguments: {};
      inlineType: [1];
      namedType: $$NamedTypes.$$String;
    }

    export interface projects {
      kind: "OutputField";
      name: "projects";
      arguments: {};
      inlineType: [1, [1]];
      namedType: $$NamedTypes.$$Project;
    }
  }

  //                                              Category
  // --------------------------------------------------------------------------------------------------
  //

  export interface Category {
    kind: "Object";
    name: "Category";
    fields: {
      __typename: Category.__typename;
      id: Category.id;
      name: Category.name;
      description: Category.description;
      createdAt: Category.createdAt;
      updatedAt: Category.updatedAt;
      resumeContents: Category.resumeContents;
    };
  }

  export namespace Category {
    export interface __typename {
      kind: "OutputField";
      name: "__typename";
      arguments: {};
      inlineType: [1];
      namedType: {
        kind: "__typename";
        value: "Category";
      };
    }

    export interface id {
      kind: "OutputField";
      name: "id";
      arguments: {};
      inlineType: [1];
      namedType: $$NamedTypes.$$ID;
    }

    export interface name {
      kind: "OutputField";
      name: "name";
      arguments: {};
      inlineType: [1];
      namedType: $$NamedTypes.$$String;
    }

    export interface description {
      kind: "OutputField";
      name: "description";
      arguments: {};
      inlineType: [0];
      namedType: $$NamedTypes.$$String;
    }

    export interface createdAt {
      kind: "OutputField";
      name: "createdAt";
      arguments: {};
      inlineType: [1];
      namedType: $$NamedTypes.$$String;
    }

    export interface updatedAt {
      kind: "OutputField";
      name: "updatedAt";
      arguments: {};
      inlineType: [1];
      namedType: $$NamedTypes.$$String;
    }

    export interface resumeContents {
      kind: "OutputField";
      name: "resumeContents";
      arguments: {};
      inlineType: [1, [1]];
      namedType: $$NamedTypes.$$ResumeContent;
    }
  }

  //                                           ResumeContent
  // --------------------------------------------------------------------------------------------------
  //

  export interface ResumeContent {
    kind: "Object";
    name: "ResumeContent";
    fields: {
      __typename: ResumeContent.__typename;
      id: ResumeContent.id;
      title: ResumeContent.title;
      description: ResumeContent.description;
      detail: ResumeContent.detail;
      categoryId: ResumeContent.categoryId;
      category: ResumeContent.category;
      createdAt: ResumeContent.createdAt;
      updatedAt: ResumeContent.updatedAt;
    };
  }

  export namespace ResumeContent {
    export interface __typename {
      kind: "OutputField";
      name: "__typename";
      arguments: {};
      inlineType: [1];
      namedType: {
        kind: "__typename";
        value: "ResumeContent";
      };
    }

    export interface id {
      kind: "OutputField";
      name: "id";
      arguments: {};
      inlineType: [1];
      namedType: $$NamedTypes.$$ID;
    }

    export interface title {
      kind: "OutputField";
      name: "title";
      arguments: {};
      inlineType: [1];
      namedType: $$NamedTypes.$$String;
    }

    export interface description {
      kind: "OutputField";
      name: "description";
      arguments: {};
      inlineType: [0];
      namedType: $$NamedTypes.$$String;
    }

    export interface detail {
      kind: "OutputField";
      name: "detail";
      arguments: {};
      inlineType: [0];
      namedType: $$NamedTypes.$$String;
    }

    export interface categoryId {
      kind: "OutputField";
      name: "categoryId";
      arguments: {};
      inlineType: [1];
      namedType: $$NamedTypes.$$ID;
    }

    export interface category {
      kind: "OutputField";
      name: "category";
      arguments: {};
      inlineType: [1];
      namedType: $$NamedTypes.$$Category;
    }

    export interface createdAt {
      kind: "OutputField";
      name: "createdAt";
      arguments: {};
      inlineType: [1];
      namedType: $$NamedTypes.$$String;
    }

    export interface updatedAt {
      kind: "OutputField";
      name: "updatedAt";
      arguments: {};
      inlineType: [1];
      namedType: $$NamedTypes.$$String;
    }
  }

  //                                              Project
  // --------------------------------------------------------------------------------------------------
  //

  export interface Project {
    kind: "Object";
    name: "Project";
    fields: {
      __typename: Project.__typename;
      id: Project.id;
      title: Project.title;
      description: Project.description;
      userId: Project.userId;
      user: Project.user;
      createdAt: Project.createdAt;
      updatedAt: Project.updatedAt;
    };
  }

  export namespace Project {
    export interface __typename {
      kind: "OutputField";
      name: "__typename";
      arguments: {};
      inlineType: [1];
      namedType: {
        kind: "__typename";
        value: "Project";
      };
    }

    export interface id {
      kind: "OutputField";
      name: "id";
      arguments: {};
      inlineType: [1];
      namedType: $$NamedTypes.$$ID;
    }

    export interface title {
      kind: "OutputField";
      name: "title";
      arguments: {};
      inlineType: [1];
      namedType: $$NamedTypes.$$String;
    }

    export interface description {
      kind: "OutputField";
      name: "description";
      arguments: {};
      inlineType: [0];
      namedType: $$NamedTypes.$$String;
    }

    export interface userId {
      kind: "OutputField";
      name: "userId";
      arguments: {};
      inlineType: [0];
      namedType: $$NamedTypes.$$ID;
    }

    export interface user {
      kind: "OutputField";
      name: "user";
      arguments: {};
      inlineType: [0];
      namedType: $$NamedTypes.$$User;
    }

    export interface createdAt {
      kind: "OutputField";
      name: "createdAt";
      arguments: {};
      inlineType: [1];
      namedType: $$NamedTypes.$$String;
    }

    export interface updatedAt {
      kind: "OutputField";
      name: "updatedAt";
      arguments: {};
      inlineType: [1];
      namedType: $$NamedTypes.$$String;
    }
  }

  //                                                Blog
  // --------------------------------------------------------------------------------------------------
  //

  export interface Blog {
    kind: "Object";
    name: "Blog";
    fields: {
      __typename: Blog.__typename;
      id: Blog.id;
      title: Blog.title;
      content: Blog.content;
      summary: Blog.summary;
      slug: Blog.slug;
      author: Blog.author;
      publishedAt: Blog.publishedAt;
      status: Blog.status;
      tags: Blog.tags;
      metaDescription: Blog.metaDescription;
      createdAt: Blog.createdAt;
      updatedAt: Blog.updatedAt;
    };
  }

  export namespace Blog {
    export interface __typename {
      kind: "OutputField";
      name: "__typename";
      arguments: {};
      inlineType: [1];
      namedType: {
        kind: "__typename";
        value: "Blog";
      };
    }

    export interface id {
      kind: "OutputField";
      name: "id";
      arguments: {};
      inlineType: [1];
      namedType: $$NamedTypes.$$ID;
    }

    export interface title {
      kind: "OutputField";
      name: "title";
      arguments: {};
      inlineType: [1];
      namedType: $$NamedTypes.$$String;
    }

    export interface content {
      kind: "OutputField";
      name: "content";
      arguments: {};
      inlineType: [1];
      namedType: $$NamedTypes.$$String;
    }

    export interface summary {
      kind: "OutputField";
      name: "summary";
      arguments: {};
      inlineType: [0];
      namedType: $$NamedTypes.$$String;
    }

    export interface slug {
      kind: "OutputField";
      name: "slug";
      arguments: {};
      inlineType: [1];
      namedType: $$NamedTypes.$$String;
    }

    export interface author {
      kind: "OutputField";
      name: "author";
      arguments: {};
      inlineType: [0];
      namedType: $$NamedTypes.$$String;
    }

    export interface publishedAt {
      kind: "OutputField";
      name: "publishedAt";
      arguments: {};
      inlineType: [0];
      namedType: $$NamedTypes.$$String;
    }

    export interface status {
      kind: "OutputField";
      name: "status";
      arguments: {};
      inlineType: [1];
      namedType: $$NamedTypes.$$BlogStatus;
    }

    export interface tags {
      kind: "OutputField";
      name: "tags";
      arguments: {};
      inlineType: [1, [1]];
      namedType: $$NamedTypes.$$String;
    }

    export interface metaDescription {
      kind: "OutputField";
      name: "metaDescription";
      arguments: {};
      inlineType: [0];
      namedType: $$NamedTypes.$$String;
    }

    export interface createdAt {
      kind: "OutputField";
      name: "createdAt";
      arguments: {};
      inlineType: [1];
      namedType: $$NamedTypes.$$String;
    }

    export interface updatedAt {
      kind: "OutputField";
      name: "updatedAt";
      arguments: {};
      inlineType: [1];
      namedType: $$NamedTypes.$$String;
    }
  }

  //                                           UserConnection
  // --------------------------------------------------------------------------------------------------
  //

  export interface UserConnection {
    kind: "Object";
    name: "UserConnection";
    fields: {
      __typename: UserConnection.__typename;
      data: UserConnection.data;
      pagination: UserConnection.pagination;
    };
  }

  export namespace UserConnection {
    export interface __typename {
      kind: "OutputField";
      name: "__typename";
      arguments: {};
      inlineType: [1];
      namedType: {
        kind: "__typename";
        value: "UserConnection";
      };
    }

    export interface data {
      kind: "OutputField";
      name: "data";
      arguments: {};
      inlineType: [1, [1]];
      namedType: $$NamedTypes.$$User;
    }

    export interface pagination {
      kind: "OutputField";
      name: "pagination";
      arguments: {};
      inlineType: [1];
      namedType: $$NamedTypes.$$PaginationInfo;
    }
  }

  //                                         CategoryConnection
  // --------------------------------------------------------------------------------------------------
  //

  export interface CategoryConnection {
    kind: "Object";
    name: "CategoryConnection";
    fields: {
      __typename: CategoryConnection.__typename;
      data: CategoryConnection.data;
      pagination: CategoryConnection.pagination;
    };
  }

  export namespace CategoryConnection {
    export interface __typename {
      kind: "OutputField";
      name: "__typename";
      arguments: {};
      inlineType: [1];
      namedType: {
        kind: "__typename";
        value: "CategoryConnection";
      };
    }

    export interface data {
      kind: "OutputField";
      name: "data";
      arguments: {};
      inlineType: [1, [1]];
      namedType: $$NamedTypes.$$Category;
    }

    export interface pagination {
      kind: "OutputField";
      name: "pagination";
      arguments: {};
      inlineType: [1];
      namedType: $$NamedTypes.$$PaginationInfo;
    }
  }

  //                                      ResumeContentConnection
  // --------------------------------------------------------------------------------------------------
  //

  export interface ResumeContentConnection {
    kind: "Object";
    name: "ResumeContentConnection";
    fields: {
      __typename: ResumeContentConnection.__typename;
      data: ResumeContentConnection.data;
      pagination: ResumeContentConnection.pagination;
    };
  }

  export namespace ResumeContentConnection {
    export interface __typename {
      kind: "OutputField";
      name: "__typename";
      arguments: {};
      inlineType: [1];
      namedType: {
        kind: "__typename";
        value: "ResumeContentConnection";
      };
    }

    export interface data {
      kind: "OutputField";
      name: "data";
      arguments: {};
      inlineType: [1, [1]];
      namedType: $$NamedTypes.$$ResumeContent;
    }

    export interface pagination {
      kind: "OutputField";
      name: "pagination";
      arguments: {};
      inlineType: [1];
      namedType: $$NamedTypes.$$PaginationInfo;
    }
  }

  //                                         ProjectConnection
  // --------------------------------------------------------------------------------------------------
  //

  export interface ProjectConnection {
    kind: "Object";
    name: "ProjectConnection";
    fields: {
      __typename: ProjectConnection.__typename;
      data: ProjectConnection.data;
      pagination: ProjectConnection.pagination;
    };
  }

  export namespace ProjectConnection {
    export interface __typename {
      kind: "OutputField";
      name: "__typename";
      arguments: {};
      inlineType: [1];
      namedType: {
        kind: "__typename";
        value: "ProjectConnection";
      };
    }

    export interface data {
      kind: "OutputField";
      name: "data";
      arguments: {};
      inlineType: [1, [1]];
      namedType: $$NamedTypes.$$Project;
    }

    export interface pagination {
      kind: "OutputField";
      name: "pagination";
      arguments: {};
      inlineType: [1];
      namedType: $$NamedTypes.$$PaginationInfo;
    }
  }

  //                                           BlogConnection
  // --------------------------------------------------------------------------------------------------
  //

  export interface BlogConnection {
    kind: "Object";
    name: "BlogConnection";
    fields: {
      __typename: BlogConnection.__typename;
      data: BlogConnection.data;
      pagination: BlogConnection.pagination;
    };
  }

  export namespace BlogConnection {
    export interface __typename {
      kind: "OutputField";
      name: "__typename";
      arguments: {};
      inlineType: [1];
      namedType: {
        kind: "__typename";
        value: "BlogConnection";
      };
    }

    export interface data {
      kind: "OutputField";
      name: "data";
      arguments: {};
      inlineType: [1, [1]];
      namedType: $$NamedTypes.$$Blog;
    }

    export interface pagination {
      kind: "OutputField";
      name: "pagination";
      arguments: {};
      inlineType: [1];
      namedType: $$NamedTypes.$$PaginationInfo;
    }
  }

  //
  //
  //
  //
  //
  //
  // ==================================================================================================
  //                                            InputObject
  // ==================================================================================================
  //
  //
  //
  //
  //
  //

  //                                          CreateUserInput
  // --------------------------------------------------------------------------------------------------
  //

  export interface CreateUserInput {
    kind: "InputObject";
    name: "CreateUserInput";
    isAllFieldsNullable: true;
    fields: {
      name: CreateUserInput.name;
      email: CreateUserInput.email;
      role: CreateUserInput.role;
    };
  }

  export namespace CreateUserInput {
    export interface name {
      kind: "InputField";
      name: "name";
      inlineType: [1];
      namedType: $$NamedTypes.$$String;
    }

    export interface email {
      kind: "InputField";
      name: "email";
      inlineType: [1];
      namedType: $$NamedTypes.$$String;
    }

    export interface role {
      kind: "InputField";
      name: "role";
      inlineType: [0];
      namedType: $$NamedTypes.$$UserRole;
    }
  }

  //                                          UpdateUserInput
  // --------------------------------------------------------------------------------------------------
  //

  export interface UpdateUserInput {
    kind: "InputObject";
    name: "UpdateUserInput";
    isAllFieldsNullable: true;
    fields: {
      name: UpdateUserInput.name;
      email: UpdateUserInput.email;
      role: UpdateUserInput.role;
      isActive: UpdateUserInput.isActive;
    };
  }

  export namespace UpdateUserInput {
    export interface name {
      kind: "InputField";
      name: "name";
      inlineType: [0];
      namedType: $$NamedTypes.$$String;
    }

    export interface email {
      kind: "InputField";
      name: "email";
      inlineType: [0];
      namedType: $$NamedTypes.$$String;
    }

    export interface role {
      kind: "InputField";
      name: "role";
      inlineType: [0];
      namedType: $$NamedTypes.$$UserRole;
    }

    export interface isActive {
      kind: "InputField";
      name: "isActive";
      inlineType: [0];
      namedType: $$NamedTypes.$$Boolean;
    }
  }

  //                                        CreateCategoryInput
  // --------------------------------------------------------------------------------------------------
  //

  export interface CreateCategoryInput {
    kind: "InputObject";
    name: "CreateCategoryInput";
    isAllFieldsNullable: true;
    fields: {
      name: CreateCategoryInput.name;
      description: CreateCategoryInput.description;
    };
  }

  export namespace CreateCategoryInput {
    export interface name {
      kind: "InputField";
      name: "name";
      inlineType: [1];
      namedType: $$NamedTypes.$$String;
    }

    export interface description {
      kind: "InputField";
      name: "description";
      inlineType: [0];
      namedType: $$NamedTypes.$$String;
    }
  }

  //                                        UpdateCategoryInput
  // --------------------------------------------------------------------------------------------------
  //

  export interface UpdateCategoryInput {
    kind: "InputObject";
    name: "UpdateCategoryInput";
    isAllFieldsNullable: true;
    fields: {
      name: UpdateCategoryInput.name;
      description: UpdateCategoryInput.description;
    };
  }

  export namespace UpdateCategoryInput {
    export interface name {
      kind: "InputField";
      name: "name";
      inlineType: [0];
      namedType: $$NamedTypes.$$String;
    }

    export interface description {
      kind: "InputField";
      name: "description";
      inlineType: [0];
      namedType: $$NamedTypes.$$String;
    }
  }

  //                                      CreateResumeContentInput
  // --------------------------------------------------------------------------------------------------
  //

  export interface CreateResumeContentInput {
    kind: "InputObject";
    name: "CreateResumeContentInput";
    isAllFieldsNullable: true;
    fields: {
      title: CreateResumeContentInput.title;
      description: CreateResumeContentInput.description;
      detail: CreateResumeContentInput.detail;
      categoryId: CreateResumeContentInput.categoryId;
    };
  }

  export namespace CreateResumeContentInput {
    export interface title {
      kind: "InputField";
      name: "title";
      inlineType: [1];
      namedType: $$NamedTypes.$$String;
    }

    export interface description {
      kind: "InputField";
      name: "description";
      inlineType: [0];
      namedType: $$NamedTypes.$$String;
    }

    export interface detail {
      kind: "InputField";
      name: "detail";
      inlineType: [0];
      namedType: $$NamedTypes.$$String;
    }

    export interface categoryId {
      kind: "InputField";
      name: "categoryId";
      inlineType: [1];
      namedType: $$NamedTypes.$$ID;
    }
  }

  //                                      UpdateResumeContentInput
  // --------------------------------------------------------------------------------------------------
  //

  export interface UpdateResumeContentInput {
    kind: "InputObject";
    name: "UpdateResumeContentInput";
    isAllFieldsNullable: true;
    fields: {
      title: UpdateResumeContentInput.title;
      description: UpdateResumeContentInput.description;
      detail: UpdateResumeContentInput.detail;
      categoryId: UpdateResumeContentInput.categoryId;
    };
  }

  export namespace UpdateResumeContentInput {
    export interface title {
      kind: "InputField";
      name: "title";
      inlineType: [0];
      namedType: $$NamedTypes.$$String;
    }

    export interface description {
      kind: "InputField";
      name: "description";
      inlineType: [0];
      namedType: $$NamedTypes.$$String;
    }

    export interface detail {
      kind: "InputField";
      name: "detail";
      inlineType: [0];
      namedType: $$NamedTypes.$$String;
    }

    export interface categoryId {
      kind: "InputField";
      name: "categoryId";
      inlineType: [0];
      namedType: $$NamedTypes.$$ID;
    }
  }

  //                                         CreateProjectInput
  // --------------------------------------------------------------------------------------------------
  //

  export interface CreateProjectInput {
    kind: "InputObject";
    name: "CreateProjectInput";
    isAllFieldsNullable: true;
    fields: {
      title: CreateProjectInput.title;
      description: CreateProjectInput.description;
      userId: CreateProjectInput.userId;
    };
  }

  export namespace CreateProjectInput {
    export interface title {
      kind: "InputField";
      name: "title";
      inlineType: [1];
      namedType: $$NamedTypes.$$String;
    }

    export interface description {
      kind: "InputField";
      name: "description";
      inlineType: [0];
      namedType: $$NamedTypes.$$String;
    }

    export interface userId {
      kind: "InputField";
      name: "userId";
      inlineType: [0];
      namedType: $$NamedTypes.$$ID;
    }
  }

  //                                         UpdateProjectInput
  // --------------------------------------------------------------------------------------------------
  //

  export interface UpdateProjectInput {
    kind: "InputObject";
    name: "UpdateProjectInput";
    isAllFieldsNullable: true;
    fields: {
      title: UpdateProjectInput.title;
      description: UpdateProjectInput.description;
      userId: UpdateProjectInput.userId;
    };
  }

  export namespace UpdateProjectInput {
    export interface title {
      kind: "InputField";
      name: "title";
      inlineType: [0];
      namedType: $$NamedTypes.$$String;
    }

    export interface description {
      kind: "InputField";
      name: "description";
      inlineType: [0];
      namedType: $$NamedTypes.$$String;
    }

    export interface userId {
      kind: "InputField";
      name: "userId";
      inlineType: [0];
      namedType: $$NamedTypes.$$ID;
    }
  }

  //                                          CreateBlogInput
  // --------------------------------------------------------------------------------------------------
  //

  export interface CreateBlogInput {
    kind: "InputObject";
    name: "CreateBlogInput";
    isAllFieldsNullable: true;
    fields: {
      title: CreateBlogInput.title;
      content: CreateBlogInput.content;
      summary: CreateBlogInput.summary;
      slug: CreateBlogInput.slug;
      author: CreateBlogInput.author;
      status: CreateBlogInput.status;
      tags: CreateBlogInput.tags;
      metaDescription: CreateBlogInput.metaDescription;
    };
  }

  export namespace CreateBlogInput {
    export interface title {
      kind: "InputField";
      name: "title";
      inlineType: [1];
      namedType: $$NamedTypes.$$String;
    }

    export interface content {
      kind: "InputField";
      name: "content";
      inlineType: [1];
      namedType: $$NamedTypes.$$String;
    }

    export interface summary {
      kind: "InputField";
      name: "summary";
      inlineType: [0];
      namedType: $$NamedTypes.$$String;
    }

    export interface slug {
      kind: "InputField";
      name: "slug";
      inlineType: [1];
      namedType: $$NamedTypes.$$String;
    }

    export interface author {
      kind: "InputField";
      name: "author";
      inlineType: [0];
      namedType: $$NamedTypes.$$String;
    }

    export interface status {
      kind: "InputField";
      name: "status";
      inlineType: [0];
      namedType: $$NamedTypes.$$BlogStatus;
    }

    export interface tags {
      kind: "InputField";
      name: "tags";
      inlineType: [0, [1]];
      namedType: $$NamedTypes.$$String;
    }

    export interface metaDescription {
      kind: "InputField";
      name: "metaDescription";
      inlineType: [0];
      namedType: $$NamedTypes.$$String;
    }
  }

  //                                          UpdateBlogInput
  // --------------------------------------------------------------------------------------------------
  //

  export interface UpdateBlogInput {
    kind: "InputObject";
    name: "UpdateBlogInput";
    isAllFieldsNullable: true;
    fields: {
      title: UpdateBlogInput.title;
      content: UpdateBlogInput.content;
      summary: UpdateBlogInput.summary;
      slug: UpdateBlogInput.slug;
      author: UpdateBlogInput.author;
      status: UpdateBlogInput.status;
      tags: UpdateBlogInput.tags;
      metaDescription: UpdateBlogInput.metaDescription;
    };
  }

  export namespace UpdateBlogInput {
    export interface title {
      kind: "InputField";
      name: "title";
      inlineType: [0];
      namedType: $$NamedTypes.$$String;
    }

    export interface content {
      kind: "InputField";
      name: "content";
      inlineType: [0];
      namedType: $$NamedTypes.$$String;
    }

    export interface summary {
      kind: "InputField";
      name: "summary";
      inlineType: [0];
      namedType: $$NamedTypes.$$String;
    }

    export interface slug {
      kind: "InputField";
      name: "slug";
      inlineType: [0];
      namedType: $$NamedTypes.$$String;
    }

    export interface author {
      kind: "InputField";
      name: "author";
      inlineType: [0];
      namedType: $$NamedTypes.$$String;
    }

    export interface status {
      kind: "InputField";
      name: "status";
      inlineType: [0];
      namedType: $$NamedTypes.$$BlogStatus;
    }

    export interface tags {
      kind: "InputField";
      name: "tags";
      inlineType: [0, [1]];
      namedType: $$NamedTypes.$$String;
    }

    export interface metaDescription {
      kind: "InputField";
      name: "metaDescription";
      inlineType: [0];
      namedType: $$NamedTypes.$$String;
    }
  }

  //                                             LoginInput
  // --------------------------------------------------------------------------------------------------
  //

  export interface LoginInput {
    kind: "InputObject";
    name: "LoginInput";
    isAllFieldsNullable: false;
    fields: {
      email: LoginInput.email;
      password: LoginInput.password;
    };
  }

  export namespace LoginInput {
    export interface email {
      kind: "InputField";
      name: "email";
      inlineType: [1];
      namedType: $$NamedTypes.$$String;
    }

    export interface password {
      kind: "InputField";
      name: "password";
      inlineType: [1];
      namedType: $$NamedTypes.$$String;
    }
  }

  //                                           RegisterInput
  // --------------------------------------------------------------------------------------------------
  //

  export interface RegisterInput {
    kind: "InputObject";
    name: "RegisterInput";
    isAllFieldsNullable: true;
    fields: {
      name: RegisterInput.name;
      email: RegisterInput.email;
      password: RegisterInput.password;
      role: RegisterInput.role;
    };
  }

  export namespace RegisterInput {
    export interface name {
      kind: "InputField";
      name: "name";
      inlineType: [1];
      namedType: $$NamedTypes.$$String;
    }

    export interface email {
      kind: "InputField";
      name: "email";
      inlineType: [1];
      namedType: $$NamedTypes.$$String;
    }

    export interface password {
      kind: "InputField";
      name: "password";
      inlineType: [1];
      namedType: $$NamedTypes.$$String;
    }

    export interface role {
      kind: "InputField";
      name: "role";
      inlineType: [0];
      namedType: $$NamedTypes.$$UserRole;
    }
  }

  //                                        ChangePasswordInput
  // --------------------------------------------------------------------------------------------------
  //

  export interface ChangePasswordInput {
    kind: "InputObject";
    name: "ChangePasswordInput";
    isAllFieldsNullable: false;
    fields: {
      oldPassword: ChangePasswordInput.oldPassword;
      newPassword: ChangePasswordInput.newPassword;
    };
  }

  export namespace ChangePasswordInput {
    export interface oldPassword {
      kind: "InputField";
      name: "oldPassword";
      inlineType: [1];
      namedType: $$NamedTypes.$$String;
    }

    export interface newPassword {
      kind: "InputField";
      name: "newPassword";
      inlineType: [1];
      namedType: $$NamedTypes.$$String;
    }
  }

  //
  //
  //
  //
  //
  //
  // ==================================================================================================
  //                                             Interface
  // ==================================================================================================
  //
  //
  //
  //
  //
  //

  //
  //
  //
  //
  //
  //
  // ==================================================================================================
  //                                               Union
  // ==================================================================================================
  //
  //
  //
  //
  //
  //

  //
  //
  //
  //
  //
  //
  // ==================================================================================================
  //                                                Enum
  // ==================================================================================================
  //
  //
  //
  //
  //
  //

  //                                              UserRole
  // --------------------------------------------------------------------------------------------------
  //

  export interface UserRole {
    kind: "Enum";
    name: "UserRole";
    members: ["ADMIN", "EDITOR", "VIEWER", "GUEST"];
    membersUnion: "ADMIN" | "EDITOR" | "VIEWER" | "GUEST";
  }

  //                                             BlogStatus
  // --------------------------------------------------------------------------------------------------
  //

  export interface BlogStatus {
    kind: "Enum";
    name: "BlogStatus";
    members: ["DRAFT", "PUBLISHED"];
    membersUnion: "DRAFT" | "PUBLISHED";
  }

  //                                           SortDirection
  // --------------------------------------------------------------------------------------------------
  //

  export interface SortDirection {
    kind: "Enum";
    name: "SortDirection";
    members: ["ASC", "DESC"];
    membersUnion: "ASC" | "DESC";
  }

  //
  //
  //
  //
  //
  //
  // ==================================================================================================
  //                                            ScalarCustom
  // ==================================================================================================
  //
  //
  //
  //
  //
  //

  //
  //
  //
  //
  //
  //
  // ==================================================================================================
  //                                           ScalarStandard
  // ==================================================================================================
  //
  //
  //
  //
  //
  //

  //                                                Int
  // --------------------------------------------------------------------------------------------------
  //

  export type Int = $.StandardTypes.Int;

  //                                               String
  // --------------------------------------------------------------------------------------------------
  //

  export type String = $.StandardTypes.String;

  //                                                 ID
  // --------------------------------------------------------------------------------------------------
  //

  export type ID = $.StandardTypes.ID;

  //                                              Boolean
  // --------------------------------------------------------------------------------------------------
  //

  export type Boolean = $.StandardTypes.Boolean;

  //
  //
  //
  //
  //
  //
  // ==================================================================================================
  //                                         Named Types Index
  // ==================================================================================================
  //
  //
  //
  //
  //
  //

  /**
   * [1] These definitions serve to allow field selection interfaces to extend their respective object type without
   *     name clashing between the field name and the object name.
   *
   *     For example imagine `Query.Foo` field with type also called `Foo`. Our generated interfaces for each field
   *     would end up with an error of `export interface Foo extends Foo ...`
   */

  namespace $$NamedTypes {
    export type $$Query = Query;
    export type $$Mutation = Mutation;
    export type $$PaginationInfo = PaginationInfo;
    export type $$LoginResponse = LoginResponse;
    export type $$TokenPair = TokenPair;
    export type $$User = User;
    export type $$Category = Category;
    export type $$ResumeContent = ResumeContent;
    export type $$Project = Project;
    export type $$Blog = Blog;
    export type $$UserConnection = UserConnection;
    export type $$CategoryConnection = CategoryConnection;
    export type $$ResumeContentConnection = ResumeContentConnection;
    export type $$ProjectConnection = ProjectConnection;
    export type $$BlogConnection = BlogConnection;
    export type $$CreateUserInput = CreateUserInput;
    export type $$UpdateUserInput = UpdateUserInput;
    export type $$CreateCategoryInput = CreateCategoryInput;
    export type $$UpdateCategoryInput = UpdateCategoryInput;
    export type $$CreateResumeContentInput = CreateResumeContentInput;
    export type $$UpdateResumeContentInput = UpdateResumeContentInput;
    export type $$CreateProjectInput = CreateProjectInput;
    export type $$UpdateProjectInput = UpdateProjectInput;
    export type $$CreateBlogInput = CreateBlogInput;
    export type $$UpdateBlogInput = UpdateBlogInput;
    export type $$LoginInput = LoginInput;
    export type $$RegisterInput = RegisterInput;
    export type $$ChangePasswordInput = ChangePasswordInput;
    export type $$UserRole = UserRole;
    export type $$BlogStatus = BlogStatus;
    export type $$SortDirection = SortDirection;
    export type $$Int = Int;
    export type $$String = String;
    export type $$ID = ID;
    export type $$Boolean = Boolean;
  }
}

//
//
//
//
//
//
// ==================================================================================================
//                                               Schema
// ==================================================================================================
//
//
//
//
//
//

export interface Schema<
  $Scalars extends $$Utilities.Schema.Scalar.Registry = $$Scalar.$Registry,
> {
  name: $$Data.Name;
  operationsAvailable: ["query", "mutation"];
  RootUnion: Schema.Query | Schema.Mutation;
  Root: {
    query: Schema.Query;
    mutation: Schema.Mutation;
    subscription: null;
  };
  allTypes: {
    Query: Schema.Query;
    Mutation: Schema.Mutation;
    UserRole: Schema.UserRole;
    BlogStatus: Schema.BlogStatus;
    SortDirection: Schema.SortDirection;
    PaginationInfo: Schema.PaginationInfo;
    LoginResponse: Schema.LoginResponse;
    TokenPair: Schema.TokenPair;
    User: Schema.User;
    Category: Schema.Category;
    ResumeContent: Schema.ResumeContent;
    Project: Schema.Project;
    Blog: Schema.Blog;
    UserConnection: Schema.UserConnection;
    CategoryConnection: Schema.CategoryConnection;
    ResumeContentConnection: Schema.ResumeContentConnection;
    ProjectConnection: Schema.ProjectConnection;
    BlogConnection: Schema.BlogConnection;
  };
  objects: {
    PaginationInfo: Schema.PaginationInfo;
    LoginResponse: Schema.LoginResponse;
    TokenPair: Schema.TokenPair;
    User: Schema.User;
    Category: Schema.Category;
    ResumeContent: Schema.ResumeContent;
    Project: Schema.Project;
    Blog: Schema.Blog;
    UserConnection: Schema.UserConnection;
    CategoryConnection: Schema.CategoryConnection;
    ResumeContentConnection: Schema.ResumeContentConnection;
    ProjectConnection: Schema.ProjectConnection;
    BlogConnection: Schema.BlogConnection;
  };
  unions: {};
  interfaces: {};
  scalarNamesUnion: "Int" | "String" | "ID" | "Boolean";
  scalars: {
    Int: Schema.Int;
    String: Schema.String;
    ID: Schema.ID;
    Boolean: Schema.Boolean;
  };
  scalarRegistry: $Scalars;
  extensions: $$Utilities.GlobalRegistry.TypeExtensions;
}
