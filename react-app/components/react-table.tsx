// import { useMemo } from "react"
// import { useTable, Column } from "react-table"

// export function ReactTable() {
//   const data = useMemo(
//     () => [
//       {
//         currency: "EUR",
//         amount: 10000,
//         date: "2020-01-01",
//       },
//       {
//         currency: "EUR",
//         amount: 11000,
//         date: "2020-02-01",
//       },
//       {
//         currency: "GBP",
//         amount: 12000,
//         date: "2020-01-01",
//       },
//     ],
//     []
//   )

//   const columns: Column<typeof data[0]>[] = useMemo(
//     () => [
//       {
//         Header: "Currency",
//         accessor: "currency",
//       },
//       {
//         Header: "Amount",
//         accessor: "amount",
//       },
//       {
//         Header: "Date",
//         accessor: "date",
//       },
//     ],
//     []
//   )

//   const table = useTable({ columns, data })

//   const Header = () => (
//     <thead className="bg-gray-200">
//       {table.headerGroups.map(headerGroup => (
//         <tr {...headerGroup.getHeaderGroupProps()}>
//           {headerGroup.headers.map(column => (
//             <th
//               {...column.getHeaderProps()}
//               className="px-4 py-2 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-50"
//             >
//               {column.render("Header")}
//             </th>
//           ))}
//         </tr>
//       ))}
//     </thead>
//   )

//   const Body = () => (
//     <tbody
//       {...table.getTableBodyProps()}
//       className="bg-white divide-y divide-gray-200"
//     >
//       {table.rows.map(row => {
//         table.prepareRow(row)
//         return (
//           <tr {...row.getRowProps()} className="even:bg-gray-100">
//             {row.cells.map(cell => (
//               <td
//                 {...cell.getCellProps()}
//                 className="px-2 py-2 whitespace-no-wrap"
//               >
//                 <div className="flex items-center">
//                   <div className="ml-2">
//                     <div className="text-sm font-medium leading-5 text-gray-900">
//                       {cell.render("Cell")}
//                     </div>
//                   </div>
//                 </div>
//               </td>
//             ))}
//           </tr>
//         )
//       })}
//     </tbody>
//   )

//   return (
//     <div className="flex flex-col">
//       <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
//         <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
//           <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
//             <table
//               {...table.getTableProps()}
//               className="min-w-full divide-y divide-gray-200"
//             >
//               <Header />
//               <Body />
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
