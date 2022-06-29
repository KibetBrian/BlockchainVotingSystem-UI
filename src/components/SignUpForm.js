import React, { useState } from 'react'
import Box from '@mui/material/Box'
import { Stack } from '@mui/material'
import TextField from '@mui/material/TextField'
import { BsEyeSlashFill, BsFillEyeFill } from 'react-icons/bs'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom'
import Link from '@mui/material/Link';
import { useSelector, useDispatch } from "react-redux"
import { setUser } from '../redux/userSlice'


const SignUpForm = ({ data, setData }) => {
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false)
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const validEmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    //less strict regex for password
    const validPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

    //valid name regex
    const validNameRegex = /^[\p{L} ,.'-]+$/u

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    //Checks email validity
    const handleEmailValidation = () => {
        if (!data.email) {
            setEmailError(true)
        } else if (!validEmailRegex.test(data.email)) {
            setEmailError(true)
        } else {
            setEmailError(false)
        }
    }

    //checks password validity
    const handlePasswordValidation = () => {
        if (!data.password) {
            setPasswordError(true)
        } else if (!validPasswordRegex.test(data.password)) {
            setPasswordError(true)
        } else {
            setPasswordError(false)
        }
    }

    //handle name validation
    const handleNameValidation = ()=>{
        console.log(data.firstName)
        if (!validNameRegex.test(data.firstName)){
            setFirstNameError(true)
        }
        if (!validNameRegex.test(data.lastName)){
            setLastNameError(true);
        }
    }

    const handleSubmit = () => {
        handleEmailValidation()
        handlePasswordValidation();
        let isCredentialsValid = (!emailError && !passwordError) && (data.email?.length > 0 || data.password?.strength > 0)
        if (isCredentialsValid) {
            const user = {
                name: "Brian Kibet",
                email: "briankibet2010@gmail.com"
            }
            dispatch(setUser(user))
        }
    }

    return (
        <Box>
            <Stack spacing={3}>
                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <TextField error={firstNameError} onFocus={() => setFirstNameError(false)} onBlur={handleNameValidation} name={"firstName"} onChange={handleChange} id="firstName" type={"text"} label="First Name" variant="outlined" />
                    <TextField error={lastNameError} onFocus={() => setLastNameError(false)} onBlur={handleNameValidation} name={"lastName"} onChange={handleChange} id="firstName" type={"text"} label="Last Name" variant="outlined" />
                </Box>
                <TextField error={emailError} onFocus={() => setEmailError(false)} onBlur={handleEmailValidation} name={"email"} onChange={handleChange} id="email" type={"email"} label="Email Address" variant="outlined" />
                <TextField id="password"
                    type={showPassword ? 'text' : 'password'}
                    error={passwordError}
                    onFocus={() => setPasswordError(false)}
                    onBlur={handlePasswordValidation}
                    onChange={handleChange}
                    name={"password"}
                    label="Password"
                    variant="outlined"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleShowPassword}>
                                    {!showPassword ? <BsEyeSlashFill /> : <BsFillEyeFill />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <Stack sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3, mb: 3 }} direction={'row'}>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" />
                    <Link component={RouterLink} to="/auth/forgotPassword" sx={{ cursor: 'pointer' }} variant='subtitle2'>
                        ForgotPassword
                    </Link>
                </Stack>
                <Button onClick={handleSubmit} sx={{ display: 'flex', alignItems: 'center', color: "#fff", height: "50px" }} fullWidth size="large" variant="contained">Sign In</Button>


            </Stack>
        </Box>
    )
}

export default SignUpForm