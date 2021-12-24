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

export const Home = () => {
  const [newPost, setNewPost] = useState<string>('')
  const { loggedUser } = useContext(AuthenticationContext)
  const { data, refetch } = useQuery<{ posts: Post[] }>(QUERY_ALL_POSTS)
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
      console.error(error)
    }
  }
  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      flexDirection={'column'}
      my={2}
    >
      <Box width={420}>
        <Paper elevation={3} sx={{ py: 1, px: 1, mb: 2 }} square>
          <Typography variant='subtitle2'>Compartilhe com o mundo</Typography>
          <TextField
            value={newPost}
            type='text'
            margin='dense'
            size='small'
            placeholder={`No que você está pensando hoje ? ${loggedUser?.name}`}
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
        </Paper>
        <Stack
          spacing={1}
          alignItems={'center'}
        >
          {data?.posts.length ? data.posts.map((post, index: number) => (
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
                <img src={post.imageUrl} alt="" width='100%' property='lazy' />
              }
            </Paper>
          )) : (
            <Typography>
              Seja o primeiro a publicar 🔥
            </Typography>
          )}
        </Stack >
      </Box>
    </Box>
  )
}