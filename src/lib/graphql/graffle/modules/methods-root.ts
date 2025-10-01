import type * as $$SelectionSets from "./selection-sets.js";
import type * as $$Schema from "./schema.js";
import type * as $$Utilities from "graffle/utilities-for-generated";

export interface QueryMethods<$Context extends $$Utilities.Context> {
  $batch: $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
    $Context,
    <$SelectionSet>(
      selectionSet: $$Utilities.Exact<
        $SelectionSet,
        $$SelectionSets.Query<$Context["scalars"]>
      >,
    ) => Promise<
      (null | {}) &
        $$Utilities.HandleOutput<
          $Context,
          $$Utilities.DocumentBuilderKit.InferResult.OperationQuery<
            $$Utilities.AssertExtendsObject<$SelectionSet>,
            $$Schema.Schema<$Context["scalars"]>
          >
        >
    >
  >;
  __typename: $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
    $Context,
    () => Promise<
      (null | {}) &
        $$Utilities.HandleOutputDocumentBuilderRootField<
          $Context,
          { __typename: "Query" },
          "__typename"
        >
    >
  >;

  me: $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
    $Context,
    <$SelectionSet>(
      selectionSet: $$Utilities.Exact<
        $SelectionSet,
        $$SelectionSets.Query.me<$Context["scalars"]>
      >,
    ) => Promise<
      (null | {}) &
        $$Utilities.HandleOutputDocumentBuilderRootField<
          $Context,
          $$Utilities.DocumentBuilderKit.InferResult.OperationQuery<
            { me: $SelectionSet },
            $$Schema.Schema<$Context["scalars"]>
          >,
          "me"
        >
    >
  >;

  users: $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
    $Context,
    <$SelectionSet>(
      selectionSet: $$Utilities.Exact<
        $SelectionSet,
        $$SelectionSets.Query.users<$Context["scalars"]>
      >,
    ) => Promise<
      (null | {}) &
        $$Utilities.HandleOutputDocumentBuilderRootField<
          $Context,
          $$Utilities.DocumentBuilderKit.InferResult.OperationQuery<
            { users: $SelectionSet },
            $$Schema.Schema<$Context["scalars"]>
          >,
          "users"
        >
    >
  >;

  user: $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
    $Context,
    <$SelectionSet>(
      selectionSet: $$Utilities.Exact<
        $SelectionSet,
        $$SelectionSets.Query.user<$Context["scalars"]>
      >,
    ) => Promise<
      (null | {}) &
        $$Utilities.HandleOutputDocumentBuilderRootField<
          $Context,
          $$Utilities.DocumentBuilderKit.InferResult.OperationQuery<
            { user: $SelectionSet },
            $$Schema.Schema<$Context["scalars"]>
          >,
          "user"
        >
    >
  >;

  categories: $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
    $Context,
    <$SelectionSet>(
      selectionSet: $$Utilities.Exact<
        $SelectionSet,
        $$SelectionSets.Query.categories<$Context["scalars"]>
      >,
    ) => Promise<
      (null | {}) &
        $$Utilities.HandleOutputDocumentBuilderRootField<
          $Context,
          $$Utilities.DocumentBuilderKit.InferResult.OperationQuery<
            { categories: $SelectionSet },
            $$Schema.Schema<$Context["scalars"]>
          >,
          "categories"
        >
    >
  >;

  category: $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
    $Context,
    <$SelectionSet>(
      selectionSet: $$Utilities.Exact<
        $SelectionSet,
        $$SelectionSets.Query.category<$Context["scalars"]>
      >,
    ) => Promise<
      (null | {}) &
        $$Utilities.HandleOutputDocumentBuilderRootField<
          $Context,
          $$Utilities.DocumentBuilderKit.InferResult.OperationQuery<
            { category: $SelectionSet },
            $$Schema.Schema<$Context["scalars"]>
          >,
          "category"
        >
    >
  >;

