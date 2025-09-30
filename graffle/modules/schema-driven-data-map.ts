import * as $$Scalar from "./scalar.js";
import type * as $$Utilities from "graffle/utilities-for-generated";
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

const Int = $$Scalar.Int;

const String = $$Scalar.String;

const ID = $$Scalar.ID;

const Boolean = $$Scalar.Boolean;

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

// None of your ScalarCustoms have custom scalars.

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

const UserRole: $$Utilities.SchemaDrivenDataMap.Enum = {
  k: "enum",
  n: "UserRole",
};

const BlogStatus: $$Utilities.SchemaDrivenDataMap.Enum = {
  k: "enum",
  n: "BlogStatus",
};

const SortDirection: $$Utilities.SchemaDrivenDataMap.Enum = {
  k: "enum",
  n: "SortDirection",
};

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

const CreateUserInput: $$Utilities.SchemaDrivenDataMap.InputObject = {
  n: "CreateUserInput",
  f: {
    name: {},
    email: {},
    role: {},
  },
};

const UpdateUserInput: $$Utilities.SchemaDrivenDataMap.InputObject = {
  n: "UpdateUserInput",
  f: {
    name: {},
    email: {},
    role: {},
    isActive: {},
  },
};

const CreateCategoryInput: $$Utilities.SchemaDrivenDataMap.InputObject = {
  n: "CreateCategoryInput",
  f: {
    name: {},
    description: {},
  },
};

const UpdateCategoryInput: $$Utilities.SchemaDrivenDataMap.InputObject = {
  n: "UpdateCategoryInput",
  f: {
    name: {},
    description: {},
  },
};

const CreateResumeContentInput: $$Utilities.SchemaDrivenDataMap.InputObject = {
  n: "CreateResumeContentInput",
  f: {
    title: {},
    description: {},
    detail: {},
    categoryId: {},
  },
};

const UpdateResumeContentInput: $$Utilities.SchemaDrivenDataMap.InputObject = {
  n: "UpdateResumeContentInput",
  f: {
    title: {},
    description: {},
    detail: {},
    categoryId: {},
  },
};

const CreateProjectInput: $$Utilities.SchemaDrivenDataMap.InputObject = {
  n: "CreateProjectInput",
  f: {
    title: {},
    description: {},
    userId: {},
  },
};

const UpdateProjectInput: $$Utilities.SchemaDrivenDataMap.InputObject = {
  n: "UpdateProjectInput",
  f: {
    title: {},
    description: {},
    userId: {},
  },
};

const CreateBlogInput: $$Utilities.SchemaDrivenDataMap.InputObject = {
  n: "CreateBlogInput",
  f: {
    title: {},
    content: {},
    summary: {},
    slug: {},
    author: {},
    status: {},
    tags: {},
    metaDescription: {},
  },
};

const UpdateBlogInput: $$Utilities.SchemaDrivenDataMap.InputObject = {
  n: "UpdateBlogInput",
  f: {
    title: {},
    content: {},
    summary: {},
    slug: {},
    author: {},
    status: {},
    tags: {},
    metaDescription: {},
  },
};

const LoginInput: $$Utilities.SchemaDrivenDataMap.InputObject = {
  n: "LoginInput",
  f: {
    email: {},
    password: {},
  },
};

const RegisterInput: $$Utilities.SchemaDrivenDataMap.InputObject = {
  n: "RegisterInput",
  f: {
    name: {},
    email: {},
    password: {},
    role: {},
  },
};

const ChangePasswordInput: $$Utilities.SchemaDrivenDataMap.InputObject = {
  n: "ChangePasswordInput",
  f: {
    oldPassword: {},
    newPassword: {},
  },
};

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

const PaginationInfo: $$Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {
    page: {},
    pageSize: {},
    total: {},
    totalPages: {},
  },
};

const LoginResponse: $$Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {
    user: {
      // nt: User, <-- Assigned later to avoid potential circular dependency.
    },
    tokens: {
      // nt: TokenPair, <-- Assigned later to avoid potential circular dependency.
    },
  },
};

