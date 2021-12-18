import { AppBar, Box, Button, IconButton, InputAdornment, TextField, Toolbar, Typography } from '@mui/material'
import { EmailOutlined, Facebook, GitHub, Google, LockOutlined, PersonOutline } from '@mui/icons-material'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography>Hello!</Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{
        paddingTop: ({ spacing }) => spacing(4),
        display: 'flex',
        justifyContent: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
      }}>
        <Typography variant='h3' color='primary'>
          Criar conta
        </Typography>

        <Box>
          <IconButton>
            <Facebook />
          </IconButton>
          <IconButton>
            <Google />
          </IconButton>
          <IconButton>
            <GitHub />
          </IconButton>
        </Box>
        <Typography variant='body2'>ou inscreva-se com teu email</Typography>
        <form>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
            <TextField
              placeholder='Nome'
              type='text'
              margin='normal'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <PersonOutline />
                  </InputAdornment>
                )
              }}
            />

            <TextField
              placeholder='Email'
              type='email'
              margin='normal'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <EmailOutlined />
                  </InputAdornment>
                )
              }}
            />

            <TextField
              placeholder='Senha'
              type='password'
              margin='normal'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <LockOutlined />
                  </InputAdornment>
                ),
              }}
            />

            <Button variant='contained'>
              REGISTRAR
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  )
}

export default Home
