import { action, thunk, computed } from "easy-peasy"
import type { Action, Thunk, Computed } from "easy-peasy"

import {
  getIntrospectionQuery,
  buildClientSchema,
  GraphQLSchema,
} from "graphql"

import type { IntrospectionQuery } from "graphql"

import { client } from "../utils/graphqlClient"

import { metadataAndPostgresSelectionSet } from "../utils/querySelectionSets"
import type { MetadataAndPostgresQueryResult } from "../utils/querySelectionSets"

import {
  groupMetadataAndPostgresInfoByTableName,
  buildGraphedData,
  buildGraphedMap,
  findRoleNamesInMetadata,
} from "./utils"

import type {
  GroupedMetadataAndPostgresTables,
  GraphedData,
  GraphedMap,
} from "./utils"

/**
 * =====================
 *  STORE TYPES
 * =====================
 */

type Maybe<T> = T | null

export interface Store {
  search: Maybe<string>
  currentRole: string
  currentTryItOutOperationName: Maybe<string>
  introspectionQuery: Maybe<IntrospectionQuery>
  graphqlSchema: Maybe<GraphQLSchema>
  metadata: Maybe<MetadataAndPostgresQueryResult["metadata"]>
  database: Maybe<MetadataAndPostgresQueryResult["postgres"]>

  setCurrentRole: Action<Store, string>
  setIntrospectionQuery: Action<Store, IntrospectionQuery>
  setGraphQLSchema: Action<Store, GraphQLSchema>
  setCurrentTryItOutOperationName: Action<Store, string>
  setMetadata: Action<Store, MetadataAndPostgresQueryResult["metadata"]>
  setDatabase: Action<Store, MetadataAndPostgresQueryResult["postgres"]>

  loadMetadataAndDatabaseInfo: Thunk<Store, undefined>
  loadGraphQLSchemaByIntrospection: Thunk<Store, undefined>

  allRoles: Computed<Store, string[]>
  graphedData: Computed<Store, Maybe<GraphedData>>
  graphedMap: Computed<Store, Maybe<GraphedMap>>
  groupedMetadataAndDatabaseTables: Computed<
    Store,
    Maybe<GroupedMetadataAndPostgresTables>
  >
}

/**
 * =====================
 *  STORE MODEL
 * =====================
 */

const model: Store = {
  search: null,
  currentRole: "admin",
  metadata: null,
  database: null,
  currentTryItOutOperationName: null,
  introspectionQuery: null,
  graphqlSchema: null,
  setCurrentRole: action((state, payload) => {
    state.currentRole = payload
  }),
  setMetadata: action((state, payload) => {
    state.metadata = payload
  }),
  setDatabase: action((state, payload) => {
    state.database = payload
  }),
  setCurrentTryItOutOperationName: action((state, payload) => {
    state.currentTryItOutOperationName = payload
  }),
  setIntrospectionQuery: action((state, payload) => {
    state.introspectionQuery = payload
  }),
  setGraphQLSchema: action((state, payload) => {
    state.graphqlSchema = payload
  }),
  loadMetadataAndDatabaseInfo: thunk(async (actions, _payload) => {
    const request = await client.query(metadataAndPostgresSelectionSet)
    actions.setMetadata(request.metadata)
    actions.setDatabase(request.postgres)
  }),
  loadGraphQLSchemaByIntrospection: thunk(
    async (actions, _payload, helpers) => {
      const endpoint = process.env.NEXT_PUBLIC_HASURA_URL
        ? process.env.NEXT_PUBLIC_HASURA_URL + "/v1/graphql"
        : "http://localhost:8085/v1/graphql"

      const request = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Hasura-Admin-Secret":
            process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET || "",
          "X-Hasura-Role": helpers.getState().currentRole || "admin",
        },
        body: JSON.stringify({
          query: getIntrospectionQuery(),
        }),
      })
      const result = await request.json()
      const introspectionQuery: IntrospectionQuery = result.data
      const schema = buildClientSchema(introspectionQuery)
      actions.setGraphQLSchema(schema)
    }
  ),
  allRoles: computed(state => {
    if (!state.metadata) return [] as string[]
    return findRoleNamesInMetadata(state.metadata) as string[]
  }),
  groupedMetadataAndDatabaseTables: computed(state => {
    if (!state.metadata || !state.database) return null
    return groupMetadataAndPostgresInfoByTableName({
      metadata: state.metadata,
      postgres: state.database,
      role: state.currentRole,
    })
  }),
  graphedData: computed(state => {
    if (!state.groupedMetadataAndDatabaseTables) return null
    return buildGraphedData(state.groupedMetadataAndDatabaseTables)
  }),
  graphedMap: computed(state => {
    if (!state.graphedData) return null
    return buildGraphedMap(state.graphedData)
  }),
}

export default model
