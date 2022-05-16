import { classNames } from '../utils'

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: any
  className?: any
}

export const SubmitButton = (props: ButtonProps) => {
  const { className, children, ...rest } = props
  return (
    <button
      className={classNames(
        'w-full border border-gray-300 rounded-md px-5 py-3 tracking-tighter font-light transition duration-300 hover:bg-gray-300 ',
        className
      )}
      type='submit'
    >
      {children}
    </button>
  )
}
