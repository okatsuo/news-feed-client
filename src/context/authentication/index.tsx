import { createContext, ReactNode, useEffect, useState } from 'react';
import { apolloClient } from '../../graphql/client';
import { QUERY_LOGIN } from '../../graphql/query/user/login';
import { QUERY_USER_PROFILE } from '../../graphql/query/user/user-profile';
import { UserLogin } from '../../graphql/types/login';
import { User } from '../../graphql/types/user';
import { AppStorage } from '../../utils/appStorages';

type AuthenticationProviderProps = {
  children: ReactNode
}

type UserAuthentication = {
  email: string
  password: string
}

type AuthenticationContextProps = {
  loggedUser: User | null
  authenticationLoading: boolean
  setLoggedUser: (values: User | null) => void
  signIn: (values: UserAuthentication) => Promise<void>
  logout: () => void
  isAuthenticated: () => boolean
}

export const AuthenticationContext = createContext<AuthenticationContextProps>({} as AuthenticationContextProps)

export const AuthenticationProvider = ({ children }: AuthenticationProviderProps) => {
  const [loggedUser, setLoggedUser] = useState<User | null>(null)
  const [authenticationLoading, setAuthenticationLoading] = useState<boolean>(false)

  useEffect(() => {
    setAuthenticationLoading(true)
    const userToken = localStorage.getItem(AppStorage.user_token)
    if (!userToken) return logout()

    apolloClient.query<{ userProfile: User }>({
      query: QUERY_USER_PROFILE,
      variables: { userToken }
    })
      .then(({ data }) => {
        setLoggedUser(data.userProfile)
        setAuthenticationLoading(false)
      })
      .catch(() => {
        logout()
        setAuthenticationLoading(false)
      })
  }, [])

  const logout = () => {
    localStorage.removeItem(AppStorage.user_token)
    setLoggedUser(null)
  }

  const signIn = async (values: UserAuthentication) => {
    const { data: { login } } = await apolloClient.query<{ login: UserLogin }>({
      query: QUERY_LOGIN,
      variables: values
    })
    localStorage.setItem(AppStorage.user_token, login.token)
    setLoggedUser(login.user)
  }

  const isAuthenticated = (): boolean => !!localStorage.getItem(AppStorage.user_token) && !!loggedUser

  return (
    <AuthenticationContext.Provider
      value={{
        loggedUser,
        authenticationLoading,
        setLoggedUser,
        signIn,
        logout,
        isAuthenticated
      }}>
      {children}
    </AuthenticationContext.Provider>
  )
}