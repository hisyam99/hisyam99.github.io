import type * as $$Utilities from "graffle/utilities-for-generated";

//
//
//
//
//
//
// ==================================================================================================
//                                              Document
// ==================================================================================================
//
//
//
//
//
//

export interface $Document<
  _$Scalars extends
    $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
> {
  query?: Record<string, Query<_$Scalars>>;
  mutation?: Record<string, Mutation<_$Scalars>>;
}

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

// ----------------------------------------| Entrypoint Interface |

export interface Query<
  _$Scalars extends
    $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
> {
  /**
   *
   * Select the `me` field on the `Query` object. Its type is `User` (a `OutputObject` kind of type).
   *
   */
  me?:
    | Query.me$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Query.me<_$Scalars>
      >;
  /**
   *
   * Select the `users` field on the `Query` object. Its type is `UserConnection` (a `OutputObject` kind of type).
   *
   */
  users?:
    | Query.users$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Query.users<_$Scalars>
      >;
  /**
   *
   * Select the `user` field on the `Query` object. Its type is `User` (a `OutputObject` kind of type).
   *
   */
  user?:
    | Query.user<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Query.user<_$Scalars>
      >;
  /**
   *
   * Select the `categories` field on the `Query` object. Its type is `CategoryConnection` (a `OutputObject` kind of type).
   *
   */
  categories?:
    | Query.categories$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Query.categories<_$Scalars>
      >;
  /**
   *
   * Select the `category` field on the `Query` object. Its type is `Category` (a `OutputObject` kind of type).
   *
   */
  category?:
    | Query.category<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Query.category<_$Scalars>
      >;
  /**
   *
   * Select the `resumeContents` field on the `Query` object. Its type is `ResumeContentConnection` (a `OutputObject` kind of type).
   *
   */
  resumeContents?:
    | Query.resumeContents$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Query.resumeContents<_$Scalars>
      >;
  /**
   *
   * Select the `resumeContent` field on the `Query` object. Its type is `ResumeContent` (a `OutputObject` kind of type).
   *
   */
  resumeContent?:
    | Query.resumeContent<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Query.resumeContent<_$Scalars>
      >;
  /**
   *
   * Select the `resumeContentsByCategory` field on the `Query` object. Its type is `ResumeContentConnection` (a `OutputObject` kind of type).
   *
   */
  resumeContentsByCategory?:
    | Query.resumeContentsByCategory<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Query.resumeContentsByCategory<_$Scalars>
      >;
  /**
   *
   * Select the `projects` field on the `Query` object. Its type is `ProjectConnection` (a `OutputObject` kind of type).
   *
   */
  projects?:
    | Query.projects$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Query.projects<_$Scalars>
      >;
  /**
   *
   * Select the `project` field on the `Query` object. Its type is `Project` (a `OutputObject` kind of type).
   *
   */
  project?:
    | Query.project<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Query.project<_$Scalars>
      >;
  /**
   *
   * Select the `projectsByUser` field on the `Query` object. Its type is `ProjectConnection` (a `OutputObject` kind of type).
   *
   */
  projectsByUser?:
    | Query.projectsByUser<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Query.projectsByUser<_$Scalars>
      >;
  /**
   *
   * Select the `blogs` field on the `Query` object. Its type is `BlogConnection` (a `OutputObject` kind of type).
   *
   */
  blogs?:
    | Query.blogs$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Query.blogs<_$Scalars>
      >;
  /**
   *
   * Select the `blog` field on the `Query` object. Its type is `Blog` (a `OutputObject` kind of type).
   *
   */
  blog?:
    | Query.blog<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Query.blog<_$Scalars>
      >;
  /**
   *
   * Select the `blogBySlug` field on the `Query` object. Its type is `Blog` (a `OutputObject` kind of type).
   *
   */
  blogBySlug?:
    | Query.blogBySlug<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Query.blogBySlug<_$Scalars>
      >;
  /**
   *
   * Select the `publishedBlogs` field on the `Query` object. Its type is `BlogConnection` (a `OutputObject` kind of type).
   *
   */
  publishedBlogs?:
    | Query.publishedBlogs$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Query.publishedBlogs<_$Scalars>
      >;
  /**
   *
   * Select the `blogsByStatus` field on the `Query` object. Its type is `BlogConnection` (a `OutputObject` kind of type).
   *
   */
  blogsByStatus?:
    | Query.blogsByStatus<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Query.blogsByStatus<_$Scalars>
      >;

  /**
   *
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   *
   */
  ___?: Query$FragmentInline<_$Scalars> | Query$FragmentInline<_$Scalars>[];

  /**
   *
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   *
   */
  __typename?:
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator$Expanded
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<$$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator>;
}

export interface Query$FragmentInline<
  _$Scalars extends
    $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
> extends Query<_$Scalars>,
    $$Utilities.DocumentBuilderKit.Select.Directive.$Groups.InlineFragment
      .Fields {}

// ----------------------------------------| Fields |

export namespace Query {
  export type me<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = me$SelectionSet<_$Scalars>;

