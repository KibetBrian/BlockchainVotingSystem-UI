import { AppBar, Avatar, Badge, Card, Divider, IconButton, ListItemButton, ListItemText, Popover, Slide, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { useEffect } from 'react'
import { IoMdNotifications } from 'react-icons/io'
import { theme } from '../theme'
import SearchBar from './SearchBar'
import { ClickAwayListener } from '@mui/base';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/userSlice.js'




const TopBar = () => {
    const [notMounted, setNotMounted] = useState(true);
    const imageAddress = "https://images.pexels.com/photos/5358099/pexels-photo-5358099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    const countryAddress = "https://countryflagsapi.com/png/ke"
    const dispatch  = useDispatch();

    const user = useSelector((state) => state.user)
    const [searchBarOpen, setSearchBarOpen] = useState(false);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        if (anchorEl != null) {
            handleClose()
        } else {
            setAnchorEl(event.currentTarget);
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogOut =()=>{
        dispatch(setUser(null))
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <ClickAwayListener onClickAway={() => setSearchBarOpen(false)}>
            <Box sx={{ height: 70, display: 'flex', justifyContent: 'space-between' }}>
                <IconButton sx={searchBarOpen ? { opacity: '0' } : { opacity: '1' }} onClick={() => setSearchBarOpen(true)}>
                    <BsSearch />
                </IconButton>
                <Slide direction='down' in={searchBarOpen}>
                    <Box sx={{ width: '50vw' }}>
                        <Box sx={{ display: 'flex', width: '100%' }}>
                            {searchBarOpen && <SearchBar changeState={setSearchBarOpen} />}
                        </Box>
                    </Box>
                </Slide>

                <Stack sx={{ display: 'flex', justifyContent: 'space-around', width: '20%', alignItems: 'center' }} direction={"row"}>
                    <IconButton sx={{ padding: 1, ":active": { backgroundColor: theme.palette.primary.lightGreen } }}>
                        <Box component="img" src={countryAddress}
                            sx={{
                                height: "20px",
                                width: "30px",
                                borderRadius: theme.border.min,

                            }}
                        >

                        </Box>
                    </IconButton>
                    <IconButton sx={{ ":active": { backgroundColor: theme.palette.primary.lightGreen }, }}>
                        <Badge color="error" sx={{ fontSize: '24px' }} badgeContent={3} showZero>
                            <IoMdNotifications />
                        </Badge>
                    </IconButton>
                    <IconButton onClick={handleClick}>
                        <Popover
                            sx={{ p: 1 }}
                            id={id}
                            open={open}

                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}

                        >
                            <Card variant="outlined">
                                <Stack sx={{ p: 1 }}>
                                    <Typography sx={{fontWeight:"500"}} component="h4" variant="p">
                                        Brian Kibet
                                    </Typography>
                                    <Typography sx={{ mt: 1, fontSize: theme.fonts.rSmall }} component="p">
                                        briankibet2010@gmail.com
                                    </Typography>
                                </Stack>
                                <Divider />
                                <Stack sx={{ p: 1 }}>
                                    <ListItemButton sx={{ borderRadius: theme.border.min }}>
                                        <ListItemText primary={"Home"} />
                                    </ListItemButton>
                                    <ListItemButton sx={{ borderRadius: theme.border.min }}>
                                        <ListItemText primary={"Profile"} />
                                    </ListItemButton>
                                    <Divider sx={{ mt: 1, mb: 1 }} />
                                    <ListItemButton onClick={handleLogOut} sx={{ borderRadius: theme.border.min }}>
                                        <ListItemText primary={"LogOut"} />
                                    </ListItemButton>
                                </Stack>
                            </Card>
                        </Popover>
                        <Avatar sx={{ cursor: 'pointer' }} alt="Brian Kibet" src={imageAddress} />
                    </IconButton>
                </Stack>
            </Box>
        </ClickAwayListener >
    )
}
export default TopBar
