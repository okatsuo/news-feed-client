import { AppBar, Box, Toolbar, Typography } from '@material-ui/core'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography>Hello!</Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Home
