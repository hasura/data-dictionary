import React, { useEffect, useState } from 'react'
import {useRouter } from 'next/router'
import useDimensions from "react-cool-dimensions"
import Modal from 'react-modal';

import { useStoreState } from "../../store"
import { SchemaVisualizer } from "../../components/visualization"

const customModalStyles = {
  content : {
    margin: 'auto',
    maxHeight: '400px',
    maxWidth: '600px'
  }
};

export default function Datagraph() {
  const tablesMetadata = useStoreState(store => store.groupedMetadataAndDatabaseTables)
  const {ref, width, height} = useDimensions()
  const router = useRouter()
  const [data, setData] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedNode, setSelectedNode] = useState()

  const toggleModal = () => setIsModalOpen(prev => !prev)

  const navToModel = () => router.push(`/models/database/${selectedNode.id}`)

  const onSelectNode = (node) => {
    setSelectedNode(node)
    toggleModal(true)
  }

  async function loadData() {
    if (!tablesMetadata) {
        return null
    }
    let nodes = Object.entries(tablesMetadata).map(([tableName, value]) =>  ({ ...value, id: tableName }))
    let links = nodes.map((val) =>  {
    const arrays = val.array_relationships?.map(rel => ({
        ...rel,
        target: val.id,
        source: rel.using.foreign_key_constraint_on.table.name
    })) || []
    const objects = val.object_relationships?.map(rel => {
      const target = nodes.find(x => x.id === val.id)
      const sourcekey = rel?.using?.foreign_key_constraint_on || rel?.using?.manual_configuration?.remote_table?.name
      const sourcenode = val.database_table.foreign_keys?.find(fk => fk.column_mapping[sourcekey])
      const source = nodes.find(x => x.id === sourcenode.ref_table)
        return {
          ...rel,
          target,
          source
        }
      }) || []
      const all_relationships = arrays.concat(objects)
      return all_relationships
    }).filter(l => l.length > 0).flat()
    setTimeout(() => setData({ nodes, links }), 500)
  }

   useEffect(() => {
      if(tablesMetadata) {
        Modal.setAppElement('#graphmain');
        loadData();
      }
    },[tablesMetadata])

  console.log('selectedNode: ', selectedNode)

  return (
    <div ref={ref} style={{ width: "100%", height: "100%"}}>
      <SchemaVisualizer width={width} height={height} {...data} onSelectNode={onSelectNode} />
      <Modal isOpen={isModalOpen} onRequestClose={toggleModal} contentLabel="details modal" style={customModalStyles}>
        <NodeDetails {...selectedNode} />
        <button className="font-bold py-2 px-4 my-2 rounded" onClick={toggleModal}>Close modal</button>
        <button className="font-bold py-2 px-4 my-2 mr-4 rounded bg-blue-500 text-white" onClick={navToModel}>Detail page</button>
      </Modal>
    </div>
  )
}

const NodeDetails = ({id, array_relationships, object_relationships, remote_relationships, __typename }) => {
  return (
    <div className="flex-initial">
      <h2 className="text-xl font-bold">{id}</h2>
      <div className="flex-initial" >
        <p>Array relationships: {array_relationships?.length || 0}</p>
        {array_relationships?.map(ar => <p className="px-6">{ar.using.foreign_key_constraint_on ? `Foreign key constraint on column ${ar.using.foreign_key_constraint_on.column} of table ${ar.using.foreign_key_constraint_on.table.name}` : `Manual configuration: ${JSON.stringify(ar.manual_configuration)}`}</p>)}
        <p>Object relationships: {object_relationships?.length || 0}</p>
        {object_relationships?.map(or => <p className="px-6">{or.using.foreign_key_constraint_on ? `Foreign key constraint on ${or.using.foreign_key_constraint_on}` : `Manual configuration: ${JSON.stringify(or.using.manual_configuration)}`}</p>)}
      </div>
    </div>
  )
}