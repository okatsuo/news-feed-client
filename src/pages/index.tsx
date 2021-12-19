import type { NextPage } from 'next'
import { useContext } from 'react'
import { Login } from '../components/authentication/login'
import { Home } from '../components/home'
import { AuthenticationContext } from '../context/authentication'


const HomePage: NextPage = () => {
  const { loggedUser, authenticationLoading } = useContext(AuthenticationContext)
  return (
    // <Home />
    <>
      {!authenticationLoading && loggedUser
        ? <Home />
        : <Login />
      }
    </>
  )
}

export default HomePage
