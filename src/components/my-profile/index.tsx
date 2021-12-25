import { AddAPhotoOutlined, ArrowBack } from '@mui/icons-material'
import { Avatar, Badge, Box, Button, IconButton, TextField, Tooltip, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import { useContext, useState } from 'react'
import { AuthenticationContext } from '../../context/authentication'
import { formatDate } from '../../utils/formatDate'
import * as Yup from 'yup'
import { apolloClient } from '../../graphql/client'
import { MUTATION_USER_UPDATE } from '../../graphql/mutation/user-update'
import Router from 'next/router'
import { User } from '../../graphql/types/user'
import { ScreenAlert } from '../alert'
import { LoadingButton } from '@mui/lab'
import { AppRoutes } from '../../utils/appRoutes'

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é necessário')
})

const fiveMegabyteInKilobyte = 5000000

export const MyProfile = () => {
  const [userPicture, setUserPicture] = useState<{ picture: File, pictureUrl: string } | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const { loggedUser, setLoggedUser } = useContext(AuthenticationContext)

  if (!loggedUser) return <div>loading</div>;

  const initialValues = {
    name: loggedUser.name
  }

  const handleImageChange = (files: FileList) => {
    const picture = files[0]

    const allowedFiles = ['image/png', 'image/jpeg']
    if (!allowedFiles.includes(picture.type)) return setErrorMessage('Arquivo não permitido')
    if (picture.size > fiveMegabyteInKilobyte) return setErrorMessage('Foto muito grande, máximo 5 MB.')

    const pictureUrl = URL.createObjectURL(picture)

    setUserPicture({ picture, pictureUrl })
  }

  const handleSubmit = async (values: typeof initialValues) => {
    setLoading(true)
    try {
      const { data } = await apolloClient.mutate<{ userUpdate: User }>({
        mutation: MUTATION_USER_UPDATE,
        variables: {
          userId: loggedUser.id,
          fields: {
            ...values,
            picture: userPicture?.picture
          }
        }
      })
      data?.userUpdate && setLoggedUser(data.userUpdate)
      setLoading(false)
      setSuccessMessage('Alteração salva com sucesso!')
    } catch (error) {
      setLoading(false)
      error instanceof Error && setErrorMessage(error.message)
    }
  }

  const handleCancel = () => {
    Router.reload() // TODO temp action
  }

  return (
    <Box display='flex' justifyContent='center' p={5}>
      <Box sx={{
        width: '250px'
      }}>
        <Box>
          <IconButton onClick={() => Router.push(AppRoutes.home)}>
            <Tooltip title='Voltar para página principal'>
              <ArrowBack />
            </Tooltip>
          </IconButton>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'start',
            alignItems: 'center',
          }}
        >
          <Badge
            overlap='circular'
            sx={{ mb: ({ spacing }) => spacing(3) }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              <label>
                <input
                  style={{ display: 'none' }}
                  onChange={({ target }) => {
                    target.files && handleImageChange(target.files)
                  }}
                  type='file'
                  accept='image/x-png, image/jpeg'
                />
                <IconButton
                  component='span'
                  sx={{
                    backgroundColor: ({ palette }) => palette.primary.main,
                    transition: '0.2s',
                    ':hover': {
                      backgroundColor: ({ palette }) => palette.primary.main, opacity: 0.9
                    }
                  }}
                >
                  <AddAPhotoOutlined />
                </IconButton>
              </label>
            }
          >
            <Avatar
              sx={{
                width: '150px',
                height: '150px',
              }}
              src={userPicture?.pictureUrl || loggedUser.picture || ''}
            />
          </Badge>
          <Box textAlign={'center'}>
            <Typography
              variant='caption'
            >
              Perfil criado em: {formatDate(loggedUser.created_at)}
            </Typography>
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={schema}
            >
              {({ errors, handleChange }) => (
                <Form>
                  <TextField
                    defaultValue={loggedUser.email}
                    disabled
                    fullWidth
                  />

                  <TextField
                    type='text'
                    label='Nome'
                    margin='normal'
                    name='name'
                    defaultValue={initialValues.name}
                    onChange={handleChange}
                    helperText={errors.name}
                    fullWidth
                  />
                  <Box display='flex' justifyContent='space-evenly' mt={1}>
                    <Button color='error' variant='contained' onClick={handleCancel}>Cancelar</Button>
                    <LoadingButton
                      loading={loading}
                      color='primary'
                      variant='contained'
                      type='submit'
                    >
                      Salvar
                    </LoadingButton>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
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