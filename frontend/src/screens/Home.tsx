import { useEffect, useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import { UserContext } from '../context/userContext'

const Home = () => {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)

  // useEffect(() => {
  //   if (!user) {
  //     navigate('/login')
  //   }
  // }, [navigate, user])

  return (
    <div className='container mx-auto'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5'>
        <div className='py-10 flex flex-col text-center border rounded-md bg-gradient-to-br from-cyan-100 to-gray-200'>
          <div className='p-2 font-light text-2xl tracking-tighter'>
            Gross value this month
          </div>
          <div className='text-4xl tracking-tighter font-light'>
            1412341 PLN
          </div>
        </div>
        <div className='py-10 flex flex-col border rounded-md bg-gradient-to-tr from-gray-200 to-cyan-100'>
          <div className='p-2 font-light text-center text-2xl tracking-tighter'>
            Invoices this month
          </div>
          <div className='text-4xl  text-center tracking-tighter font-light'>
            15
          </div>
        </div>
        <div className='flex flex-colbg-slate-400 text-center'>
        </div>
        <div className='flex h-64 bg-slate-500 text-center'>graph4</div>
      </div>
    </div>
  )
}
export default Home
