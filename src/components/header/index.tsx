import { AppBar, Avatar, Box, Container, Toolbar, Typography } from '@mui/material'
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
            <Box textAlign='right' display={'flex'} alignItems={'center'}>
              <Box mr={2}>
                <Typography>{loggedUser?.name}</Typography>
                <Typography variant='subtitle2'>{loggedUser?.email}</Typography>
              </Box >
              <Avatar>{loggedUser?.name.charAt(0)}</Avatar>
            </Box>
          </Box>
        </Container>
      </Toolbar>
    </AppBar >
  )
}