const TokenPair: $$Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {
    accessToken: {},
    refreshToken: {},
    expiresIn: {},
    tokenType: {},
  },
};

const User: $$Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {
    id: {},
    name: {},
    email: {},
    role: {},
    isActive: {},
    lastLogin: {},
    createdAt: {},
    updatedAt: {},
    projects: {
      // nt: Project, <-- Assigned later to avoid potential circular dependency.
    },
  },
};

const Category: $$Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {
    id: {},
    name: {},
    description: {},
    createdAt: {},
    updatedAt: {},
    resumeContents: {
      // nt: ResumeContent, <-- Assigned later to avoid potential circular dependency.
    },
  },
};

const ResumeContent: $$Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {
    id: {},
    title: {},
    description: {},
    detail: {},
    categoryId: {},
    category: {
      // nt: Category, <-- Assigned later to avoid potential circular dependency.
    },
    createdAt: {},
    updatedAt: {},
  },
};

const Project: $$Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {
    id: {},
    title: {},
    description: {},
    userId: {},
    user: {
      // nt: User, <-- Assigned later to avoid potential circular dependency.
    },
    createdAt: {},
    updatedAt: {},
  },
};

const Blog: $$Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {
    id: {},
    title: {},
    content: {},
    summary: {},
    slug: {},
    author: {},
    publishedAt: {},
    status: {},
    tags: {},
    metaDescription: {},
    createdAt: {},
    updatedAt: {},
  },
};

const UserConnection: $$Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {
    data: {
      // nt: User, <-- Assigned later to avoid potential circular dependency.
    },
    pagination: {
      // nt: PaginationInfo, <-- Assigned later to avoid potential circular dependency.
    },
  },
};

const CategoryConnection: $$Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {
    data: {
      // nt: Category, <-- Assigned later to avoid potential circular dependency.
    },
    pagination: {
      // nt: PaginationInfo, <-- Assigned later to avoid potential circular dependency.
    },
  },
};

const ResumeContentConnection: $$Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {
    data: {
      // nt: ResumeContent, <-- Assigned later to avoid potential circular dependency.
    },
    pagination: {
      // nt: PaginationInfo, <-- Assigned later to avoid potential circular dependency.
    },
  },
};

const ProjectConnection: $$Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {
    data: {
      // nt: Project, <-- Assigned later to avoid potential circular dependency.
    },
    pagination: {
      // nt: PaginationInfo, <-- Assigned later to avoid potential circular dependency.
    },
  },
};

const BlogConnection: $$Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {
    data: {
      // nt: Blog, <-- Assigned later to avoid potential circular dependency.
    },
    pagination: {
      // nt: PaginationInfo, <-- Assigned later to avoid potential circular dependency.
    },
  },
};

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

// None of your Interfaces have custom scalars.

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

// None of your Unions have custom scalars.

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

