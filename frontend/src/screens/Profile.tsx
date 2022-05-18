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
import { useTranslation } from 'react-i18next'

const Profile = () => {
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserContext)

  const { t } = useTranslation()

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
        toast.success(t('profile.alerts.update.success'), { autoClose: 1000 })
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
      <PageHeader>{t('profile.header')}</PageHeader>
      <span
        onClick={() => setEdit((prevState) => !prevState)}
        className='my-2 text-lg font-light cursor-pointer'
      >
        {edit ? t('profile.edit.disable') : t('profile.edit.enable')}
      </span>
      <form onSubmit={handleSubmit((data) => handleSubmitContractor(data))}>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-2'>
          <Fieldset label={t('addContractor.fieldsets.general')}>
            <InputField
              disabled={!edit}
              label={t('addContractor.fields.name')}
              {...register('name', { required: t('required') })}
              error={errors?.name}
            />
            <InputField
              disabled={!edit}
              label={t('addContractor.fields.surname')}
              {...register('surname', { required: t('required') })}
              error={errors?.surname}
            />
            <InputField
              disabled={!edit}
              label={t('addContractor.fields.entityName')}
              {...register('entityName', { required: t('required') })}
              error={errors?.entityName}
            />
            <InputField
              disabled={!edit}
              label={t('addContractor.fields.nip')}
              {...register('nip', {
                required: t('required'),
                minLength: {
                  value: 10,
                  message: t('addContractor.errors.nipLength'),
                },
                maxLength: {
                  value: 10,
                  message: t('addContractor.errors.nipLength'),
                },
                pattern: {
                  value: /[0-9]+$/,
                  message: t('addContractor.errors.nipDigit'),
                },
              })}
              error={errors?.nip}
            />
          </Fieldset>
          <Fieldset label={t('addContractor.fieldsets.contact')}>
            <InputField
              disabled={!edit}
              label={t('addContractor.fields.phoneNumber')}
              {...register('phoneNumber', { required: t('required') })}
              error={errors?.phoneNumber}
            />
            <InputField
              disabled={!edit}
              label={t('addContractor.fields.email')}
              {...register('email', { required: t('required') })}
              error={errors?.email}
            />
          </Fieldset>
          <Fieldset label={t('addContractor.fieldsets.address')}>
            <InputField
              disabled={!edit}
              label={t('addContractor.fields.street')}
              {...register('street', { required: t('required') })}
              error={errors?.street}
            />
            <InputField
              disabled={!edit}
              label={t('addContractor.fields.postalCode')}
              {...register('postalCode', { required: t('required') })}
              error={errors?.postalCode}
            />
            <InputField
              disabled={!edit}
              label={t('addContractor.fields.city')}
              {...register('city', { required: t('required') })}
              error={errors?.city}
            />
          </Fieldset>
          <Fieldset label={t('addContractor.fieldsets.bank')}>
            <InputField
              disabled={!edit}
              label={t('addContractor.fields.bankAccountNumber')}
              {...register('bankAccountNumber', {
                required: t('required'),
              })}
              error={errors?.bankAccountNumber}
            />
            <InputField
              disabled={!edit}
              label={t('addContractor.fields.bankName')}
              {...register('bankName', { required: t('required') })}
              error={errors?.bankName}
            />
          </Fieldset>
        </div>
        <SubmitButton className='mt-3'>{t('profile.update')}</SubmitButton>
      </form>
      <div className='mt-5' />
    </div>
  )
}
export default Profile
