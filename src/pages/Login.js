import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Container, Stack, Typography, Box, Link, FormControlLabel, Checkbox, Button } from '@mui/material';
import { styled } from '@mui/system';
import { useSelector, useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import Logo from '../components/Logo';
import AuthSocial from '../components/AuthSocial';
import LoginForm from '../components/LoginForm';
import client from '../axios';

const OuterBox = styled('div')({
  display: 'flex',
  height: '100vh',
  backgroundColor: '#f5f5f5'
});

const LeftBox = styled(Container)(({ theme }) => ({
  flex: '1',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  margin: '10px',
  borderRadius: theme.border?.auth || '8px',
  backgroundColor: '#ffffff'
}));

const RightBox = styled(Container)(({ theme }) => ({
  flex: '1.5',
  margin: '10px',
  padding: '20px',
  backgroundColor: '#ffffff',
  borderRadius: theme.border?.auth || '8px'
}));

const StyledSection = styled(Container)(({ position }) => ({
  flex: position === 'middle' ? '1' : position === 'bottom' ? '3' : '1',
  display: 'flex',
  alignItems: position === 'middle' ? 'center' : 'flex-start',
  justifyContent: position === 'middle' ? 'center' : 'flex-start',
  marginTop: position === 'top' ? '5%' : '0'
}));

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [snackBar, setSnackBar] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    message: '',
    severity: 'error',
    title: ''
  });

  const hideSnackBar = () => {
    setTimeout(() => {
      setSnackBar((prev) => ({ ...prev, open: false }));
    }, 4000);
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'rememberMe' ? checked : value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await client.post('/user/login', formData);
      dispatch(setUserData(response.data));
      
      if (formData.rememberMe) {
        localStorage.setItem('userData', JSON.stringify(response.data));
      }

      navigate('/dashboard');
    } catch (error) {
      const errorMessage = error.response?.data?.Message || 
                          error.response?.data?.error || 
                          'An error occurred during login';

      setSnackBar({
        open: true,
        message: errorMessage,
        severity: 'error',
        title: 'Error'
      });
      hideSnackBar();
    }
  };

  return (
    <OuterBox>
      <LeftBox>
        <StyledSection position="top">
          <Logo />
        </StyledSection>
        <StyledSection position="middle">
          <Typography variant="h4" sx={{ px: 5, mt: 10, mb: 5 }}>
            Hi, Welcome Back
          </Typography>
        </StyledSection>
        <StyledSection position="bottom">
          <Box
            component="img"
            src="/assets/illustration_login.png"
            alt="sign in"
            sx={{ height: '100%', width: '100%', objectFit: 'cover' }}
          />
        </StyledSection>
      </LeftBox>

      <RightBox>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
          <Typography variant="body2">
            Don't have an account?{' '}
            <Link component={RouterLink} to="/auth/signup" variant="subtitle2">
              Get started
            </Link>
          </Typography>
        </Box>

        <Box sx={{ maxWidth: '500px', mx: 'auto', px: 3 }}>
          <Typography variant="h5" gutterBottom>
            Sign In To InterGral
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={4}>
            Enter your credentials below
          </Typography>

          <AuthSocial />

          <LoginForm
            isFetching={user.isFetching}
            snackBar={snackBar}
            handleLogin={handleLogin}
            formData={formData}
            handleChange={handleChange}
          />
        </Box>
      </RightBox>
    </OuterBox>
  );
};

export default Login;