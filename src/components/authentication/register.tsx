import { EmailOutlined, Facebook, GitHub, Google, LockOutlined, PersonOutline } from '@mui/icons-material'
import { Box, Button, IconButton, InputAdornment, TextField, Tooltip, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import { apolloClient } from '../../graphql/client'
import { MUTATION_USER_CREATE } from '../../graphql/mutation/user-create'

const initialValues = {
  email: '',
  password: '',
  name: ''
}

export const Register = () => {
  const handleSubmit = async (values: any) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: MUTATION_USER_CREATE,
        variables: values
      })
      console.log('data:', data)
    } catch (error) {
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
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ handleChange }) => (
          <Form>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
              <TextField
                name='name'
                placeholder='Nome'
                type='text'
                margin='normal'
                onChange={handleChange}
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

              <Button variant='contained' type='submit'>
                REGISTRAR
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box >
  )
}