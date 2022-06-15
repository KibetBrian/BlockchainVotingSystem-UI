import React from 'react'
import { Box } from '@mui/material'
import LeftBar from './LeftBar'

const WatchList = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <LeftBar />
      <Box sx={{ flex: 4 }}>
        This is watchlist
      </Box>
    </Box>
  )
}

export default WatchList