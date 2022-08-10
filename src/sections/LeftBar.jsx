import React from 'react'
import { useState, useEffect } from 'react'
import { Box, Button, Divider, Link, ListItem, ListItemButton, ListItemText, Stack, Typography } from '@mui/material'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import Logo from '../components/Logo'
import { FiTrendingUp } from 'react-icons/fi'
import { theme } from '../theme'
import { BiHomeAlt } from 'react-icons/bi'
import { FaUserTie } from 'react-icons/fa'
import ListItemIcon from '@mui/material/ListItemIcon';
import { AiFillEye, AiOutlineLineChart, AiFillCheckSquare } from 'react-icons/ai';
import { TiNews } from 'react-icons/ti'
import { useSelector } from 'react-redux'
import { MdOutlineManageAccounts } from 'react-icons/md'


const listData = [
    {
        title: "Home",
        Icon: <BiHomeAlt style={{ fontSize: '20px' }} />,
        to: "/"
    },
    {
        title: "Contestants",
        Icon: <FaUserTie style={{ fontSize: '20px' }} />,
        to: "/contestants"
    },
    {
        title: "VoterRegistration",
        Icon: <AiFillCheckSquare style={{ fontSize: '20px' }} />,
        to: "/voter/registration"
    },
    {
        title: "ContestantRegistration",
        Icon: <AiFillCheckSquare style={{ fontSize: '20px' }} />,
        to: "/contestant/registration"
    },
    {
        title: "ManageElection",
        Icon: <MdOutlineManageAccounts style={{ fontSize: '20px' }} />,
        to: "/manage/election"
    },
    {
        title: "SystemInformation",
        Icon: <TiNews style={{ fontSize: '20px' }} />,
        to: "/information"
    },
]

const ListComponent = (props) => {
    const user = useSelector(state => state.user.data)
    const location = useLocation();
    const [selected, setSelected] = useState(false);
    const isActive = location.pathname === props.object.to;

    const activeStyle = {
        backgroundColor: theme.palette.primary.lightGreen,
        color: theme.palette.primary.main,
        height: 45,
        borderRadius: theme.border.min,
        fontWeight: '500',
        p: 3
    }
    const normalStyle = {
        borderRadius: theme.border.min,
        height: 45,
        mt: 1,
        mb: 1,
        color: theme.palette.primary.grey,
        fontSize: '16px',
        p: 3
    }


    return (
        <Box key={props.key} sx={{ display: props.key === 3 && !user.isAdmin ? 'none' : '' }}>
            <ListItemButton component={RouterLink} to={props.object.to} onClick={() => setSelected(true)} key={props.key} selected={isActive} sx={isActive ? activeStyle : normalStyle}>
                {props.object.Icon}
                <Box sx={{ fontSize: '16px', ml: 2 }}>
                    {props.object.title}
                </Box>
            </ListItemButton>
        </Box>
    )
}

const LeftBar = () => {
    const imageSource = 'https://images.pexels.com/photos/5358099/pexels-photo-5358099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    const [autoFocusState, setAutoFocusState] = useState(true)
    const setAutoFocus = () => {
        setAutoFocusState(!autoFocusState)
    }

    const user = useSelector(state => state.user.data)
    return (
        <Box sx={{ flex: 1, ml: 2, mr: 3, height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, mb: 4 }}>
                    <Logo />
                    <Typography sx={{ display: 'flex', alignItems: 'center', mr: 4 }}><FiTrendingUp style={{ color: theme.palette.primary.main, marginLeft: '5px' }} /></Typography>
                </Box>
                <Box sx={{ display: 'flex', cursor: 'pointer', backgroundColor: theme.palette.primary.lightGrey, height: 80, borderRadius: theme.border.regular }}>
                    <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Box component="img" src={imageSource} sx={{ width: 46, height: 46, objectFit: 'cover', borderRadius: '50%' }}>

                        </Box>
                    </Box>
                    <Box sx={{ flex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography fontSize={theme.fonts.small} variant="h6" component="p">{user.fullName}</Typography>
                        <Typography color={theme.palette.primary.grey} variant="p" component="p">{user.isAdmin ? "Admin" : "User"}</Typography>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ flex: 2 }}>
                <Divider sx={{ mt: 3, mb: 3 }} />
                {
                    listData.map((object, key) => (
                        ListComponent({ object, key })
                    ))
                }
                <Divider sx={{ mt: 3, mb: 3 }} />
            </Box>


            <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'end', borderRadius: theme.border.regular, width: '100%', height: '90%', backgroundColor: theme.palette.primary.lightGreen }}>
                    <Link sx={{textDecoration: 'none'}} component={RouterLink} to="/results">
                        <Button sx={{ borderRadius: theme.border.auth, color: theme.palette.primary.white, mb: 1, p: 1, "&:hover": { backgroundColor: theme.palette.primary.darkGreen }, backgroundColor: theme.palette.primary.main, height: 40 }} variant="text">See Results</Button>
                    </Link>
                </Box>
            </Box>

        </Box>
    )
}

export default LeftBar