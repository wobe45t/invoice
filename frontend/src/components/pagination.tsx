import React, { useEffect, useCallback, useState } from 'react'
import {
  ChevronDoubleLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/solid'
import { debounced } from '../utils/debounce'
import {useTranslation} from 'react-i18next'

interface PaginationReturn {
  controls: {
    goNext: Function
    goPrevious: Function
    jump: Function
    currentPage: number
    maxPage: number
    canNext: boolean
    canPrevious: boolean
  }
  search: {
    filter: string
    setFilter: Function
  }
  page: any
  setData: Function
}

/**
 * @param itemsPerPage amount of items to display
 * @param collection data to paginate
 * @returns search obj, controls obj, page and setData
 */
export const usePagination = (
  itemsPerPage_?: number,
  collection?: any[]
): PaginationReturn => {
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = itemsPerPage_ ?? 5

  const [page, setPage] = useState<any[]>([])
  const [canPrevious, setCanPrevious] = useState<boolean>(false)
  const [canNext, setCanNext] = useState<boolean>(false)

  const [data, setData] = useState<any[]>(collection ?? [])
  const [filteredData, setFilteredData] = useState<any[]>([])
  const [filter, setFilter] = useState<string>('')
  const [debouncedFilter, setDebouncedFilter] = useState<string>('')

  useEffect(() => {
    if(collection) {
      setData(collection) 
    }
  }, [collection])

  const debouncedInput = useCallback(
    (v: string) => debounced((v: string) => setDebouncedFilter(v), 400),
    []
  )

  const maxPage = React.useMemo(
    () => Math.ceil(data.length / (itemsPerPage)),
    [data, itemsPerPage]
  )

  useEffect(() => {
    // setFilteredData(data)
    console.log('Data changed')
  }, [data])

  useEffect(() => {
    const begin = (currentPage - 1) * itemsPerPage
    const end = begin + itemsPerPage
    setPage(filteredData.slice(begin, end))

    setCanNext(currentPage !== maxPage)
    setCanPrevious(currentPage !== 1)
  }, [currentPage, filteredData, itemsPerPage, maxPage])

  useEffect(() => {
    debouncedInput(filter)
  }, [filter, debouncedInput])

  useEffect(() => {
    if (data) {
      const value = filter.toLowerCase()
      const filtered = data.filter((d) =>
        Object.entries(d).some((entry) => {
          return String(entry[1]).toLowerCase().includes(value)
        })
      )
      setFilteredData(filtered)
    }
  }, [debouncedFilter, data, filter])

  const goNext = () => {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage))
  }

  const goPrevious = () => {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1))
  }

  const jump = (page: number) => {
    const pageNumber = Math.max(1, page)
    setCurrentPage((currentPage) => Math.min(pageNumber, maxPage))
  }

  return {
    search: {
      filter,
      setFilter,
    },
    controls: {
      goNext,
      goPrevious,
      jump,
      currentPage,
      maxPage,
      canNext,
      canPrevious,
    },
    page,
    setData
  }
}

export const PageIndicator = (props: {
  jump: Function
  goPrevious: Function
  goNext: Function
  canPrevious: boolean
  canNext: boolean
  maxPage: number
  currentPage: number
}) => {
  const {
    jump,
    goNext,
    goPrevious,
    canNext,
    canPrevious,
    maxPage,
    currentPage,
  } = props
  const {t} = useTranslation()
  return (
    <div className='flex flex-col gap-1'>
      <div className='flex flex-row gap-2'>
        <IconButton onClick={() => jump(1)} disabled={!canPrevious}>
          <ChevronDoubleLeftIcon className='w-5 h-5' />
        </IconButton>
        <IconButton onClick={() => goPrevious()} disabled={!canPrevious}>
          <ChevronLeftIcon className='w-5 h-5' />
        </IconButton>
        <IconButton onClick={() => goNext()} disabled={!canNext}>
          <ChevronRightIcon className='w-5 h-5' />
        </IconButton>
        <IconButton onClick={() => jump(maxPage)} disabled={!canNext}>
          <ChevronDoubleRightIcon className='w-5 h-5' />
        </IconButton>
      </div>
      <span>
        {t('pagination.page')} {currentPage} / {maxPage}
      </span>
    </div>
  )
}

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: any
  disabled?: boolean
}
const IconButton = (props: ButtonProps) => {
  const { children, disabled, ...rest } = props

  return (
    <button
      type='button'
      className='border p-1 rounded hover:bg-gray-100 disabled:bg-gray-200'
      {...rest}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
