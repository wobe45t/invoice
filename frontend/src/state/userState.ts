import {atom} from 'recoil'
import { IProfile } from '../interfaces'

interface UserState {
  email: string,
  token: string
  profile?: IProfile
}

export const userAtom = atom<UserState>({
  key: 'userAtom',
  default: {
    email: '',
    token: ''
  }
})

export const profileAtom = atom<IProfile | {}>({
  key: 'profileAtom',
  default: {}
})