import { useQuery } from '@apollo/client'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import { QUERY_ALL_POSTS } from '../../graphql/query/post/posts'

export const Home = () => {
  const { data, loading } = useQuery(QUERY_ALL_POSTS)
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      {data && data.posts.map((post: any, index: number) => (
        <Box key={index} sx={{ width: '30rem', border: '0.1rem solid black', marginBottom: ({ spacing }) => spacing(2) }} >
          <Typography><b>{post.user.name}</b></Typography>
          <Typography variant='body2'>as: {post.created_at}</Typography>
          <br />
          <Typography>{post.text}</Typography>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {post.imageUrl && <img src={post.imageUrl} alt="" style={{ width: '200px' }} />}
        </Box >
      ))}
    </Box >
  )
}