  resumeContents: $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
    $Context,
    <$SelectionSet>(
      selectionSet: $$Utilities.Exact<
        $SelectionSet,
        $$SelectionSets.Query.resumeContents<$Context["scalars"]>
      >,
    ) => Promise<
      (null | {}) &
        $$Utilities.HandleOutputDocumentBuilderRootField<
          $Context,
          $$Utilities.DocumentBuilderKit.InferResult.OperationQuery<
            { resumeContents: $SelectionSet },
            $$Schema.Schema<$Context["scalars"]>
          >,
          "resumeContents"
        >
    >
  >;

  resumeContent: $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
    $Context,
    <$SelectionSet>(
      selectionSet: $$Utilities.Exact<
        $SelectionSet,
        $$SelectionSets.Query.resumeContent<$Context["scalars"]>
      >,
    ) => Promise<
      (null | {}) &
        $$Utilities.HandleOutputDocumentBuilderRootField<
          $Context,
          $$Utilities.DocumentBuilderKit.InferResult.OperationQuery<
            { resumeContent: $SelectionSet },
            $$Schema.Schema<$Context["scalars"]>
          >,
          "resumeContent"
        >
    >
  >;

  resumeContentsByCategory: $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
    $Context,
    <$SelectionSet>(
      selectionSet: $$Utilities.Exact<
        $SelectionSet,
        $$SelectionSets.Query.resumeContentsByCategory<$Context["scalars"]>
      >,
    ) => Promise<
      (null | {}) &
        $$Utilities.HandleOutputDocumentBuilderRootField<
          $Context,
          $$Utilities.DocumentBuilderKit.InferResult.OperationQuery<
            { resumeContentsByCategory: $SelectionSet },
            $$Schema.Schema<$Context["scalars"]>
          >,
          "resumeContentsByCategory"
        >
    >
  >;

  projects: $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
    $Context,
    <$SelectionSet>(
      selectionSet: $$Utilities.Exact<
        $SelectionSet,
        $$SelectionSets.Query.projects<$Context["scalars"]>
      >,
    ) => Promise<
      (null | {}) &
        $$Utilities.HandleOutputDocumentBuilderRootField<
          $Context,
          $$Utilities.DocumentBuilderKit.InferResult.OperationQuery<
            { projects: $SelectionSet },
            $$Schema.Schema<$Context["scalars"]>
          >,
          "projects"
        >
    >
  >;

  project: $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
    $Context,
    <$SelectionSet>(
      selectionSet: $$Utilities.Exact<
        $SelectionSet,
        $$SelectionSets.Query.project<$Context["scalars"]>
      >,
    ) => Promise<
      (null | {}) &
        $$Utilities.HandleOutputDocumentBuilderRootField<
          $Context,
          $$Utilities.DocumentBuilderKit.InferResult.OperationQuery<
            { project: $SelectionSet },
            $$Schema.Schema<$Context["scalars"]>
          >,
          "project"
        >
    >
  >;

  projectsByUser: $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
    $Context,
    <$SelectionSet>(
      selectionSet: $$Utilities.Exact<
        $SelectionSet,
        $$SelectionSets.Query.projectsByUser<$Context["scalars"]>
      >,
    ) => Promise<
      (null | {}) &
        $$Utilities.HandleOutputDocumentBuilderRootField<
          $Context,
          $$Utilities.DocumentBuilderKit.InferResult.OperationQuery<
            { projectsByUser: $SelectionSet },
            $$Schema.Schema<$Context["scalars"]>
          >,
          "projectsByUser"
        >
    >
  >;

  blogs: $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
    $Context,
    <$SelectionSet>(
      selectionSet: $$Utilities.Exact<
        $SelectionSet,
        $$SelectionSets.Query.blogs<$Context["scalars"]>
      >,
    ) => Promise<
      (null | {}) &
        $$Utilities.HandleOutputDocumentBuilderRootField<
          $Context,
          $$Utilities.DocumentBuilderKit.InferResult.OperationQuery<
            { blogs: $SelectionSet },
            $$Schema.Schema<$Context["scalars"]>
          >,
          "blogs"
        >
    >
  >;

