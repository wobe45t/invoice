import {atom} from 'recoil'
import {IProduct} from '../interfaces'

export const productsAtom = atom<IProduct[]>({
  key: 'productsAtom',
  default: []
})