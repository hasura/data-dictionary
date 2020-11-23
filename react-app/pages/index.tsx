import Head from "next/head"
import Link from "next/link"
import { useState } from "react"

import { useStoreState } from "../store"
import { SearchInput } from "../components/SearchInput"

import { Table } from "../components/table"

export default function Home() {
  return (
    <div>
      <Head>
        <title>Hasura Data Dictionary</title>
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

  // const graphqlSchema = useStoreState(store => store.graphqlSchema)
  // const queryType = graphqlSchema.getQueryType()
  // const graphqlQueryFields = queryType?.getFields()

  // const graphqlFieldColumns = []
  // for (const fieldName in graphqlQueryFields) {
  //   const field = graphqlQueryFields[fieldName]
  //   graphqlFieldColumns.push({
  //     name: field.name,
  //     type: field.type.toString(),
  //     description: field.description,
  //     source: "Postgres"
  //   })
  // }

  return (
    <div className="w-5/6 py-10 mx-auto">
      <h1 className="text-3xl">Data models in MyAPI.com</h1>
      <SearchInput
        className="bg-red-700"
        placeholder="Search for models"
        onChange={e => setSearch(e.target.value)}
      />
      <Table
        headers={[
          {
            key: "name",
            displayName: "Model Name",
          },
          {
            key: "comment",
            displayName: "Description",
          },
          {
            key: "source",
            displayName: "Source",
          },
        ]}
        columns={Object.entries(tablesMetadata || {}).map(([tableName, it]) => {
          if (!tableName.match(search)) return {}
          return {
            name: it.table.name,
            comment: it.database_table?.comment,
            source: "Postgres",
          }
        })}
        Header={header => (
          <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-50">
            {header.displayName}
          </th>
        )}
        Cell={cell => (
          <Link href={"/models/database/" + cell.column[cell.header.key]}>
            <td className="px-2 py-4 whitespace-no-wrap">
              <div className="flex items-center">
                <div className="ml-4">
                  <div className="text-sm font-medium leading-5 text-gray-900 cursor-pointer">
                    {cell.column[cell.header.key]}
                  </div>
                </div>
              </div>
            </td>
          </Link>
        )}
      />
      {/* <Table
        headers={[
          {
            key: "name",
            displayName: "GraphQL Name"
          },
          {
            key: "description",
            displayName: "Description"
          },
          {
            key: "type",
            displayName: "Type"
          },
          {
            key: "source",
            displayName: "Source"
          }
        ]}
        columns={graphqlFieldColumns}
        Header={header => (
          <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-50">
            {header.displayName}
          </th>
        )}
        Cell={value => (
          <Link href={"/models/database/" + value}>
            <td className="px-2 py-4 whitespace-no-wrap">
              <div className="flex items-center">
                <div className="ml-4">
                  <div className="text-sm font-medium leading-5 text-gray-900">
                    {value}
                  </div>
                </div>
              </div>
            </td>
          </Link>
        )}
      /> */}
    </div>
  )
}
