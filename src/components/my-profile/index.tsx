import { AddAPhotoOutlined, ArrowBack, UploadFile } from '@mui/icons-material'
import { Avatar, Badge, Box, Button, IconButton, TextField, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import { useContext, useState } from 'react'
import { AuthenticationContext } from '../../context/authentication'
import { formatDate } from '../../utils/formatDate'
import * as Yup from 'yup'

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é necessário')
})

export const MyProfile = () => {
  const [userPicture, setUserPicture] = useState<{ picture: File, pictureUrl: string } | null>(null)
  const { loggedUser } = useContext(AuthenticationContext)

  if (!loggedUser) return <div>loading</div>;

  const initialValues = {
    name: loggedUser.name
  }

  const handleSubmit = async (values: typeof initialValues) => {
    console.log('values:', values)
    console.log('picture:', userPicture)
  }
  return (
    <Box display='flex' justifyContent='center' p={5}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '250px'
      }}>
        <Badge
          overlap='circular'
          sx={{ mb: ({ spacing }) => spacing(3) }}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={
            <label>
              <input
                style={{ display: 'none' }}
                onChange={({ target }) => {
                  if (target.files) {
                    const picture = target.files[0]
                    const pictureUrl = URL.createObjectURL(picture)
                    setUserPicture({ picture, pictureUrl })
                  }
                }}
                type='file'
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
            src={userPicture?.pictureUrl || ''}
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
                  <Button color='error' variant='contained'>Cancelar</Button>
                  <Button color='primary' variant='contained' type='submit'>Salvar</Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box >
  )
}