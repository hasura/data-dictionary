import {
  GraphQLSchema,
  getNamedType,
  getNullableType,
  isObjectType,
} from "graphql"
import * as _ from "lodash"
import type { MetadataAndPostgresQueryResult } from "../utils/querySelectionSets"

interface GroupMetadataAndPostgresInfoParams {
  metadata: MetadataAndPostgresQueryResult["metadata"]
  postgres: MetadataAndPostgresQueryResult["postgres"]
  role: string
}

/**
 * Extracts all unique roles from Hasura metadata
 * Used for displaying role-selection modal options
 */
export function findRoleNamesInMetadata(
  metadata: MetadataAndPostgresQueryResult["metadata"]
) {
  if (!metadata || !metadata.tables) return ["admin"]

  const allRoles = metadata.tables
    .flatMap(table =>
      [
        table.select_permissions,
        table.insert_permissions,
        table.delete_permissions,
        table.update_permissions,
      ].flat()
    )
    .map(permission => permission?.role)
    .filter(Boolean)

  return Array.from(new Set(allRoles)).concat("admin")
}

interface GetColumnAliasParams {
  tableName: string
  columnName: string
  metadata: MetadataAndPostgresQueryResult["metadata"]
}

/**
 * Tries to find an alias/custom column mapping in
 * metadata for a particular column.
 *
 * If a custom column name exists, that is returned,
 * else the original column name is returned.
 */
export function getColumnAliasIfExists(params: GetColumnAliasParams) {
  const metadataTable = params.metadata?.tables?.find(
    it => it.table?.name == params.tableName
  )
  const customColumnMapping =
    metadataTable?.configuration?.custom_column_names[params.columnName]
  const trueColumnName = customColumnMapping || params.columnName
  return trueColumnName
}

interface MapDatabaseColumnTypeToGraphQLTypeParams {
  tableName: string
  columnName: string
  graphqlSchema: GraphQLSchema
  metadata: MetadataAndPostgresQueryResult["metadata"]
}

/**
 * Maps the type of a database column to it's GraphQL type.
 * This only works by convention in Hasura: It assumes standard root query names.
 *
 * IE, for "albums" table and the field "title", there will be a default query "albums" which returns "[album!]"
 * This method tries to look up the query name matching the table name, and then the field name matching the column name
 * so it will break if these have been modified.
 *
 * There's probably a better solution for this that involves some fancy logic.
 */
export function mapDatabaseColumnTypeToGraphQLType(
  params: MapDatabaseColumnTypeToGraphQLTypeParams
) {
  const queryRoot = params.graphqlSchema.getQueryType()
  if (!queryRoot) throw new Error("No query root found")
  const queries = queryRoot.getFields()
  const table = queries[params.tableName]
  const tableType = getNamedType(table.type)
  if (!isObjectType(tableType)) throw new Error("Not an object type")
  const fields = tableType.getFields()
  const column = getColumnAliasIfExists(params)
  const fieldType = fields[column].type
  // Use "getNullableType" here to remove the bang "!" from types, like "String!"
  return getNullableType(fieldType).toString()
}

/**
 * Takes the "Metadata" and "Postgres" query results from GraphQL API service,
 * and combines the table values by grouping/keying them by table name
 *
 * NOTE: This could be memoized for performance, the results are deterministic
 */