  export interface me$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base,
      $NamedTypes.$User<_$Scalars> {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `me` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type me$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<me$SelectionSet<_$Scalars>>;

  // --------------------------------------------------------------------------------------------------

  export type users<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = users$SelectionSet<_$Scalars>;

  export interface users$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base,
      $NamedTypes.$UserConnection<_$Scalars> {
    /**
     * Arguments for `users` field. No arguments are required so you may omit this.
     */
    $?: users$Arguments<_$Scalars>;
  }

  export interface users$Arguments<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > {
    page?: number | undefined | null;
    pageSize?: number | undefined | null;
    sortBy?: string | undefined | null;
    $sortDirection?: $NamedTypes.$SortDirection | undefined | null;
  }

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `users` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type users$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<users$SelectionSet<_$Scalars>>;

  // --------------------------------------------------------------------------------------------------

  export type user<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = user$SelectionSet<_$Scalars>;

  export interface user$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base,
      $NamedTypes.$User<_$Scalars> {
    /**
     * Arguments for `user` field. All arguments are required so you must include this.
     */
    $: user$Arguments<_$Scalars>;
  }

  export interface user$Arguments<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > {
    id: string;
  }

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `user` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type user$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<user$SelectionSet<_$Scalars>>;

  // --------------------------------------------------------------------------------------------------

  export type categories<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = categories$SelectionSet<_$Scalars>;

  export interface categories$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base,
      $NamedTypes.$CategoryConnection<_$Scalars> {
    /**
     * Arguments for `categories` field. No arguments are required so you may omit this.
     */
    $?: categories$Arguments<_$Scalars>;
  }

  export interface categories$Arguments<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > {
    page?: number | undefined | null;
    pageSize?: number | undefined | null;
    sortBy?: string | undefined | null;
    $sortDirection?: $NamedTypes.$SortDirection | undefined | null;
  }

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `categories` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type categories$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<categories$SelectionSet<_$Scalars>>;

  // --------------------------------------------------------------------------------------------------

  export type category<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = category$SelectionSet<_$Scalars>;

  export interface category$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base,
      $NamedTypes.$Category<_$Scalars> {
    /**
     * Arguments for `category` field. All arguments are required so you must include this.
     */
    $: category$Arguments<_$Scalars>;
  }

  export interface category$Arguments<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > {
    id: string;
  }

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `category` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type category$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<category$SelectionSet<_$Scalars>>;

  // --------------------------------------------------------------------------------------------------

  export type resumeContents<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = resumeContents$SelectionSet<_$Scalars>;

  export interface resumeContents$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base,
      $NamedTypes.$ResumeContentConnection<_$Scalars> {
    /**
     * Arguments for `resumeContents` field. No arguments are required so you may omit this.
     */
    $?: resumeContents$Arguments<_$Scalars>;
  }

  export interface resumeContents$Arguments<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > {
    page?: number | undefined | null;
    pageSize?: number | undefined | null;
    sortBy?: string | undefined | null;
    $sortDirection?: $NamedTypes.$SortDirection | undefined | null;
  }

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `resumeContents` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type resumeContents$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<resumeContents$SelectionSet<_$Scalars>>;

  // --------------------------------------------------------------------------------------------------

  export type resumeContent<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = resumeContent$SelectionSet<_$Scalars>;

  export interface resumeContent$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base,
      $NamedTypes.$ResumeContent<_$Scalars> {
    /**
     * Arguments for `resumeContent` field. All arguments are required so you must include this.
     */
    $: resumeContent$Arguments<_$Scalars>;
  }

  export interface resumeContent$Arguments<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > {
    id: string;
  }

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `resumeContent` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type resumeContent$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<resumeContent$SelectionSet<_$Scalars>>;

  // --------------------------------------------------------------------------------------------------

  export type resumeContentsByCategory<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = resumeContentsByCategory$SelectionSet<_$Scalars>;

  export interface resumeContentsByCategory$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base,
      $NamedTypes.$ResumeContentConnection<_$Scalars> {
    /**
     * Arguments for `resumeContentsByCategory` field. Some (1/5) arguments are required so you must include this.
     */
    $: resumeContentsByCategory$Arguments<_$Scalars>;
  }

  export interface resumeContentsByCategory$Arguments<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > {
    categoryId: string;
    page?: number | undefined | null;
    pageSize?: number | undefined | null;
    sortBy?: string | undefined | null;
    $sortDirection?: $NamedTypes.$SortDirection | undefined | null;
  }

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `resumeContentsByCategory` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type resumeContentsByCategory$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<resumeContentsByCategory$SelectionSet<_$Scalars>>;

  // --------------------------------------------------------------------------------------------------

  export type projects<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = projects$SelectionSet<_$Scalars>;

  export interface projects$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base,
      $NamedTypes.$ProjectConnection<_$Scalars> {
    /**
     * Arguments for `projects` field. No arguments are required so you may omit this.
     */
    $?: projects$Arguments<_$Scalars>;
  }

  export interface projects$Arguments<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > {
    page?: number | undefined | null;
    pageSize?: number | undefined | null;
    sortBy?: string | undefined | null;
    $sortDirection?: $NamedTypes.$SortDirection | undefined | null;
  }

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `projects` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type projects$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<projects$SelectionSet<_$Scalars>>;

  // --------------------------------------------------------------------------------------------------

  export type project<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = project$SelectionSet<_$Scalars>;

  export interface project$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base,
      $NamedTypes.$Project<_$Scalars> {
    /**
     * Arguments for `project` field. All arguments are required so you must include this.
     */
    $: project$Arguments<_$Scalars>;
  }

  export interface project$Arguments<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > {
    id: string;
  }

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `project` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type project$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<project$SelectionSet<_$Scalars>>;

  // --------------------------------------------------------------------------------------------------

  export type projectsByUser<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = projectsByUser$SelectionSet<_$Scalars>;

  export interface projectsByUser$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base,
      $NamedTypes.$ProjectConnection<_$Scalars> {
    /**
     * Arguments for `projectsByUser` field. Some (1/5) arguments are required so you must include this.
     */
    $: projectsByUser$Arguments<_$Scalars>;
  }

  export interface projectsByUser$Arguments<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > {
    userId: string;
    page?: number | undefined | null;
    pageSize?: number | undefined | null;
    sortBy?: string | undefined | null;
    $sortDirection?: $NamedTypes.$SortDirection | undefined | null;
  }

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `projectsByUser` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type projectsByUser$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<projectsByUser$SelectionSet<_$Scalars>>;

  // --------------------------------------------------------------------------------------------------

  export type blogs<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = blogs$SelectionSet<_$Scalars>;

  export interface blogs$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base,
      $NamedTypes.$BlogConnection<_$Scalars> {
    /**
     * Arguments for `blogs` field. No arguments are required so you may omit this.
     */
    $?: blogs$Arguments<_$Scalars>;
  }

  export interface blogs$Arguments<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > {
    page?: number | undefined | null;
    pageSize?: number | undefined | null;
    sortBy?: string | undefined | null;
    $sortDirection?: $NamedTypes.$SortDirection | undefined | null;
  }

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `blogs` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type blogs$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<blogs$SelectionSet<_$Scalars>>;

  // --------------------------------------------------------------------------------------------------

  export type blog<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = blog$SelectionSet<_$Scalars>;

  export interface blog$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base,
      $NamedTypes.$Blog<_$Scalars> {
    /**
     * Arguments for `blog` field. All arguments are required so you must include this.
     */
    $: blog$Arguments<_$Scalars>;
  }

  export interface blog$Arguments<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > {
    id: string;
  }

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `blog` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type blog$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<blog$SelectionSet<_$Scalars>>;

  // --------------------------------------------------------------------------------------------------

  export type blogBySlug<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = blogBySlug$SelectionSet<_$Scalars>;

  export interface blogBySlug$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base,
      $NamedTypes.$Blog<_$Scalars> {
    /**
     * Arguments for `blogBySlug` field. All arguments are required so you must include this.
     */
    $: blogBySlug$Arguments<_$Scalars>;
  }

  export interface blogBySlug$Arguments<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > {
    slug: string;
  }

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `blogBySlug` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type blogBySlug$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<blogBySlug$SelectionSet<_$Scalars>>;

  // --------------------------------------------------------------------------------------------------

  export type publishedBlogs<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = publishedBlogs$SelectionSet<_$Scalars>;

  export interface publishedBlogs$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base,
      $NamedTypes.$BlogConnection<_$Scalars> {
    /**
     * Arguments for `publishedBlogs` field. No arguments are required so you may omit this.
     */
    $?: publishedBlogs$Arguments<_$Scalars>;
  }

  export interface publishedBlogs$Arguments<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > {
    page?: number | undefined | null;
    pageSize?: number | undefined | null;
    sortBy?: string | undefined | null;
    $sortDirection?: $NamedTypes.$SortDirection | undefined | null;
  }

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `publishedBlogs` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type publishedBlogs$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<publishedBlogs$SelectionSet<_$Scalars>>;

  // --------------------------------------------------------------------------------------------------

  export type blogsByStatus<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = blogsByStatus$SelectionSet<_$Scalars>;

  export interface blogsByStatus$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base,
      $NamedTypes.$BlogConnection<_$Scalars> {
    /**
     * Arguments for `blogsByStatus` field. Some (1/5) arguments are required so you must include this.
     */
    $: blogsByStatus$Arguments<_$Scalars>;
  }

  export interface blogsByStatus$Arguments<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > {
    $status: $NamedTypes.$BlogStatus;
    page?: number | undefined | null;
    pageSize?: number | undefined | null;
    sortBy?: string | undefined | null;
    $sortDirection?: $NamedTypes.$SortDirection | undefined | null;
  }

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `blogsByStatus` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type blogsByStatus$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<blogsByStatus$SelectionSet<_$Scalars>>;
}

//                                              Mutation
// --------------------------------------------------------------------------------------------------
//

// ----------------------------------------| Entrypoint Interface |

export interface Mutation<
  _$Scalars extends
    $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
> {
  /**
   *
   * Select the `login` field on the `Mutation` object. Its type is `LoginResponse` (a `OutputObject` kind of type).
   *
   */
  login?:
    | Mutation.login<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Mutation.login<_$Scalars>
      >;
  /**
   *
   * Select the `register` field on the `Mutation` object. Its type is `LoginResponse` (a `OutputObject` kind of type).
   *
   */
  register?:
    | Mutation.register<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Mutation.register<_$Scalars>
      >;
  /**
   *
   * Select the `refreshToken` field on the `Mutation` object. Its type is `TokenPair` (a `OutputObject` kind of type).
   *
   */
  refreshToken?:
    | Mutation.refreshToken<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Mutation.refreshToken<_$Scalars>
      >;
  /**
   *
   * Select the `changePassword` field on the `Mutation` object. Its type is `Boolean` (a `ScalarStandard` kind of type).
   *
   */
  changePassword?:
    | Mutation.changePassword<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Mutation.changePassword<_$Scalars>
      >;
  /**
   *
   * Select the `updateUserRole` field on the `Mutation` object. Its type is `User` (a `OutputObject` kind of type).
   *
   */
  updateUserRole?:
    | Mutation.updateUserRole<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Mutation.updateUserRole<_$Scalars>
      >;
  /**
   *
   * Select the `deactivateUser` field on the `Mutation` object. Its type is `Boolean` (a `ScalarStandard` kind of type).
   *
   */
  deactivateUser?:
    | Mutation.deactivateUser<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Mutation.deactivateUser<_$Scalars>
      >;
  /**
   *
   * Select the `createUser` field on the `Mutation` object. Its type is `User` (a `OutputObject` kind of type).
   *
   */
  createUser?:
    | Mutation.createUser<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Mutation.createUser<_$Scalars>
      >;
  /**
   *
   * Select the `updateUser` field on the `Mutation` object. Its type is `User` (a `OutputObject` kind of type).
   *
   */
  updateUser?:
    | Mutation.updateUser<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Mutation.updateUser<_$Scalars>
      >;
  /**
   *
   * Select the `deleteUser` field on the `Mutation` object. Its type is `Boolean` (a `ScalarStandard` kind of type).
   *
   */
  deleteUser?:
    | Mutation.deleteUser<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Mutation.deleteUser<_$Scalars>
      >;
  /**
   *
   * Select the `createCategory` field on the `Mutation` object. Its type is `Category` (a `OutputObject` kind of type).
   *
   */
  createCategory?:
    | Mutation.createCategory<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Mutation.createCategory<_$Scalars>
      >;
  /**
   *
   * Select the `updateCategory` field on the `Mutation` object. Its type is `Category` (a `OutputObject` kind of type).
   *
   */
  updateCategory?:
    | Mutation.updateCategory<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Mutation.updateCategory<_$Scalars>
      >;
  /**
   *
   * Select the `deleteCategory` field on the `Mutation` object. Its type is `Boolean` (a `ScalarStandard` kind of type).
   *
   */
  deleteCategory?:
    | Mutation.deleteCategory<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Mutation.deleteCategory<_$Scalars>
      >;
  /**
   *
   * Select the `createResumeContent` field on the `Mutation` object. Its type is `ResumeContent` (a `OutputObject` kind of type).
   *
   */
  createResumeContent?:
    | Mutation.createResumeContent<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Mutation.createResumeContent<_$Scalars>
      >;
  /**
   *
   * Select the `updateResumeContent` field on the `Mutation` object. Its type is `ResumeContent` (a `OutputObject` kind of type).
   *
   */
  updateResumeContent?:
    | Mutation.updateResumeContent<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Mutation.updateResumeContent<_$Scalars>
      >;
  /**
   *
   * Select the `deleteResumeContent` field on the `Mutation` object. Its type is `Boolean` (a `ScalarStandard` kind of type).
   *
   */
  deleteResumeContent?:
    | Mutation.deleteResumeContent<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Mutation.deleteResumeContent<_$Scalars>
      >;
  /**
   *
   * Select the `createProject` field on the `Mutation` object. Its type is `Project` (a `OutputObject` kind of type).
   *
   */
  createProject?:
    | Mutation.createProject<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Mutation.createProject<_$Scalars>
      >;
  /**
   *
   * Select the `updateProject` field on the `Mutation` object. Its type is `Project` (a `OutputObject` kind of type).
   *
   */
  updateProject?:
    | Mutation.updateProject<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Mutation.updateProject<_$Scalars>
      >;
  /**
   *
   * Select the `deleteProject` field on the `Mutation` object. Its type is `Boolean` (a `ScalarStandard` kind of type).
   *
   */
  deleteProject?:
    | Mutation.deleteProject<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Mutation.deleteProject<_$Scalars>
      >;
  /**
   *
   * Select the `createBlog` field on the `Mutation` object. Its type is `Blog` (a `OutputObject` kind of type).
   *
   */
  createBlog?:
    | Mutation.createBlog<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Mutation.createBlog<_$Scalars>
      >;
  /**
   *
   * Select the `updateBlog` field on the `Mutation` object. Its type is `Blog` (a `OutputObject` kind of type).
   *
   */
  updateBlog?:
    | Mutation.updateBlog<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Mutation.updateBlog<_$Scalars>
      >;
  /**
   *
   * Select the `deleteBlog` field on the `Mutation` object. Its type is `Boolean` (a `ScalarStandard` kind of type).
   *
   */
  deleteBlog?:
    | Mutation.deleteBlog<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Mutation.deleteBlog<_$Scalars>
      >;

  /**
   *
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   *
   */
  ___?:
    | Mutation$FragmentInline<_$Scalars>
    | Mutation$FragmentInline<_$Scalars>[];

  /**
   *
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   *
   */
  __typename?:
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator$Expanded
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<$$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator>;
}

export interface Mutation$FragmentInline<
  _$Scalars extends
    $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
> extends Mutation<_$Scalars>,
    $$Utilities.DocumentBuilderKit.Select.Directive.$Groups.InlineFragment
      .Fields {}

// ----------------------------------------| Fields |

export namespace Mutation {
  export type login<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = login$SelectionSet<_$Scalars>;

