import React from 'react';
import { useState } from 'react';
import { Box, Button, Divider, Link, ListItemButton, Typography } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Icons
import { FiTrendingUp } from 'react-icons/fi';
import { BiHomeAlt } from 'react-icons/bi';
import { FaUserTie } from 'react-icons/fa';
import { AiFillCheckSquare } from 'react-icons/ai';
import { TiNews } from 'react-icons/ti';
import { MdOutlineManageAccounts } from 'react-icons/md';

// Components
import Logo from '../components/Logo';
import { theme } from '../theme';

// Constant for menu items with better type safety and readability
const MENU_ITEMS = [
    { title: "Home", Icon: BiHomeAlt, to: "/" },
    { title: "Contestants", Icon: FaUserTie, to: "/contestants" },
    { title: "VoterRegistration", Icon: AiFillCheckSquare, to: "/voter/registration" },
    { title: "ContestantRegistration", Icon: AiFillCheckSquare, to: "/contestant/registration" },
    { title: "ManageElection", Icon: MdOutlineManageAccounts, to: "/manage/election" },
    { title: "SystemInformation", Icon: TiNews, to: "/information" },
];

const ListItemComponent = ({ object, isAdmin }) => {
    const location = useLocation();
    const isActive = location.pathname === object.to;
    const isAdminItem = object.title === "ManageElection" || object.title === "ContestantRegistration";

    if (isAdminItem && !isAdmin) return null;

    const itemStyle = {
        ...(isActive ? activeStyle : normalStyle),
        display: 'flex',
        alignItems: 'center',
    };

    return (
        <ListItemButton 
            component={RouterLink} 
            to={object.to} 
            sx={itemStyle}
        >
            <object.Icon style={{ fontSize: '20px', marginRight: 8 }} />
            <Typography>{object.title}</Typography>
        </ListItemButton>
    );
};

const activeStyle = {
    backgroundColor: theme.palette.primary.lightGreen,
    color: theme.palette.primary.main,
    borderRadius: theme.border.min,
    fontWeight: '500',
};

const normalStyle = {
    borderRadius: theme.border.min,
    color: theme.palette.primary.grey,
};

const LeftBar = () => {
    const user = useSelector(state => state.user.data);
    const imageSource = 'https://images.pexels.com/photos/5358099/pexels-photo-5358099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

    return (
        <Box sx={{ 
            flex: 1, 
            ml: 2, 
            mr: 3, 
            height: '100vh', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between' 
        }}>
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, mb: 4 }}>
                    <Logo />
                    <FiTrendingUp style={{ color: theme.palette.primary.main }} />
                </Box>

                <Box sx={{ 
                    display: 'flex', 
                    cursor: 'pointer', 
                    backgroundColor: theme.palette.primary.lightGrey, 
                    borderRadius: theme.border.regular 
                }}>
                    <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Box 
                            component="img" 
                            src={imageSource} 
                            sx={{ width: 46, height: 46, objectFit: 'cover', borderRadius: '50%' }} 
                        />
                    </Box>
                    <Box sx={{ flex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography>{user.fullName}</Typography>
                        <Typography color={theme.palette.primary.grey}>
                            {user.isAdmin ? "Admin" : "User"}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Box sx={{ flex: 2 }}>
                <Divider sx={{ my: 3 }} />
                {MENU_ITEMS.map((item, index) => (
                    <ListItemComponent 
                        key={index} 
                        object={item} 
                        isAdmin={user.isAdmin} 
                    />
                ))}
                <Divider sx={{ my: 3 }} />
            </Box>

            <Box sx={{ flex: 1 }}>
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'flex-end', 
                    borderRadius: theme.border.regular, 
                    backgroundColor: theme.palette.primary.lightGreen 
                }}>
                    <Link component={RouterLink} to="/results" sx={{ textDecoration: 'none' }}>
                        <Button 
                            variant="contained" 
                            sx={{ 
                                borderRadius: theme.border.auth, 
                                color: theme.palette.primary.white, 
                                mb: 1, 
                                backgroundColor: theme.palette.primary.main 
                            }}
                        >
                            See Results
                        </Button>
                    </Link>
                </Box>
            </Box>
        </Box>
    );
};

export default LeftBar;