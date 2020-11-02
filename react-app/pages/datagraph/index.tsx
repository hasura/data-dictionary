import React, { useEffect, useState } from "react"

import { useRouter } from "next/router"
import useDimensions from "react-cool-dimensions"
import Modal from "react-modal"

import { useStoreState } from "../../store"
import { SchemaVisualizer } from "../../components/visualization"

export const customModalStyles = {
  content: {
    margin: "auto",
    maxHeight: "400px",
    maxWidth: "600px"
  }
}

export default function Datagraph() {
  const router = useRouter()
  const { ref, width, height } = useDimensions()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedNode, setSelectedNode] = useState()
  const graphedData = useStoreState(store => store.graphedData)

  const toggleModal = () => setIsModalOpen(prev => !prev)
  const navToModel = () => router.push(`/models/database/${selectedNode?.id}`)
  const onSelectNode = node => {
    setSelectedNode(node)
    toggleModal()
  }

  Modal.setAppElement("#graphmain")

  if (!graphedData) {
    return null
  }

  return (
    <div ref={ref} style={{ width: "100%", height: "100%" }}>
      <SchemaVisualizer
        width={width}
        height={height}
        {...graphedData}
        onSelectNode={onSelectNode}
      />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={toggleModal}
        contentLabel="details modal"
        style={customModalStyles}
      >
        <NodeDetails {...selectedNode} />
        <button
          className="px-4 py-2 my-2 font-bold rounded"
          onClick={toggleModal}
        >
          Close modal
        </button>
        <button
          className="px-4 py-2 my-2 mr-4 font-bold text-white bg-blue-500 rounded"
          onClick={navToModel}
        >
          Detail page
        </button>
      </Modal>
    </div>
  )
}
const NodeDetails = ({
  id,
  array_relationships,
  object_relationships,
  remote_relationships,
  __typename
}) => {
  return (
    <div className="flex-initial">
      <h2 className="text-xl font-bold">{id}</h2>
      <div className="flex-initial">
        <p>Array relationships: {array_relationships?.length || 0}</p>
        {array_relationships?.map(ar => (
          <p key={ar.name} className="px-6">
            {ar.using.foreign_key_constraint_on
              ? `Foreign key constraint on column ${ar.using.foreign_key_constraint_on.column} of table ${ar.using.foreign_key_constraint_on.table.name}`
              : `Manual configuration: ${JSON.stringify(
                  ar.manual_configuration
                )}`}
          </p>
        ))}
        <p>Object relationships: {object_relationships?.length || 0}</p>
        {object_relationships?.map(or => (
          <p key={or.name} className="px-6">
            {or.using.foreign_key_constraint_on
              ? `Foreign key constraint on ${or.using.foreign_key_constraint_on}`
              : `Manual configuration: ${JSON.stringify(
                  or.using.manual_configuration
                )}`}
          </p>
        ))}
      </div>
    </div>
  )
}
