import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useForm, SubmitHandler } from 'react-hook-form'
import { InputField } from '../components/InputField'
import { Credentials } from '../interfaces/user'
import { SubmitButton } from '../components/SubmitButton'
import { login, getStorageUser } from '../actions/users'
import { UserContext } from '../context/userContext'
import { useMutation } from 'react-query'

const Login = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Credentials>()

  const { setUser } = useContext(UserContext)

  const {
    mutate: loginMutate,
    isLoading,
    isSuccess,
    isError,
  } = useMutation((loginData: Credentials) => login(loginData), {
    onSuccess: (data) => {
      localStorage.setItem('token', data.token)
      delete data.token
      setUser(data)
      toast.success('Logged in', { autoClose: 500, hideProgressBar: true })
      navigate('/')
    },
    onError: (error: any) => {
      toast.error(error.response.data.message, { autoClose: 1000 })
    },
  })

  const fillDebug = () => {
    setValue('email', 'michu@michu.com')
    setValue('password', 'kox')
  }

  return (
    <div className='w-full flex min-h-screen items-center justify-center'>
      <div className='shadow-md p-3 border rounded-md flex flex-col items-center'>
        <div className='flex flex-col w-3/4 my-2 gap-5'>
          <span className='text-4xl tracking-widest text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-blue-600'>
            Login
          </span>
          <form
            className='flex flex-col gap-2'
            onSubmit={handleSubmit((data) => {
              loginMutate(data)
            })}
          >
            <InputField
              label='Email'
              {...register('email', {
                required: 'Field is required',
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Please enter a valid email',
                },
              })}
              error={errors?.email}
            />

            <InputField
              label='Password'
              type='password'
              {...register('password', { required: 'Field is required' })}
              error={errors?.password}
            />

            <SubmitButton>Login</SubmitButton>
          </form>
          <span
            onClick={() => navigate('/signup')}
            className='font-light tracking-tighter cursor-pointer hover:text-blue-700 text-blue-900'
          >
            Don't have an account? Signup!
          </span>
          <button
            className='border rounded-sm border-slate-500 p-3 uppercase cursor-pointer'
            onClick={() => fillDebug()}
          >
            FillDebug
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
