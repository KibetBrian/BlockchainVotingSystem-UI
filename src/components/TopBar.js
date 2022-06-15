import { AppBar, Avatar, Badge, IconButton, Slide, Stack } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import Grid from '@mui/material/Grid'
import { LinearProgress } from '@mui/material';
import { useEffect } from 'react'
import { IoMdNotifications } from 'react-icons/io'
import { theme } from '../theme'
import SearchBar from './SearchBar'
import { ClickAwayListener } from '@mui/base';




const TopBar = () => {
    const [notMounted, setNotMounted] = useState(true);
    const imageAddress = "https://images.pexels.com/photos/5358099/pexels-photo-5358099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    const countryAddress = "https://countryflagsapi.com/png/ke"

    const [searchBarOpen, setSearchBarOpen] = useState(false)
    return (
        <ClickAwayListener onClickAway={() => setSearchBarOpen(false)}>

            {/* <Grid xs item>
        {notMounted && <LinearProgress value={80} variant={"indeterminate"} title="test" />}
      </Grid> */}
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
                    <IconButton>
                        <Avatar sx={{ cursor: 'pointer' }} alt="Brian Kibet" src={imageAddress} />
                    </IconButton>
                </Stack>
            </Box>
        </ClickAwayListener >
    )
}
export default TopBar