  blog: $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
    $Context,
    <$SelectionSet>(
      selectionSet: $$Utilities.Exact<
        $SelectionSet,
        $$SelectionSets.Query.blog<$Context["scalars"]>
      >,
    ) => Promise<
      (null | {}) &
        $$Utilities.HandleOutputDocumentBuilderRootField<
          $Context,
          $$Utilities.DocumentBuilderKit.InferResult.OperationQuery<
            { blog: $SelectionSet },
            $$Schema.Schema<$Context["scalars"]>
          >,
          "blog"
        >
    >
  >;

  blogBySlug: $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
    $Context,
    <$SelectionSet>(
      selectionSet: $$Utilities.Exact<
        $SelectionSet,
        $$SelectionSets.Query.blogBySlug<$Context["scalars"]>
      >,
    ) => Promise<
      (null | {}) &
        $$Utilities.HandleOutputDocumentBuilderRootField<
          $Context,
          $$Utilities.DocumentBuilderKit.InferResult.OperationQuery<
            { blogBySlug: $SelectionSet },
            $$Schema.Schema<$Context["scalars"]>
          >,
          "blogBySlug"
        >
    >
  >;

  publishedBlogs: $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
    $Context,
    <$SelectionSet>(
      selectionSet: $$Utilities.Exact<
        $SelectionSet,
        $$SelectionSets.Query.publishedBlogs<$Context["scalars"]>
      >,
    ) => Promise<
      (null | {}) &
        $$Utilities.HandleOutputDocumentBuilderRootField<
          $Context,
          $$Utilities.DocumentBuilderKit.InferResult.OperationQuery<
            { publishedBlogs: $SelectionSet },
            $$Schema.Schema<$Context["scalars"]>
          >,
          "publishedBlogs"
        >
    >
  >;

  blogsByStatus: $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
    $Context,
    <$SelectionSet>(
      selectionSet: $$Utilities.Exact<
        $SelectionSet,
        $$SelectionSets.Query.blogsByStatus<$Context["scalars"]>
      >,
    ) => Promise<
      (null | {}) &
        $$Utilities.HandleOutputDocumentBuilderRootField<
          $Context,
          $$Utilities.DocumentBuilderKit.InferResult.OperationQuery<
            { blogsByStatus: $SelectionSet },
            $$Schema.Schema<$Context["scalars"]>
          >,
          "blogsByStatus"
        >
    >
  >;
}

export interface MutationMethods<$Context extends $$Utilities.Context> {
  $batch: $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
    $Context,
    <$SelectionSet>(
      selectionSet: $$Utilities.Exact<
        $SelectionSet,
        $$SelectionSets.Mutation<$Context["scalars"]>
      >,
    ) => Promise<
      (null | {}) &
        $$Utilities.HandleOutput<
          $Context,
          $$Utilities.DocumentBuilderKit.InferResult.OperationMutation<
            $$Utilities.AssertExtendsObject<$SelectionSet>,
            $$Schema.Schema<$Context["scalars"]>
          >
        >
    >
  >;
  __typename: $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
    $Context,
    () => Promise<
      (null | {}) &
        $$Utilities.HandleOutputDocumentBuilderRootField<
          $Context,
          { __typename: "Mutation" },
          "__typename"
        >
    >
  >;

  login: $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
    $Context,
    <$SelectionSet>(
      selectionSet: $$Utilities.Exact<
        $SelectionSet,
        $$SelectionSets.Mutation.login<$Context["scalars"]>
      >,
    ) => Promise<
      (null | {}) &
        $$Utilities.HandleOutputDocumentBuilderRootField<
          $Context,
          $$Utilities.DocumentBuilderKit.InferResult.OperationMutation<
            { login: $SelectionSet },
            $$Schema.Schema<$Context["scalars"]>
          >,
          "login"
        >
    >
  >;

