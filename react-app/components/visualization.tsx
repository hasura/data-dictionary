import { useRef, useEffect, useState } from "react"

import { Group } from "@visx/group"
import { hierarchy, Tree } from "@visx/hierarchy"
import { LinkHorizontal } from "@visx/shape"
import { Zoom } from "@visx/zoom"
import { localPoint } from "@visx/event"
import { scaleLinear } from "@visx/scale"

const MOCK_DATA = {
  label: "Artist",
  fields: { id: "int[4]", name: "nvarchar[240]" },
  children: [
    {
      label: "Album",
      fields: { id: "uuid", artist_id: "int[4]", time: "int[4]" },
      children: [
        {
          label: "Track",
          fields: { id: "int[4]", title: "text" },
        },
      ],
    },
    {
      label: "Mocked",
      fields: { id: "uuid", artist_id: "int[4]", time: "int[4]" },
    },
  ],
}

const initialTransform = {
  scaleX: 1,
  scaleY: 1,
  translateX: 120,
  translateY: 30,
  skewX: 0,
  skewY: 0,
}

const MockNode = ({ node: { x, y, data } }) => {
  const targetRef = useRef()
  const [dimensions, setDimensions] = useState({ width: 80, height: 80 })
  const list = Object.entries(data.fields)

  useEffect(() => {
    if (targetRef.current) {
      setDimensions({
        width: targetRef.current.offsetWidth,
        height: targetRef.current.offsetHeight,
      })
    }
  }, [])

  return (
    <foreignObject
      x={y - dimensions.width / 2}
      y={x - dimensions.height / 2}
      height={dimensions.height}
      width={dimensions.width}
    >
      <table
        ref={targetRef}
        style={{
          color: "white",
          backgroundColor: "rgba(0,0,0,0.6)",
          padding: 10,
          borderRadius: 4,
        }}
      >
        <thead>
          <tr>
            <th colSpan={2} style={{ textAlign: "start" }}>
              {data.label}
            </th>
          </tr>
        </thead>
        <tbody>
          {list.map(item => (
            <tr>
              <td>{item[0]}</td>
              <td style={{ fontFamily: "monospace", paddingLeft: 10 }}>
                {item[1]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </foreignObject>
  )
}

const MockLink = ({ link }) => {
  return (
    <LinkHorizontal
      key={link.source.x + link.source.y + link.target.x + link.target.y}
      data={link}
      stroke="rgb(254,110,158,0.6)"
      strokeWidth="1"
      fill="none"
    />
  )
}
const width = 180
const margin = {
  top: 30,
  left: width / 2 + 20,
  right: width / 2 + 20,
  bottom: 30,
}
const totalWidth = 700
const totalHeight = 400
const innerWidth = totalWidth - margin.left - margin.right
const innerHeight = totalHeight - margin.top - margin.bottom

export function SchemaVisualizer() {
  return (
    <Zoom
      width={totalWidth}
      height={totalHeight}
      scaleXMin={1 / 2}
      scaleXMax={4}
      scaleYMin={1 / 2}
      scaleYMax={4}
      transformMatrix={initialTransform}
    >
      {zoom => (
        <div>
          <svg
            width={totalWidth}
            height={totalHeight}
            style={{ cursor: zoom.isDragging ? "grabbing" : "grab" }}
          >
            <rect
              width={totalWidth}
              height={totalHeight}
              rx={14}
              fill="#272b4d"
            />
            <Group
              top={margin.top}
              left={margin.left}
              transform={zoom.toString()}
            >
              <Tree
                root={hierarchy(MOCK_DATA, d => d.children)}
                size={[innerHeight, innerWidth]}
                nodeComponent={MockNode}
                linkComponent={MockLink}
              />
            </Group>
            <rect
              width={totalWidth}
              height={totalHeight}
              rx={14}
              fill="transparent"
              onTouchStart={zoom.dragStart}
              onTouchMove={zoom.dragMove}
              onTouchEnd={zoom.dragEnd}
              onMouseDown={zoom.dragStart}
              onMouseMove={zoom.dragMove}
              onMouseUp={zoom.dragEnd}
              onMouseLeave={() => {
                if (zoom.isDragging) zoom.dragEnd()
              }}
            />
          </svg>
        </div>
      )}
    </Zoom>
  )
}
