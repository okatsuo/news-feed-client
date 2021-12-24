import { Box, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Wrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  margin: `${theme.spacing(2)} 0`,
  alignItems: 'center',
  flexDirection: 'column'
}))

export const Container = styled(Box)(({ theme }) => ({
  width: 470,
  [theme.breakpoints.down('sm')]: {
    width: '100%'
  }
}))

export const PublishPost = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}))

export const Image = styled('img')({
  width: '100%',
  property: 'lazy'
})