const Query: $$Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {
    me: {
      // nt: User, <-- Assigned later to avoid potential circular dependency.
    },
    users: {
      a: {
        page: {
          nt: Int,
          it: [0],
        },
        pageSize: {
          nt: Int,
          it: [0],
        },
        sortBy: {
          nt: String,
          it: [0],
        },
        sortDirection: {
          nt: SortDirection,
          it: [0],
        },
      },
      // nt: UserConnection, <-- Assigned later to avoid potential circular dependency.
    },
    user: {
      a: {
        id: {
          nt: ID,
          it: [1],
        },
      },
      // nt: User, <-- Assigned later to avoid potential circular dependency.
    },
    categories: {
      a: {
        page: {
          nt: Int,
          it: [0],
        },
        pageSize: {
          nt: Int,
          it: [0],
        },
        sortBy: {
          nt: String,
          it: [0],
        },
        sortDirection: {
          nt: SortDirection,
          it: [0],
        },
      },
      // nt: CategoryConnection, <-- Assigned later to avoid potential circular dependency.
    },
    category: {
      a: {
        id: {
          nt: ID,
          it: [1],
        },
      },
      // nt: Category, <-- Assigned later to avoid potential circular dependency.
    },
    resumeContents: {
      a: {
        page: {
          nt: Int,
          it: [0],
        },
        pageSize: {
          nt: Int,
          it: [0],
        },
        sortBy: {
          nt: String,
          it: [0],
        },
        sortDirection: {
          nt: SortDirection,
          it: [0],
        },
      },
      // nt: ResumeContentConnection, <-- Assigned later to avoid potential circular dependency.
    },
    resumeContent: {
      a: {
        id: {
          nt: ID,
          it: [1],
        },
      },
      // nt: ResumeContent, <-- Assigned later to avoid potential circular dependency.
    },
    resumeContentsByCategory: {
      a: {
        categoryId: {
          nt: ID,
          it: [1],
        },
        page: {
          nt: Int,
          it: [0],
        },
        pageSize: {
          nt: Int,
          it: [0],
        },
        sortBy: {
          nt: String,
          it: [0],
        },
        sortDirection: {
          nt: SortDirection,
          it: [0],
        },
      },
      // nt: ResumeContentConnection, <-- Assigned later to avoid potential circular dependency.
    },
    projects: {
      a: {
        page: {
          nt: Int,
          it: [0],
        },
        pageSize: {
          nt: Int,
          it: [0],
        },
        sortBy: {
          nt: String,
          it: [0],
        },
        sortDirection: {
          nt: SortDirection,
          it: [0],
        },
      },
      // nt: ProjectConnection, <-- Assigned later to avoid potential circular dependency.
    },
    project: {
      a: {
        id: {
          nt: ID,
          it: [1],
        },
      },
      // nt: Project, <-- Assigned later to avoid potential circular dependency.
    },
    projectsByUser: {
      a: {
        userId: {
          nt: ID,
          it: [1],
        },
        page: {
          nt: Int,
          it: [0],
        },
        pageSize: {
          nt: Int,
          it: [0],
        },
        sortBy: {
          nt: String,
          it: [0],
        },
        sortDirection: {
          nt: SortDirection,
          it: [0],
        },
      },
      // nt: ProjectConnection, <-- Assigned later to avoid potential circular dependency.
    },
    blogs: {
      a: {
        page: {
          nt: Int,
          it: [0],
        },
        pageSize: {
          nt: Int,
          it: [0],
        },
        sortBy: {
          nt: String,
          it: [0],
        },
        sortDirection: {
          nt: SortDirection,
          it: [0],
        },
      },
      // nt: BlogConnection, <-- Assigned later to avoid potential circular dependency.
    },
    blog: {
      a: {
        id: {
          nt: ID,
          it: [1],
        },
      },
      // nt: Blog, <-- Assigned later to avoid potential circular dependency.
    },
    blogBySlug: {
      a: {
        slug: {
          nt: String,
          it: [1],
        },
      },
      // nt: Blog, <-- Assigned later to avoid potential circular dependency.
    },
    publishedBlogs: {
      a: {
        page: {
          nt: Int,
          it: [0],
        },
        pageSize: {
          nt: Int,
          it: [0],
        },
        sortBy: {
          nt: String,
          it: [0],
        },
        sortDirection: {
          nt: SortDirection,
          it: [0],
        },
      },
      // nt: BlogConnection, <-- Assigned later to avoid potential circular dependency.
    },
    blogsByStatus: {
      a: {
        status: {
          nt: BlogStatus,
          it: [1],
        },
        page: {
          nt: Int,
          it: [0],
        },
        pageSize: {
          nt: Int,
          it: [0],
        },
        sortBy: {
          nt: String,
          it: [0],
        },
        sortDirection: {
          nt: SortDirection,
          it: [0],
        },
      },
      // nt: BlogConnection, <-- Assigned later to avoid potential circular dependency.
    },
  },
};

