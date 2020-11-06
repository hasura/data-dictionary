import React, { useEffect, useState } from "react"
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
  forceCollide
} from "d3-force"
import { zoom } from "d3-zoom"
import { select } from "d3-selection"

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
  onSelectNode: SchemaVisualizerProps["onSelectNode"]
}) => {
  const width = 250
  const height = 80
  const x = node.x - width / 2
  const y = node.y - height / 2
  const handleClick = () => (onSelectNode ? onSelectNode(node) : null)
  return (
    <g style={{ cursor: "pointer" }} onClick={handleClick}>
      <rect x={x} y={y} rx={15} width={width} height={height} fill="#e2e8f0" />
      <text
        x={node.x}
        y={node.y + 10}
        fill="black"
        textAnchor="middle"
        style={{ fontSize: 24, fontWeight: "bold" }}
      >
        {node.id}
      </text>
    </g>
  )
}

export interface Node {
  x: number
  y: number
  id: number
}

export interface Link {
  type: string
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

export interface SchemaVisualizerProps {
  width: number
  height: number
  nodes: Node[]
  links: Link[]
  onSelectNode: (node: Node) => any
}

/**
 * Requires width, height, nodes (with x, y, id) and links (with __typename, source.x, source.y, target.x, target.y)
 */
export function SchemaVisualizer({
  width,
  height,
  nodes,
  links,
  onSelectNode
}: SchemaVisualizerProps) {
  const [simData, setSimData] = useState<{
    nodes: Node[]
    links: Link[]
  }>()

  console.log("SchemaVisualizer render with nodes/links:", { nodes, links })

  async function loadSim() {
    const datacopy = Object.assign({}, { nodes, links })
    var simulation = forceSimulation()
      .nodes(datacopy.nodes)
      .force(
        "link",
        forceLink()
          .id(function(d) {
            return d.id
          })
          .distance(200)
          .links(datacopy.links)
      )
      .force(
        "charge",
        forceManyBody()
          .strength(-200)
          .distanceMax(250)
      )
      .force("collision", forceCollide().radius(200))
      .force("center", forceCenter(width / 2, height / 2))
      .stop()
    simulation.tick(300)
    setTimeout(
      () => setSimData({ nodes: datacopy.nodes, links: datacopy.links }),
      800
    )
  }

  async function loadSvg() {
    // Checks for previous zoom location on load
    const initTransform = sessionStorage.getItem("graphviz_transform")
    const svg = select("svg")
    const svgGroup = svg.selectAll("g")
    if (initTransform) {
      svgGroup.attr("transform", initTransform)
    }
    const zoom_handler = zoom().on("zoom", function(event) {
      sessionStorage.setItem("graphviz_transform", event.transform)
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
    return (
      <div style={{
        display: 'flex',
        width: width || 800,
        height: height || 400,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#f0f0f0"
      }}>
        <p>Loading...</p>
      </div>
    )
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
      </g>
      {simData.nodes.map((node, index) => (
        <NodeComponent node={node} key={index} onSelectNode={onSelectNode} />
      ))}
    </svg>
  )
}
