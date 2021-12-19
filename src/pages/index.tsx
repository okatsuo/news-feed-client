import type { NextPage } from 'next'
import { useContext } from 'react'
import { Login } from '../components/authentication/login'
import { AuthenticationContext } from '../context/authentication'


const Home: NextPage = () => {
  const { loggedUser, authenticationLoading } = useContext(AuthenticationContext)
  return (
    <>
      {
        !authenticationLoading && loggedUser
          ? <div>Home page 🚀</div>
          : <Login />

      }
    </>
  )
}

export default Home
