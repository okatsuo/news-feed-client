import { NoSsr } from '@mui/material'
import type { NextPage } from 'next'
import { useContext } from 'react'
import { Login } from '../components/authentication/login'
import { Home } from '../components/home'
import { Layout } from '../components/layout'
import { AuthenticationContext } from '../context/authentication'


const HomePage: NextPage = () => {
  const { hasToken, authenticationLoading } = useContext(AuthenticationContext)
  return hasToken()
    ? (
      <Layout>
        <Home />
      </Layout>
    )
    : (
      <Login />
    )
}

export default HomePage
