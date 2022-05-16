import {atom} from 'recoil'
import {IProfile} from '../interfaces'

export const contractorsAtom = atom<IProfile[]>({
  key: 'contractorsAtom',
  default: []
})