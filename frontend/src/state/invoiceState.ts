import {atom} from 'recoil'
import {IInvoice} from '../interfaces'

export const invoicesAtom = atom<IInvoice[]>({
  key: 'invoicesAtom',
  default: []
})