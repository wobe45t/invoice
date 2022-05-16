export const Fieldset = (props: { label: string; children: any }) => {
  const { label, children } = props

  return (
    <fieldset className='border p-3 rounded-md'>
      <legend>{label}</legend>
      {children}
    </fieldset>
  )
}
