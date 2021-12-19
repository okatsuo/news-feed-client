import { EmailOutlined, Facebook, GitHub, Google, LockOutlined } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Box, IconButton, InputAdornment, TextField, Tooltip, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import { useState } from 'react'
import { apolloClient } from '../../graphql/client'
import { QUERY_LOGIN } from '../../graphql/query/user/login'
import { UserLogin } from '../../graphql/types/login'
import { AppStorage } from '../../utils/appStorages'

const initialValues = {
  email: '',
  password: '',
}

export const Login = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const handleSubmit = async (values: typeof initialValues) => {
    try {
      setLoading(true)
      const { data: { login } } = await apolloClient.query<{ login: UserLogin }>({
        query: QUERY_LOGIN,
        variables: values
      })
      localStorage.setItem(AppStorage.user_token, login.token)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error(error)
    }
  }
  return (
    <Box sx={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }}>
      <Typography variant='h3' color='primary'>
        Entrar
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
      <Typography variant='body2'>ou entre com teu email</Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ handleChange }) => (
          <Form>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
              <TextField
                name='email'
                placeholder='Email'
                type='email'
                margin='normal'
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <EmailOutlined />
                    </InputAdornment>
                  )
                }}
              />

              <TextField
                name='password'
                placeholder='Senha'
                type='password'
                margin='normal'
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <LockOutlined />
                    </InputAdornment>
                  ),
                }}
              />
              <LoadingButton
                loading={loading}
                variant='contained'
                type='submit'
              >
                ENTRAR
              </LoadingButton>
            </Box>
          </Form>
        )}
      </Formik>
    </Box >
  )
}