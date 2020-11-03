import * as _ from "lodash"
import type { MetadataAndPostgresQueryResult } from "../utils/querySelectionSets"

interface GroupMetadataAndPostgresInfoParams {
  metadata: MetadataAndPostgresQueryResult["metadata"]
  postgres: MetadataAndPostgresQueryResult["postgres"]
  role: string
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
  const allTables = params.postgres?.schemas?.flatMap(schema => schema.tables)

  // "Combined Tables" is the result of merging Hasura Metadata tables with Postgres Tables
  const combinedTables = params.metadata?.tables?.map(metadataTable => {
    const table = allTables?.find(it => it?.table_name == metadataTable.table?.name)
    return { id: metadataTable.table?.name, ...metadataTable, database_table: table }
  })

  // This could probably done in a single pass, in the code above
  const roleFilteredCombinedTables = combinedTables?.filter(it => {
    // If the selected role is "admin", always return every table
    if (params.role == 'admin') return true
    // Else, check whether the select permissions include the current role
    return it?.select_permissions?.some(perm => perm.role == params.role)
  })

  // Key the results by table name to turn it into a dictionary for easier name-based lookups
  return _.keyBy(roleFilteredCombinedTables, it => it?.table?.name)
}

export type GroupedMetadataAndPostgresTables = ReturnType<
  typeof groupMetadataAndPostgresInfoByTableName
>

/**
 * Takes the grouped metadata and delivers a condensed set of nodes and links
 */
export function buildGraphedData(
  params: GroupedMetadataAndPostgresTables
) {
  const nodes = Object.values(params)
  const role = nodes[0].select_permissions[0].role
  
  const links = nodes
      .map(val => {
        const arrays =
          val.array_relationships?.map(rel => {
            const source = nodes.find(n => n.id === rel.using.foreign_key_constraint_on.table.name)
            if (source?.select_permissions[0].role === role) {
              return {
                ...rel,
                target: val,
                source: nodes.find(n => n.id === rel.using.foreign_key_constraint_on.table.name)
              }
            }
            return null
          })
          .filter(x => x !== null) || []
        const objects =
          val.object_relationships?.map(rel => {
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
                source
              }
            }
            return null
          }).filter(x => x !== null) || []
        const all_relationships = [...arrays, ...objects]
        return all_relationships
      })
      .filter(l => l.length > 0)
      .flat()
      
  return { nodes, links }
}

export type GraphedData = ReturnType<
  typeof buildGraphedData
>

/**
 * Takes the set of nodes and links and delivers an "adjacency list"
 * https://www.educative.io/blog/data-structures-101-graphs-javascript
 */
export function buildGraphedMap(
  params: GraphedData
) {
  const { nodes, links } = params

  const firstAdj = nodes
    .map(n => {
      let adj = []
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
        [n.id]: Array.from(new Set(adj))
      }
    })
    .reduce((obj, item) => Object.assign(obj, item), {})

  const graphedMap = nodes
    .map(n => {
      const adj = firstAdj[n.id]
        .map(m => firstAdj[m] ? firstAdj[m].filter(x => x !== n.id && !firstAdj[n.id].includes(x)) : [])
        .flat()
      return {
        [n.id]: {
          first: firstAdj[n.id],
          second: Array.from(new Set(adj))
        }
      }
    })
    .reduce((obj, item) => Object.assign(obj, item), {})
  return graphedMap
}

export type GraphedMap = ReturnType<
  typeof buildGraphedMap
>