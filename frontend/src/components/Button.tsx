import { classNames } from '../utils'

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  children: any
  disabled?: boolean
  className?: string
}

export const Button = (props: Props) => {
  const { children, className, ...rest } = props

  return (
    <button
      type='button'
      className={classNames(
        'w-full border border-gray-300 rounded-md px-5 py-3 tracking-tighter font-light transition duration-300 hover:bg-gray-300 disabled:bg-white ',
        className
      )}
      {...rest}
    >
      {typeof children == 'string' ? (
        children
      ) : (
        <div className='flex flex-row items-center justify-center'>
          {children}
        </div>
      )}
    </button>
  )
}

export function TableButton(props: Props) {
  const { children, className, ...rest } = props
  return (
    <button
      type='button'
      className={classNames(
        'relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

export function PageButton(props: Props) {
  const { children, className, ...rest } = props
  return (
    <button
      type='button'
      className={classNames(
        'relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
