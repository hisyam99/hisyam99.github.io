import * as $$SelectionSets from "./selection-sets.js";
import type * as $$Utilities from "graffle/utilities-for-generated";

//
//
//
//
//
//
// ==================================================================================================
//                                      Select Methods Interface
// ==================================================================================================
//
//
//
//
//
//

export interface $MethodsSelect {
  Query: Query;
  Mutation: Mutation;
  PaginationInfo: PaginationInfo;
  LoginResponse: LoginResponse;
  TokenPair: TokenPair;
  User: User;
  Category: Category;
  ResumeContent: ResumeContent;
  Project: Project;
  Blog: Blog;
  UserConnection: UserConnection;
  CategoryConnection: CategoryConnection;
  ResumeContentConnection: ResumeContentConnection;
  ProjectConnection: ProjectConnection;
  BlogConnection: BlogConnection;
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

export interface Query {
  <$SelectionSet>(
    selectionSet: $$Utilities.Exact<$SelectionSet, $$SelectionSets.Query>,
  ): $SelectionSet;
}

export interface Mutation {
  <$SelectionSet>(
    selectionSet: $$Utilities.Exact<$SelectionSet, $$SelectionSets.Mutation>,
  ): $SelectionSet;
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

export interface PaginationInfo {
  <$SelectionSet>(
    selectionSet: $$Utilities.Exact<
      $SelectionSet,
      $$SelectionSets.PaginationInfo
    >,
  ): $SelectionSet;
}

export interface LoginResponse {
  <$SelectionSet>(
    selectionSet: $$Utilities.Exact<
      $SelectionSet,
      $$SelectionSets.LoginResponse
    >,
  ): $SelectionSet;
}

export interface TokenPair {
  <$SelectionSet>(
    selectionSet: $$Utilities.Exact<$SelectionSet, $$SelectionSets.TokenPair>,
  ): $SelectionSet;
}

export interface User {
  <$SelectionSet>(
    selectionSet: $$Utilities.Exact<$SelectionSet, $$SelectionSets.User>,
  ): $SelectionSet;
}

export interface Category {
  <$SelectionSet>(
    selectionSet: $$Utilities.Exact<$SelectionSet, $$SelectionSets.Category>,
  ): $SelectionSet;
}

export interface ResumeContent {
  <$SelectionSet>(
    selectionSet: $$Utilities.Exact<
      $SelectionSet,
      $$SelectionSets.ResumeContent
    >,
  ): $SelectionSet;
}

export interface Project {
  <$SelectionSet>(
    selectionSet: $$Utilities.Exact<$SelectionSet, $$SelectionSets.Project>,
  ): $SelectionSet;
}

export interface Blog {
  <$SelectionSet>(
    selectionSet: $$Utilities.Exact<$SelectionSet, $$SelectionSets.Blog>,
  ): $SelectionSet;
}

export interface UserConnection {
  <$SelectionSet>(
    selectionSet: $$Utilities.Exact<
      $SelectionSet,
      $$SelectionSets.UserConnection
    >,
  ): $SelectionSet;
}

export interface CategoryConnection {
  <$SelectionSet>(
    selectionSet: $$Utilities.Exact<
      $SelectionSet,
      $$SelectionSets.CategoryConnection
    >,
  ): $SelectionSet;
}

export interface ResumeContentConnection {
  <$SelectionSet>(
    selectionSet: $$Utilities.Exact<
      $SelectionSet,
      $$SelectionSets.ResumeContentConnection
    >,
  ): $SelectionSet;
}

export interface ProjectConnection {
  <$SelectionSet>(
    selectionSet: $$Utilities.Exact<
      $SelectionSet,
      $$SelectionSets.ProjectConnection
    >,
  ): $SelectionSet;
}

export interface BlogConnection {
  <$SelectionSet>(
    selectionSet: $$Utilities.Exact<
      $SelectionSet,
      $$SelectionSets.BlogConnection
    >,
  ): $SelectionSet;
}

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
//                                             Interface
// ==================================================================================================
//
//
//
//
//
//
