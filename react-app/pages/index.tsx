import Head from "next/head"
import Link from "next/link"

import { useState } from "react"
import { useStoreState } from "../store"

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

const SearchInput = props => (
  <div className="pt-2 mx-auto text-gray-600">
    <label>
      <input
        className="h-10 px-5 pr-16 text-sm bg-white border-2 border-gray-300 rounded-lg focus:outline-none"
        name="search"
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
      <button
        type="submit"
        className="transform -translate-x-8 translate-y-1 focus:outline-none"
        onClick={props.onSubmit}
      >
        <svg
          className="w-4 h-4 text-gray-600 fill-current pb-1"
          version="1.1"
          id="Capa_1"
          x="0px"
          y="0px"
          viewBox="0 0 56.966 56.966"
          width="512px"
          height="512px"
        >
          <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
        </svg>
      </button>
    </label>
  </div>
)

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
      <br />
      <Table
        headers={[
          {
            key: "name",
            displayName: "Model Name"
          },
          {
            key: "comment",
            displayName: "Description"
          },
          {
            key: "source",
            displayName: "Source"
          }
        ]}
        columns={Object.entries(tablesMetadata || {}).map(([tableName, it]) => {
          if (!tableName.match(search)) return {}
          return {
            name: it.table.name,
            comment: it.database_table?.comment || "lorem upsum",
            source: "Postgres"
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
                  <div className="text-sm font-medium leading-5 text-gray-900">
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
