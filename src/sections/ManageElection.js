import { Button, Card, CardContent, Dialog, DialogContentText, DialogTitle, Divider, LinearProgress, Paper, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState, useEffect } from 'react'
import LeftBar from './LeftBar'
import { theme } from '../theme'
import axios from 'axios'

const ProcessingDialog = ({ processingDialogOpen, handleDialogClose, message, topic, processing }) => {

    const closeDialog = () => {
        handleDialogClose();
    }

    return (
        <Dialog open={processingDialogOpen}>
            <DialogTitle>Changing {topic} Phase</DialogTitle>
            <Box sx={{ mt: 2, mb: 2 }}>
                {processing && <LinearProgress />}
            </Box>
            <DialogContentText sx={{ p: 2 }}>{message}</DialogContentText>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100px' }}>
                <Button onClick={closeDialog} sx={{ color: "#fff" }} variant="contained">Close</Button>
            </Box>
        </Dialog>
    )
}

const ConfirmDialog = ({ dialogOpen, handleDialogClose, topic }) => {
    const [dialogPosting, setDialogPosting] = useState(false);
    const [processing, setProcessing] = useState(false)
    const [processingDialogMessage, setProcessingDialogMessage] = useState("");
    const [currentActionMessage, setCurrentActionMessage] = useState("Confirm Action")

    const handleConfirm = async () => {
        setDialogPosting(true)
        setProcessing(true)
        try {
            const response = await axios.post(`http://localhost:8000/phase/${topic}`);
            setProcessingDialogMessage(response.data.message);
            setProcessing(false)
        } catch (e) {
            setProcessingDialogMessage("Error which changing state")
            setProcessing(false)
        }
    }

    return (
        <Dialog open={dialogOpen}>
            {dialogPosting && <ProcessingDialog processingDialogOpen={dialogPosting} topic={topic} message={processingDialogMessage} processing={processing} handleDialogClose={handleDialogClose} />}
            <DialogTitle>{currentActionMessage}</DialogTitle>
            <DialogContentText sx={{ padding: 2 }}>Are you sure you want to change {topic} phase ?</DialogContentText>
            <Box sx={{ display: 'flex', mt: 3, mb: 3, justifyContent: 'center', alignItems: 'center' }}>
                <Button sx={{ color: "#fff" }} onClick={handleConfirm} variant="contained">Confirm</Button>
            </Box>
        </Dialog>
    )
}

