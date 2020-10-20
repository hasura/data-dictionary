import Head from "next/head"
import styles from "../styles/Home.module.css"

import { useState, useEffect } from "react"
import { useStoreState, useStoreActions } from "../store"

export default function Home() {
  const loadMetadataAndDatabaseInfo = useStoreActions(
    store => store.loadMetadataAndDatabaseInfo
  )

  // TODO: Figure out loading this on app init, and not inside of a component
  useEffect(() => {
    loadMetadataAndDatabaseInfo()
  }, [])

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <DataModels />
    </div>
  )
}

const DataModels = () => {
  const [search, setSearch] = useState("")
  const tablesMetadata = useStoreState(
    store => store.groupedMetadataAndDatabaseTables
  )

  const models = Object.entries(tablesMetadata).map(([tableName, value]) => {
    if (!tableName.match(search)) return
    return (
      <div className="p-4">
        <p>Name: {tableName}</p>
        <p>Columns:</p>
        <ul className="list-disc list-inside">
          {value.database_table?.columns?.map(it => (
            <li>
              {it.column_name} ({it.udt_name})
            </li>
          ))}
        </ul>
        <hr />
      </div>
    )
  })

  return (
    <div>
      <h1 className="text-lg">Search:</h1>
      <input
        className="bg-gray-200"
        onChange={e => setSearch(e.target.value)}
      />
      <hr />
      {models}
    </div>
  )
}
