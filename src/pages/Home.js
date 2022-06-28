import React from 'react'
import { Box } from '@mui/material'
import LeftBar from '../sections/LeftBar'
import Feed from '../components/Feed'



const Home = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <LeftBar />
            <Feed />
        </Box>
    )
}

export default Home