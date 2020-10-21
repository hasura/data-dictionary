import { SchemaVisualizer } from "../../components/visualization"

import {
  FlowChartWithState,
  INodeInnerDefaultProps,
  IChart,
} from "@mrblenny/react-flow-chart"

import { Table, TableProps } from "../../components/table"
import { GroupedMetadataAndPostgresTables } from "../../store/utils"
import { sampleGroupedMetadataAndPostgresTables } from "../../utils/sampleGroupedMetadataResult"

type ValueOf<T> = T[keyof T]

/**
 * Converts one of the grouped metadata objects to headers and column values for display in <Table> component
 */
function groupedMetadataToDatavizTableProps(
  metadata: ValueOf<GroupedMetadataAndPostgresTables>
): TableProps {
  return {
    headers: [
      {
        key: "column",
        displayName: "Column"
      },
      {
        key: "type",
        displayName: "Type"
      },
      {
        key: "comment",
        displayName: "Comment"
      }
    ],
    columns: metadata.database_table.columns.map(col => ({
      column: col.column_name,
      type: col.udt_name,
      comment: col.column_default
    }))
  }
}

/**
 * Converts the entirety of the grouped metadata object into an object structure that @mrblenny/react-flow-chart can render
 * TODO: This doesn't seem to handle join-tables, like "film_category" in the "film <-> film_category <-> category" relationship structure
 */ 
function groupedMetadataToChartNodeStructure(
  metadata: GroupedMetadataAndPostgresTables
): IChart {
  const tablesPerRow = 5
  let currentTable = 0

  let xOffset = 0
  let yOffset = 0

  const xOffsetIncrement = 900
  const yOffsetIncrement = 900

  const getXOffset = () => {
    if (currentTable % tablesPerRow == 0) xOffset = 0
    xOffset += xOffsetIncrement
    return xOffset
  }

  const getYOffset = () => {
    if (currentTable % tablesPerRow == 0) yOffset += yOffsetIncrement
    return yOffset
  }

  const res = {
    scale: 1,
    offset: { x: 0, y: 0 },
    nodes: {},
    links: {},
    selected: {},
    hovered: {}
  } as IChart

  for (const entry of Object.values(metadata)) {
    currentTable += 1
    let currentXOffset = getXOffset()
    let currentYOffset = getYOffset()

    // A child relationship might have created this entry already, in the loop below
    // If not, init the current table's "node" object
    if (!res.nodes[entry.table.name]) {
      res.nodes[entry.table.name] = {
        id: entry.table.name,
        type: "input-output",
        position: {
          x: currentXOffset,
          y: currentYOffset
        },
        ports: {}
      }
    }

    // Find all related tables by searching where the table's foreign key referenced table = the current table's name
    const relatedTables = Object.values(metadata).filter(it =>
      it.database_table.foreign_keys.find(
        fk => fk.ref_table == entry.table.name
      )
    )

    // Create a "port" on the node containing a unique ID, which later we need to create a "link" to, in the top-level object
    for (const relatedTable of relatedTables) {
      const relatedFields = relatedTable.database_table.foreign_keys.filter(
        fk => fk.ref_table == entry.table.name
      )

      for (const field of relatedFields) {
        const columnMappings = Object.entries(field.column_mapping)
        for (const [refColumn, selfColumn] of columnMappings) {
          // Port creation
          res.nodes[entry.table.name].ports[selfColumn as string] ||= {
            id: selfColumn as string,
            type: "input-output"
          }

          // Check if the node/port we are about to reference in the link below on the other table already exists
          // If not, we need to create it
          if (!res.nodes[relatedTable.table.name]) {
            currentTable += 1
            let currentXOffset = getXOffset()
            let currentYOffset = getYOffset()
            res.nodes[relatedTable.table.name] = {
              id: relatedTable.table.name,
              type: "read-only",
              position: {
                x: currentXOffset,
                y: currentYOffset
              },
              ports: {}
            }
          }

          // Create a "port" on the related table's "node" that contains the referring column name
          // So that the UI can connect the two ports with a "link" later
          Object.assign(res.nodes[relatedTable.table.name].ports, {
            [refColumn as string]: {
              id: refColumn,
              type: "input-output",
              properties: {
                // TODO: Maybe put some metadata here for styling/identifying ports
              }
            }
          })

          // Create the "link" between the two tables while we're here in the relationship
          const linkName = entry.table.name + "_" + relatedTable.table.name
          res.links[linkName] = {
            id: linkName,
            from: {
              nodeId: entry.table.name,
              portId: selfColumn as string
            },
            to: {
              nodeId: relatedTable.table.name,
              portId: refColumn
            },
            properties: {
              // TODO: Maybe put some metadata here for styling/identifying links
            }
          }
        }
      }
    }
  }

  console.log("Got result:", res)
  return res
}

/**
 * Custom "node" component for the chart, rendering the table schema
 */
const NodeInnerCustom = ({ node, config }: INodeInnerDefaultProps) => {
  const tableValues = groupedMetadataToDatavizTableProps(
    sampleGroupedMetadataAndPostgresTables[node.id]
  )
  return (
    <div className="text-lg text-center rounded-lg shadow-md">
      <p className="p-2 capitalize">{node.id}</p>
      <Table
        headers={tableValues.headers}
        columns={tableValues.columns}
      />
    </div>
  )
}

// This is the value of grouped metadata taken from store and saved as variable for testing
const testChart = groupedMetadataToChartNodeStructure(
  sampleGroupedMetadataAndPostgresTables
)

export default function Datagraph() {
  return (
    <div>
      <div className="flex max-h-screen">
        <FlowChartWithState
          initialValue={testChart}
          config={{ smartRouting: false, readonly: true }}
          Components={{
            NodeInner: NodeInnerCustom
          }}
        />
      </div>

      <SchemaVisualizer />
    </div>
  )
}
