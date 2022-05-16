import { useEffect, useContext, useState } from 'react'
import { IProfile } from '../interfaces'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { InputField } from '../components/InputField'
import { SubmitButton } from '../components/SubmitButton'
import { Fieldset } from '../components/Fieldset'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { updateProfile } from '../actions/users'
import { PageHeader } from '../components/styled/Header'
import { UserContext } from '../context/userContext'

const Profile = () => {
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserContext)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IProfile>()

  const { mutate: updateProfileMutate } = useMutation(
    (profileData: IProfile) => updateProfile(profileData),
    {
      onSuccess: (data) => {
        setUser((prevState: any) => ({ ...prevState, profile: data.profile }))
        toast.success('Profile updated', { autoClose: 1000 })
      },
      onError: (error: any) => {
        toast.error(error.response.data.message, { autoClose: 1000 })
      },
    }
  )

  const handleSubmitContractor = (data: IProfile) => {
    updateProfileMutate(data)
  }

  useEffect(() => {
    if (user?.profile)
      Object.entries(user.profile).forEach(([name, value]: any) => {
        setValue(name, value)
      })
  }, [user, setValue])

  const [edit, setEdit] = useState<boolean>(false)

  return (
    <div className='container mx-auto'>
      <PageHeader>Profile</PageHeader>
      <span
        onClick={() => setEdit((prevState) => !prevState)}
        className='my-2 text-lg font-light cursor-pointer'
      >
        {edit ? 'Disable' : 'Enable'} edit
      </span>
      <form onSubmit={handleSubmit((data) => handleSubmitContractor(data))}>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-2'>
          <Fieldset label='Overall info'>
            <InputField
              disabled={!edit}
              label='Name'
              {...register('name', { required: 'Field is required' })}
              error={errors?.name}
            />
            <InputField
              disabled={!edit}
              label='Surname'
              {...register('surname', { required: 'Field is required' })}
              error={errors?.surname}
            />
            <InputField
              disabled={!edit}
              label='Entity name'
              {...register('entityName', { required: 'Field is required' })}
              error={errors?.entityName}
            />
            <InputField
              disabled={!edit}
              label='NIP'
              {...register('nip', {
                required: 'Field is required',
                minLength: {
                  value: 10,
                  message: 'NIP length has to be equal to 10',
                },
                maxLength: {
                  value: 10,
                  message: 'NIP length has to be equal to 10',
                },
                pattern: {
                  value: /[0-9]+$/,
                  message: 'NIP has to be digit only',
                },
              })}
              error={errors?.nip}
            />
          </Fieldset>
          <Fieldset label='Contact info'>
            <InputField
              disabled={!edit}
              label='Phone number'
              {...register('phoneNumber', { required: 'Field is required' })}
              error={errors?.phoneNumber}
            />
            <InputField
              disabled={!edit}
              label='Email'
              {...register('email', { required: 'Field is required' })}
              error={errors?.email}
            />
          </Fieldset>
          <Fieldset label='Address info'>
            <InputField
              disabled={!edit}
              label='Street'
              {...register('street', { required: 'Field is required' })}
              error={errors?.street}
            />
            <InputField
              disabled={!edit}
              label='Postal code'
              {...register('postalCode', { required: 'Field is required' })}
              error={errors?.postalCode}
            />
            <InputField
              disabled={!edit}
              label='City'
              {...register('city', { required: 'Field is required' })}
              error={errors?.city}
            />
          </Fieldset>
          <Fieldset label='Bank info'>
            <InputField
              disabled={!edit}
              label='Bank account number'
              {...register('bankAccountNumber', {
                required: 'Field is required',
              })}
              error={errors?.bankAccountNumber}
            />
            <InputField
              disabled={!edit}
              label='Bank name'
              {...register('bankName', { required: 'Field is required' })}
              error={errors?.bankName}
            />
          </Fieldset>
        </div>
        <SubmitButton className='mt-3'>Update profile</SubmitButton>
      </form>
      <div className='mt-5' />
    </div>
  )
}
export default Profile
