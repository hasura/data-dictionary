import { action, thunk, computed } from "easy-peasy"
import type { Action, Thunk, Computed } from "easy-peasy"

import { client } from '../utils/graphqlClient'

import { metadataAndPostgresSelectionSet } from '../utils/querySelectionSets'
import type { MetadataAndPostgresQueryResult} from '../utils/querySelectionSets'

import { groupMetadataAndPostgresInfoByTableName } from './utils'
import type { GroupedMetadataAndPostgresTables } from './utils'

/**
 * =====================
 *  STORE TYPES
 * =====================
 */


export interface Store {
  search: string
  metadata?: MetadataAndPostgresQueryResult['metadata']
  database?: MetadataAndPostgresQueryResult['postgres']

  setMetadata: Action<Store, MetadataAndPostgresQueryResult['metadata']>
  setDatabase: Action<Store, MetadataAndPostgresQueryResult['postgres']>

  loadMetadataAndDatabaseInfo: Thunk<Store>

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
  setMetadata: action((state, payload) => {
    state.metadata = payload
  }),
  setDatabase: action((state, payload) => {
    state.database = payload
  }),
  loadMetadataAndDatabaseInfo: thunk(async (actions, _payload) => {
    const request = await client.query(metadataAndPostgresSelectionSet)
    actions.setMetadata(request.metadata)
    actions.setDatabase(request.postgres)
  }),
  groupedMetadataAndDatabaseTables: computed((state) => {
    return groupMetadataAndPostgresInfoByTableName({
      metadata: state.metadata,
      postgres: state.database
    })
  })
}

export default model
