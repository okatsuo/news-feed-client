import { EmailOutlined, Facebook, GitHub, Google, LockOutlined } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Box, IconButton, InputAdornment, TextField, Tooltip, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import Link from 'next/link'
import Router from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { AuthenticationContext } from '../../context/authentication'
import { AppRoutes } from '../../utils/appRoutes'
import { ScreenAlert } from '../alert'

const initialValues = {
  email: '',
  password: '',
}

export const Login = () => {

  useEffect(() => {
    const query = Router.query
    query?.new_account == '1' && setSuccessMessage('Conta criada com sucesso!')
  }, [])

  const [loading, setLoading] = useState<boolean>(false)
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const { signIn } = useContext(AuthenticationContext)
  const handleSubmit = async (values: typeof initialValues) => {
    try {
      setLoading(true)
      await signIn(values)
      return setLoading(false)
    } catch (error) {
      setLoading(false)
      error instanceof Error && setErrorMessage(error.message)
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
      <Box>
        <Typography>
          Ou crie uma <Link href={AppRoutes.register}>nova conta</Link>.
        </Typography>
      </Box>
      <ScreenAlert
        message={successMessage}
        onClose={setSuccessMessage}
        severity='success'
      />
      <ScreenAlert
        message={errorMessage}
        onClose={setErrorMessage}
        severity='error'
      />
    </Box >
  )
}