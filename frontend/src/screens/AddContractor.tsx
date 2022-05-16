import { useState, useEffect } from 'react'
import { IProfile } from '../interfaces'
import { Button, TextField } from '../components'
import { addContractor, updateContractor } from '../actions/contractor'
import { contractor } from '../constants/contractors.const'
import { useNavigate, useLocation } from 'react-router'
import { toast } from 'react-toastify'
import { InputField } from '../components/InputField'
import { SubmitButton } from '../components/SubmitButton'
import { Fieldset } from '../components/Fieldset'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import {PageHeader} from '../components/styled/Header'

interface IState {
  contractor: IProfile
}

const AddContractor = () => {
  const navigate = useNavigate()
  const state: IState = useLocation().state as IState

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IProfile>()

  const {
    mutate: addContractorMutate,
    isSuccess: addSuccess,
    isError: addError,
  } = useMutation((contractorData: IProfile) => addContractor(contractorData))
  const {
    mutate: updateContractorMutate,
    isSuccess: updateSuccess,
    isError: updateError,
  } = useMutation((contractorData: IProfile) =>
    updateContractor(contractorData)
  )

  const [edit, setEdit] = useState<boolean>(false)

  useEffect(() => {
    if (state?.contractor) {
      setEdit(true)
      Object.entries(state.contractor).forEach(([name, value]: any) =>
        setValue(name, value)
      )
    }
  }, [state])

  useEffect(() => {
    if (addSuccess) {
      toast.success('Contractor added', { autoClose: 1000 })
    }
    if (updateSuccess) {
      toast.success('Contractor updated', { autoClose: 1000 })
    }
    if (addSuccess || updateSuccess) {
      navigate('/contractors')
    }
  }, [addSuccess, updateSuccess, navigate])

  useEffect(() => {
    if (addError) {
      toast.error('Couldnt add contractor ', { autoClose: 1000 })
    }
    if (updateError) {
      toast.error('Couldnt update contractor', { autoClose: 1000 })
    }
  }, [addError, updateError, navigate])

  const handleSubmitContractor = (data: IProfile) => {
    // alert(JSON.stringify(data))
    edit ? updateContractorMutate(data) : addContractorMutate(data)
  }

  const fillForm = (contractor: IProfile) => {
    setValue('name', contractor.name)
    setValue('city', contractor.city)
    setValue('email', contractor.email)
    setValue('entityName', contractor.entityName)
    setValue('nip', contractor.nip)
    setValue('phoneNumber', contractor.phoneNumber)
    setValue('postalCode', contractor.postalCode)
    setValue('street', contractor.street)
    setValue('surname', contractor.surname)
    setValue('bankAccountNumber', contractor.bankAccountNumber)
    setValue('bankName', contractor.bankName)
  }

  return (
    <div className='container mx-auto'>
      <PageHeader>{edit ? 'Update contractor' : 'Add contractor'}</PageHeader>
      <form onSubmit={handleSubmit((data) => handleSubmitContractor(data))}>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-2'>
          <Fieldset label='Overall info'>
            <InputField
              label='Name'
              {...register('name', { required: 'Field is required' })}
              error={errors?.name}
            />
            <InputField
              label='Surname'
              {...register('surname', { required: 'Field is required' })}
              error={errors?.surname}
            />
            <InputField
              label='Entity name'
              {...register('entityName', { required: 'Field is required' })}
              error={errors?.entityName}
            />
            <InputField
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
              label='Phone number'
              {...register('phoneNumber', { required: 'Field is required' })}
              error={errors?.phoneNumber}
            />
            <InputField
              label='Email'
              {...register('email', { required: 'Field is required' })}
              error={errors?.email}
            />
          </Fieldset>
          <Fieldset label='Address info'>
            <InputField
              label='Street'
              {...register('street', { required: 'Field is required' })}
              error={errors?.street}
            />
            <InputField
              label='Postal code'
              {...register('postalCode', { required: 'Field is required' })}
              error={errors?.postalCode}
            />
            <InputField
              label='City'
              {...register('city', { required: 'Field is required' })}
              error={errors?.city}
            />
          </Fieldset>
          <Fieldset label='Bank info'>
            <InputField
              label='Bank account number'
              {...register('bankAccountNumber', {
                required: 'Field is required',
              })}
              error={errors?.bankAccountNumber}
            />
            <InputField
              label='Bank name'
              {...register('bankName', { required: 'Field is required' })}
              error={errors?.bankName}
            />
          </Fieldset>
        </div>
        <SubmitButton className='mt-3'>
          {edit ? 'Update contractor' : 'Add contractor'}
        </SubmitButton>
      </form>
      <div className='mt-5' />
      <Button onClick={() => fillForm(contractor)}>fill debug</Button>
    </div>
  )
}
export default AddContractor
