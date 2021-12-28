import Router from 'next/router'
import { ReactNode, useContext } from 'react'
import { AuthenticationContext } from '../context/authentication'

type AuthenticateUser = {
  children: ReactNode
}

export const AuthenticateUser = ({ children }: AuthenticateUser) => {
  const { isAuthenticated } = useContext(AuthenticationContext)
  const authenticated = isAuthenticated()

  if (!authenticated) {
    Router.push('/')
  }
  return (
    <span>
      {authenticated && { children }}
    </span>
  )
}