const Mutation: $$Utilities.SchemaDrivenDataMap.OutputObject = {
  f: {
    login: {
      a: {
        input: {
          nt: LoginInput,
          it: [1],
        },
      },
      // nt: LoginResponse, <-- Assigned later to avoid potential circular dependency.
    },
    register: {
      a: {
        input: {
          nt: RegisterInput,
          it: [1],
        },
      },
      // nt: LoginResponse, <-- Assigned later to avoid potential circular dependency.
    },
    refreshToken: {
      a: {
        refreshToken: {
          nt: String,
          it: [1],
        },
      },
      // nt: TokenPair, <-- Assigned later to avoid potential circular dependency.
    },
    changePassword: {
      a: {
        input: {
          nt: ChangePasswordInput,
          it: [1],
        },
      },
    },
    updateUserRole: {
      a: {
        userId: {
          nt: ID,
          it: [1],
        },
        role: {
          nt: UserRole,
          it: [1],
        },
      },
      // nt: User, <-- Assigned later to avoid potential circular dependency.
    },
    deactivateUser: {
      a: {
        userId: {
          nt: ID,
          it: [1],
        },
      },
    },
    createUser: {
      a: {
        input: {
          nt: CreateUserInput,
          it: [1],
        },
      },
      // nt: User, <-- Assigned later to avoid potential circular dependency.
    },
    updateUser: {
      a: {
        id: {
          nt: ID,
          it: [1],
        },
        input: {
          nt: UpdateUserInput,
          it: [1],
        },
      },
      // nt: User, <-- Assigned later to avoid potential circular dependency.
    },
    deleteUser: {
      a: {
        id: {
          nt: ID,
          it: [1],
        },
      },
    },
    createCategory: {
      a: {
        input: {
          nt: CreateCategoryInput,
          it: [1],
        },
      },
      // nt: Category, <-- Assigned later to avoid potential circular dependency.
    },
    updateCategory: {
      a: {
        id: {
          nt: ID,
          it: [1],
        },
        input: {
          nt: UpdateCategoryInput,
          it: [1],
        },
      },
      // nt: Category, <-- Assigned later to avoid potential circular dependency.
    },
    deleteCategory: {
      a: {
        id: {
          nt: ID,
          it: [1],
        },
      },
    },
    createResumeContent: {
      a: {
        input: {
          nt: CreateResumeContentInput,
          it: [1],
        },
      },
      // nt: ResumeContent, <-- Assigned later to avoid potential circular dependency.
    },
    updateResumeContent: {
      a: {
        id: {
          nt: ID,
          it: [1],
        },
        input: {
          nt: UpdateResumeContentInput,
          it: [1],
        },
      },
      // nt: ResumeContent, <-- Assigned later to avoid potential circular dependency.
    },
    deleteResumeContent: {
      a: {
        id: {
          nt: ID,
          it: [1],
        },
      },
    },
    createProject: {
      a: {
        input: {
          nt: CreateProjectInput,
          it: [1],
        },
      },
      // nt: Project, <-- Assigned later to avoid potential circular dependency.
    },
    updateProject: {
      a: {
        id: {
          nt: ID,
          it: [1],
        },
        input: {
          nt: UpdateProjectInput,
          it: [1],
        },
      },
      // nt: Project, <-- Assigned later to avoid potential circular dependency.
    },
    deleteProject: {
      a: {
        id: {
          nt: ID,
          it: [1],
        },
      },
    },
    createBlog: {
      a: {
        input: {
          nt: CreateBlogInput,
          it: [1],
        },
      },
      // nt: Blog, <-- Assigned later to avoid potential circular dependency.
    },
    updateBlog: {
      a: {
        id: {
          nt: ID,
          it: [1],
        },
        input: {
          nt: UpdateBlogInput,
          it: [1],
        },
      },
      // nt: Blog, <-- Assigned later to avoid potential circular dependency.
    },
    deleteBlog: {
      a: {
        id: {
          nt: ID,
          it: [1],
        },
      },
    },
  },
};

//
//
//
//
//
//
// ==================================================================================================
//                                       Reference Assignments
//                                (avoids circular assignment issues)
// ==================================================================================================
//
//
//
//
//
//

