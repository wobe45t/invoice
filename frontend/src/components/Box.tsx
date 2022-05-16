import React from 'react'
import { classNames } from '../utils'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: any
  className?: string
}

export function Box(props: Props) {
  const { children, className, ...rest } = props
  return (
    <div
      className={classNames('m-2 rounded shadow-md bg-white', className)}
      {...rest}
    >
      {children}
    </div>
  )
}