  register: $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
    $Context,
    <$SelectionSet>(
      selectionSet: $$Utilities.Exact<
        $SelectionSet,
        $$SelectionSets.Mutation.register<$Context["scalars"]>
      >,
    ) => Promise<
      (null | {}) &
        $$Utilities.HandleOutputDocumentBuilderRootField<
          $Context,
          $$Utilities.DocumentBuilderKit.InferResult.OperationMutation<
            { register: $SelectionSet },
            $$Schema.Schema<$Context["scalars"]>
          >,
          "register"
        >
    >
  >;

  refreshToken: $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
    $Context,
    <$SelectionSet>(
      selectionSet: $$Utilities.Exact<
        $SelectionSet,
        $$SelectionSets.Mutation.refreshToken<$Context["scalars"]>
      >,
    ) => Promise<
      (null | {}) &
        $$Utilities.HandleOutputDocumentBuilderRootField<
          $Context,
          $$Utilities.DocumentBuilderKit.InferResult.OperationMutation<
            { refreshToken: $SelectionSet },
            $$Schema.Schema<$Context["scalars"]>
          >,
          "refreshToken"
        >
    >
  >;

  changePassword: $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
    $Context,
    <$SelectionSet>(
      selectionSet: $$Utilities.Exact<
        $SelectionSet,
        $$SelectionSets.Mutation.changePassword<$Context["scalars"]>
      >,
    ) => Promise<
      (null | {}) &
        $$Utilities.HandleOutputDocumentBuilderRootField<
          $Context,
          $$Utilities.DocumentBuilderKit.InferResult.OperationMutation<
            { changePassword: $SelectionSet },
            $$Schema.Schema<$Context["scalars"]>
          >,
          "changePassword"
        >
    >
  >;

  updateUserRole: $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
    $Context,
    <$SelectionSet>(
      selectionSet: $$Utilities.Exact<
        $SelectionSet,
        $$SelectionSets.Mutation.updateUserRole<$Context["scalars"]>
      >,
    ) => Promise<
      (null | {}) &
        $$Utilities.HandleOutputDocumentBuilderRootField<
          $Context,
          $$Utilities.DocumentBuilderKit.InferResult.OperationMutation<
            { updateUserRole: $SelectionSet },
            $$Schema.Schema<$Context["scalars"]>
          >,
          "updateUserRole"
        >
    >
  >;

  deactivateUser: $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
    $Context,
    <$SelectionSet>(
      selectionSet: $$Utilities.Exact<
        $SelectionSet,
        $$SelectionSets.Mutation.deactivateUser<$Context["scalars"]>
      >,
    ) => Promise<
      (null | {}) &
        $$Utilities.HandleOutputDocumentBuilderRootField<
          $Context,
          $$Utilities.DocumentBuilderKit.InferResult.OperationMutation<
            { deactivateUser: $SelectionSet },
            $$Schema.Schema<$Context["scalars"]>
          >,
          "deactivateUser"
        >
    >
  >;

  createUser: $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
    $Context,
    <$SelectionSet>(
      selectionSet: $$Utilities.Exact<
        $SelectionSet,
        $$SelectionSets.Mutation.createUser<$Context["scalars"]>
      >,
    ) => Promise<
      (null | {}) &
        $$Utilities.HandleOutputDocumentBuilderRootField<
          $Context,
          $$Utilities.DocumentBuilderKit.InferResult.OperationMutation<
            { createUser: $SelectionSet },
            $$Schema.Schema<$Context["scalars"]>
          >,
          "createUser"
        >
    >
  >;

  updateUser: $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
    $Context,
    <$SelectionSet>(
      selectionSet: $$Utilities.Exact<
        $SelectionSet,
        $$SelectionSets.Mutation.updateUser<$Context["scalars"]>
      >,
    ) => Promise<
      (null | {}) &
        $$Utilities.HandleOutputDocumentBuilderRootField<
          $Context,
          $$Utilities.DocumentBuilderKit.InferResult.OperationMutation<
            { updateUser: $SelectionSet },
            $$Schema.Schema<$Context["scalars"]>
          >,
          "updateUser"
        >
    >
  >;

