import { Container } from '@mui/material'
import { ReactNode } from 'react'
import { Navbar } from '../header'

type LayoutProps = {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <Container sx={{ marginTop: ({ spacing }) => spacing(1) }}>
        {children}
      </Container>
    </>
  )
}