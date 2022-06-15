import { Box } from '@mui/system'
import React from 'react'
import {Typography} from '@mui/material'
import { styled } from '@mui/system'
const logoOuter = {
    display: 'flex',
    alignItems: 'center'
}
const Left = styled('h2')(({theme})=>({
    display: 'flex',
    color: theme.palette.primary.main
}))
const Center = styled('p')(({theme})=>({
    display: 'flex',
    color:theme.palette.primary.black
}))
const Right = styled(Box)(({theme})=>({
    color: theme.palette.primary.main
}))


const Logo = () => {
  return (
    <Box>
       <Left>Tradis<Center>Fin</Center><Right>.</Right></Left>
    </Box>
  )
}

export default Logo