import { useState, useEffect } from 'react'
import { IProfile } from '../interfaces'
import { addContractor, updateContractor } from '../actions/contractor'
import { useNavigate, useLocation } from 'react-router'
import { toast } from 'react-toastify'
import { InputField } from '../components/InputField'
import { SubmitButton } from '../components/SubmitButton'
import { Fieldset } from '../components/Fieldset'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { PageHeader } from '../components/styled/Header'
import { useTranslation } from 'react-i18next'

interface IState {
  contractor: IProfile
}

const AddContractor = () => {
  const navigate = useNavigate()
  const state: IState = useLocation().state as IState

  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IProfile>()

  const { mutate: addContractorMutate } = useMutation(
    (contractorData: IProfile) => addContractor(contractorData),
    {
      onSuccess: () => {
        toast.success(t('addContractor.alerts.add.success'), {
          autoClose: 1000,
        })
        navigate('/contractors')
      },
      onError: () => {
        toast.error('addContractor.alerts.add.error', { autoClose: 1000 })
      },
    }
  )
  const { mutate: updateContractorMutate } = useMutation(
    (contractorData: IProfile) => updateContractor(contractorData),
    {
      onSuccess: () => {
        toast.success(
          t('addContractor.alerts.update.success', { autoClose: 1000 })
        )
        navigate('/contractors')
      },
      onError: () => {
        toast.error('addContractor.alerts.update.error', { autoClose: 1000 })
      },
    }
  )

  const [edit, setEdit] = useState<boolean>(false)

  useEffect(() => {
    if (state?.contractor) {
      setEdit(true)
      Object.entries(state.contractor).forEach(([name, value]: any) =>
        setValue(name, value)
      )
    }
  }, [state, setValue])

  const handleSubmitContractor = (data: IProfile) => {
    edit ? updateContractorMutate(data) : addContractorMutate(data)
  }

  return (
    <div className='container mx-auto'>
      <PageHeader>
        {edit
          ? t('addContractor.header.update')
          : t('addContractor.header.add')}
      </PageHeader>
      <form onSubmit={handleSubmit((data) => handleSubmitContractor(data))}>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-2'>
          <Fieldset label={t('addContractor.fieldsets.general')}>
            <InputField
              label={t('addContractor.fields.name')}
              {...register('name', { required: t('required') })}
              error={errors?.name}
            />
            <InputField
              label={t('addContractor.fields.surname')}
              {...register('surname', { required: t('required') })}
              error={errors?.surname}
            />
            <InputField
              label={t('addContractor.fields.entityName')}
              {...register('entityName', { required: t('required') })}
              error={errors?.entityName}
            />
            <InputField
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
              label={t('addContractor.fields.phoneNumber')}
              {...register('phoneNumber', { required: t('required') })}
              error={errors?.phoneNumber}
            />
            <InputField
              label={t('addContractor.fields.email')}
              {...register('email', { required: t('required') })}
              error={errors?.email}
            />
          </Fieldset>
          <Fieldset label={t('addContractor.fieldsets.address')}>
            <InputField
              label={t('addContractor.fields.street')}
              {...register('street', { required: t('required') })}
              error={errors?.street}
            />
            <InputField
              label={t('addContractor.fields.postalCode')}
              {...register('postalCode', { required: t('required') })}
              error={errors?.postalCode}
            />
            <InputField
              label={t('addContractor.fields.city')}
              {...register('city', { required: t('required') })}
              error={errors?.city}
            />
          </Fieldset>
          <Fieldset label={t('addContractor.fieldsets.bank')}>
            <InputField
              label={t('addContractor.fields.bankAccountNumber')}
              {...register('bankAccountNumber', {
                required: t('required'),
              })}
              error={errors?.bankAccountNumber}
            />
            <InputField
              label={t('addContractor.fields.bankName')}
              {...register('bankName', { required: t('required') })}
              error={errors?.bankName}
            />
          </Fieldset>
        </div>
        <SubmitButton className='mt-3'>
          {edit
            ? t('addContractor.header.update')
            : t('addContractor.header.add')}
        </SubmitButton>
      </form>
      <div className='mt-5' />
    </div>
  )
}
export default AddContractor
