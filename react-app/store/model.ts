import { action, thunk, computed } from "easy-peasy"
import type { Action, Thunk, Computed } from "easy-peasy"

import { getIntrospectionQuery, buildClientSchema, GraphQLSchema } from 'graphql'
import type { IntrospectionQuery } from 'graphql'

import { client } from '../utils/graphqlClient'

import { metadataAndPostgresSelectionSet } from '../utils/querySelectionSets'
import type { MetadataAndPostgresQueryResult } from '../utils/querySelectionSets'

import { groupMetadataAndPostgresInfoByTableName } from './utils'
import type { GroupedMetadataAndPostgresTables } from './utils'

/**
 * =====================
 *  STORE TYPES
 * =====================
 */


export interface Store {
  search: string
  currentTryItOutOperationName: string
  introspectionQuery: IntrospectionQuery
  metadata: MetadataAndPostgresQueryResult['metadata']
  database: MetadataAndPostgresQueryResult['postgres']

  setIntrospectionQuery: Action<Store, IntrospectionQuery>
  setcurrentTryItOutOperationName: Action<Store, string>
  setMetadata: Action<Store, MetadataAndPostgresQueryResult['metadata']>
  setDatabase: Action<Store, MetadataAndPostgresQueryResult['postgres']>

  loadMetadataAndDatabaseInfo: Thunk<Store, null>
  loadGraphQLSchemaByIntrospection: Thunk<Store, null>

  graphqlSchema: Computed<Store, GraphQLSchema | null>
  groupedMetadataAndDatabaseTables: Computed<Store, GroupedMetadataAndPostgresTables>
}

/**
 * =====================
 *  STORE MODEL
 * =====================
 */

const model: Store = {
  search: "",
  metadata: null,
  database: null,
  currentTryItOutOperationName: null,
  introspectionQuery: null,
  setMetadata: action((state, payload) => {
    state.metadata = payload
  }),
  setDatabase: action((state, payload) => {
    state.database = payload
  }),
  setcurrentTryItOutOperationName: action((state, payload) => {
    state.currentTryItOutOperationName = payload
  }),
  setIntrospectionQuery: action((state, payload) => {
    state.introspectionQuery = payload
  }),
  loadMetadataAndDatabaseInfo: thunk(async (actions, _payload) => {
    const request = await client.query(metadataAndPostgresSelectionSet)
    actions.setMetadata(request.metadata)
    actions.setDatabase(request.postgres)
  }),
  loadGraphQLSchemaByIntrospection: thunk(async (actions, _payload) => {
    // TODO: Replace with dynamic value
    const request = await fetch('http://localhost:8085/v1/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: getIntrospectionQuery()
      })
    })
    const result = await request.json()
    const introspectionQuery: IntrospectionQuery = result.data
    actions.setIntrospectionQuery(introspectionQuery)
  }),
  graphqlSchema: computed((state) => {
    if (!state.introspectionQuery) return null
    return buildClientSchema(state.introspectionQuery)
  }),
  groupedMetadataAndDatabaseTables: computed((state) => {
    return groupMetadataAndPostgresInfoByTableName({
      metadata: state.metadata,
      postgres: state.database
    })
  })
}

export default model
