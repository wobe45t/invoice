import React from 'react'
import { SearchIcon } from '@heroicons/react/outline'

interface IProps {
  label: string
  name: string
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

/**
 *** @param value value state for input element
 *** @param name name for input element
 *** @param onChange event handler for input element
 **/
export const SearchInput = (props: IProps) => {
  const { name, value, onChange, label } = props

  return (
    <label className='flex flex-col tracking-tight font-light'>
      {label}
      <div className='my-2 w-full flex flex-row items-center outline-gray-200 outline outline-1 rounded-md focus-within:outline-2 focus-within:outline-gray-900'>
        <SearchIcon className='ml-2 mr-1 h-6 w-6' />
        <input
          className='p-2 w-full focus:ring-0 outline-none'
          name={name}
          value={value}
          onChange={onChange}
        />
      </div>
    </label>
  )
}
