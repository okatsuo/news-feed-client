import { useQuery } from '@apollo/client'
import { Send } from '@mui/icons-material'
import { InputAdornment, Paper, Stack, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { QUERY_ALL_POSTS } from '../../graphql/query/post/posts'

export const Home = () => {
  const { data } = useQuery(QUERY_ALL_POSTS)
  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      flexDirection={'column'}
      my={2}
    >
      <Box width={400}>
        <Paper elevation={1} sx={{ py: 1, px: 1, mb: 2 }}>
          <TextField
            type='text'
            margin='dense'
            size='small'
            placeholder='No que você está pensando hoje ?'
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <Send />
                </InputAdornment>
              )
            }}
          />
        </Paper>
        <Stack
          spacing={1}
          alignItems={'center'}
        >
          {data && data.posts.map((post: any, index: number) => (
            <Paper key={index} variant='outlined' square sx={{ width: '100%' }}>
              <Box px={2} py={1}>
                <Typography><b>{post.user.name}</b></Typography>
                <Typography variant='body2'>as: {post.created_at}</Typography>
                <br />
                <Typography>{post.text}</Typography>
              </Box>
              {/* TODO setup the next Image configuration */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {post.imageUrl && <img src={post.imageUrl} alt="" style={{ width: '100%' }} />}
            </Paper>
          ))
          }
        </Stack >
      </Box>
    </Box>
  )
}