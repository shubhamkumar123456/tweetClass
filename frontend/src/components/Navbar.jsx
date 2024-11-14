import React, { useState } from 'react';
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
import AdbIcon from '@mui/icons-material/Adb';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store/UserSlice';
import axios from 'axios';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Logout','Signup','Login'];

function Navbar() {
  let dispatch = useDispatch();
  let userDetails = useSelector((state)=>state.user.user)
  // console.log(userDetails)
  let login = useSelector((state)=>state.user.login)

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [searchedUsers, setsearchedUsers] = useState([]);
  const handleSearchChanger = async(e)=>{
    console.log(e.target.value)
    let res = await axios.post(`http://localhost:8080/users/searchFriend?name=${e.target.value}`)
    console.log(res.data)
    setsearchedUsers(res.data.users)
  }

  return (
    <AppBar position="fixed" className='bg-red-400 top-0 left-0 right-0' sx={{backgroundColor:"gray"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
          
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
           <Link to={'/'}> SocialBook</Link>
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
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {/* {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                </MenuItem>
              ))} */}
              <div>
                <input onChange={handleSearchChanger} type="text" placeholder='search a friend...' className='border-1 border-blue-500 outline-none py-2 px-5 text-black rounded-md ' />
              </div>
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
          
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
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex',justifyContent:"center"} }}>
            {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))} */}
             <div className='relative'>
                <input onChange={handleSearchChanger} type="text" placeholder='search a friend..' className='border-1 border-blue-500 outline-none py-2 px-5 text-black rounded-md ' />

               {searchedUsers && <div className='absolute w-full text-black mt-1 rounded-md bg-yellow-300'>
                     {
                      searchedUsers.map((user)=>{
                        return <Link to={`/friendPage?name=${user.name}`} state={user} className='flex p-2 items-center gap-3 mt-2 border-b-2'> 
                          <img src={user.profilePic} className='w-10 h-10 rounded-full' alt="" />
                          <p>{user.name}</p>
                        </Link>
                      })
                     }
                </div>}
              </div>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={userDetails?.profilePic} />
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
              {settings.map((setting,i) => (
               
                setting==='Profile' && login===true?<Link key={setting} to="/profile">
                 <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
              </MenuItem>
                </Link>
              :
              setting==='Logout' && login ===true ?   <MenuItem key={setting} onClick={()=>dispatch(logout())}>
              <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
            </MenuItem>
            :
              (login===false && setting!=='Logout' && setting!=='Profile' && <MenuItem  className={`hidden`} key={setting} onClick={handleCloseUserMenu}>
                <Typography sx={{ textAlign: 'center',display:'block' }}>{setting}</Typography>
              </MenuItem>)
               
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
