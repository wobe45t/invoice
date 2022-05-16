import {useState} from 'react'

const ProgressItem = (props: any) => {
  const {value, setPage} = props

  return (
    <div 
      className='flex items-center justify-center text-center w-10 h-10 border rounded-full bg-slate-200'
      onClick={() => setPage(value)}
    >
      {value}
    </div>
  )
}

export const FormProgress = () => {
  const [page, setPage] = useState<number>(0)

  return (
    <div className='flex flex-row gap-5'>
      <ProgressItem value={1} setPage={setPage}/>
      <ProgressItem value={2} setPage={setPage}/>
      <ProgressItem value={3} setPage={setPage}/>
    </div>
  )
}