  export interface login$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base,
      $NamedTypes.$LoginResponse<_$Scalars> {
    /**
     * Arguments for `login` field. All arguments are required so you must include this.
     */
    $: login$Arguments<_$Scalars>;
  }

  export interface login$Arguments<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > {
    input: $NamedTypes.$LoginInput<_$Scalars>;
  }

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `login` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type login$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<login$SelectionSet<_$Scalars>>;

  // --------------------------------------------------------------------------------------------------

  export type register<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = register$SelectionSet<_$Scalars>;

  export interface register$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base,
      $NamedTypes.$LoginResponse<_$Scalars> {
    /**
     * Arguments for `register` field. All arguments are required so you must include this.
     */
    $: register$Arguments<_$Scalars>;
  }

  export interface register$Arguments<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > {
    input: $NamedTypes.$RegisterInput<_$Scalars>;
  }

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `register` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type register$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<register$SelectionSet<_$Scalars>>;

  // --------------------------------------------------------------------------------------------------

  export type refreshToken<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = refreshToken$SelectionSet<_$Scalars>;

  export interface refreshToken$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base,
      $NamedTypes.$TokenPair<_$Scalars> {
    /**
     * Arguments for `refreshToken` field. All arguments are required so you must include this.
     */
    $: refreshToken$Arguments<_$Scalars>;
  }

  export interface refreshToken$Arguments<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > {
    refreshToken: string;
  }

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `refreshToken` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type refreshToken$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<refreshToken$SelectionSet<_$Scalars>>;

  // --------------------------------------------------------------------------------------------------

  export type changePassword<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = changePassword$SelectionSet<_$Scalars>;

  export interface changePassword$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base {
    /**
     * Arguments for `changePassword` field. All arguments are required so you must include this.
     */
    $: changePassword$Arguments<_$Scalars>;
  }

  export interface changePassword$Arguments<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > {
    input: $NamedTypes.$ChangePasswordInput<_$Scalars>;
  }

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `changePassword` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type changePassword$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<changePassword$SelectionSet<_$Scalars>>;

  // --------------------------------------------------------------------------------------------------

  export type updateUserRole<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = updateUserRole$SelectionSet<_$Scalars>;

  export interface updateUserRole$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base,
      $NamedTypes.$User<_$Scalars> {
    /**
     * Arguments for `updateUserRole` field. All arguments are required so you must include this.
     */
    $: updateUserRole$Arguments<_$Scalars>;
  }

  export interface updateUserRole$Arguments<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > {
    userId: string;
    $role: $NamedTypes.$UserRole;
  }

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `updateUserRole` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type updateUserRole$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<updateUserRole$SelectionSet<_$Scalars>>;

  // --------------------------------------------------------------------------------------------------

  export type deactivateUser<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = deactivateUser$SelectionSet<_$Scalars>;

  export interface deactivateUser$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base {
    /**
     * Arguments for `deactivateUser` field. All arguments are required so you must include this.
     */
    $: deactivateUser$Arguments<_$Scalars>;
  }

  export interface deactivateUser$Arguments<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > {
    userId: string;
  }

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `deactivateUser` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type deactivateUser$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<deactivateUser$SelectionSet<_$Scalars>>;

  // --------------------------------------------------------------------------------------------------

  export type createUser<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = createUser$SelectionSet<_$Scalars>;

  export interface createUser$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base,
      $NamedTypes.$User<_$Scalars> {
    /**
     * Arguments for `createUser` field. All arguments are required so you must include this.
     */
    $: createUser$Arguments<_$Scalars>;
  }

  export interface createUser$Arguments<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > {
    input: $NamedTypes.$CreateUserInput<_$Scalars>;
  }

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `createUser` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type createUser$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<createUser$SelectionSet<_$Scalars>>;

  // --------------------------------------------------------------------------------------------------

  export type updateUser<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = updateUser$SelectionSet<_$Scalars>;

  export interface updateUser$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base,
      $NamedTypes.$User<_$Scalars> {
    /**
     * Arguments for `updateUser` field. All arguments are required so you must include this.
     */
    $: updateUser$Arguments<_$Scalars>;
  }

  export interface updateUser$Arguments<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > {
    id: string;
    input: $NamedTypes.$UpdateUserInput<_$Scalars>;
  }

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `updateUser` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type updateUser$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<updateUser$SelectionSet<_$Scalars>>;

  // --------------------------------------------------------------------------------------------------

  export type deleteUser<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = deleteUser$SelectionSet<_$Scalars>;

  export interface deleteUser$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base {
    /**
     * Arguments for `deleteUser` field. All arguments are required so you must include this.
     */
    $: deleteUser$Arguments<_$Scalars>;
  }

  export interface deleteUser$Arguments<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > {
    id: string;
  }

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `deleteUser` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type deleteUser$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<deleteUser$SelectionSet<_$Scalars>>;

  // --------------------------------------------------------------------------------------------------

  export type createCategory<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = createCategory$SelectionSet<_$Scalars>;

  export interface createCategory$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base,
      $NamedTypes.$Category<_$Scalars> {
    /**
     * Arguments for `createCategory` field. All arguments are required so you must include this.
     */
    $: createCategory$Arguments<_$Scalars>;
  }

  export interface createCategory$Arguments<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > {
    input: $NamedTypes.$CreateCategoryInput<_$Scalars>;
  }

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `createCategory` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type createCategory$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<createCategory$SelectionSet<_$Scalars>>;

  // --------------------------------------------------------------------------------------------------

  export type updateCategory<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = updateCategory$SelectionSet<_$Scalars>;

  export interface updateCategory$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base,
      $NamedTypes.$Category<_$Scalars> {
    /**
     * Arguments for `updateCategory` field. All arguments are required so you must include this.
     */
    $: updateCategory$Arguments<_$Scalars>;
  }

  export interface updateCategory$Arguments<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > {
    id: string;
    input: $NamedTypes.$UpdateCategoryInput<_$Scalars>;
  }

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `updateCategory` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type updateCategory$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<updateCategory$SelectionSet<_$Scalars>>;

  // --------------------------------------------------------------------------------------------------

  export type deleteCategory<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = deleteCategory$SelectionSet<_$Scalars>;

  export interface deleteCategory$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base {
    /**
     * Arguments for `deleteCategory` field. All arguments are required so you must include this.
     */
    $: deleteCategory$Arguments<_$Scalars>;
  }

  export interface deleteCategory$Arguments<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > {
    id: string;
  }

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `deleteCategory` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type deleteCategory$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<deleteCategory$SelectionSet<_$Scalars>>;

  // --------------------------------------------------------------------------------------------------

  export type createResumeContent<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = createResumeContent$SelectionSet<_$Scalars>;

  export interface createResumeContent$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base,
      $NamedTypes.$ResumeContent<_$Scalars> {
    /**
     * Arguments for `createResumeContent` field. All arguments are required so you must include this.
     */
    $: createResumeContent$Arguments<_$Scalars>;
  }

  export interface createResumeContent$Arguments<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > {
    input: $NamedTypes.$CreateResumeContentInput<_$Scalars>;
  }

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `createResumeContent` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type createResumeContent$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<createResumeContent$SelectionSet<_$Scalars>>;

  // --------------------------------------------------------------------------------------------------

  export type updateResumeContent<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = updateResumeContent$SelectionSet<_$Scalars>;

  export interface updateResumeContent$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base,
      $NamedTypes.$ResumeContent<_$Scalars> {
    /**
     * Arguments for `updateResumeContent` field. All arguments are required so you must include this.
     */
    $: updateResumeContent$Arguments<_$Scalars>;
  }

  export interface updateResumeContent$Arguments<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > {
    id: string;
    input: $NamedTypes.$UpdateResumeContentInput<_$Scalars>;
  }

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `updateResumeContent` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type updateResumeContent$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<updateResumeContent$SelectionSet<_$Scalars>>;

  // --------------------------------------------------------------------------------------------------

  export type deleteResumeContent<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = deleteResumeContent$SelectionSet<_$Scalars>;

  export interface deleteResumeContent$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base {
    /**
     * Arguments for `deleteResumeContent` field. All arguments are required so you must include this.
     */
    $: deleteResumeContent$Arguments<_$Scalars>;
  }

  export interface deleteResumeContent$Arguments<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > {
    id: string;
  }

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `deleteResumeContent` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type deleteResumeContent$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<deleteResumeContent$SelectionSet<_$Scalars>>;

  // --------------------------------------------------------------------------------------------------

  export type createProject<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = createProject$SelectionSet<_$Scalars>;

  export interface createProject$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base,
      $NamedTypes.$Project<_$Scalars> {
    /**
     * Arguments for `createProject` field. All arguments are required so you must include this.
     */
    $: createProject$Arguments<_$Scalars>;
  }

  export interface createProject$Arguments<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > {
    input: $NamedTypes.$CreateProjectInput<_$Scalars>;
  }

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `createProject` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type createProject$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<createProject$SelectionSet<_$Scalars>>;

