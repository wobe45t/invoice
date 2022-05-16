export const TextField = (props: {
  placeholder?: string
  description?: string
  type?: string
  value?: string
  name: string
  onChange: (e: any) => void
}) => {
  return (
    <input
      type={props.type ? props.type : 'text'}
      name={props.name}
      value={props.value}
      placeholder={props.placeholder}
      className='w-full p-1 border border-slate-200'
      onChange={props.onChange}
    />
  )
}