  deleteUser: $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
    $Context,
    <$SelectionSet>(
      selectionSet: $$Utilities.Exact<
        $SelectionSet,
        $$SelectionSets.Mutation.deleteUser<$Context["scalars"]>
      >,
    ) => Promise<
      (null | {}) &
        $$Utilities.HandleOutputDocumentBuilderRootField<
          $Context,
          $$Utilities.DocumentBuilderKit.InferResult.OperationMutation<
            { deleteUser: $SelectionSet },
            $$Schema.Schema<$Context["scalars"]>
          >,
          "deleteUser"
        >
    >
  >;

  createCategory: $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
    $Context,
    <$SelectionSet>(
      selectionSet: $$Utilities.Exact<
        $SelectionSet,
        $$SelectionSets.Mutation.createCategory<$Context["scalars"]>
      >,
    ) => Promise<
      (null | {}) &
        $$Utilities.HandleOutputDocumentBuilderRootField<
          $Context,
          $$Utilities.DocumentBuilderKit.InferResult.OperationMutation<
            { createCategory: $SelectionSet },
            $$Schema.Schema<$Context["scalars"]>
          >,
          "createCategory"
        >
    >
  >;

  updateCategory: $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
    $Context,
    <$SelectionSet>(
      selectionSet: $$Utilities.Exact<
        $SelectionSet,
        $$SelectionSets.Mutation.updateCategory<$Context["scalars"]>
      >,
    ) => Promise<
      (null | {}) &
        $$Utilities.HandleOutputDocumentBuilderRootField<
          $Context,
          $$Utilities.DocumentBuilderKit.InferResult.OperationMutation<
            { updateCategory: $SelectionSet },
            $$Schema.Schema<$Context["scalars"]>
          >,
          "updateCategory"
        >
    >
  >;

  deleteCategory: $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
    $Context,
    <$SelectionSet>(
      selectionSet: $$Utilities.Exact<
        $SelectionSet,
        $$SelectionSets.Mutation.deleteCategory<$Context["scalars"]>
      >,
    ) => Promise<
      (null | {}) &
        $$Utilities.HandleOutputDocumentBuilderRootField<
          $Context,
          $$Utilities.DocumentBuilderKit.InferResult.OperationMutation<
            { deleteCategory: $SelectionSet },
            $$Schema.Schema<$Context["scalars"]>
          >,
          "deleteCategory"
        >
    >
  >;

  createResumeContent: $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
    $Context,
    <$SelectionSet>(
      selectionSet: $$Utilities.Exact<
        $SelectionSet,
        $$SelectionSets.Mutation.createResumeContent<$Context["scalars"]>
      >,
    ) => Promise<
      (null | {}) &
        $$Utilities.HandleOutputDocumentBuilderRootField<
          $Context,
          $$Utilities.DocumentBuilderKit.InferResult.OperationMutation<
            { createResumeContent: $SelectionSet },
            $$Schema.Schema<$Context["scalars"]>
          >,
          "createResumeContent"
        >
    >
  >;

  updateResumeContent: $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
    $Context,
    <$SelectionSet>(
      selectionSet: $$Utilities.Exact<
        $SelectionSet,
        $$SelectionSets.Mutation.updateResumeContent<$Context["scalars"]>
      >,
    ) => Promise<
      (null | {}) &
        $$Utilities.HandleOutputDocumentBuilderRootField<
          $Context,
          $$Utilities.DocumentBuilderKit.InferResult.OperationMutation<
            { updateResumeContent: $SelectionSet },
            $$Schema.Schema<$Context["scalars"]>
          >,
          "updateResumeContent"
        >
    >
  >;

  deleteResumeContent: $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
    $Context,
    <$SelectionSet>(
      selectionSet: $$Utilities.Exact<
        $SelectionSet,
        $$SelectionSets.Mutation.deleteResumeContent<$Context["scalars"]>
      >,
    ) => Promise<
      (null | {}) &
        $$Utilities.HandleOutputDocumentBuilderRootField<
          $Context,
          $$Utilities.DocumentBuilderKit.InferResult.OperationMutation<
            { deleteResumeContent: $SelectionSet },
            $$Schema.Schema<$Context["scalars"]>
          >,
          "deleteResumeContent"
        >
    >
  >;

