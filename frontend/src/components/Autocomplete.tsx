import React, { useState, useEffect } from 'react'
// import { setInterval } from 'timers/promises'
interface PropsString extends React.HTMLAttributes<HTMLInputElement> {
  items: any[]
  onComplete?: (x: any) => any
  accessor?: string
}

export const Autocomplete = (props: PropsString) => {
  let { items, accessor, onComplete, ...rest } = props

  const [value, setValue] = useState<string>('')
  const [suggestions, setSuggestions] = useState<any[]>(items)
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false)

  const anyToString = (input: any): string => {
    return typeof input === 'string' ? input : input[accessor!]
  }

  const onChange = (v: string) => {
    setValue(v)
    const filtered = items.filter((item) => {
      const lowerInput = v.toLowerCase()
      const lowerItem = anyToString(item).toLowerCase()
      return lowerItem.includes(lowerInput)
    })
    setSuggestions(filtered)
    console.log(filtered)
  }

  return (
    <div className='flex'>
      <input
        value={value}
        className='p-2 outline-none border rounded'
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => {
          setTimeout(() => setShowSuggestions(false), 100)
        }}
        type='text'
        onChange={(e) => onChange(e.target.value)}
      />
      {showSuggestions && (
        <ul className='rounded border z-10 fixed block bg-white'>
          {suggestions &&
            suggestions.map((suggestion: any, index: number) => (
              <li
                key={index}
                className='p-1 text-slate-700 hover:bg-slate-100 cursor-pointer'
                onClick={() => {
                  setValue(anyToString(suggestion))
                  if (onComplete) {
                    onComplete(suggestion)
                  }
                }}
              >
                {anyToString(suggestion)}
              </li>
            ))}
        </ul>
      )}
    </div>
  )
}
