import React, { useEffect, useState } from "react"
import { forceSimulation ,forceLink, forceManyBody, forceCenter, forceCollide } from 'd3-force'
import { zoom } from 'd3-zoom'
import { select } from 'd3-selection'

const LinkComponent = ({ link }) => {
  const isArray = link.__typename === "ObjectRelationship"
    return <line stroke={isArray ? "red" : "blue"} strokeWidth="2" key={link.index} x1={link.source.x + (isArray ? 5 : 0)} y1={link.source.y + (isArray ? 5 : 0)} x2={link.target.x  + (isArray ? 5 : 0)} y2={link.target.y  + (isArray ? 5 : 0)} />
}

const NodeComponent = ({ node, onSelectNode }) => {
  const width = 250
  const height = 80
  const x = node.x - width / 2
  const y = node.y - height / 2
  const handleClick = () => onSelectNode(node)
  return (
    <g style={{ cursor: 'pointer' }} onClick={handleClick}>
      <rect x={x} y={y} rx={15} width={width} height={height} fill="white" />
      <text x={node.x} y={node.y + 10} fill="black" textAnchor="middle" style={{ fontSize: 24, fontWeight: 'bold' }}>{node.id}</text>
    </g>
  )
}

/**
 * Requires width, height, nodes (with x, y, id) and links (with __typename, source.x, source.y, target.x, target.y)
 */
export function SchemaVisualizer({ width, height, nodes, links, onSelectNode }) {
    const [simData, setSimData] = useState()

    async function loadSim() {
      const datacopy = Object.assign({}, {nodes, links})
      var simulation = forceSimulation()
        .nodes(datacopy.nodes)
        .force("link", forceLink()
            .id(function(d) { return d.id; })
            .distance(250)
            .links(datacopy.links)
        )
        .force('charge', forceManyBody().strength(-200).distanceMax(250))
        .force('collision', forceCollide().radius(180))
        .force('center', forceCenter(width / 2, height / 2))
        .stop();
      simulation.tick(200);
      setTimeout(() => setSimData({ nodes: datacopy.nodes, links: datacopy.links }), 800)
    }

    async function loadSvg() {
      // Checks for previous zoom location on load
      const initTransform = sessionStorage.getItem('graphviz_transform')
      const svg = select('svg')
      const svgGroup = svg.selectAll("g")
      if (initTransform) {
        svgGroup.attr("transform", initTransform)
      }
      var zoom_handler = zoom()
        .on("zoom", function (event){
            sessionStorage.setItem('graphviz_transform', event.transform)
            svgGroup.attr("transform", event.transform);
        });
      zoom_handler(svg);
    }

    /**
     * We need to 1) run the simulation and then 2) load the SVG with the results
     */
    useEffect(() => {
      if(nodes && links) {
        loadSim();
      }
    },[nodes, links])

    useEffect(() => {
      if (simData) {
        loadSvg();
      }
    },[simData])

    if (!simData) {
      return null
    }

    return (
      <svg id="vizgraph" width={width} height={height} style={{ backgroundColor: '#D2D2D2'}}>
        <g>
          {
              simData.links.map((link, index) => <LinkComponent link={link} key={index} />)
          }
        </g>
        {
            simData.nodes.map((node, index) => <NodeComponent node={node} key={index} onSelectNode={onSelectNode} />)
        }
      </svg>
    )
}