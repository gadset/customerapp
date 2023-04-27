import React, {useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import logo from '../Images/logo.svg';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { Grid } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import { Link, useHistory } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const pages = ['Home', 'Repair', 'About Us' , 'Contact Us'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const history = useHistory();

  const handleOpenNavMenu = (event) => {
  //  setAnchorElNav(event.currentTarget);
  setAnchorElNav(true);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(true);
  };

  const handleCloseNavMenu = () => {
  //  setAnchorElNav(null);
  setAnchorElNav(false);
  history.push({
    pathname:'/brands'
  })
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [width, setWidth] = useState(window.innerWidth);

function handleWindowSizeChange() {
    setWidth(window.innerWidth);
}
useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
        window.removeEventListener('resize', handleWindowSizeChange);
    }
}, []);

const isMobile = width <= 768;


  return (
    <Grid container style={{display : 'flex'}}>
    <AppBar position="static" color="transparent" style={{marginTop:0}}>
      <Container maxWidth="xl" style={{width : '90%'}}>
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
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
             <img src={logo} alt="Your SVG" />
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
              open={anchorElNav}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {/* {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
             // ))} */}
               <MenuItem key='home' onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Home</Typography>
                </MenuItem>
                <MenuItem key='Repair' onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Repair</Typography>
                </MenuItem>
                <MenuItem key='About US' onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">About US</Typography>
                </MenuItem>
                <MenuItem key='Contact Us' onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Contact Us</Typography>
                </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
             <img src={logo} alt="Your SVG" />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))} */}
            <Button
                key='home'
               // onClick={handleCloseNavMenu}
               onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'primary', display: 'block' }}
              >
                Home
              </Button>
              {/* <Link to='/brands'> */}
              <Button
                key='Repair'
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'primary', display: 'block' }}
              >
                Repair
              </Button>
              {/* </Link> */}
              <Button
                key='About us'
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'primary', display: 'block' }}
              >
                About us
              </Button>
              <Button
                key='Contact Us'
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'primary', display: 'block' }}
              >
                Contact Us
              </Button>
          </Box>
{/* 
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
          {
            isMobile ? 
           <></>
          : 
          // <Search style={{borderRadius: "5px",
          // border: "1px solid #436BB0",
          // boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",}}>
          //   <SearchIconWrapper>
          //     <SearchIcon />
          //   </SearchIconWrapper>
          //   <StyledInputBase
          //     placeholder="Search for mobile brand and model"
          //     inputProps={{ 'aria-label': 'search' }}
          //   />
          // </Search> 
          <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, border: '1px solid #056AB5', background: 'linear-gradient(0deg, rgba(103, 80, 164, 0.05), rgba(103, 80, 164, 0.05)), #FFFBFE' }}
        >
           <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search for mobile brand and model"
            inputProps={{ 'aria-label': 'Search for mobile brand and model' }}
          />
           <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <MicIcon/>
          </IconButton>
         
        </Paper>
          }
       
        </Toolbar>
      </Container>
    </AppBar>
    {
      isMobile ? 
      <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, border: '1px solid #056AB5', background: 'linear-gradient(0deg, rgba(103, 80, 164, 0.05), rgba(103, 80, 164, 0.05)), #FFFBFE' }}
    >
       <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search for mobile brand and model"
        inputProps={{ 'aria-label': 'Search for mobile brand and model' }}
      />
       <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <MicIcon/>
      </IconButton>
     
    </Paper> : <></>
    }
    </Grid>
  );
}
export default ResponsiveAppBar;