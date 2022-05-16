import {IProfile, IProduct} from '.'

export interface IInvoiceProduct extends IProduct {
  quantity: string 
}

export interface IInvoiceDebug {
  name: string
  issuePlace: string
}

export interface IInvoice {
  _id?: string
  name: string
  issuePlace: string
  issueDate: string
  sellDate: string
  paymentType: string
  paymentDue: string
  contractor: IProfile
  profile: IProfile
  products: IInvoiceProduct[]
}