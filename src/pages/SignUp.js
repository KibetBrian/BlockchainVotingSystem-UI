import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Box, Link } from '@mui/material';
import { styled } from '@mui/system';
import { useSelector, useDispatch } from 'react-redux';
import Logo from '../components/Logo';
import AuthSocial from '../components/AuthSocial';
import SignUpForm from '../components/SignUpForm';
import client from '../axios';
import { isFetching } from '../redux/userSlice';

const OuterBox = styled('div')(({ theme }) => ({
  display: 'flex',
  height: '100vh',
}));

const LeftBox = styled(Container)(({ theme }) => ({
  flex: '1',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  margin: '10px',
  borderRadius: theme.border.auth,
}));

const RightBox = styled(Container)(({ theme }) => ({
  flex: '1.5',
  margin: '10px',
}));

const LeftTop = styled(Container)({
  display: 'flex',
  flex: '1',
  marginTop: '5%',
});

const LeftMiddle = styled(Container)({
  flex: '1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const LeftBottom = styled(Container)({
  flex: '3',
});

// Initial state for snackbar
const initialSnackBarState = {
  open: false,
  vertical: 'top',
  horizontal: 'center',
  message: '',
  severity: '',
  title: '',
};

const SignUp = () => {
  const [enteredData, setEnteredData] = useState({});
  const [snackBar, setSnackBar] = useState(initialSnackBarState);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const userData = {
    fullName: `${enteredData.firstName} ${enteredData.lastName}`,
    email: enteredData.email,
    password: enteredData.password,
  };

  const showSnackBar = (message, severity = 'error', title = 'Error') => {
    setSnackBar({
      ...initialSnackBarState,
      open: true,
      message,
      severity,
      title,
    });
    setTimeout(() => setSnackBar((prev) => ({ ...prev, open: false })), 4000);
  };

  const handleSubmit = async () => {
    try {
      dispatch(isFetching(true));
      const response = await client.post('/user/create', userData);
      
      if (response.status === 200) {
        showSnackBar('Successfully signed up, proceed to login', 'success', 'Success');
      }
    } catch (error) {
      const status = error.response?.request?.status;
      
      switch (status) {
        case 500:
          showSnackBar('Internal Server Error');
          break;
        case 409:
          showSnackBar('Email already taken');
          break;
        default:
          showSnackBar('Unknown error occurred');
      }
    } finally {
      dispatch(isFetching(false));
    }
  };

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
          <Box
            component="img"
            src="/assets/illustration_register.png"
            alt="sign in"
            sx={{ height: '100%', width: '100%' }}
          />
        </LeftBottom>
      </LeftBox>

      <RightBox>
        <Box sx={{ display: 'flex', justifyContent: 'end', mt: 1 }}>
          <Typography fontSize="14px">
            Already have an account?{' '}
            <Link variant="subtitle2" component={RouterLink} to="/auth/login">
              Sign In
            </Link>
          </Typography>
        </Box>

        <Box sx={{ mx: 9 }}>
          <Box sx={{ mt: 1, mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Sign Up To InterGral
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Enter your credentials below
            </Typography>
          </Box>

          <AuthSocial />

          <SignUpForm
            snackBar={snackBar}
            data={enteredData}
            setData={setEnteredData}
            handleSignUp={handleSubmit}
            isFetching={user.isFetching}
          />
        </Box>
      </RightBox>
    </OuterBox>
  );
};

export default SignUp;