import React from 'react'
import { useState, useMemo } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { CheckIcon } from '@heroicons/react/outline'
import { useToast } from '../utils/toast'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import yup from 'yup'
import {InputField} from '../components/InputField'

const PageIndicator = (props: {
  page: number
  setPage: Function
  value: number
  description: string
}) => {
  const { setPage, value, description, page } = props

  const completed = page > value

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex flex-row gap-2 items-center pr-3'>
        <div
          className={`flex items-center justify-center text-center w-8 h-8 rounded-md text-white  transition duration-300
            ${
              completed
                ? 'bg-green-400'
                : page == value
                ? 'bg-orange-400'
                : 'bg-gray-300'
            } 
          `}
          onClick={() => setPage(value)}
        >
          {completed ? (
            <div>
              <CheckIcon className='w-5 h-5' />
            </div>
          ) : (
            <span>{value}</span>
          )}
        </div>
        <span className='tracking-tight font-light '>{description}</span>
      </div>
      <div
        className={`transition duration-300 delay-100 border-4 rounded-md ${
          completed
            ? 'border-green-400'
            : page == value
            ? 'border-orange-400'
            : 'border-gray-300'
        }`}
      ></div>
    </div>
  )
}

const Debug = () => {
  const [page, setPage] = useState<number>(0)

  const [form, setForm] = useState({})
  const handleSetForm = (data: any) => {
    setForm((form) => ({ ...form, ...data }))
  }

  const onSubmit = () => {
    console.log('submiting form : ', form)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  return (
    <div className='container mx-auto'>
      <div className='m-5 p-5 border-2 flex flex-col'>
        <form
          className='flex flex-col gap-2'
          onSubmit={handleSubmit((data) => {
            alert(JSON.stringify(data))
          })}
        >
          <InputField
            label='Name'
            {...register('name', { required: 'Field is required',  })}
            error={errors?.name}
          />
          <InputField
            label='Password'
            {...register('password', { required: 'Field is required' })}
            error={errors?.password}
          />
          <button
          className='border rounded-md '
           type='submit'>Submit</button>
        </form>
      </div>

      <div className='flex flex-col gap-2 w-1/3 md:w-full md:flex-row md:gap-5'>
        {['Overall', 'Contractor', 'Products', 'Summary'].map(
          (description: string, index: number) => (
            <PageIndicator
              key={index}
              value={index + 1}
              description={description}
              setPage={setPage}
              page={page}
            />
          )
        )}
      </div>
      {/* pages */}
      <div>
        {page == 1 ? (
          <OverallPage
            page={page}
            setPage={setPage}
            value={1}
            setForm={handleSetForm}
          />
        ) : page == 2 ? (
          <ContractorPage
            page={page}
            setPage={setPage}
            value={2}
            setForm={handleSetForm}
          />
        ) : page == 3 ? (
          <ProductsPage
            page={page}
            setPage={setPage}
            value={3}
            setForm={handleSetForm}
          />
        ) : (
          <SummaryPage
            page={page}
            setPage={setPage}
            value={4}
            setForm={handleSetForm}
            onSubmit={onSubmit}
          />
        )}
      </div>

      <div className='flex flex-col gap-2 m-2'>
        <span>Current page: {page}</span>
        <span>{JSON.stringify(form)}</span>
      </div>
    </div>
  )
}

interface IPageProps {
  page: number
  setPage: Function
  setForm: Function
  value: number
  onSubmit?: Function
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  ref: React.Ref<HTMLInputElement>
}
const Input = (props: InputProps) => {
  const { ref, ...rest } = props
  return <input ref={ref} className='border rounded-md' {...rest} />
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: any
}
const Button = (props: ButtonProps) => {
  const { children, ...rest } = props
  return (
    <button
      className='rounded-md border p-3 uppercase tracking-tight font-light hover:bg-gray-300 transition delay-300'
      {...rest}
    >
      {children}
    </button>
  )
}

const OverallPage = (props: IPageProps) => {
  const { page, setPage, value, setForm } = props
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

  return (
    <form
      onSubmit={handleSubmit((data) => {
        setForm(data)
        setPage(value + 1)
      })}
    >
      <fieldset className='border'>
        <legend>overall</legend>
        <div className='p-5 flex flex-col gap-2'>
          <label htmlFor='lastName' className='flex flex-col'>
            Name
            <input
              className='border rounded-md'
              {...register('name', { required: 'Field is required' })}
            />
          </label>
          <span role='alert'>{errors.name?.message}</span>
          <div>
            <label htmlFor='lastNmae' className='flex flex-col'>
              last name
              <input
                className='border rounded-md'
                {...register('lastName', { required: 'Field is required' })}
              />
            </label>
            <span role='alert'>{errors.lastName?.message}</span>
          </div>
        </div>
        <Button type='submit'>Next page</Button>
      </fieldset>
    </form>
  )
}

const ContractorPage = (props: IPageProps) => {
  const { page, setPage, value, setForm } = props

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()
  return (
    <form
      onSubmit={handleSubmit((data) => {
        setForm(data)
        setPage(value + 1)
      })}
    >
      <fieldset className='border'>
        <div className='p-5 flex flex-col gap-2'>
          <legend>contractor page</legend>
          <label htmlFor='contractorName'>
            Contractor Name
            <input
              {...register('contractorName', { required: 'Field is required' })}
            />
          </label>

          <label htmlFor='email'>
            Contractor email
            <input {...register('email', { required: 'Field is required' })} />
          </label>
        </div>
        <button type='submit'>Next page</button>
      </fieldset>
    </form>
  )
}
const ProductsPage = (props: IPageProps) => {
  const { page, setPage, value, setForm } = props

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()
  return (
    <form
      onSubmit={handleSubmit((data) => {
        setForm(data)
        setPage(value + 1)
      })}
    >
      <fieldset className='border'>
        <legend>Products page</legend>
        <div className='flex flex-col'>
          <div>
            <label htmlFor='productName'>
              Product name
              <input
                className='border rounded-md'
                {...register('productName', { required: 'Field is required' })}
              />
            </label>
          </div>
          <div>
            <label>
              Quantity
              <input
                className='border rounded-md'
                {...register('quantity', { required: 'Field is required' })}
              />
            </label>
          </div>
        </div>
        <button type='submit'>Next page</button>
      </fieldset>
    </form>
  )
}

const SummaryPage = (props: IPageProps) => {
  const { page, setPage, value, setForm, onSubmit } = props
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()
  return (
    <div>
      Summary page
      <button
        onClick={() => {
          onSubmit?.()
        }}
      >
        Add invocie
      </button>
    </div>
  )
}

export default Debug

// <form
//   className='flex flex-col gap-2 border rounded-md p-1 m-1'
//   onSubmit={handleSubmit((data) => {
//     console.log(data)
//   })}
// >
//   <label>first name</label>
//   <input
//     className='border'
//     {...register('name', { required: 'Field is required' })}
//   />
//   {errors.name && <ErrorMessage message={errors.name.message} />}
//   <label>surname</label>
//   <input
//     className='border'
//     {...register('surname', { required: 'Field is required' })}
//   />
//   {errors.surname && <ErrorMessage message={errors.surname.message} />}

//   <label>email</label>
//   <input
//     className={`border ${errors.email && 'border-red-600'}`}
//     {...register('email', {
//       required: 'Field is required',
//       pattern: {
//         value:
//           /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
//         message: 'Please enter a valid email',
//       },
//     })}
//   />
//   {errors.email && <ErrorMessage message={errors.email.message} />}
//   <button
//     type='submit'
//     className='border p-3 rounded-md uppercase hover:bg-slate-200'
//     onClick={() => setPage(1)}
//   >
//     Next page
//   </button>
// </form>
