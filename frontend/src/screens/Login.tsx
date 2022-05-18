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
import { useTranslation } from 'react-i18next'

const Login = () => {
  const navigate = useNavigate()
  const {t} = useTranslation()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Credentials>()

  const { setUser } = useContext(UserContext)

  const {
    mutate: loginMutate,
  } = useMutation((loginData: Credentials) => login(loginData), {
    onSuccess: (data) => {
      localStorage.setItem('token', data.token)
      delete data.token
      setUser(data)
      toast.success(t('login.alerts.success'), { autoClose: 500, hideProgressBar: true })
      navigate('/invoices')
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
        <div className='flex flex-col my-2 gap-5'>
          <span className='text-4xl tracking-widest text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-blue-600'>
            {t('login.header')}
          </span>
          <form
            className='flex flex-col gap-2'
            onSubmit={handleSubmit((data) => {
              loginMutate(data)
            })}
          >
            <InputField
              label={t('login.fields.email')}
              {...register('email', {
                required: t('required'),
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: t('login.errors.email')
                },
              })}
              error={errors?.email}
            />

            <InputField
              label={t('login.fields.password')}
              type='password'
              {...register('password', { required: t('required') })}
              error={errors?.password}
            />

            <SubmitButton>{t('login.header')}</SubmitButton>
          </form>
          <span
            onClick={() => navigate('/signup')}
            className='font-light tracking-tighter cursor-pointer hover:text-blue-700 text-blue-900'
          >
            {t('login.prompt')}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Login
