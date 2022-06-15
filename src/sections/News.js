import React from 'react'
import { Box } from '@mui/material'
import LeftBar from './LeftBar'

const News = () => {
  return (
    <Box sx = {{display: 'flex'}}>
      <LeftBar />
      <Box sx={{ flex: 4 }}>
        This is news
      </Box>
    </Box>
  )
}

export default News