export function groupMetadataAndPostgresInfoByTableName(
  params: GroupMetadataAndPostgresInfoParams
) {
  if (!params.metadata || !params.metadata.tables) return null
  if (!params.postgres || !params.postgres.schemas) return null

  const allTables = params.postgres.schemas.flatMap(schema => schema.tables)

  // "Combined Tables" is the result of merging Hasura Metadata tables with Postgres Tables
  const combinedTables = params.metadata.tables.map(metadataTable => {
    const table = allTables.find(
      it => it?.table_name == metadataTable.table?.name
    )

    if (!table) {
      console.log(
        `Could not find PG table matching metadata table: ${metadataTable.table?.name}`
      )
      // throw new Error(
      //   `Could not find PG table matching metadata table: ${metadataTable.table?.name}`
      // )
    }

    return {
      id: table?.table_name,
      database_table: table,
      ...metadataTable,
    }
  })

  // This could probably done in a single pass, in the code above
  const roleFilteredCombinedTables = combinedTables.filter(it => {
    // If the selected role is "admin", always return every table
    if (params.role == "admin") return true
    // Else, check whether the select permissions include the current role
    return it.select_permissions?.some(perm => perm.role == params.role)
  })

  // Key the results by table name to turn it into a dictionary for easier name-based lookups
  return _.keyBy(
    roleFilteredCombinedTables,
    it => it.database_table?.table_name
  )
}

export type GroupedMetadataAndPostgresTables = ReturnType<
  typeof groupMetadataAndPostgresInfoByTableName
>

/**
 * Takes the grouped metadata and delivers a condensed set of nodes and links
 */
export function buildGraphedData(params: GroupedMetadataAndPostgresTables) {
  if (!params) return null

  const nodes = Object.values(params)

  const role = nodes[0]?.select_permissions?.[0].role || "admin"
  if (!role) {
    return null
    // throw new Error("Failed to find role from nodes")
  }

  const links = nodes
    .map(val => {
      const arrays =
        val.array_relationships
          ?.map(rel => {
            const source = nodes.find(
              n => n.id === rel.using.foreign_key_constraint_on?.table.name
            )
            if (source?.select_permissions?.[0].role === role) {
              return {
                ...rel,
                target: val,
                source: nodes.find(
                  n => n.id === rel.using.foreign_key_constraint_on?.table.name
                ),
              }
            }
            return null
          })
          .filter(x => x !== null) || []
      const objects =
        val.object_relationships
          ?.map(rel => {
            const target = nodes.find(x => x.id === val.id)
            const sourcekey =
              rel?.using?.foreign_key_constraint_on ||
              rel?.using?.manual_configuration?.remote_table?.name
            const sourcenode = val.database_table?.foreign_keys?.find(
              fk => fk.column_mapping[sourcekey]
            )
            const source = nodes.find(x => x.id === sourcenode?.ref_table)
            if (source) {
              return {
                ...rel,
                target,
                source,
              }
            }
            return null
          })
          .filter(x => x !== null) || []
      const all_relationships = [...arrays, ...objects]
      return all_relationships
    })
    .filter(l => l.length > 0)
    .flat()

  return { nodes, links }
}

export type GraphedData = ReturnType<typeof buildGraphedData>

/**
 * Takes the set of nodes and links and delivers an "adjacency list"
 * https://www.educative.io/blog/data-structures-101-graphs-javascript
 */
export function buildGraphedMap(params: GraphedData) {
  if (!params) return null
  const { nodes, links } = params

  const firstAdj = nodes
    .map(n => {
      let adj: string[] = []
      links.map(l => {
        const tar = l.target?.id ? l.target?.id : l.target
        const sor = l.source?.id ? l.source?.id : l.source
        if (tar === n.id) {
          adj.push(sor)
        } else if (sor === n.id) {
          adj.push(tar)
        }
      })
      return {
        [n.id]: Array.from(new Set(adj)),
      }
    })
    .reduce((obj, item) => Object.assign(obj, item), {})

  const graphedMap = nodes
    .map(n => {
      const adj = firstAdj[n.id]
        .map(m =>
          firstAdj[m]
            ? firstAdj[m].filter(x => x !== n.id && !firstAdj[n.id].includes(x))
            : []
        )
        .flat()
      return {
        [n.id]: {
          first: firstAdj[n.id],
          second: Array.from(new Set(adj)),
        },
      }
    })
    .reduce((obj, item) => Object.assign(obj, item), {})
  return graphedMap
}

export type GraphedMap = ReturnType<typeof buildGraphedMap>
