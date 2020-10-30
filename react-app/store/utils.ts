import * as _ from "lodash"
import type { MetadataAndPostgresQueryResult } from "../utils/querySelectionSets"

interface GroupMetadataAndPostgresInfoParams {
  metadata: MetadataAndPostgresQueryResult["metadata"]
  postgres: MetadataAndPostgresQueryResult["postgres"]
}

/**
 * Takes the "Metadata" and "Postgres" query results from GraphQL API service,
 * and combines the table values by grouping/keying them by table name
 */
export function groupMetadataAndPostgresInfoByTableName(
  params: GroupMetadataAndPostgresInfoParams
) {
  const combinedTables = params.metadata?.tables.map(metadataTable => {
    const allTables = params.postgres?.schemas.map(schema => schema.tables)
    const table = _.flatten(allTables).find(it => it.table_name == metadataTable.table.name)
    return { ...metadataTable, database_table: table, id: table.table_name }
  })
  return _.keyBy(combinedTables, it => it.table.name)
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

  const links = nodes
      .map(val => {
        const arrays =
          val.array_relationships?.map(rel => ({
            ...rel,
            target: val,
            source: nodes.find(n => n.id === rel.using.foreign_key_constraint_on.table.name)
          })) || []

        const objects =
          val.object_relationships?.map(rel => {
            const target = nodes.find(x => x.id === val.id)
            const sourcekey =
              rel?.using?.foreign_key_constraint_on ||
              rel?.using?.manual_configuration?.remote_table?.name
            const sourcenode = val.database_table.foreign_keys?.find(
              fk => fk.column_mapping[sourcekey]
            )
            const source = nodes.find(x => x.id === sourcenode.ref_table)
            return {
              ...rel,
              target,
              source
            }
          }) || []

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
        const tar = l.target.id ? l.target.id : l.target
        const sor = l.source.id ? l.source.id : l.source
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
        .map(m => firstAdj[m].filter(x => x !== n.id && !firstAdj[n.id].includes(x)))
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