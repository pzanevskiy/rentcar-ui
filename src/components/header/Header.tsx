import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useKeycloak } from '@react-keycloak/web';
import { Login } from '../login/Login';
import { Register } from '../login/Register';
import { ProfilePicture } from '../profilePicture/ProfilePicture';
import { Link } from '@mui/material';

const pages = [
  { name: 'Rent', href: '/location' },
  { name: 'Orders', href: '/orders' },
  { name: 'Penalties', href: '/penalties' }
]

export const Header = () => {
  const { keycloak } = useKeycloak()

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <AppBar position="static" sx={{ background: '#4caf50' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'white',
              textDecoration: 'none',
              "&:hover": { color: 'white' }
            }}
          >
            RENTCAR
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" component="a" href={page.href}
                    sx={{
                      color: 'black',
                      textDecoration: 'none',
                      "&:hover": { color: 'black' }
                    }}>
                    {page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'white',
              letterSpacing: '.3rem',
              textDecoration: 'none',
              "&:hover": { color: 'white' }
            }}
          >
            RENTCAR
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                href={page.href}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  textAlign: 'center',
                  textDecoration: 'none',
                  "&:hover": {
                    background: 'white',
                    color: '#4caf50',
                    transition: 'all .3s',
                  }
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {keycloak.authenticated &&
            (<Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <ProfilePicture />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem key={'Profile'} onClick={handleCloseUserMenu}>
                  <Link href="/profile"
                    sx={{
                      color: '#000',
                      textAlign: "center",
                      textDecoration: 'none',
                      "&:hover": { color: 'black' }
                    }} >
                    Profile
                  </Link>
                </MenuItem>
                <MenuItem key={'Logout'} onClick={handleCloseUserMenu}>
                  <Link
                    sx={{
                      color: '#000',
                      textAlign: "center",
                      textDecoration: 'none',
                      "&:hover": { color: 'black' }
                    }}
                    onClick={() => { keycloak.logout() }}>
                    Logout
                  </Link>
                </MenuItem>
              </Menu>
            </Box>)}
          {!keycloak.authenticated &&
            (<>
              <Login />
              <Register />
            </>)}
        </Toolbar>
      </Container>
    </AppBar>
  )
}