  // --------------------------------------------------------------------------------------------------

  export type updateProject<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = updateProject$SelectionSet<_$Scalars>;

  export interface updateProject$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base,
      $NamedTypes.$Project<_$Scalars> {
    /**
     * Arguments for `updateProject` field. All arguments are required so you must include this.
     */
    $: updateProject$Arguments<_$Scalars>;
  }

  export interface updateProject$Arguments<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > {
    id: string;
    input: $NamedTypes.$UpdateProjectInput<_$Scalars>;
  }

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `updateProject` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type updateProject$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<updateProject$SelectionSet<_$Scalars>>;

  // --------------------------------------------------------------------------------------------------

  export type deleteProject<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = deleteProject$SelectionSet<_$Scalars>;

  export interface deleteProject$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base {
    /**
     * Arguments for `deleteProject` field. All arguments are required so you must include this.
     */
    $: deleteProject$Arguments<_$Scalars>;
  }

  export interface deleteProject$Arguments<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > {
    id: string;
  }

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `deleteProject` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type deleteProject$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<deleteProject$SelectionSet<_$Scalars>>;

  // --------------------------------------------------------------------------------------------------

  export type createBlog<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = createBlog$SelectionSet<_$Scalars>;

  export interface createBlog$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base,
      $NamedTypes.$Blog<_$Scalars> {
    /**
     * Arguments for `createBlog` field. All arguments are required so you must include this.
     */
    $: createBlog$Arguments<_$Scalars>;
  }

  export interface createBlog$Arguments<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > {
    input: $NamedTypes.$CreateBlogInput<_$Scalars>;
  }

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `createBlog` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type createBlog$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<createBlog$SelectionSet<_$Scalars>>;

  // --------------------------------------------------------------------------------------------------

  export type updateBlog<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = updateBlog$SelectionSet<_$Scalars>;

  export interface updateBlog$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base,
      $NamedTypes.$Blog<_$Scalars> {
    /**
     * Arguments for `updateBlog` field. All arguments are required so you must include this.
     */
    $: updateBlog$Arguments<_$Scalars>;
  }

  export interface updateBlog$Arguments<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > {
    id: string;
    input: $NamedTypes.$UpdateBlogInput<_$Scalars>;
  }

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `updateBlog` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type updateBlog$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<updateBlog$SelectionSet<_$Scalars>>;

  // --------------------------------------------------------------------------------------------------

  export type deleteBlog<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = deleteBlog$SelectionSet<_$Scalars>;

  export interface deleteBlog$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base {
    /**
     * Arguments for `deleteBlog` field. All arguments are required so you must include this.
     */
    $: deleteBlog$Arguments<_$Scalars>;
  }

