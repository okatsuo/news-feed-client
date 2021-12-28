import { useQuery } from '@apollo/client'
import { DeleteForever, Link, MoreHoriz, Report, Send, VisibilityOff } from '@mui/icons-material'
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, InputAdornment, Menu, MenuItem, Paper, Stack, TextField, Tooltip, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { MouseEvent, useContext, useState } from 'react'
import { boolean } from 'yup/lib/locale'
import { AuthenticationContext } from '../../context/authentication'
import { apolloClient } from '../../graphql/client'
import { MUTATION_POST_CREATE } from '../../graphql/mutation/post-create'
import { MUTATION_POST_DELETE } from '../../graphql/mutation/post-delete'
import { QUERY_ALL_POSTS } from '../../graphql/query/post/posts'
import { Post } from '../../graphql/types/post'
import { UserRole } from '../../graphql/types/user-role'
import { ScreenAlert } from '../alert'
import * as Styles from './styles'

export const Home = () => {
  const [newPost, setNewPost] = useState<string>('')
  const [selectedPost, setSelecetedPost] = useState<{ userId: string, postId: string } | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false)
  const { loggedUser } = useContext(AuthenticationContext)

  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { data, refetch, loading } = useQuery<{ posts: Post[] }>(QUERY_ALL_POSTS)
  const handleSubmit = async () => {
    if (!newPost) return
    try {
      const { data } = await apolloClient.mutate({
        mutation: MUTATION_POST_CREATE,
        variables: {
          userId: loggedUser?.id,
          text: newPost
        }
      })
      // TODO study efficient way to work with cache to not refetch all data
      setNewPost('')
      refetch()
    } catch (error) {
      error instanceof Error && setErrorMessage(error.message)
    }
  }

  const MenuOptions = () => {
    const AdminOptions = () => {
      return (
        <MenuItem onClick={() => setIsOpenDialog(true)}>
          <DeleteForever color='action' />
          <Typography ml={1}>Deletar</Typography>
        </MenuItem>
      )
    }
    const UserOptions = () => {
      return (
        selectedPost?.userId === loggedUser?.id
          ? <MenuItem onClick={() => deletePost(selectedPost?.postId)}>
            <DeleteForever color='action' />
            <Typography ml={1}>Deletar</Typography>
          </MenuItem>
          : null
      )
    }

    return (
      <>
        <MenuItem disabled>
          <Link color='action' />
          <Typography ml={1}>Copiar link da publicação</Typography>
        </MenuItem>
        <MenuItem disabled>
          <VisibilityOff color='action' />
          <Typography ml={1}>Não quero ver isso</Typography>
        </MenuItem>
        <Divider color={'lightgrey'} variant='middle' />
        {loggedUser?.role === UserRole.admin ? <AdminOptions /> : <UserOptions />}
        <MenuItem disabled>
          <Report color='action' />
          <Typography ml={1}>Reportar</Typography>
        </MenuItem>
      </>
    )
  }

  const deletePost = async (postId?: string) => {
    if (!postId) return;
    try {
      await apolloClient.mutate({
        mutation: MUTATION_POST_DELETE,
        variables: { postId }
      })
      setSuccessMessage('Publicação apagada com sucesso.')
      refetch()
    } catch (error) {
      error instanceof Error && setErrorMessage(error.message)
    }
  }

  return (
    <Styles.Wrapper>
      <Styles.Container>
        <Styles.PublishPost elevation={3} square>
          <Typography variant='subtitle2'>Compartilhe com o mundo</Typography>
          <TextField
            value={newPost}
            type='text'
            margin='dense'
            size='small'
            placeholder={`No que você está pensando hoje ? ${loggedUser?.name.split(' ')[0]}`}
            fullWidth
            onChange={({ target }) => setNewPost(target.value)}
            onKeyUp={({ key }) => key === 'Enter' && handleSubmit()}
            InputProps={{
              endAdornment: (
                <Box onClick={handleSubmit} sx={{ cursor: 'pointer' }}>
                  <InputAdornment position='end'>
                    <Send color='primary' />
                  </InputAdornment>
                </Box>
              )
            }}
          />
        </Styles.PublishPost>
        <Stack
          spacing={1}
          alignItems={'center'}
        >
          {
            data?.posts.length && data.posts.map((post, index: number) => (
              <Paper key={index} variant='outlined' sx={{ width: '100%' }}>
                <Box px={2} py={1} >
                  <Box display='flex' justifyContent='space-between'>
                    <Box display='flex' flexDirection='row'>
                      <Avatar src={post.user.picture}>{post.user.name.charAt(0)}</Avatar>
                      <Box ml={2}>
                        <Typography>
                          <b>{post.user.name}</b>
                        </Typography>

                        <Typography
                          variant='body2'>
                          em: {new Date(post.created_at).toLocaleString()}
                        </Typography>
                        <br />
                      </Box>
                    </Box>
                    <Box>
                      <Tooltip title='Abrir opções da publicação' >
                        <IconButton onClick={(event) => {
                          handleClick(event);
                          setSelecetedPost({ userId: post.user.id, postId: post.id })
                        }}>
                          <MoreHoriz />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                  <Typography>
                    {post.text}
                  </Typography>
                </Box>
                {post.imageUrl &&
                  <Styles.Image src={post.imageUrl} alt='post image' />
                }
              </Paper>
            ))
          }
        </Stack>
      </Styles.Container>

      <Dialog open={isOpenDialog} onClose={() => setIsOpenDialog(false)}>
        <DialogContent>
          <Typography><b>Tem certeza que deseja apagar essa publicação ?</b></Typography>
        </DialogContent>
        <DialogActions>
          <Button 
          variant='contained'
            onClick={() => setIsOpenDialog(false)}
          >
            Cancelar
          </Button>
          <Button
            variant='contained'
            color='error'
            onClick={() => {
              deletePost(selectedPost?.postId)
              setIsOpenDialog(false)
            }}
          >Apagar!</Button>
        </DialogActions>
      </Dialog>

      <Menu
        anchorEl={anchorEl}
        onClose={handleClose}
        onClick={handleClose}
        open={open}
        PaperProps={{
          elevation: 5
        }}
      >
        <MenuOptions />
      </Menu>
      <ScreenAlert
        message={errorMessage}
        onClose={setErrorMessage}
        severity='error'
      />
      <ScreenAlert
        message={successMessage}
        onClose={setSuccessMessage}
        severity='success'
      />
    </Styles.Wrapper>
  )
}
