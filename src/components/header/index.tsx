import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material'
import { useContext } from 'react'
import { AuthenticationContext } from '../../context/authentication'

export const Navbar = () => {
  const { loggedUser } = useContext(AuthenticationContext)
  return (
    <AppBar position='static'>
      <Toolbar>
        <Container>
          <Box display='flex' justifyContent='space-between' alignItems='center'>
            <Box>
              News Feed
            </Box>
            <Box textAlign='right'>
              <Typography>{loggedUser?.name}</Typography>
              <Typography variant='subtitle2'>{loggedUser?.email}</Typography>
            </Box>
          </Box>
        </Container>
      </Toolbar>
    </AppBar >
  )
}