  export interface deleteBlog$Arguments<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > {
    id: string;
  }

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `deleteBlog` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type deleteBlog$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<deleteBlog$SelectionSet<_$Scalars>>;
}

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

export type UserRole = "ADMIN" | "EDITOR" | "VIEWER" | "GUEST";

export type BlogStatus = "DRAFT" | "PUBLISHED";

export type SortDirection = "ASC" | "DESC";

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

export interface CreateUserInput<
  _$Scalars extends
    $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
> {
  name: string;
  email: string;
  $role?: $NamedTypes.$UserRole | undefined | null;
}

export interface UpdateUserInput<
  _$Scalars extends
    $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
> {
  name?: string | undefined | null;
  email?: string | undefined | null;
  $role?: $NamedTypes.$UserRole | undefined | null;
  isActive?: boolean | undefined | null;
}

export interface CreateCategoryInput<
  _$Scalars extends
    $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
> {
  name: string;
  description?: string | undefined | null;
}

export interface UpdateCategoryInput<
  _$Scalars extends
    $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
> {
  name?: string | undefined | null;
  description?: string | undefined | null;
}

export interface CreateResumeContentInput<
  _$Scalars extends
    $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
> {
  title: string;
  description?: string | undefined | null;
  detail?: string | undefined | null;
  categoryId: string;
}

export interface UpdateResumeContentInput<
  _$Scalars extends
    $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
> {
  title?: string | undefined | null;
  description?: string | undefined | null;
  detail?: string | undefined | null;
  categoryId?: string | undefined | null;
}

export interface CreateProjectInput<
  _$Scalars extends
    $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
> {
  title: string;
  description?: string | undefined | null;
  userId?: string | undefined | null;
}

export interface UpdateProjectInput<
  _$Scalars extends
    $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
> {
  title?: string | undefined | null;
  description?: string | undefined | null;
  userId?: string | undefined | null;
}

export interface CreateBlogInput<
  _$Scalars extends
    $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
> {
  title: string;
  content: string;
  summary?: string | undefined | null;
  slug: string;
  author?: string | undefined | null;
  $status?: $NamedTypes.$BlogStatus | undefined | null;
  tags?: Array<string | undefined | null> | undefined | null;
  metaDescription?: string | undefined | null;
}

export interface UpdateBlogInput<
  _$Scalars extends
    $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
> {
  title?: string | undefined | null;
  content?: string | undefined | null;
  summary?: string | undefined | null;
  slug?: string | undefined | null;
  author?: string | undefined | null;
  $status?: $NamedTypes.$BlogStatus | undefined | null;
  tags?: Array<string | undefined | null> | undefined | null;
  metaDescription?: string | undefined | null;
}

export interface LoginInput<
  _$Scalars extends
    $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
> {
  email: string;
  password: string;
}

export interface RegisterInput<
  _$Scalars extends
    $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
> {
  name: string;
  email: string;
  password: string;
  $role?: $NamedTypes.$UserRole | undefined | null;
}

export interface ChangePasswordInput<
  _$Scalars extends
    $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
> {
  oldPassword: string;
  newPassword: string;
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

// ----------------------------------------| Entrypoint Interface |

export interface PaginationInfo<
  _$Scalars extends
    $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
> extends $$Utilities.DocumentBuilderKit.Select.Bases.ObjectLike {
  /**
   *
   * Select the `page` field on the `PaginationInfo` object. Its type is `Int` (a `ScalarStandard` kind of type).
   *
   */
  page?:
    | PaginationInfo.page$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        PaginationInfo.page<_$Scalars>
      >;
  /**
   *
   * Select the `pageSize` field on the `PaginationInfo` object. Its type is `Int` (a `ScalarStandard` kind of type).
   *
   */
  pageSize?:
    | PaginationInfo.pageSize$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        PaginationInfo.pageSize<_$Scalars>
      >;
  /**
   *
   * Select the `total` field on the `PaginationInfo` object. Its type is `Int` (a `ScalarStandard` kind of type).
   *
   */
  total?:
    | PaginationInfo.total$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        PaginationInfo.total<_$Scalars>
      >;
  /**
   *
   * Select the `totalPages` field on the `PaginationInfo` object. Its type is `Int` (a `ScalarStandard` kind of type).
   *
   */
  totalPages?:
    | PaginationInfo.totalPages$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        PaginationInfo.totalPages<_$Scalars>
      >;

  /**
   *
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   *
   */
  ___?:
    | PaginationInfo$FragmentInline<_$Scalars>
    | PaginationInfo$FragmentInline<_$Scalars>[];

  /**
   *
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   *
   */
  __typename?:
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator$Expanded
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<$$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator>;
}

export interface PaginationInfo$FragmentInline<
  _$Scalars extends
    $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
> extends PaginationInfo<_$Scalars>,
    $$Utilities.DocumentBuilderKit.Select.Directive.$Groups.InlineFragment
      .Fields {}

// ----------------------------------------| Fields |

export namespace PaginationInfo {
  export type page<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > =
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | page$SelectionSet<_$Scalars>;

  export interface page$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `page` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type page$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | page$SelectionSet<_$Scalars>
  >;

  // --------------------------------------------------------------------------------------------------

  export type pageSize<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > =
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | pageSize$SelectionSet<_$Scalars>;

  export interface pageSize$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `pageSize` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type pageSize$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | pageSize$SelectionSet<_$Scalars>
  >;

  // --------------------------------------------------------------------------------------------------

  export type total<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > =
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | total$SelectionSet<_$Scalars>;

  export interface total$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `total` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type total$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | total$SelectionSet<_$Scalars>
  >;

  // --------------------------------------------------------------------------------------------------

  export type totalPages<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > =
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | totalPages$SelectionSet<_$Scalars>;

  export interface totalPages$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `totalPages` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type totalPages$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | totalPages$SelectionSet<_$Scalars>
  >;
}

//                                           LoginResponse
// --------------------------------------------------------------------------------------------------
//

// ----------------------------------------| Entrypoint Interface |

export interface LoginResponse<
  _$Scalars extends
    $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
> extends $$Utilities.DocumentBuilderKit.Select.Bases.ObjectLike {
  /**
   *
   * Select the `user` field on the `LoginResponse` object. Its type is `User` (a `OutputObject` kind of type).
   *
   */
  user?:
    | LoginResponse.user$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        LoginResponse.user<_$Scalars>
      >;
  /**
   *
   * Select the `tokens` field on the `LoginResponse` object. Its type is `TokenPair` (a `OutputObject` kind of type).
   *
   */
  tokens?:
    | LoginResponse.tokens$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        LoginResponse.tokens<_$Scalars>
      >;

  /**
   *
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   *
   */
  ___?:
    | LoginResponse$FragmentInline<_$Scalars>
    | LoginResponse$FragmentInline<_$Scalars>[];

  /**
   *
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   *
   */
  __typename?:
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator$Expanded
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<$$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator>;
}

export interface LoginResponse$FragmentInline<
  _$Scalars extends
    $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
> extends LoginResponse<_$Scalars>,
    $$Utilities.DocumentBuilderKit.Select.Directive.$Groups.InlineFragment
      .Fields {}

// ----------------------------------------| Fields |

export namespace LoginResponse {
  export type user<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = user$SelectionSet<_$Scalars>;

  export interface user$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base,
      $NamedTypes.$User<_$Scalars> {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `user` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type user$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<user$SelectionSet<_$Scalars>>;

  // --------------------------------------------------------------------------------------------------

  export type tokens<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = tokens$SelectionSet<_$Scalars>;

  export interface tokens$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base,
      $NamedTypes.$TokenPair<_$Scalars> {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `tokens` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type tokens$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<tokens$SelectionSet<_$Scalars>>;
}

//                                             TokenPair
// --------------------------------------------------------------------------------------------------
//

// ----------------------------------------| Entrypoint Interface |

export interface TokenPair<
  _$Scalars extends
    $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
> extends $$Utilities.DocumentBuilderKit.Select.Bases.ObjectLike {
  /**
   *
   * Select the `accessToken` field on the `TokenPair` object. Its type is `String` (a `ScalarStandard` kind of type).
   *
   */
  accessToken?:
    | TokenPair.accessToken$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        TokenPair.accessToken<_$Scalars>
      >;
  /**
   *
   * Select the `refreshToken` field on the `TokenPair` object. Its type is `String` (a `ScalarStandard` kind of type).
   *
   */
  refreshToken?:
    | TokenPair.refreshToken$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        TokenPair.refreshToken<_$Scalars>
      >;
  /**
   *
   * Select the `expiresIn` field on the `TokenPair` object. Its type is `Int` (a `ScalarStandard` kind of type).
   *
   */
  expiresIn?:
    | TokenPair.expiresIn$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        TokenPair.expiresIn<_$Scalars>
      >;
  /**
   *
   * Select the `tokenType` field on the `TokenPair` object. Its type is `String` (a `ScalarStandard` kind of type).
   *
   */
  tokenType?:
    | TokenPair.tokenType$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        TokenPair.tokenType<_$Scalars>
      >;

  /**
   *
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   *
   */
  ___?:
    | TokenPair$FragmentInline<_$Scalars>
    | TokenPair$FragmentInline<_$Scalars>[];

  /**
   *
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   *
   */
  __typename?:
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator$Expanded
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<$$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator>;
}

export interface TokenPair$FragmentInline<
  _$Scalars extends
    $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
> extends TokenPair<_$Scalars>,
    $$Utilities.DocumentBuilderKit.Select.Directive.$Groups.InlineFragment
      .Fields {}

// ----------------------------------------| Fields |

export namespace TokenPair {
  export type accessToken<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > =
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | accessToken$SelectionSet<_$Scalars>;

  export interface accessToken$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `accessToken` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type accessToken$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | accessToken$SelectionSet<_$Scalars>
  >;

  // --------------------------------------------------------------------------------------------------

  export type refreshToken<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > =
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | refreshToken$SelectionSet<_$Scalars>;

  export interface refreshToken$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `refreshToken` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type refreshToken$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | refreshToken$SelectionSet<_$Scalars>
  >;

  // --------------------------------------------------------------------------------------------------

  export type expiresIn<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > =
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | expiresIn$SelectionSet<_$Scalars>;

  export interface expiresIn$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `expiresIn` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type expiresIn$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | expiresIn$SelectionSet<_$Scalars>
  >;

  // --------------------------------------------------------------------------------------------------

  export type tokenType<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > =
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | tokenType$SelectionSet<_$Scalars>;

  export interface tokenType$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `tokenType` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type tokenType$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | tokenType$SelectionSet<_$Scalars>
  >;
}

//                                                User
// --------------------------------------------------------------------------------------------------
//

// ----------------------------------------| Entrypoint Interface |

export interface User<
  _$Scalars extends
    $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
> extends $$Utilities.DocumentBuilderKit.Select.Bases.ObjectLike {
  /**
   *
   * Select the `id` field on the `User` object. Its type is `ID` (a `ScalarStandard` kind of type).
   *
   */
  id?:
    | User.id$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        User.id<_$Scalars>
      >;
  /**
   *
   * Select the `name` field on the `User` object. Its type is `String` (a `ScalarStandard` kind of type).
   *
   */
  name?:
    | User.name$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        User.name<_$Scalars>
      >;
  /**
   *
   * Select the `email` field on the `User` object. Its type is `String` (a `ScalarStandard` kind of type).
   *
   */
  email?:
    | User.email$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        User.email<_$Scalars>
      >;
  /**
   *
   * Select the `role` field on the `User` object. Its type is `UserRole` (a `Enum` kind of type).
   *
   */
  role?:
    | User.role$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        User.role<_$Scalars>
      >;
  /**
   *
   * Select the `isActive` field on the `User` object. Its type is `Boolean` (a `ScalarStandard` kind of type).
   *
   */
  isActive?:
    | User.isActive$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        User.isActive<_$Scalars>
      >;
  /**
   *
   * Select the `lastLogin` field on the `User` object. Its type is `String` (a `ScalarStandard` kind of type).
   *
   */
  lastLogin?:
    | User.lastLogin$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        User.lastLogin<_$Scalars>
      >;
  /**
   *
   * Select the `createdAt` field on the `User` object. Its type is `String` (a `ScalarStandard` kind of type).
   *
   */
  createdAt?:
    | User.createdAt$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        User.createdAt<_$Scalars>
      >;
  /**
   *
   * Select the `updatedAt` field on the `User` object. Its type is `String` (a `ScalarStandard` kind of type).
   *
   */
  updatedAt?:
    | User.updatedAt$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        User.updatedAt<_$Scalars>
      >;
  /**
   *
   * Select the `projects` field on the `User` object. Its type is `Project` (a `OutputObject` kind of type).
   *
   */
  projects?:
    | User.projects$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        User.projects<_$Scalars>
      >;

  /**
   *
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   *
   */
  ___?: User$FragmentInline<_$Scalars> | User$FragmentInline<_$Scalars>[];

  /**
   *
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   *
   */
  __typename?:
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator$Expanded
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<$$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator>;
}

export interface User$FragmentInline<
  _$Scalars extends
    $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
> extends User<_$Scalars>,
    $$Utilities.DocumentBuilderKit.Select.Directive.$Groups.InlineFragment
      .Fields {}

// ----------------------------------------| Fields |

export namespace User {
  export type id<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > =
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | id$SelectionSet<_$Scalars>;

  export interface id$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `id` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type id$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | id$SelectionSet<_$Scalars>
  >;

  // --------------------------------------------------------------------------------------------------

  export type name<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > =
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | name$SelectionSet<_$Scalars>;

  export interface name$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `name` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type name$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | name$SelectionSet<_$Scalars>
  >;

  // --------------------------------------------------------------------------------------------------

  export type email<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > =
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | email$SelectionSet<_$Scalars>;

  export interface email$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `email` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type email$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | email$SelectionSet<_$Scalars>
  >;

  // --------------------------------------------------------------------------------------------------

  export type role<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > =
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | role$SelectionSet<_$Scalars>;

  export interface role$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `role` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type role$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | role$SelectionSet<_$Scalars>
  >;

  // --------------------------------------------------------------------------------------------------

  export type isActive<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > =
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | isActive$SelectionSet<_$Scalars>;

  export interface isActive$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `isActive` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type isActive$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | isActive$SelectionSet<_$Scalars>
  >;

  // --------------------------------------------------------------------------------------------------

  export type lastLogin<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > =
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | lastLogin$SelectionSet<_$Scalars>;

  export interface lastLogin$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `lastLogin` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type lastLogin$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | lastLogin$SelectionSet<_$Scalars>
  >;

  // --------------------------------------------------------------------------------------------------

  export type createdAt<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > =
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | createdAt$SelectionSet<_$Scalars>;

  export interface createdAt$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `createdAt` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type createdAt$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | createdAt$SelectionSet<_$Scalars>
  >;

  // --------------------------------------------------------------------------------------------------

  export type updatedAt<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > =
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | updatedAt$SelectionSet<_$Scalars>;

  export interface updatedAt$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `updatedAt` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type updatedAt$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | updatedAt$SelectionSet<_$Scalars>
  >;

  // --------------------------------------------------------------------------------------------------

  export type projects<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = projects$SelectionSet<_$Scalars>;

  export interface projects$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base,
      $NamedTypes.$Project<_$Scalars> {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `projects` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type projects$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<projects$SelectionSet<_$Scalars>>;
}

//                                              Category
// --------------------------------------------------------------------------------------------------
//

// ----------------------------------------| Entrypoint Interface |

export interface Category<
  _$Scalars extends
    $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
> extends $$Utilities.DocumentBuilderKit.Select.Bases.ObjectLike {
  /**
   *
   * Select the `id` field on the `Category` object. Its type is `ID` (a `ScalarStandard` kind of type).
   *
   */
  id?:
    | Category.id$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Category.id<_$Scalars>
      >;
  /**
   *
   * Select the `name` field on the `Category` object. Its type is `String` (a `ScalarStandard` kind of type).
   *
   */
  name?:
    | Category.name$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Category.name<_$Scalars>
      >;
  /**
   *
   * Select the `description` field on the `Category` object. Its type is `String` (a `ScalarStandard` kind of type).
   *
   */
  description?:
    | Category.description$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Category.description<_$Scalars>
      >;
  /**
   *
   * Select the `createdAt` field on the `Category` object. Its type is `String` (a `ScalarStandard` kind of type).
   *
   */
  createdAt?:
    | Category.createdAt$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Category.createdAt<_$Scalars>
      >;
  /**
   *
   * Select the `updatedAt` field on the `Category` object. Its type is `String` (a `ScalarStandard` kind of type).
   *
   */
  updatedAt?:
    | Category.updatedAt$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Category.updatedAt<_$Scalars>
      >;
  /**
   *
   * Select the `resumeContents` field on the `Category` object. Its type is `ResumeContent` (a `OutputObject` kind of type).
   *
   */
  resumeContents?:
    | Category.resumeContents$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Category.resumeContents<_$Scalars>
      >;

  /**
   *
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   *
   */
  ___?:
    | Category$FragmentInline<_$Scalars>
    | Category$FragmentInline<_$Scalars>[];

  /**
   *
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   *
   */
  __typename?:
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator$Expanded
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<$$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator>;
}

export interface Category$FragmentInline<
  _$Scalars extends
    $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
> extends Category<_$Scalars>,
    $$Utilities.DocumentBuilderKit.Select.Directive.$Groups.InlineFragment
      .Fields {}

// ----------------------------------------| Fields |

export namespace Category {
  export type id<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > =
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | id$SelectionSet<_$Scalars>;

  export interface id$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `id` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type id$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | id$SelectionSet<_$Scalars>
  >;

  // --------------------------------------------------------------------------------------------------

  export type name<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > =
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | name$SelectionSet<_$Scalars>;

  export interface name$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `name` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type name$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | name$SelectionSet<_$Scalars>
  >;

  // --------------------------------------------------------------------------------------------------

  export type description<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > =
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | description$SelectionSet<_$Scalars>;

  export interface description$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `description` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type description$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | description$SelectionSet<_$Scalars>
  >;

  // --------------------------------------------------------------------------------------------------

  export type createdAt<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > =
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | createdAt$SelectionSet<_$Scalars>;

  export interface createdAt$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `createdAt` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type createdAt$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | createdAt$SelectionSet<_$Scalars>
  >;

  // --------------------------------------------------------------------------------------------------

  export type updatedAt<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > =
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | updatedAt$SelectionSet<_$Scalars>;

  export interface updatedAt$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `updatedAt` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type updatedAt$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | updatedAt$SelectionSet<_$Scalars>
  >;

  // --------------------------------------------------------------------------------------------------

  export type resumeContents<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = resumeContents$SelectionSet<_$Scalars>;

  export interface resumeContents$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base,
      $NamedTypes.$ResumeContent<_$Scalars> {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `resumeContents` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type resumeContents$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<resumeContents$SelectionSet<_$Scalars>>;
}

//                                           ResumeContent
// --------------------------------------------------------------------------------------------------
//

// ----------------------------------------| Entrypoint Interface |

export interface ResumeContent<
  _$Scalars extends
    $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
> extends $$Utilities.DocumentBuilderKit.Select.Bases.ObjectLike {
  /**
   *
   * Select the `id` field on the `ResumeContent` object. Its type is `ID` (a `ScalarStandard` kind of type).
   *
   */
  id?:
    | ResumeContent.id$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        ResumeContent.id<_$Scalars>
      >;
  /**
   *
   * Select the `title` field on the `ResumeContent` object. Its type is `String` (a `ScalarStandard` kind of type).
   *
   */
  title?:
    | ResumeContent.title$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        ResumeContent.title<_$Scalars>
      >;
  /**
   *
   * Select the `description` field on the `ResumeContent` object. Its type is `String` (a `ScalarStandard` kind of type).
   *
   */
  description?:
    | ResumeContent.description$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        ResumeContent.description<_$Scalars>
      >;
  /**
   *
   * Select the `detail` field on the `ResumeContent` object. Its type is `String` (a `ScalarStandard` kind of type).
   *
   */
  detail?:
    | ResumeContent.detail$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        ResumeContent.detail<_$Scalars>
      >;
  /**
   *
   * Select the `categoryId` field on the `ResumeContent` object. Its type is `ID` (a `ScalarStandard` kind of type).
   *
   */
  categoryId?:
    | ResumeContent.categoryId$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        ResumeContent.categoryId<_$Scalars>
      >;
  /**
   *
   * Select the `category` field on the `ResumeContent` object. Its type is `Category` (a `OutputObject` kind of type).
   *
   */
  category?:
    | ResumeContent.category$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        ResumeContent.category<_$Scalars>
      >;
  /**
   *
   * Select the `createdAt` field on the `ResumeContent` object. Its type is `String` (a `ScalarStandard` kind of type).
   *
   */
  createdAt?:
    | ResumeContent.createdAt$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        ResumeContent.createdAt<_$Scalars>
      >;
  /**
   *
   * Select the `updatedAt` field on the `ResumeContent` object. Its type is `String` (a `ScalarStandard` kind of type).
   *
   */
  updatedAt?:
    | ResumeContent.updatedAt$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        ResumeContent.updatedAt<_$Scalars>
      >;

  /**
   *
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   *
   */
  ___?:
    | ResumeContent$FragmentInline<_$Scalars>
    | ResumeContent$FragmentInline<_$Scalars>[];

  /**
   *
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   *
   */
  __typename?:
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator$Expanded
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<$$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator>;
}

export interface ResumeContent$FragmentInline<
  _$Scalars extends
    $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
> extends ResumeContent<_$Scalars>,
    $$Utilities.DocumentBuilderKit.Select.Directive.$Groups.InlineFragment
      .Fields {}

// ----------------------------------------| Fields |

export namespace ResumeContent {
  export type id<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > =
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | id$SelectionSet<_$Scalars>;

  export interface id$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `id` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type id$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | id$SelectionSet<_$Scalars>
  >;

  // --------------------------------------------------------------------------------------------------

  export type title<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > =
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | title$SelectionSet<_$Scalars>;

  export interface title$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `title` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type title$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | title$SelectionSet<_$Scalars>
  >;

  // --------------------------------------------------------------------------------------------------

  export type description<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > =
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | description$SelectionSet<_$Scalars>;

  export interface description$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `description` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type description$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | description$SelectionSet<_$Scalars>
  >;

  // --------------------------------------------------------------------------------------------------

  export type detail<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > =
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | detail$SelectionSet<_$Scalars>;

  export interface detail$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `detail` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type detail$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | detail$SelectionSet<_$Scalars>
  >;

  // --------------------------------------------------------------------------------------------------

  export type categoryId<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > =
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | categoryId$SelectionSet<_$Scalars>;

  export interface categoryId$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `categoryId` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type categoryId$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | categoryId$SelectionSet<_$Scalars>
  >;

  // --------------------------------------------------------------------------------------------------

  export type category<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = category$SelectionSet<_$Scalars>;

  export interface category$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base,
      $NamedTypes.$Category<_$Scalars> {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `category` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type category$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<category$SelectionSet<_$Scalars>>;

  // --------------------------------------------------------------------------------------------------

  export type createdAt<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > =
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | createdAt$SelectionSet<_$Scalars>;

  export interface createdAt$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `createdAt` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type createdAt$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | createdAt$SelectionSet<_$Scalars>
  >;

  // --------------------------------------------------------------------------------------------------

  export type updatedAt<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > =
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | updatedAt$SelectionSet<_$Scalars>;

  export interface updatedAt$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `updatedAt` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type updatedAt$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | updatedAt$SelectionSet<_$Scalars>
  >;
}

//                                              Project
// --------------------------------------------------------------------------------------------------
//

// ----------------------------------------| Entrypoint Interface |

export interface Project<
  _$Scalars extends
    $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
> extends $$Utilities.DocumentBuilderKit.Select.Bases.ObjectLike {
  /**
   *
   * Select the `id` field on the `Project` object. Its type is `ID` (a `ScalarStandard` kind of type).
   *
   */
  id?:
    | Project.id$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Project.id<_$Scalars>
      >;
  /**
   *
   * Select the `title` field on the `Project` object. Its type is `String` (a `ScalarStandard` kind of type).
   *
   */
  title?:
    | Project.title$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Project.title<_$Scalars>
      >;
  /**
   *
   * Select the `description` field on the `Project` object. Its type is `String` (a `ScalarStandard` kind of type).
   *
   */
  description?:
    | Project.description$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Project.description<_$Scalars>
      >;
  /**
   *
   * Select the `userId` field on the `Project` object. Its type is `ID` (a `ScalarStandard` kind of type).
   *
   */
  userId?:
    | Project.userId$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Project.userId<_$Scalars>
      >;
  /**
   *
   * Select the `user` field on the `Project` object. Its type is `User` (a `OutputObject` kind of type).
   *
   */
  user?:
    | Project.user$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Project.user<_$Scalars>
      >;
  /**
   *
   * Select the `createdAt` field on the `Project` object. Its type is `String` (a `ScalarStandard` kind of type).
   *
   */
  createdAt?:
    | Project.createdAt$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Project.createdAt<_$Scalars>
      >;
  /**
   *
   * Select the `updatedAt` field on the `Project` object. Its type is `String` (a `ScalarStandard` kind of type).
   *
   */
  updatedAt?:
    | Project.updatedAt$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Project.updatedAt<_$Scalars>
      >;

  /**
   *
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   *
   */
  ___?: Project$FragmentInline<_$Scalars> | Project$FragmentInline<_$Scalars>[];

  /**
   *
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   *
   */
  __typename?:
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator$Expanded
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<$$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator>;
}

export interface Project$FragmentInline<
  _$Scalars extends
    $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
> extends Project<_$Scalars>,
    $$Utilities.DocumentBuilderKit.Select.Directive.$Groups.InlineFragment
      .Fields {}

// ----------------------------------------| Fields |

export namespace Project {
  export type id<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > =
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | id$SelectionSet<_$Scalars>;

  export interface id$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `id` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type id$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | id$SelectionSet<_$Scalars>
  >;

  // --------------------------------------------------------------------------------------------------

  export type title<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > =
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | title$SelectionSet<_$Scalars>;

  export interface title$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `title` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type title$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | title$SelectionSet<_$Scalars>
  >;

  // --------------------------------------------------------------------------------------------------

  export type description<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > =
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | description$SelectionSet<_$Scalars>;

  export interface description$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `description` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type description$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | description$SelectionSet<_$Scalars>
  >;

  // --------------------------------------------------------------------------------------------------

  export type userId<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > =
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | userId$SelectionSet<_$Scalars>;

  export interface userId$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `userId` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type userId$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | userId$SelectionSet<_$Scalars>
  >;

  // --------------------------------------------------------------------------------------------------

  export type user<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = user$SelectionSet<_$Scalars>;

  export interface user$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base,
      $NamedTypes.$User<_$Scalars> {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `user` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type user$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<user$SelectionSet<_$Scalars>>;

  // --------------------------------------------------------------------------------------------------

  export type createdAt<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > =
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | createdAt$SelectionSet<_$Scalars>;

  export interface createdAt$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `createdAt` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type createdAt$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | createdAt$SelectionSet<_$Scalars>
  >;

  // --------------------------------------------------------------------------------------------------

  export type updatedAt<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > =
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | updatedAt$SelectionSet<_$Scalars>;

  export interface updatedAt$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `updatedAt` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type updatedAt$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | updatedAt$SelectionSet<_$Scalars>
  >;
}

//                                                Blog
// --------------------------------------------------------------------------------------------------
//

// ----------------------------------------| Entrypoint Interface |

export interface Blog<
  _$Scalars extends
    $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
> extends $$Utilities.DocumentBuilderKit.Select.Bases.ObjectLike {
  /**
   *
   * Select the `id` field on the `Blog` object. Its type is `ID` (a `ScalarStandard` kind of type).
   *
   */
  id?:
    | Blog.id$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Blog.id<_$Scalars>
      >;
  /**
   *
   * Select the `title` field on the `Blog` object. Its type is `String` (a `ScalarStandard` kind of type).
   *
   */
  title?:
    | Blog.title$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Blog.title<_$Scalars>
      >;
  /**
   *
   * Select the `content` field on the `Blog` object. Its type is `String` (a `ScalarStandard` kind of type).
   *
   */
  content?:
    | Blog.content$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Blog.content<_$Scalars>
      >;
  /**
   *
   * Select the `summary` field on the `Blog` object. Its type is `String` (a `ScalarStandard` kind of type).
   *
   */
  summary?:
    | Blog.summary$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Blog.summary<_$Scalars>
      >;
  /**
   *
   * Select the `slug` field on the `Blog` object. Its type is `String` (a `ScalarStandard` kind of type).
   *
   */
  slug?:
    | Blog.slug$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Blog.slug<_$Scalars>
      >;
  /**
   *
   * Select the `author` field on the `Blog` object. Its type is `String` (a `ScalarStandard` kind of type).
   *
   */
  author?:
    | Blog.author$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Blog.author<_$Scalars>
      >;
  /**
   *
   * Select the `publishedAt` field on the `Blog` object. Its type is `String` (a `ScalarStandard` kind of type).
   *
   */
  publishedAt?:
    | Blog.publishedAt$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Blog.publishedAt<_$Scalars>
      >;
  /**
   *
   * Select the `status` field on the `Blog` object. Its type is `BlogStatus` (a `Enum` kind of type).
   *
   */
  status?:
    | Blog.status$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Blog.status<_$Scalars>
      >;
  /**
   *
   * Select the `tags` field on the `Blog` object. Its type is `String` (a `ScalarStandard` kind of type).
   *
   */
  tags?:
    | Blog.tags$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Blog.tags<_$Scalars>
      >;
  /**
   *
   * Select the `metaDescription` field on the `Blog` object. Its type is `String` (a `ScalarStandard` kind of type).
   *
   */
  metaDescription?:
    | Blog.metaDescription$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Blog.metaDescription<_$Scalars>
      >;
  /**
   *
   * Select the `createdAt` field on the `Blog` object. Its type is `String` (a `ScalarStandard` kind of type).
   *
   */
  createdAt?:
    | Blog.createdAt$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Blog.createdAt<_$Scalars>
      >;
  /**
   *
   * Select the `updatedAt` field on the `Blog` object. Its type is `String` (a `ScalarStandard` kind of type).
   *
   */
  updatedAt?:
    | Blog.updatedAt$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        Blog.updatedAt<_$Scalars>
      >;

  /**
   *
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   *
   */
  ___?: Blog$FragmentInline<_$Scalars> | Blog$FragmentInline<_$Scalars>[];

  /**
   *
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   *
   */
  __typename?:
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator$Expanded
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<$$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator>;
}

export interface Blog$FragmentInline<
  _$Scalars extends
    $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
> extends Blog<_$Scalars>,
    $$Utilities.DocumentBuilderKit.Select.Directive.$Groups.InlineFragment
      .Fields {}

// ----------------------------------------| Fields |

export namespace Blog {
  export type id<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > =
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | id$SelectionSet<_$Scalars>;

  export interface id$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `id` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type id$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | id$SelectionSet<_$Scalars>
  >;

  // --------------------------------------------------------------------------------------------------

  export type title<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > =
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | title$SelectionSet<_$Scalars>;

  export interface title$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `title` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type title$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | title$SelectionSet<_$Scalars>
  >;

  // --------------------------------------------------------------------------------------------------

  export type content<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > =
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | content$SelectionSet<_$Scalars>;

  export interface content$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `content` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type content$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | content$SelectionSet<_$Scalars>
  >;

  // --------------------------------------------------------------------------------------------------

  export type summary<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > =
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | summary$SelectionSet<_$Scalars>;

  export interface summary$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `summary` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type summary$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | summary$SelectionSet<_$Scalars>
  >;

  // --------------------------------------------------------------------------------------------------

  export type slug<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > =
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | slug$SelectionSet<_$Scalars>;

  export interface slug$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `slug` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type slug$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | slug$SelectionSet<_$Scalars>
  >;

  // --------------------------------------------------------------------------------------------------

  export type author<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > =
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | author$SelectionSet<_$Scalars>;

  export interface author$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `author` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type author$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | author$SelectionSet<_$Scalars>
  >;

  // --------------------------------------------------------------------------------------------------

  export type publishedAt<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > =
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | publishedAt$SelectionSet<_$Scalars>;

  export interface publishedAt$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `publishedAt` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type publishedAt$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | publishedAt$SelectionSet<_$Scalars>
  >;

  // --------------------------------------------------------------------------------------------------

  export type status<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > =
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | status$SelectionSet<_$Scalars>;

  export interface status$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `status` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type status$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | status$SelectionSet<_$Scalars>
  >;

  // --------------------------------------------------------------------------------------------------

  export type tags<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > =
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | tags$SelectionSet<_$Scalars>;

  export interface tags$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `tags` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type tags$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | tags$SelectionSet<_$Scalars>
  >;

  // --------------------------------------------------------------------------------------------------

  export type metaDescription<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > =
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | metaDescription$SelectionSet<_$Scalars>;

  export interface metaDescription$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `metaDescription` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type metaDescription$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | metaDescription$SelectionSet<_$Scalars>
  >;

  // --------------------------------------------------------------------------------------------------

  export type createdAt<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > =
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | createdAt$SelectionSet<_$Scalars>;

  export interface createdAt$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `createdAt` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type createdAt$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | createdAt$SelectionSet<_$Scalars>
  >;

  // --------------------------------------------------------------------------------------------------

  export type updatedAt<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > =
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | updatedAt$SelectionSet<_$Scalars>;

  export interface updatedAt$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `updatedAt` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type updatedAt$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator
    | updatedAt$SelectionSet<_$Scalars>
  >;
}

//                                           UserConnection
// --------------------------------------------------------------------------------------------------
//

// ----------------------------------------| Entrypoint Interface |

export interface UserConnection<
  _$Scalars extends
    $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
> extends $$Utilities.DocumentBuilderKit.Select.Bases.ObjectLike {
  /**
   *
   * Select the `data` field on the `UserConnection` object. Its type is `User` (a `OutputObject` kind of type).
   *
   */
  data?:
    | UserConnection.data$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        UserConnection.data<_$Scalars>
      >;
  /**
   *
   * Select the `pagination` field on the `UserConnection` object. Its type is `PaginationInfo` (a `OutputObject` kind of type).
   *
   */
  pagination?:
    | UserConnection.pagination$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        UserConnection.pagination<_$Scalars>
      >;

  /**
   *
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   *
   */
  ___?:
    | UserConnection$FragmentInline<_$Scalars>
    | UserConnection$FragmentInline<_$Scalars>[];

  /**
   *
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   *
   */
  __typename?:
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator$Expanded
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<$$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator>;
}

export interface UserConnection$FragmentInline<
  _$Scalars extends
    $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
> extends UserConnection<_$Scalars>,
    $$Utilities.DocumentBuilderKit.Select.Directive.$Groups.InlineFragment
      .Fields {}

// ----------------------------------------| Fields |

export namespace UserConnection {
  export type data<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = data$SelectionSet<_$Scalars>;

  export interface data$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base,
      $NamedTypes.$User<_$Scalars> {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `data` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type data$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<data$SelectionSet<_$Scalars>>;

  // --------------------------------------------------------------------------------------------------

  export type pagination<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = pagination$SelectionSet<_$Scalars>;

  export interface pagination$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base,
      $NamedTypes.$PaginationInfo<_$Scalars> {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `pagination` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type pagination$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<pagination$SelectionSet<_$Scalars>>;
}

//                                         CategoryConnection
// --------------------------------------------------------------------------------------------------
//

// ----------------------------------------| Entrypoint Interface |

export interface CategoryConnection<
  _$Scalars extends
    $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
> extends $$Utilities.DocumentBuilderKit.Select.Bases.ObjectLike {
  /**
   *
   * Select the `data` field on the `CategoryConnection` object. Its type is `Category` (a `OutputObject` kind of type).
   *
   */
  data?:
    | CategoryConnection.data$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        CategoryConnection.data<_$Scalars>
      >;
  /**
   *
   * Select the `pagination` field on the `CategoryConnection` object. Its type is `PaginationInfo` (a `OutputObject` kind of type).
   *
   */
  pagination?:
    | CategoryConnection.pagination$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        CategoryConnection.pagination<_$Scalars>
      >;

  /**
   *
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   *
   */
  ___?:
    | CategoryConnection$FragmentInline<_$Scalars>
    | CategoryConnection$FragmentInline<_$Scalars>[];

  /**
   *
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   *
   */
  __typename?:
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator$Expanded
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<$$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator>;
}

export interface CategoryConnection$FragmentInline<
  _$Scalars extends
    $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
> extends CategoryConnection<_$Scalars>,
    $$Utilities.DocumentBuilderKit.Select.Directive.$Groups.InlineFragment
      .Fields {}

// ----------------------------------------| Fields |

export namespace CategoryConnection {
  export type data<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = data$SelectionSet<_$Scalars>;

  export interface data$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base,
      $NamedTypes.$Category<_$Scalars> {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `data` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type data$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<data$SelectionSet<_$Scalars>>;

  // --------------------------------------------------------------------------------------------------

  export type pagination<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = pagination$SelectionSet<_$Scalars>;

  export interface pagination$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base,
      $NamedTypes.$PaginationInfo<_$Scalars> {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `pagination` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type pagination$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<pagination$SelectionSet<_$Scalars>>;
}

//                                      ResumeContentConnection
// --------------------------------------------------------------------------------------------------
//

// ----------------------------------------| Entrypoint Interface |

export interface ResumeContentConnection<
  _$Scalars extends
    $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
> extends $$Utilities.DocumentBuilderKit.Select.Bases.ObjectLike {
  /**
   *
   * Select the `data` field on the `ResumeContentConnection` object. Its type is `ResumeContent` (a `OutputObject` kind of type).
   *
   */
  data?:
    | ResumeContentConnection.data$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        ResumeContentConnection.data<_$Scalars>
      >;
  /**
   *
   * Select the `pagination` field on the `ResumeContentConnection` object. Its type is `PaginationInfo` (a `OutputObject` kind of type).
   *
   */
  pagination?:
    | ResumeContentConnection.pagination$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        ResumeContentConnection.pagination<_$Scalars>
      >;

  /**
   *
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   *
   */
  ___?:
    | ResumeContentConnection$FragmentInline<_$Scalars>
    | ResumeContentConnection$FragmentInline<_$Scalars>[];

  /**
   *
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   *
   */
  __typename?:
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator$Expanded
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<$$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator>;
}

export interface ResumeContentConnection$FragmentInline<
  _$Scalars extends
    $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
> extends ResumeContentConnection<_$Scalars>,
    $$Utilities.DocumentBuilderKit.Select.Directive.$Groups.InlineFragment
      .Fields {}

// ----------------------------------------| Fields |

export namespace ResumeContentConnection {
  export type data<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = data$SelectionSet<_$Scalars>;

  export interface data$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base,
      $NamedTypes.$ResumeContent<_$Scalars> {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `data` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type data$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<data$SelectionSet<_$Scalars>>;

  // --------------------------------------------------------------------------------------------------

  export type pagination<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = pagination$SelectionSet<_$Scalars>;

  export interface pagination$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base,
      $NamedTypes.$PaginationInfo<_$Scalars> {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `pagination` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type pagination$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<pagination$SelectionSet<_$Scalars>>;
}

//                                         ProjectConnection
// --------------------------------------------------------------------------------------------------
//

// ----------------------------------------| Entrypoint Interface |

export interface ProjectConnection<
  _$Scalars extends
    $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
> extends $$Utilities.DocumentBuilderKit.Select.Bases.ObjectLike {
  /**
   *
   * Select the `data` field on the `ProjectConnection` object. Its type is `Project` (a `OutputObject` kind of type).
   *
   */
  data?:
    | ProjectConnection.data$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        ProjectConnection.data<_$Scalars>
      >;
  /**
   *
   * Select the `pagination` field on the `ProjectConnection` object. Its type is `PaginationInfo` (a `OutputObject` kind of type).
   *
   */
  pagination?:
    | ProjectConnection.pagination$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        ProjectConnection.pagination<_$Scalars>
      >;

  /**
   *
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   *
   */
  ___?:
    | ProjectConnection$FragmentInline<_$Scalars>
    | ProjectConnection$FragmentInline<_$Scalars>[];

  /**
   *
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   *
   */
  __typename?:
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator$Expanded
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<$$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator>;
}

export interface ProjectConnection$FragmentInline<
  _$Scalars extends
    $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
> extends ProjectConnection<_$Scalars>,
    $$Utilities.DocumentBuilderKit.Select.Directive.$Groups.InlineFragment
      .Fields {}

// ----------------------------------------| Fields |

export namespace ProjectConnection {
  export type data<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = data$SelectionSet<_$Scalars>;

  export interface data$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base,
      $NamedTypes.$Project<_$Scalars> {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `data` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type data$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<data$SelectionSet<_$Scalars>>;

  // --------------------------------------------------------------------------------------------------

  export type pagination<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = pagination$SelectionSet<_$Scalars>;

  export interface pagination$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base,
      $NamedTypes.$PaginationInfo<_$Scalars> {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `pagination` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type pagination$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<pagination$SelectionSet<_$Scalars>>;
}

//                                           BlogConnection
// --------------------------------------------------------------------------------------------------
//

// ----------------------------------------| Entrypoint Interface |

export interface BlogConnection<
  _$Scalars extends
    $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
> extends $$Utilities.DocumentBuilderKit.Select.Bases.ObjectLike {
  /**
   *
   * Select the `data` field on the `BlogConnection` object. Its type is `Blog` (a `OutputObject` kind of type).
   *
   */
  data?:
    | BlogConnection.data$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        BlogConnection.data<_$Scalars>
      >;
  /**
   *
   * Select the `pagination` field on the `BlogConnection` object. Its type is `PaginationInfo` (a `OutputObject` kind of type).
   *
   */
  pagination?:
    | BlogConnection.pagination$Expanded<_$Scalars>
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<
        BlogConnection.pagination<_$Scalars>
      >;

  /**
   *
   * Inline fragments for field groups.
   *
   * Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
   * selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
   *
   * @see https://spec.graphql.org/draft/#sec-Inline-Fragments
   *
   */
  ___?:
    | BlogConnection$FragmentInline<_$Scalars>
    | BlogConnection$FragmentInline<_$Scalars>[];

  /**
   *
   * A meta field. Is the name of the type being selected.
   *
   * @see https://graphql.org/learn/queries/#meta-fields
   *
   */
  __typename?:
    | $$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator$Expanded
    | $$Utilities.DocumentBuilderKit.Select.SelectAlias.SelectAlias<$$Utilities.DocumentBuilderKit.Select.Indicator.NoArgsIndicator>;
}

export interface BlogConnection$FragmentInline<
  _$Scalars extends
    $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
> extends BlogConnection<_$Scalars>,
    $$Utilities.DocumentBuilderKit.Select.Directive.$Groups.InlineFragment
      .Fields {}

// ----------------------------------------| Fields |

export namespace BlogConnection {
  export type data<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = data$SelectionSet<_$Scalars>;

  export interface data$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base,
      $NamedTypes.$Blog<_$Scalars> {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `data` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type data$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<data$SelectionSet<_$Scalars>>;

  // --------------------------------------------------------------------------------------------------

  export type pagination<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = pagination$SelectionSet<_$Scalars>;

  export interface pagination$SelectionSet<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > extends $$Utilities.DocumentBuilderKit.Select.Bases.Base,
      $NamedTypes.$PaginationInfo<_$Scalars> {}

  // --- expanded ---

  /**
   *
   * This is the "expanded" version of the `pagination` type. It is identical except for the fact
   * that IDEs will display its contents (a union type) directly, rather than the name of this type.
   * In some cases, this is a preferable DX, making the types easier to read for users.
   *
   */
  export type pagination$Expanded<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = $$Utilities.Simplify<pagination$SelectionSet<_$Scalars>>;
}

/**
 * [1] These definitions serve to allow field selection interfaces to extend their respective object type without
 *     name clashing between the field name and the object name.
 *
 *     For example imagine `Query.Foo` field with type also called `Foo`. Our generated interfaces for each field
 *     would end up with an error of `export interface Foo extends Foo ...`
 */
export namespace $NamedTypes {
  export type $Query<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = Query<_$Scalars>;
  export type $Mutation<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = Mutation<_$Scalars>;
  export type $UserRole = UserRole;
  export type $BlogStatus = BlogStatus;
  export type $SortDirection = SortDirection;
  export type $CreateUserInput<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = CreateUserInput<_$Scalars>;
  export type $UpdateUserInput<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = UpdateUserInput<_$Scalars>;
  export type $CreateCategoryInput<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = CreateCategoryInput<_$Scalars>;
  export type $UpdateCategoryInput<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = UpdateCategoryInput<_$Scalars>;
  export type $CreateResumeContentInput<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = CreateResumeContentInput<_$Scalars>;
  export type $UpdateResumeContentInput<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = UpdateResumeContentInput<_$Scalars>;
  export type $CreateProjectInput<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = CreateProjectInput<_$Scalars>;
  export type $UpdateProjectInput<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = UpdateProjectInput<_$Scalars>;
  export type $CreateBlogInput<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = CreateBlogInput<_$Scalars>;
  export type $UpdateBlogInput<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = UpdateBlogInput<_$Scalars>;
  export type $LoginInput<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = LoginInput<_$Scalars>;
  export type $RegisterInput<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = RegisterInput<_$Scalars>;
  export type $ChangePasswordInput<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = ChangePasswordInput<_$Scalars>;
  export type $PaginationInfo<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = PaginationInfo<_$Scalars>;
  export type $LoginResponse<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = LoginResponse<_$Scalars>;
  export type $TokenPair<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = TokenPair<_$Scalars>;
  export type $User<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = User<_$Scalars>;
  export type $Category<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = Category<_$Scalars>;
  export type $ResumeContent<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = ResumeContent<_$Scalars>;
  export type $Project<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = Project<_$Scalars>;
  export type $Blog<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = Blog<_$Scalars>;
  export type $UserConnection<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = UserConnection<_$Scalars>;
  export type $CategoryConnection<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = CategoryConnection<_$Scalars>;
  export type $ResumeContentConnection<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = ResumeContentConnection<_$Scalars>;
  export type $ProjectConnection<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = ProjectConnection<_$Scalars>;
  export type $BlogConnection<
    _$Scalars extends
      $$Utilities.Schema.Scalar.Registry = $$Utilities.Schema.Scalar.Registry.Empty,
  > = BlogConnection<_$Scalars>;
}
