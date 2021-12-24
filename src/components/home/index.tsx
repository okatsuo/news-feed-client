import { useQuery } from '@apollo/client'
import { Send } from '@mui/icons-material'
import { Avatar, InputAdornment, Paper, Stack, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useContext, useState } from 'react'
import { AuthenticationContext } from '../../context/authentication'
import { apolloClient } from '../../graphql/client'
import { MUTATION_POST_CREATE } from '../../graphql/mutation/post-create'
import { QUERY_ALL_POSTS } from '../../graphql/query/post/posts'
import { Post } from '../../graphql/types/post'
import { ScreenAlert } from '../alert'
import * as Styles from './styles'

export const Home = () => {
  const [newPost, setNewPost] = useState<string>('')
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
            !loading &&
            data?.posts.length &&
            data.posts.map((post, index: number) => (
              <Paper key={index} variant='outlined' sx={{ width: '100%' }}>
                <Box px={2} py={1} >
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
        </Stack >
      </Styles.Container>
      <ScreenAlert
        message={errorMessage}
        onClose={setErrorMessage}
        severity='error'
      />
    </Styles.Wrapper>
  )
}