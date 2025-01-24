import React from 'react';
import { Box, Typography } from '@mui/material';
import LeftBar from './LeftBar';

const SystemInformation = () => {
    const renderUserTypeSection = (title, details) => (
        <>
            <li>{title}</li>
            <Box sx={{ ml: 5 }}>
                {details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                ))}
            </Box>
        </>
    );

    const renderElectionPhaseSection = (title, description) => (
        <>
            <li>{title}</li>
            <Box sx={{ ml: 5 }}>
                <li>{description}</li>
            </Box>
        </>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <LeftBar />
            <Box sx={{ flex: 4, p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                    <Typography component="h5" variant="h5">
                        Blockchain Voting System
                    </Typography>
                </Box>

                <Typography sx={{ mt: 3, mb: 1.5 }} component="h5" variant="h5">
                    System Users
                </Typography>
                <Typography component="p" variant="body1" sx={{ mb: 2 }}>
                    The system will be composed of three types of users which include:
                </Typography>
                <Box sx={{ ml: 5 }}>
                    <ul>
                        {renderUserTypeSection('Normal Users', [
                            'Can sign in and check information on the system about candidates and election results',
                            'Can request to be registered as a voter by submitting valid credentials'
                        ])}
                        {renderUserTypeSection('Registered Voters', [
                            'Need to have MetaMask extension to interact with smart contracts on the blockchain',
                            'Can choose their desired leader by casting votes'
                        ])}
                        {renderUserTypeSection('Admin', [
                            'Can register new candidates and voters',
                            'Crosscheck voters and candidates submitted data against organization data',
                            'Add valid addresses to voters on the blockchain'
                        ])}
                    </ul>
                </Box>

                <Typography sx={{ mt: 3, mb: 1.5 }} component="h5" variant="h5">
                    Election Information
                </Typography>
                <Typography component="p" variant="body1" sx={{ mb: 2 }}>
                    The election will have three phases:
                </Typography>
                <Box sx={{ ml: 5 }}>
                    <ul>
                        {renderElectionPhaseSection('Registration Phase', 
                            'Potential voters submit data for verification of eligibility'
                        )}
                        {renderElectionPhaseSection('Voting Phase', 
                            'Verified voters participate in casting their votes'
                        )}
                        {renderElectionPhaseSection('Results Phase', 
                            'Election results are accessible to everyone after the election concludes'
                        )}
                    </ul>
                </Box>
            </Box>
        </Box>
    );
};

export default SystemInformation;