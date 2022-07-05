import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Container, Typography } from '@mui/material'
import { styled } from '@mui/system'
import Logo from '../components/Logo';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import AuthSocial from '../components/AuthSocial';
import SignUpForm from '../components/SignUpForm';
import client from '../axios';
import { useSelector, useDispatch } from 'react-redux'
import { isFetching } from '../redux/userSlice';


const OuterBox = styled('div')(({ theme }) => ({
  display: 'flex',
  height: '100vh',
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

const SignUp = () => {
  const [enteredData, setEnteredData] = useState({});
  const user = useSelector(state => state.user);
  const dispatch = useDispatch()
  
  const data = {
    fullName: enteredData.firstName + " " + enteredData.lastName,
    email: enteredData.email,
    password: enteredData.password
  }
  
  const [signUpStatus, setSignUpStatus] = useState(null)
  const [signUpError, setSignUpError] = useState('')
  console.log(signUpError)
  
  const handleSubmit = async () => {
    try {
      dispatch(isFetching(true))
      let res = await client.post('/user/create', data)
      dispatch(isFetching(false))
      if (res.status === 200) {
        setSignUpStatus(true)
      } else {
        setSignUpStatus(false)
      }
    }
    catch (e) {
      console.log(e)
      setSignUpStatus(false)
      switch (e.response.request.status) {
        case 500:
          setSignUpError("Internal Server Error")
          break;
        case 409:
          setSignUpError("Seems you already registered")
          break;
        default:
          setSignUpError("Unknown error")
          break;
      }
    }
  }

  return (
    <OuterBox>
      <LeftBox>
        <LeftTop>
          <Logo />
        </LeftTop>
        <LeftMiddle>
          <Typography variant="h4" sx={{ px: 5, mt: 10, mb: 5 }}>
            Now everyone can participate in... InterGral
          </Typography>
        </LeftMiddle>
        <LeftBottom>
          <Box sx={{ height: '100%', width: '100%' }} component="img" src="/assets/illustration_register.png" alt="sign in" />
        </LeftBottom>
      </LeftBox>

      <RightBox>

        <Box sx={{ display: 'flex', justifyContent: 'end', mt: 1 }}>
          <Typography fontSize={'14px'}>Already have an account? <Link variant="subtitle2" component={RouterLink} to="/auth/login">
            Sign In
          </Link></Typography>
        </Box>

        <Box sx={{ ml: 9, mr: 9 }}>

          <Box sx={{ mt: 1, mb: 3 }}>
            <Typography variant="h5" gutterBottom>Sign Up To InterGral</Typography>
            <Typography fontSize={17} variant="p" color={'#637381'}>Enter your credentials below</Typography>
          </Box>

          <AuthSocial />

          <SignUpForm data={enteredData} setData={setEnteredData} handleSignUp={handleSubmit} isFetching={user.isFetching}/>

        </Box>

      </RightBox>

    </OuterBox>
  )
}

export default SignUp