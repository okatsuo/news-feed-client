import { EmailOutlined, Facebook, GitHub, Google, LockOutlined, PersonOutline } from '@mui/icons-material'
import { Box, Button, IconButton, InputAdornment, TextField, Tooltip, Typography } from '@mui/material'

export const Register = () => {
  return (
    <Box sx={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }}>
      <Typography variant='h3' color='primary'>
        Criar conta
      </Typography>

      <Box>
        <IconButton>
          <Tooltip title='Entrar com o Facebook (não ativado ainda)'>
            <Facebook />
          </Tooltip>
        </IconButton>
        <IconButton>
          <Tooltip title='Entrar com o Google (não ativado ainda)'>
            <Google />
          </Tooltip>
        </IconButton>
        <IconButton>
          <Tooltip title='Entrar com o GitHub (não ativado ainda)'>
            <GitHub />
          </Tooltip>
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
  )
}