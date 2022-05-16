import tw from 'twin.macro'

const H1 = tw.h1`font-light text-3xl tracking-tighter my-2`
export const PageHeader = (props: { children: string }) => {
  return (
    <>
      <H1>{props.children}</H1>
      <div className='border my-2' />
    </>
  )
}
