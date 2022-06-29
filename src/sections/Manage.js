import { Box } from '@mui/system'
import React from 'react'
import LeftBar from './LeftBar'

const Manage = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <LeftBar />
            <Box sx={{ flex: 4}}>
                 Manage Election  
            </Box>
        </Box>
    )
}

export default Manage