const Manage = () => {

    //Get registration, voting and results phases
    const [phases, setPhases] = useState({
        registrationPhase: false,
        votingPhase: false,
        resultsPhase: false
    });
    
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogTopic, setDialogTopic] = useState("");

    //Fetch 
    useEffect(() => {
        const FetchPhases = async () => {
            try {
                const reg = await axios.get('http://localhost:8000/registration_phase');
                setPhases(prev=>({...prev, registrationPhase: reg.data.registrationPhase}));

                const vote = await axios.get('http://localhost:8000/voting_phase');
                setPhases(prev=>({...prev, votingPhase: vote.data.votingPhase}));

                const resultsPhase = await axios.get('http://localhost:8000/results/phase');
                setPhases(prev=>({...prev, resultsPhase: resultsPhase.data.resultsPhase}));

            } catch (e) {
                console.log("Failed to get phases. Error: ", e)
            }
        }
        FetchPhases();
    }, [dialogOpen]);

    const handleDialogClose = () => {
        setDialogOpen(false)
    }

    const handlePhaseChange = (e) => {
        setDialogTopic(e.target.id)
        setDialogOpen(true)
    }
    return (
        <Box sx={{ display: 'flex' }}>
            <LeftBar />            
            {dialogOpen && <ConfirmDialog topic={dialogTopic} dialogOpen={dialogOpen} handleDialogClose={handleDialogClose} />}
            <Box sx={{ flex: 4, background: 'linear-gradient(to left, #fff, #c8facd)' }}>
                <Stack>
                    <Typography sx={{ mt: 3, color: theme.palette.primary.main }} variant="text" component="h2">Current States</Typography>
                    <Stack direction={"row"} sx={{ height: 70, mt: 3, display: "flex", justifyContent: 'space-around' }}>
                        <Paper sx={{ backgroundColor: theme.palette.primary.lightGrey, width: '200px' }}>
                            <Box sx={{ display: 'flex', pl: 2, justifyContent: 'center', width: '100%', height: '100%', flexDirection: 'column' }}>
                                <Typography component="h2" >REGISTRATION PHASE</Typography>
                                <Typography sx={{ color:phases.registrationPhase ? theme.palette.primary.main:theme.palette.primary.grey  }} component="h5" >{phases.registrationPhase ? 'Ongoing' : 'Closed'}</Typography>
                            </Box>
                        </Paper>
                        <Paper sx={{ backgroundColor: theme.palette.primary.lightGrey, width: '200px' }}>
                            <Box sx={{ display: 'flex', pl: 2, justifyContent: 'center', width: '100%', height: '100%', flexDirection: 'column' }}>
                                <Typography component="h2" >VOTING PHASE</Typography>
                                <Typography sx={{ color:phases.votingPhase ? theme.palette.primary.main:theme.palette.primary.grey }} component="h5" >{phases.votingPhase ? 'Open' : 'Closed'}</Typography>
                            </Box>
                        </Paper>
                        <Paper sx={{ backgroundColor: theme.palette.primary.lightGrey, width: '200px' }}>
                            <Box sx={{ display: 'flex', pl: 2, justifyContent: 'center', width: '100%', height: '100%', flexDirection: 'column' }}>
                                <Typography component="h2" >RESULTS PHASE</Typography>
                                <Typography sx={{ color:phases.resultsPhase ? theme.palette.primary.main:theme.palette.primary.grey  }} component="h5" >{phases.resultsPhase ? 'Open' : 'Closed'}</Typography>
                            </Box>
                        </Paper>
                    </Stack>
                    <Typography sx={{ mt: 8, color: theme.palette.primary.main }} variant="text" component="h2">Change States</Typography>
                    <Stack sx={{ mt: 3, display: 'flex', justifyContent: 'space-around' }} direction="row">
                        <Card variant="outlined" sx={{ width: '30%' }}>
                            <CardContent sx={{ height: '150px' }}>
                                <Typography gutterBottom variant="h5" component="div">
                                    Change Registration Phase
                                </Typography>
                                <Typography sx={{ mt: 2 }} variant="body2">
                                    Change the current registration phase. When registration phase is closed, other admins cannot register voters.
                                </Typography>
                            </CardContent>
                            <Divider sx={{ mt: 2, mb: 2 }} />
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Button id="registration" onClick={handlePhaseChange} sx={{ color: theme.palette.primary.main, mb: 2, width: '80%' }} variant="outlined" color="primary">Change Phase</Button>
                            </Box>
                        </Card>
                        <Card variant="outlined" sx={{ width: '30%' }}>
                            <CardContent sx={{ height: '150px' }}>
                                <Typography gutterBottom variant="h5" component="div">
                                    Change Voting Phase
                                </Typography>
                                <Typography sx={{ mt: 2 }} variant="body2">
                                    When this phase is changed, voters can vote or be limited from voting depending on whether the phase is open or closed.
                                </Typography>
                            </CardContent>
                            <Divider sx={{ mt: 2, mb: 2 }} />
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Button id="voting" onClick={handlePhaseChange} sx={{ color: theme.palette.primary.main, mb: 2, width: '80%' }} variant="outlined" color="primary">Change Phase</Button>
                            </Box>
                        </Card>
                        <Card variant="outlined" sx={{ width: '30%' }}>
                            <CardContent sx={{ height: '150px' }}>
                                <Typography gutterBottom variant="h5" component="div">
                                    Change Results Phase
                                </Typography>
                                <Typography sx={{ mt: 2 }} variant="body2">
                                    When this phase is changed, voters and users can view election results depending on whether the phase is open or close.
                                </Typography>
                            </CardContent>
                            <Divider sx={{ mt: 2, mb: 2 }} />
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Button id="results" onClick={handlePhaseChange} sx={{ color: theme.palette.primary.main, mb: 2, width: '80%' }} variant="outlined">Change Phase</Button>
                            </Box>
                        </Card>
                    </Stack>
                </Stack>
            </Box>
        </Box>
    )
}

export default Manage