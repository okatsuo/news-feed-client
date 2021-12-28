import Router from 'next/router'
import { ReactNode, useContext } from 'react'
import { Login } from '../components/authentication/login'
import { AuthenticationContext } from '../context/authentication'

type AuthenticateUser = {
  children: ReactNode
}

export const AuthenticateUser = ({ children }: AuthenticateUser) => {
  const { isAuthenticated, authenticationLoading } = useContext(AuthenticationContext)

  if (authenticationLoading) return <></>

  const authenticated = isAuthenticated()
  !authenticated && Router.push('/')

  return (
    <span>
      {authenticated && children}
    </span>
  )
}