import { Box } from '@mui/system'
import React from 'react'
import LeftBar from './LeftBar'

const Results = () => {
  return (
    <Box sx={{ display: 'flex' }}>
        <LeftBar />
        <Box sx={{ flex: 4 }}>
            This is results page
        </Box>
    </Box>
  )
}

export default Results