import { useQuery } from '@apollo/client'
import { DeleteForever, Link, MoreHoriz, Report, Send, VisibilityOff } from '@mui/icons-material'
import { Avatar, Divider, IconButton, InputAdornment, Menu, MenuItem, Paper, Stack, TextField, Tooltip, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { MouseEvent, useContext, useState } from 'react'
import { AuthenticationContext } from '../../context/authentication'
import { apolloClient } from '../../graphql/client'
import { MUTATION_POST_CREATE } from '../../graphql/mutation/post-create'
import { QUERY_ALL_POSTS } from '../../graphql/query/post/posts'
import { Post } from '../../graphql/types/post'
import { ScreenAlert } from '../alert'
import * as Styles from './styles'

export const Home = () => {
  const [newPost, setNewPost] = useState<string>('')

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [errorMessage, setErrorMessage] = useState<string>('')
  const { loggedUser } = useContext(AuthenticationContext)
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
                        <IconButton onClick={handleClick}>
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
      <Menu
        anchorEl={anchorEl}
        onClose={handleClose}
        onClick={handleClose}
        open={open}
        PaperProps={{
          elevation: 5
        }}
      >
        <MenuItem>
          <Link color='action' />
          <Typography ml={1}>Copiar link da publicação</Typography>
        </MenuItem>
        <MenuItem>
          <VisibilityOff color='action' />
          <Typography ml={1}>Não quero ver isso</Typography>
        </MenuItem>
        <Divider color={'lightgrey'} variant='middle' />
        <MenuItem>
          <DeleteForever color='action' />
          <Typography ml={1}>Deletar</Typography>
        </MenuItem>
        <MenuItem>
          <Report color='action' />
          <Typography ml={1}>Reportar</Typography>
        </MenuItem>
      </Menu>
      <ScreenAlert
        message={errorMessage}
        onClose={setErrorMessage}
        severity='error'
      />
    </Styles.Wrapper>
  )
}