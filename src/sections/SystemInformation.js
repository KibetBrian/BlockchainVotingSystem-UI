import { ListItemText, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import LeftBar from './LeftBar'

const SystemInformation = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <LeftBar />
            <Box sx={{ flex: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography component="h5" variant="h5">
                        Blockchain Voting System
                    </Typography>
                </Box>
                <Typography sx={{mt:2,mb:2}} component="h5" variant="h5">System Users</Typography>
                <Typography component="p" variant="p">
                    The system will be composed of three types of users which include:
                </Typography>
                <Box sx={{ ml: 5 }}>
                    <ul>
                        <li>Normal Users</li>
                        <Box sx= {{ml: 5}}>
                            <li> They can be able to sign in and check the information on the system about candidates and election results</li>
                            <li>If they have valid credentials depending on the organization data, they can request to be registered as a voter by submitting their credentials</li>
                        </Box>
                        <li>Registered Voters</li>
                        <Box sx={{ml: 5}}>
                            <li>Registered voters need to have metamask extension in order to interact with the smart contracts on the blockchain</li>
                            <li>They will have ability to choose their desired leader by casting their votes</li>
                        </Box>
                        <li>Admin</li>
                        <Box sx={{ml: 5}}>
                            <li>Admin will have the ability to register new candidates and voters. This is by crosschecking the voters and and candidates submitted data and the organization data if they are valid then their addresses will be added to valid voters on the blockchain</li>
                        </Box>
                    </ul>
                </Box>
                <Typography  sx={{mt:2,mb:2}} component="h5" variant="h5">Election Information</Typography>
                <Typography component ="p" variant = "p">The election will have three phases</Typography>
                <Box sx={{ ml: 5 }}>
                    <ul>
                        <li>Registration Phase</li>
                        <Box sx= {{ml: 5}}>
                            <li> This is where potential voters will submit their data for verification if they are eligible to be voter for the particular organization</li>
                        </Box>
                        <li>Voting Phase</li>
                        <Box sx={{ml: 5}}>
                            <li>This is where verified voters will participate in casting their voters</li>
                        </Box>
                        <li>Results phase</li>
                        <Box sx={{ml: 5}}>
                            <li>After election is over, everyone can now access election results</li>
                        </Box>
                    </ul>
                </Box>
                <Box>

                </Box>

            </Box>
        </Box>
    )
}

export default SystemInformation