LoginResponse.f[`user`]!.nt = User;
LoginResponse.f[`tokens`]!.nt = TokenPair;
User.f[`projects`]!.nt = Project;
Category.f[`resumeContents`]!.nt = ResumeContent;
ResumeContent.f[`category`]!.nt = Category;
Project.f[`user`]!.nt = User;
UserConnection.f[`data`]!.nt = User;
UserConnection.f[`pagination`]!.nt = PaginationInfo;
CategoryConnection.f[`data`]!.nt = Category;
CategoryConnection.f[`pagination`]!.nt = PaginationInfo;
ResumeContentConnection.f[`data`]!.nt = ResumeContent;
ResumeContentConnection.f[`pagination`]!.nt = PaginationInfo;
ProjectConnection.f[`data`]!.nt = Project;
ProjectConnection.f[`pagination`]!.nt = PaginationInfo;
BlogConnection.f[`data`]!.nt = Blog;
BlogConnection.f[`pagination`]!.nt = PaginationInfo;
Query.f[`me`]!.nt = User;
Query.f[`users`]!.nt = UserConnection;
Query.f[`user`]!.nt = User;
Query.f[`categories`]!.nt = CategoryConnection;
Query.f[`category`]!.nt = Category;
Query.f[`resumeContents`]!.nt = ResumeContentConnection;
Query.f[`resumeContent`]!.nt = ResumeContent;
Query.f[`resumeContentsByCategory`]!.nt = ResumeContentConnection;
Query.f[`projects`]!.nt = ProjectConnection;
Query.f[`project`]!.nt = Project;
Query.f[`projectsByUser`]!.nt = ProjectConnection;
Query.f[`blogs`]!.nt = BlogConnection;
Query.f[`blog`]!.nt = Blog;
Query.f[`blogBySlug`]!.nt = Blog;
Query.f[`publishedBlogs`]!.nt = BlogConnection;
Query.f[`blogsByStatus`]!.nt = BlogConnection;
Mutation.f[`login`]!.nt = LoginResponse;
Mutation.f[`register`]!.nt = LoginResponse;
Mutation.f[`refreshToken`]!.nt = TokenPair;
Mutation.f[`updateUserRole`]!.nt = User;
Mutation.f[`createUser`]!.nt = User;
Mutation.f[`updateUser`]!.nt = User;
Mutation.f[`createCategory`]!.nt = Category;
Mutation.f[`updateCategory`]!.nt = Category;
Mutation.f[`createResumeContent`]!.nt = ResumeContent;
Mutation.f[`updateResumeContent`]!.nt = ResumeContent;
Mutation.f[`createProject`]!.nt = Project;
Mutation.f[`updateProject`]!.nt = Project;
Mutation.f[`createBlog`]!.nt = Blog;
Mutation.f[`updateBlog`]!.nt = Blog;

//
//
//
//
//
//
// ==================================================================================================
//                                               Index
// ==================================================================================================
//
//
//
//
//
//

const $schemaDrivenDataMap: $$Utilities.SchemaDrivenDataMap = {
  operations: {
    query: Query,
    mutation: Mutation,
  },
  directives: {},
  types: {
    Int,
    String,
    ID,
    Boolean,
    UserRole,
    BlogStatus,
    SortDirection,
    CreateUserInput,
    UpdateUserInput,
    CreateCategoryInput,
    UpdateCategoryInput,
    CreateResumeContentInput,
    UpdateResumeContentInput,
    CreateProjectInput,
    UpdateProjectInput,
    CreateBlogInput,
    UpdateBlogInput,
    LoginInput,
    RegisterInput,
    ChangePasswordInput,
    PaginationInfo,
    LoginResponse,
    TokenPair,
    User,
    Category,
    ResumeContent,
    Project,
    Blog,
    UserConnection,
    CategoryConnection,
    ResumeContentConnection,
    ProjectConnection,
    BlogConnection,
    Query,
    Mutation,
  },
};

export { $schemaDrivenDataMap as schemaDrivenDataMap };
