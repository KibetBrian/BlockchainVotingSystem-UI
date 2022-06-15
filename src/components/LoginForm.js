import React, { useState } from 'react'
import Box from '@mui/material/Box'
import { Stack } from '@mui/material'
import TextField from '@mui/material/TextField'
import {BsEyeSlashFill,BsFillEyeFill} from 'react-icons/bs'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = ()=>{
        setShowPassword(!showPassword)
    }

    return (
        <Box>
            <Stack spacing={3}>
                <TextField id="outlined-basic" type={"email"} label="Email Address" variant="outlined" />
                <TextField id="outlined-basic"
                 type={showPassword ? 'text': 'password'} 
                 label="Password" 
                 variant="outlined"
                 InputProps={{endAdornment:(
                    <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword}>
                            {!showPassword? <BsEyeSlashFill />: <BsFillEyeFill/>}
                        </IconButton>
                    </InputAdornment>
                 )}}
                  />

            </Stack>
        </Box>
    )
}

export default LoginForm