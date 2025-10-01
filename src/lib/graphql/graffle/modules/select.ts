import * as $$Data from "./data.js";
import * as $$Schema from "./schema.js";
import * as $$SelectionSets from "./selection-sets.js";
import type { OperationTypeNode } from "graphql";
import type * as $$Utilities from "graffle/utilities-for-generated";

//
//
//
//
//
//
// ==================================================================================================
//                                              Runtime
// ==================================================================================================
//
//
//
//
//
//

import { createSelect } from "graffle/client";
export const Select = createSelect($$Data.Name);

//
//
//
//
//
//
// ==================================================================================================
//                                             Buildtime
// ==================================================================================================
//
//
//
//
//
//

export namespace Select {
  //                                                Root
  // --------------------------------------------------------------------------------------------------
  //
  export type Query<$SelectionSet extends $$SelectionSets.Query> =
    $$Utilities.DocumentBuilderKit.InferResult.Operation<
      $SelectionSet,
      $$Schema.Schema,
      OperationTypeNode.QUERY
    >;
  export type Mutation<$SelectionSet extends $$SelectionSets.Mutation> =
    $$Utilities.DocumentBuilderKit.InferResult.Operation<
      $SelectionSet,
      $$Schema.Schema,
      OperationTypeNode.MUTATION
    >;
  //                                            OutputObject
  // --------------------------------------------------------------------------------------------------
  //
  export type PaginationInfo<
    $SelectionSet extends $$SelectionSets.PaginationInfo,
  > = $$Utilities.DocumentBuilderKit.InferResult.OutputObjectLike<
    $SelectionSet,
    $$Schema.Schema,
    $$Schema.Schema["allTypes"]["PaginationInfo"]
  >;
  export type LoginResponse<
    $SelectionSet extends $$SelectionSets.LoginResponse,
  > = $$Utilities.DocumentBuilderKit.InferResult.OutputObjectLike<
    $SelectionSet,
    $$Schema.Schema,
    $$Schema.Schema["allTypes"]["LoginResponse"]
  >;
  export type TokenPair<$SelectionSet extends $$SelectionSets.TokenPair> =
    $$Utilities.DocumentBuilderKit.InferResult.OutputObjectLike<
      $SelectionSet,
      $$Schema.Schema,
      $$Schema.Schema["allTypes"]["TokenPair"]
    >;
  export type User<$SelectionSet extends $$SelectionSets.User> =
    $$Utilities.DocumentBuilderKit.InferResult.OutputObjectLike<
      $SelectionSet,
      $$Schema.Schema,
      $$Schema.Schema["allTypes"]["User"]
    >;
  export type Category<$SelectionSet extends $$SelectionSets.Category> =
    $$Utilities.DocumentBuilderKit.InferResult.OutputObjectLike<
      $SelectionSet,
      $$Schema.Schema,
      $$Schema.Schema["allTypes"]["Category"]
    >;
  export type ResumeContent<
    $SelectionSet extends $$SelectionSets.ResumeContent,
  > = $$Utilities.DocumentBuilderKit.InferResult.OutputObjectLike<
    $SelectionSet,
    $$Schema.Schema,
    $$Schema.Schema["allTypes"]["ResumeContent"]
  >;
  export type Project<$SelectionSet extends $$SelectionSets.Project> =
    $$Utilities.DocumentBuilderKit.InferResult.OutputObjectLike<
      $SelectionSet,
      $$Schema.Schema,
      $$Schema.Schema["allTypes"]["Project"]
    >;
  export type Blog<$SelectionSet extends $$SelectionSets.Blog> =
    $$Utilities.DocumentBuilderKit.InferResult.OutputObjectLike<
      $SelectionSet,
      $$Schema.Schema,
      $$Schema.Schema["allTypes"]["Blog"]
    >;
  export type UserConnection<
    $SelectionSet extends $$SelectionSets.UserConnection,
  > = $$Utilities.DocumentBuilderKit.InferResult.OutputObjectLike<
    $SelectionSet,
    $$Schema.Schema,
    $$Schema.Schema["allTypes"]["UserConnection"]
  >;
  export type CategoryConnection<
    $SelectionSet extends $$SelectionSets.CategoryConnection,
  > = $$Utilities.DocumentBuilderKit.InferResult.OutputObjectLike<
    $SelectionSet,
    $$Schema.Schema,
    $$Schema.Schema["allTypes"]["CategoryConnection"]
  >;
  export type ResumeContentConnection<
    $SelectionSet extends $$SelectionSets.ResumeContentConnection,
  > = $$Utilities.DocumentBuilderKit.InferResult.OutputObjectLike<
    $SelectionSet,
    $$Schema.Schema,
    $$Schema.Schema["allTypes"]["ResumeContentConnection"]
  >;
  export type ProjectConnection<
    $SelectionSet extends $$SelectionSets.ProjectConnection,
  > = $$Utilities.DocumentBuilderKit.InferResult.OutputObjectLike<
    $SelectionSet,
    $$Schema.Schema,
    $$Schema.Schema["allTypes"]["ProjectConnection"]
  >;
  export type BlogConnection<
    $SelectionSet extends $$SelectionSets.BlogConnection,
  > = $$Utilities.DocumentBuilderKit.InferResult.OutputObjectLike<
    $SelectionSet,
    $$Schema.Schema,
    $$Schema.Schema["allTypes"]["BlogConnection"]
  >;
  //                                               Union
  // --------------------------------------------------------------------------------------------------
  //

  //                                             Interface
  // --------------------------------------------------------------------------------------------------
  //
}
