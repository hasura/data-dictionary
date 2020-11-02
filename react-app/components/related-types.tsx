import React, { useEffect, useRef, useState } from "react"
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
  forceCollide
} from "d3-force"
import { zoom } from "d3-zoom"
import { select } from "d3-selection"
import { Table, TableProps } from "./table"

const LinkComponent = ({ link }: { link: Link }) => {
  const isArray = link.__typename === "ArrayRelationship"
  return (
    <line
      stroke={isArray ? "red" : "blue"}
      strokeWidth="2"
      key={link.index}
      x1={link.source.x + (isArray ? 5 : 0)}
      y1={link.source.y + (isArray ? 5 : 0)}
      x2={link.target.x + (isArray ? 5 : 0)}
      y2={link.target.y + (isArray ? 5 : 0)}
    />
  )
}

const NodeComponent = ({
  node,
  onSelectNode
}: {
  node: Node
  onSelectNode: RelatedVisualizerProps["onSelectNode"]
}) => {
  const targetRef = useRef()
  const [dimensions, setDimensions] = useState({ width: 120, height: 80 })

  useEffect(() => {
    if (targetRef?.current) {
      setDimensions({
        width: (targetRef as any)?.current?.offsetWidth,
        height: (targetRef as any)?.current?.offsetHeight
      })
    }
  }, [node])

  const handleClick = () => (onSelectNode ? onSelectNode(node) : null)

  let indexes = (node as any).database_table.indexes.map(i => ({
    name: i.index_name,
    keys: i.index_keys.toString(),
    info: i.index_type
  }))
  let keys = (node as any).database_table.foreign_keys.map(f => ({
    name: f.constraint_name,
    keys: `${f.ref_table}.${Object.keys(f.column_mapping).toString()}`,
    info: ""
  }))

  return (
    <foreignObject
      x={node.x - dimensions.width / 2}
      y={node.y - dimensions.height / 2}
      height={dimensions.height}
      width={dimensions.width}
    >
      <div ref={targetRef} style={{ minWidth: 400, minHeight: 200 }}>
        <h1 className="p-2 text-lg font-bold text-gray-800 bg-white">
          {node.id}
        </h1>
        <Table
          headers={[
            {
              key: "name",
              displayName: "Type"
            },
            {
              key: "keys",
              displayName: "Field"
            },
            {
              key: "info",
              displayName: "Info"
            }
          ]}
          columns={[...indexes, ...keys]}
          Header={header => (
            <th
              key={header.displayName}
              className="px-4 py-2 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-50"
            >
              {header.displayName}
            </th>
          )}
          Cell={cell => (
            <td
              className="px-2 py-2 whitespace-no-wrap"
              onClick={() => cell.header.onClick(cell.column)}
            >
              <div className="flex items-center">
                <div className="ml-2">
                  <div className="text-sm font-medium leading-5 text-gray-900">
                    {cell.column[cell.header.key]}
                  </div>
                </div>
              </div>
            </td>
          )}
        />
      </div>
    </foreignObject>
  )
}

export interface Node {
  x: number
  y: number
  id: number
}

export interface Link {
  __typename: string
  index: number
  source: {
    x: number
    y: number
  }
  target: {
    x: number
    y: number
  }
}

export interface RelatedVisualizerProps {
  width: number
  height: number
  nodes: Node[]
  links: Link[]
  onSelectNode: (node: Node) => any
}

/**
 * Requires width, height, nodes (with x, y, id) and links (with __typename, source.x, source.y, target.x, target.y)
 */
export function RelatedVisualizer({
  width,
  height,
  nodes,
  links,
  onSelectNode
}: RelatedVisualizerProps) {
  const [simData, setSimData] = useState<{
    nodes: Node[]
    links: Link[]
  }>()

  console.log("RelatedVisualizer render with nodes/links:", { nodes, links })

  async function loadSim() {
    const datacopy = Object.assign({}, { nodes, links })
    console.log("loadSim called, datacopy is", datacopy)

    var simulation = forceSimulation()
      .nodes(datacopy.nodes)
      .force(
        "link",
        forceLink()
          .id(function(d) {
            return d.id
          })
          .distance(250)
          .links(datacopy.links)
      )
      .force(
        "charge",
        forceManyBody()
          .strength(-200)
          .distanceMax(250)
      )
      .force("collision", forceCollide().radius(250))
      .force("center", forceCenter(width / 2, height / 2))
      .stop()
    simulation.tick(200)
    setTimeout(
      () => setSimData({ nodes: datacopy.nodes, links: datacopy.links }),
      800
    )
  }

  async function loadSvg() {
    const svg = select("svg")
    const svgGroup = svg.selectAll("g")
    const zoom_handler = zoom().on("zoom", function(event) {
      svgGroup.attr("transform", event.transform)
    })
    zoom_handler(svg)
  }

  /**
   * We need to 1) run the simulation and then 2) load the SVG with the results
   */
  useEffect(() => {
    if (nodes && links) {
      loadSim()
    }
  }, [nodes, links])

  useEffect(() => {
    if (simData) {
      loadSvg()
    }
  }, [simData])

  if (!simData || !width) {
    return null
  }

  return (
    <svg
      id="vizgraph"
      width={width}
      height={height}
      style={{ backgroundColor: "#f0f0f0" }}
    >
      <g>
        {simData.links.map((link, index) => (
          <LinkComponent link={link} key={index} />
        ))}

        {simData.nodes.map((node, index) => (
          <NodeComponent node={node} key={index} onSelectNode={onSelectNode} />
        ))}
      </g>
    </svg>
  )
}
