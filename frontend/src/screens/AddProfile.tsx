import {useEffect, useState} from 'react'
// import { addProfile } from '../actions'
import {TextField, Button} from '../components'
import {IProfile} from '../interfaces'

const AddProfile = () => {

  const [name, setName] = useState<string>('Michal')
  const [surname, setSurname] = useState<string>('Wróbel')
  const [entityName, setEntityName] = useState<string>('Gospodarstwo Moje')
  const [phoneNumber, setPhoneNumber] = useState<string>('531595647')
  const [email, setEmail] = useState<string>('miichal@gmail.com')
  const [nip, setNIP] = useState<string>('0123456789')
  const [street, setStreet] = useState<string>('Zamch 116')
  const [postalCode, setPostalCode] = useState<string>('23-413')
  const [city, setCity] = useState<string>('Obsza')

  const [profiles, setProfiles] = useState<IProfile[]>([
    {
      name: 'Michal',
      surname: 'Wrobel',
      entityName: 'Gospodarstwo Wrobel',
      email: 'wrobel@gmail.com',
      phoneNumber: '531595647',
      street: 'Zamch 116',
      postalCode: '23-413',
      city: 'Obsza',
      nip: '0123456789',
      active: true,
    },
    {
      name: 'Miroslawa',
      surname: 'Wrobel',
      entityName: 'Firma Handlowa',
      email: 'wrobel@gmail.com',
      phoneNumber: '531595647',
      street: 'Zamch 116',
      postalCode: '23-413',
      city: 'Obsza',
      nip: '0123456789',
      active: false,
    },
  ])
  useEffect(() => {
    console.log('name changed ', name)
  }, [entityName])

  const addDebugHandler = () => {
    // addProfile({
    //   ...profiles[0]
    // })
    // addProfile({
    //   ...profiles[1]
    // })
  }

  const addProfileHandler = () => {
    // addProfile({
    //   name,
    //   surname,
    //   entityName,
    //   phoneNumber,
    //   email,
    //   nip,
    //   street,
    //   postalCode,
    //   city,
    //   active: false
    // })
  }

  return (
    <div>
      <TextField 
        placeholder='Name'
        name='name'
        value={name}
        onChange={(v) => setName(v)} />
      <TextField 
        placeholder='Surname'
        name='surname'
        value={surname}
        onChange={(v) => setSurname(v)} />
      <TextField 
        placeholder='Entity name'
        name='entity-name'
        value={entityName}
        onChange={(v) => setEntityName(v)} />
      <TextField
        placeholder='Phone number'
        name='phone-number'
        value={phoneNumber}
        onChange={(v) => setPhoneNumber(v)}
      />
      <TextField
        placeholder='Email'
        name='email'
        type='email'
        value={email}
        onChange={(v) => setEmail(v)}
      />
      <TextField
        placeholder='Street'
        name='street'
        value={street}
        onChange={(v) => setStreet(v)}
      />
      <TextField
        placeholder='Postal code'
        name='postal-code'
        value={postalCode}
        onChange={(v) => setPostalCode(v)}
      />
      <TextField
         placeholder='City' 
         name='city' 
         value={city}
         onChange={(v) => setCity(v)} />
      <TextField 
        placeholder='NIP' 
        name='nip' 
        value={nip}
        onChange={(v) => setNIP(v)} />

      <Button onClick={() => addProfileHandler()}>Add profile</Button>
      <Button onClick={() => addDebugHandler()}>Add debug</Button>

    </div>
  )
}
export default AddProfile