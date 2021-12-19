import { ReactNode } from 'react'
import { AuthenticationProvider } from './authentication'

type GlobalContextProviderProps = {
  children: ReactNode
}

export const GlobalContextProvider = ({ children }: GlobalContextProviderProps) => {
  return (
    <AuthenticationProvider>
      {children}
    </AuthenticationProvider>
  )
}