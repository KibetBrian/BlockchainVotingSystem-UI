import { Box } from '@mui/material'
import React from 'react'
import LeftBar from '../sections/LeftBar'

const Charts = () => {
  return (
    <Box sx = {{display: 'flex'}}>
      <LeftBar />
      <Box sx={{ flex: 4 }}>
        charts
      </Box>
    </Box>
  )
}

export default Charts