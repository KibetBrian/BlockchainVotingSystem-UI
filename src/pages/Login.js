import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Container, Stack, Typography } from '@mui/material'
import { styled } from '@mui/system'
import Logo from '../components/Logo';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import AuthSocial from '../components/AuthSocial';
import LoginForm from '../components/LoginForm';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

const OuterBox = styled('div')(({ theme }) => ({
  display: 'flex',
  height: '100vh'
}))

const LeftBox = styled(Container)(({ theme }) => ({
  flex: "1",
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  margin: "10px",
  borderRadius: theme.border.auth
}));

const RightBox = styled(Container)(({ theme }) => ({
  flex: "1.5",
  margin: "10px"
}));

const LeftTop = styled(Container)(({ theme }) => ({
  display: 'flex',
  flex: '1',
  marginTop: '5%'
}));

const LeftMiddle = styled(Container)(({ theme }) => ({
  flex: '1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const LeftBottom = styled(Container)(({ theme }) => ({
  flex: '3'
}));

const illustration = styled('img')(({ theme }) => ({
  height: '100%',
  width: '100%',
  objectFit: 'cover'
}));
const GetStartedLink = styled('a')(({ theme }) => ({
  color: theme.palette.primary.main,
}));

const Login = () => {
  const [enteredData, setEnteredData] =useState({});
  
  return (
    <OuterBox>

      <LeftBox>
        <LeftTop>
          <Logo />
        </LeftTop>
        <LeftMiddle>
          <Typography variant="h4" sx={{ px: 5, mt: 10, mb: 5 }}>
            Hi, Welcome Back
          </Typography>
        </LeftMiddle>
        <LeftBottom>
          <Box sx={{ height: '100%', width: '100%' }} component="img" src="/assets/illustration_login.png" alt="sign in" />
        </LeftBottom>
      </LeftBox>

      <RightBox>

        <Box sx={{ display: 'flex', justifyContent: 'end', mt: 1 }}>
          <Typography fontSize={'14px'}>Don't have an account? <Link variant="subtitle2" component={RouterLink} to="/auth/signup">
            Get started
          </Link></Typography>
        </Box>

        <Box sx={{ ml: 9, mr: 9 }}>

          <Box sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h5" gutterBottom>Sign In To InterGral</Typography>
            <Typography fontSize={17} variant="p" color={'#637381'}>Enter your credentials below</Typography>
          </Box>

          <AuthSocial />

          <LoginForm data={enteredData} setData = {setEnteredData}/>

        </Box>
        
      </RightBox>

    </OuterBox>
  )
}

export default Login