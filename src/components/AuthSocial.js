  import { Box } from '@mui/system'
import React from 'react'
import { Stack } from '@mui/material'
import Button from '@mui/material/Button'
import { FcGoogle } from 'react-icons/fc'
import { FaLinkedin } from 'react-icons/fa'
import { BsFacebook } from 'react-icons/bs'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

const AuthSocial = () => {
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', height: "50px" }}>
        <Stack sx={{ width: "100%", }} direction={"row"} spacing={2}>
          <Button size="large" fullWidth variant='outlined'> <FcGoogle style={{ fontSize: '24px' }} /> </Button>
          <Button size="large" fullWidth variant='outlined'> <BsFacebook style={{ fontSize: '24px', color: '#2563eb' }} /> </Button>
          <Button size="large" fullWidth variant='outlined'> <FaLinkedin style={{ fontSize: '24px', color: '#2563eb' }} /> </Button>
        </Stack>
      </Box>
      <Box sx={{ mt: 3, mb:3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Divider sx={{flex:4}}/>
        <Box sx={{flex: 2, display: 'flex', justifyContent: 'center'}}>
          OR
        </Box>
        <Divider sx={{flex:4}}/>
      </Box>
    </>
  )
}

export default AuthSocial