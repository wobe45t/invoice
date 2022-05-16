import { createContext, useState } from 'react'
import {IProfile} from '../interfaces'
export const UserContext = createContext<{
  user: { 
    _id?: string
    email?: string
    profile?: IProfile
  }
  setUser: Function
}>({
  user: {},
  setUser: () => {},
})

interface Props {
  children: any
}
export const UserProvider = (props: Props) => {
  const { children } = props
  const [user, setUser] = useState({})

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
