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
      <Typography>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Labore rem, quibusdam ad vitae architecto iusto recusandae
        quos dolor non, minus libero? Aut velit dolorem ipsum voluptas!
        Sequi modi omnis doloribus!
      </Typography>
    </Box>
  )
}

export default Home