  createProject: $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
    $Context,
    <$SelectionSet>(
      selectionSet: $$Utilities.Exact<
        $SelectionSet,
        $$SelectionSets.Mutation.createProject<$Context["scalars"]>
      >,
    ) => Promise<
      (null | {}) &
        $$Utilities.HandleOutputDocumentBuilderRootField<
          $Context,
          $$Utilities.DocumentBuilderKit.InferResult.OperationMutation<
            { createProject: $SelectionSet },
            $$Schema.Schema<$Context["scalars"]>
          >,
          "createProject"
        >
    >
  >;

  updateProject: $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
    $Context,
    <$SelectionSet>(
      selectionSet: $$Utilities.Exact<
        $SelectionSet,
        $$SelectionSets.Mutation.updateProject<$Context["scalars"]>
      >,
    ) => Promise<
      (null | {}) &
        $$Utilities.HandleOutputDocumentBuilderRootField<
          $Context,
          $$Utilities.DocumentBuilderKit.InferResult.OperationMutation<
            { updateProject: $SelectionSet },
            $$Schema.Schema<$Context["scalars"]>
          >,
          "updateProject"
        >
    >
  >;

  deleteProject: $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
    $Context,
    <$SelectionSet>(
      selectionSet: $$Utilities.Exact<
        $SelectionSet,
        $$SelectionSets.Mutation.deleteProject<$Context["scalars"]>
      >,
    ) => Promise<
      (null | {}) &
        $$Utilities.HandleOutputDocumentBuilderRootField<
          $Context,
          $$Utilities.DocumentBuilderKit.InferResult.OperationMutation<
            { deleteProject: $SelectionSet },
            $$Schema.Schema<$Context["scalars"]>
          >,
          "deleteProject"
        >
    >
  >;

  createBlog: $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
    $Context,
    <$SelectionSet>(
      selectionSet: $$Utilities.Exact<
        $SelectionSet,
        $$SelectionSets.Mutation.createBlog<$Context["scalars"]>
      >,
    ) => Promise<
      (null | {}) &
        $$Utilities.HandleOutputDocumentBuilderRootField<
          $Context,
          $$Utilities.DocumentBuilderKit.InferResult.OperationMutation<
            { createBlog: $SelectionSet },
            $$Schema.Schema<$Context["scalars"]>
          >,
          "createBlog"
        >
    >
  >;

  updateBlog: $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
    $Context,
    <$SelectionSet>(
      selectionSet: $$Utilities.Exact<
        $SelectionSet,
        $$SelectionSets.Mutation.updateBlog<$Context["scalars"]>
      >,
    ) => Promise<
      (null | {}) &
        $$Utilities.HandleOutputDocumentBuilderRootField<
          $Context,
          $$Utilities.DocumentBuilderKit.InferResult.OperationMutation<
            { updateBlog: $SelectionSet },
            $$Schema.Schema<$Context["scalars"]>
          >,
          "updateBlog"
        >
    >
  >;

  deleteBlog: $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
    $Context,
    <$SelectionSet>(
      selectionSet: $$Utilities.Exact<
        $SelectionSet,
        $$SelectionSets.Mutation.deleteBlog<$Context["scalars"]>
      >,
    ) => Promise<
      (null | {}) &
        $$Utilities.HandleOutputDocumentBuilderRootField<
          $Context,
          $$Utilities.DocumentBuilderKit.InferResult.OperationMutation<
            { deleteBlog: $SelectionSet },
            $$Schema.Schema<$Context["scalars"]>
          >,
          "deleteBlog"
        >
    >
  >;
}

export interface BuilderMethodsRoot<$Context extends $$Utilities.Context> {
  query: QueryMethods<$Context>;
  mutation: MutationMethods<$Context>;
}

export interface BuilderMethodsRootFn extends $$Utilities.TypeFunction {
  // @ts-expect-error parameter is Untyped.
  return: BuilderMethodsRoot<this["params"]>;
}
