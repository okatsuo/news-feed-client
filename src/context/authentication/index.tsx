import { createContext, ReactNode, useState } from 'react';
import { apolloClient } from '../../graphql/client';
import { QUERY_LOGIN } from '../../graphql/query/user/login';
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
  signIn: (values: UserAuthentication) => Promise<void>
}

export const AuthenticationContext = createContext<AuthenticationContextProps>({} as AuthenticationContextProps)

export const AuthenticationProvider = ({ children }: AuthenticationProviderProps) => {
  const [loggedUser, setLoggedUser] = useState<User | null>(null)
  const [authenticationLoading, setAuthenticationLoading] = useState<boolean>(false)
  const signIn = async (values: UserAuthentication) => {
    setAuthenticationLoading(true)
    const { data: { login } } = await apolloClient.query<{ login: UserLogin }>({
      query: QUERY_LOGIN,
      variables: values
    })
    localStorage.setItem(AppStorage.user_token, login.token)
    setLoggedUser(login.user)
    setAuthenticationLoading(false)
  }
  return (
    <AuthenticationContext.Provider
      value={{
        loggedUser,
        authenticationLoading,
        signIn
      }}>
      {children}
    </AuthenticationContext.Provider>
  )
}