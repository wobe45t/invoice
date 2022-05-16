export interface IContractor {
  _id?: string
  name: string
  surname: string
  entityName: string
  phoneNumber: string
  email: string
  nip: string
  street: string
  postalCode: string
  city: string
  bankName?: string
  bankAccountNumber?: string
}

export interface IProfile extends IContractor {
  active?: boolean
}
