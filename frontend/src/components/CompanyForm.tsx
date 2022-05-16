import { useState } from 'react'
import { TextField } from '.'
import { IProfile } from '../interfaces'

const CompanyForm = (props: any) => {
  const { onSubmit } = props
  const [formData, setFormData] = useState<IProfile>({
    name: '',
    city: '',
    email: '',
    entityName: '',
    nip: '',
    phoneNumber: '',
    postalCode: '',
    street: '',
    surname: '',
    bankAccountNumber: '',
    bankName: '',
  })
  const {
    name,
    city,
    email,
    entityName,
    nip,
    phoneNumber,
    postalCode,
    street,
    surname,
    bankAccountNumber,
    bankName,
  } = formData

  const onChange = (e: any) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className='flex flex-col'>
      <TextField
        placeholder='Name'
        name='name'
        value={name}
        onChange={onChange}
      />
      <TextField
        placeholder='Surname'
        name='surname'
        value={surname}
        onChange={onChange}
      />
      <TextField
        placeholder='Entity name'
        name='entity-name'
        value={entityName}
        onChange={onChange}
      />
      <TextField
        placeholder='Phone number'
        name='phone-number'
        value={phoneNumber}
        onChange={onChange}
      />
      <TextField
        placeholder='Email'
        name='email'
        type='email'
        value={email}
        onChange={onChange}
      />
      <TextField
        placeholder='Street'
        name='street'
        value={street}
        onChange={onChange}
      />
      <TextField
        placeholder='Postal code'
        name='postal-code'
        value={postalCode}
        onChange={onChange}
      />
      <TextField
        placeholder='City'
        name='city'
        value={city}
        onChange={onChange}
      />
      <TextField placeholder='NIP' name='nip' value={nip} onChange={onChange} />
      <TextField
        placeholder='Bank Account Number'
        name='bankAccountNumber'
        value={bankAccountNumber}
        onChange={onChange}
      />
      <TextField
        placeholder='Bank Name'
        name='bankName'
        value={bankName}
        onChange={onChange}
      />
    </div>
  )
}
