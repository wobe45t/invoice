import {
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  usePagination,
  Cell,
} from 'react-table'
import { Box, TableButton as Button, PageButton} from '../components'
import React from 'react'
import {
  ChevronDoubleLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/solid'

export const Item = ({ value, row }) => {
  return (
    <div className='uppercase'>
      {row.id}
      {value}
    </div>
  )
}

export const MyTable = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  )

  return (
    <div className=''>
      <GlobalFilter 
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      {/* display data */}
      <div>
        {page.map((row) => (
          <Box key={row.id} className='p-2'>
            <div className='flex flex-col'>
            <div>{row.original.name}</div>
            <div>{JSON.stringify(row.original)}</div>
            </div>
          </Box>
        ))}
      </div>
      {/* pagination */}
      <div className='py-3 flex items-center justify-between'>
        <div className='flex-1 flex justify-between sm:hidden'>
          <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
            Previous
          </Button>
          <Button onClick={() => nextPage()} disabled={!canNextPage}>
            Next
          </Button>
        </div>
        <div className='hidden sm:flex-1 sm:flex sm:items-center sm:justify-between'>
          <div className='flex gap-x-2 items-baseline'>
            <span className='text-sm text-gray-700'>
              Page <span className='font-medium'>{state.pageIndex + 1}</span> of{' '}
              <span className='font-medium'>{pageOptions.length}</span>
            </span>
            {/* <label>
              <span className='sr-only'>Items Per Page</span>
              <select
                className='mt-1 block w-full outline-none bg-slate-200 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                value={state.pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value))
                }}
              >
                {[5, 10, 20].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </label> */}
          </div>
          <div>
            <nav
              className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'
              aria-label='Pagination'
            >
              <PageButton
                className='rounded-l-md'
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              >
                <span className='sr-only'>First</span>
                <ChevronDoubleLeftIcon
                  className='h-5 w-5 text-gray-400'
                  aria-hidden='true'
                />
              </PageButton>
              <PageButton
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                <span className='sr-only'>Previous</span>
                <ChevronLeftIcon
                  className='h-5 w-5 text-gray-400'
                  aria-hidden='true'
                />
              </PageButton>
              <PageButton onClick={() => nextPage()} disabled={!canNextPage}>
                <span className='sr-only'>Next</span>
                <ChevronRightIcon
                  className='h-5 w-5 text-gray-400'
                  aria-hidden='true'
                />
              </PageButton>
              <PageButton
                className='rounded-r-md'
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                <span className='sr-only'>Last</span>
                <ChevronDoubleRightIcon
                  className='h-5 w-5 text-gray-400'
                  aria-hidden='true'
                />
              </PageButton>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

// <table {...getTableProps()} className='bg-slate-200'>
//   <thead>
//     {headerGroups.map(headerGroup => (
//       <tr {...headerGroup.getHeaderGroupProps()}>
//         {headerGroup.headers.map(column => (
//           <th {...column.getHeaderProps()}>{column.render('Header')}</th>
//         ))}
//       </tr>
//     ))}
//   </thead>
//   <tbody {...getTableBodyProps()}>
//     {rows.map((row, i) => {
//       prepareRow(row)
//       return (
//         <tr {...row.getRowProps()}>
//           {row.cells.map((cell)  => {
//             return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
//           })}
//         </tr>
//       )
//     })}
//   </tbody>
// </table>


const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) => {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <label className='flex gap-x-2 items-baseline'>
      <span className='text-gray-700'>Search: </span>
      <input
        type='text'
        className='p-2 outline-none rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value)
          onChange(e.target.value)
        }}
        placeholder={`${count} records...`}
      />
    </label>
  )
}