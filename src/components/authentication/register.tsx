import { EmailOutlined, Facebook, GitHub, Google, LockOutlined, PersonOutline } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Box, IconButton, InputAdornment, TextField, Tooltip, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import Link from 'next/link'
import Router from 'next/router'
import { useState } from 'react'
import { apolloClient } from '../../graphql/client'
import { MUTATION_USER_CREATE } from '../../graphql/mutation/user-create'
import { AppRoutes } from '../../utils/appRoutes'
import { ScreenAlert } from '../alert'
import * as Yup from 'yup'

const initialValues = {
  email: '',
  password: '',
  name: ''
}

const schema = Yup.object().shape({
  email: Yup.string().email(),
  password: Yup.string().min(4, 'A senha deve ter mais que 3 dígitos'),
  name: Yup.string().min(3, 'Nome deve ter no mínimo 3 caracteres')
})

export const Register = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const handleSubmit = async (values: typeof initialValues) => {
    try {
      setLoading(true)
      const { data } = await apolloClient.mutate({
        mutation: MUTATION_USER_CREATE,
        variables: values
      })
      setLoading(false)
      Router.push(AppRoutes.home)
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
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        {({ handleChange, errors }) => (
          <Form>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
              <TextField
                name='name'
                placeholder='Nome'
                type='text'
                margin='normal'
                onChange={handleChange}
                helperText={errors.name}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <PersonOutline />
                    </InputAdornment>
                  )
                }}
              />

              <TextField
                name='email'
                placeholder='Email'
                type='email'
                margin='normal'
                onChange={handleChange}
                helperText={errors.email}
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
                helperText={errors.password}
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
                REGISTRAR
              </LoadingButton>
            </Box>
          </Form>
        )}
      </Formik>
      <Box>
        <Typography>
          Ou entre com <Link href={AppRoutes.home}>sua conta</Link>.
        </Typography>
      </Box>
      <ScreenAlert
        message={errorMessage}
        onClose={setErrorMessage}
        severity='error'
      />
    </Box >
  )
}