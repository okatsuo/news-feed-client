import { Logout, PersonOutlined } from '@mui/icons-material'
import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'
import Router from 'next/router'
import { useContext, useState } from 'react'
import { AuthenticationContext } from '../../context/authentication'
import { AppRoutes } from '../../utils/appRoutes'

export const Navbar = () => {
  const { loggedUser, logout } = useContext(AuthenticationContext)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar position='static'>
      <Toolbar>
        <Container>
          <Box display='flex' justifyContent='space-between' alignItems='center'>
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() => Router.push(AppRoutes.home)}
            >
              <Tooltip title='Voltar para página principal'>
                <Typography>News Feed</Typography>
              </Tooltip>
            </Box>
            <Box textAlign='right' display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
              <Box mr={0.5}>
                <Typography>{loggedUser?.name}</Typography>
                <Typography variant='subtitle2'>{loggedUser?.email}</Typography>
              </Box >
              <IconButton onClick={handleClick}>
                <Avatar src={loggedUser?.picture}>{loggedUser?.name.charAt(0)}</Avatar>
              </IconButton>
            </Box>
          </Box>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => Router.push(AppRoutes.myProfile)}
            >
              <ListItemIcon>
                <PersonOutlined fontSize='small' />
              </ListItemIcon>
              Meu perfil
            </MenuItem>
            <MenuItem
              onClick={logout}
            >
              <ListItemIcon>
                <Logout fontSize='small' />
              </ListItemIcon>
              Sair
            </MenuItem>
          </Menu>
        </Container>
      </Toolbar>
    </AppBar >
  )
}