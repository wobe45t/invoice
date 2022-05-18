import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { InputField } from '../components/InputField'
import { Credentials } from '../interfaces/user'
import { SubmitButton } from '../components/SubmitButton'
import { signup } from '../actions/users'
import { UserContext } from '../context/userContext'
import { useMutation } from 'react-query'
import { useTranslation } from 'react-i18next'

const Signup = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Credentials>()

  const { mutate: signupMutate } = useMutation(
    (signupData: Credentials) => signup(signupData),
    {
      onSuccess: (data) => {
        toast.success(t('signup.alerts.success'), {
          autoClose: 1000,
          hideProgressBar: true,
        })
        navigate('/login')
      },
      onError: (error: any) => {
        toast.error(error.response.data.message, { autoClose: 1000 })
      },
    }
  )

  return (
    <div className='w-full flex min-h-screen items-center justify-center'>
      <div className='shadow-md p-3 border rounded-md flex flex-col items-center'>
        <div className='flex flex-col my-2 gap-5'>
          <span className='text-4xl tracking-widest text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-blue-600'>
            {t('signup.header')}
          </span>
          <form
            className='flex flex-col gap-2'
            onSubmit={handleSubmit((data) => {
              signupMutate(data)
            })}
          >
            <InputField
              label={t('signup.fields.email')}
              {...register('email', {
                required: t('required'),
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: t('signup.errors.email'),
                },
              })}
              error={errors?.email}
            />

            <InputField
              label={t('signup.fields.password')}
              type='password'
              {...register('password', { required: t('required') })}
              error={errors?.password}
            />
            <SubmitButton>{t('signup.header')}</SubmitButton>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup
