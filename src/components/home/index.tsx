import { useQuery } from '@apollo/client'
import { Send } from '@mui/icons-material'
import { InputAdornment, Paper, Stack, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useContext } from 'react'
import { AuthenticationContext } from '../../context/authentication'
import { QUERY_ALL_POSTS } from '../../graphql/query/post/posts'
import { Post } from '../../graphql/types/post'

export const Home = () => {
  const { loggedUser } = useContext(AuthenticationContext)
  const { data } = useQuery<{ posts: Post[] }>(QUERY_ALL_POSTS)
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
            type='text'
            margin='dense'
            size='small'
            placeholder={`No que você está pensando hoje ? ${loggedUser?.name}`}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <Send color='primary' />
                </InputAdornment>
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
              <Box px={2} py={1}>
                <Typography><b>{post.user.name}</b></Typography>
                <Typography variant='body2'>em: {new Date(post.created_at).toLocaleString()}</Typography>
                <br />
                <Typography>{post.text}</Typography>
              </Box>
              {post.imageUrl && <img src={post.imageUrl} alt="" width='100%' property='lazy' />}
            </Paper>
          )) : (
            <Typography>Seja o primeiro a publicar 🔥</Typography>
          )
          }
        </Stack >
      </Box>
    </Box>
  )
}