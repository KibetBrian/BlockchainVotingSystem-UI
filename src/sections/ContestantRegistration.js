import { Button, Card, IconButton, ListItem, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { BsX } from 'react-icons/bs'
import LeftBar from './LeftBar'
import TopBar from '../components/TopBar'
import { theme } from '../theme'
import { MdOutlineAddPhotoAlternate } from 'react-icons/md'

const ContestantRegistration = () => {
  return (
    <Box sx={{ display: 'flex' }}>
    <LeftBar />
    <Box sx={{ flex: 4, height: '100vh', overflowY: 'scroll' }}>
        <TopBar />
        <Typography variant="text" component="h2" sx={{ m: 1 }}>Register a new candidate</Typography>
        <Box sx={{ display: 'flex', m: 1 }}>
            <Box sx={{ flex: 1, m: 2 }}>
                <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', borderRadius: theme.border.regular, boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)", height: '300px', padding: "20px" }}>
                    <Box sx={{ display: 'flex', pl: 1, pr: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: "150px", width: "150px", border: `1px solid grey`, borderStyle: "dotted", borderRadius: "50%" }}>
                            <IconButton>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', height: '120px', width: '120px' }}>
                                    <MdOutlineAddPhotoAlternate />
                                    <Typography component="p" sx={{ fontSize: theme.fonts.small, mt: 1 }} variant="text">Upload Photo</Typography>
                                </Box>
                            </IconButton>
                        </Box>
                        <Typography component="p" sx={{ fontSize: "13px", mt: 1, color: theme.palette.primary.grey }} >
                            Allowed *.jpeg, *.jpg, *.png, *.gif
                            max size of 3.1 MB
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography sx={{ color: theme.palette.primary.grey }}>
                            Upload candidate's photo here
                        </Typography>
                    </Box>
                </Card>
            </Box>
            <Box sx={{ flex: 2, m: 2 }}>
                <Card variant="outlined" sx={{ borderRadius: theme.border.regular, boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)", padding: "20px", height: "300px", display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-around' }}>
                    <TextField sx={{ border: theme.border.regular, width: "45%" }} id="outlined-basic" label="Full Name" variant="outlined" />
                    <TextField sx={{ borderRadius: theme.border.regular, width: "45%" }} id="outlined-basic" label="Email Address" variant="outlined" />
                    <TextField sx={{ borderRadius: theme.border.regular, width: "45%" }} id="outlined-basic" label="National Id Number" variant="outlined" />
                    <TextField sx={{ borderRadius: theme.border.regular, width: "45%" }} id="outlined-basic" label="Region" variant="outlined" />
                    <TextField sx={{ borderRadius: theme.border.regular, width: "100%" }} id="outlined-basic" label="Ethereum Address" variant="outlined" />
                </Card>
            </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <Button sx={{ mr: 3, color: theme.palette.primary.white }} size="large" variant="contained">Register</Button>
        </Box>
        <Box sx={{display: 'flex', justifyContent: 'center', m:2}}>
            <Typography component="h5" variant="h5" sx={{m:1}}>
               Registered Candidates
            </Typography>
        </Box>
        </Box>
    </Box>
  )
}

export default ContestantRegistration