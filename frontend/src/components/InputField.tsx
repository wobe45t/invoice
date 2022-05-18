import React from 'react'

export const InputField = React.forwardRef(
  (props: any, ref: React.Ref<HTMLInputElement>) => {
    const { label, error, ...inputProps } = props
    return (
      <>
        <label className='flex flex-col gap-1 tracking-tight font-light'>
          {label}
          <input
            className={`border p-2 rounded-md ${error && 'border-red-500'}`}
            ref={ref}
            {...inputProps}
          />
        </label>
        {error?.message && (
          <span
            className={`tracking-tight text-sm font-light ${error && 'text-red-500'}`}
            role='alert'
          >
            {error?.message}
          </span>
        )}
      </>
    )
  }
)

export const Option = (props: any) => {
  const {children, ...optionProps} = props
  return (
    <option {...optionProps} className='px-1 py-2 font-light transition duration-150'>{children}</option>
  )
}

export const SelectField = React.forwardRef(
  (props: any, ref: React.Ref<HTMLInputElement>) => {
    const { label, error, ...inputProps } = props
    return (
      <>
        <label className='flex flex-col gap-1 tracking-tight font-light'>
          {label}
          <select
            className={`border p-2 rounded-md bg-gray-200 ${error && 'border-red-500'}`}
            ref={ref}
            {...inputProps}
          >
            {props.children}
          </select>
        </label>
        {error?.message && (
          <span
            className={`tracking-tight text-sm font-light ${error && 'text-red-500'}`}
            role='alert'
          >
            {error?.message}
          </span>
        )}
      </>
    )
  }
)