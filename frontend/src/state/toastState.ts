import {atom} from 'recoil'
import {IToast} from '../interfaces/toast'


export const toastAtom = atom<IToast[]>({
  key: 'toastsAtom',
  default: []
})