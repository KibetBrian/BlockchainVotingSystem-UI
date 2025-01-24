import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { 
    Button, Card, CardContent, Dialog, DialogContentText, 
    DialogTitle, Divider, LinearProgress, Paper, Stack, Typography, Box 
} from '@mui/material';
import LeftBar from './LeftBar';
import { theme } from '../theme';

const ProcessingDialog = React.memo(({ 
    processingDialogOpen, 
    handleDialogClose, 
    message, 
    topic, 
    processing 
}) => (
    <Dialog open={processingDialogOpen}>
        <DialogTitle>Changing {topic} Phase</DialogTitle>
        <Box sx={{ mt: 2, mb: 2 }}>
            {processing && <LinearProgress />}
        </Box>
        <DialogContentText sx={{ p: 2 }}>{message}</DialogContentText>
        <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100px' 
        }}>
            <Button 
                onClick={handleDialogClose} 
                sx={{ color: "#fff" }} 
                variant="contained"
            >
                Close
            </Button>
        </Box>
    </Dialog>
));

const ConfirmDialog = ({ 
    dialogOpen, 
    handleDialogClose, 
    topic 
}) => {
    const [dialogPosting, setDialogPosting] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [processingDialogMessage, setProcessingDialogMessage] = useState("");

    const handleConfirm = useCallback(async () => {
        setDialogPosting(true);
        setProcessing(true);
        try {
            const response = await axios.post(`http://localhost:8000/phase/${topic}`);
            setProcessingDialogMessage(response.data.message);
        } catch (error) {
            setProcessingDialogMessage("Error while changing state");
        } finally {
            setProcessing(false);
        }
    }, [topic]);

    return (
        <Dialog open={dialogOpen}>
            {dialogPosting && (
                <ProcessingDialog 
                    processingDialogOpen={dialogPosting}
                    topic={topic}
                    message={processingDialogMessage}
                    processing={processing}
                    handleDialogClose={handleDialogClose}
                />
            )}
            <DialogTitle>Confirm Action</DialogTitle>
            <DialogContentText sx={{ padding: 2 }}>
                Are you sure you want to change {topic} phase?
            </DialogContentText>
            <Box sx={{ 
                display: 'flex', 
                mt: 3, 
                mb: 3, 
                justifyContent: 'center', 
                alignItems: 'center' 
            }}>
                <Button 
                    sx={{ color: "#fff" }} 
                    onClick={handleConfirm} 
                    variant="contained"
                >
                    Confirm
                </Button>
            </Box>
        </Dialog>
    );
};

const PhaseStatus = ({ title, isActive }) => (
    <Paper sx={{ 
        backgroundColor: theme.palette.primary.lightGrey, 
        width: '200px' 
    }}>
        <Box sx={{ 
            display: 'flex', 
            pl: 2, 
            justifyContent: 'center', 
            width: '100%', 
            height: '100%', 
            flexDirection: 'column' 
        }}>
            <Typography component="h2">{title}</Typography>
            <Typography 
                sx={{ 
                    color: isActive 
                        ? theme.palette.primary.main 
                        : theme.palette.primary.grey 
                }} 
                component="h5"
            >
                {isActive ? 'Ongoing' : 'Closed'}
            </Typography>
        </Box>
    </Paper>
);

const PhaseChangeCard = ({ 
    title, 
    description, 
    phaseId, 
    onPhaseChange 
}) => (
    <Card variant="outlined" sx={{ width: '30%' }}>
        <CardContent sx={{ height: '150px' }}>
            <Typography gutterBottom variant="h5" component="div">
                {title}
            </Typography>
            <Typography sx={{ mt: 2 }} variant="body2">
                {description}
            </Typography>
        </CardContent>
        <Divider sx={{ mt: 2, mb: 2 }} />
        <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center' 
        }}>
            <Button 
                id={phaseId} 
                onClick={onPhaseChange} 
                sx={{ 
                    color: theme.palette.primary.main, 
                    mb: 2, 
                    width: '80%' 
                }} 
                variant="outlined"
            >
                Change Phase
            </Button>
        </Box>
    </Card>
);

const Manage = () => {
    const [phases, setPhases] = useState({
        registrationPhase: false,
        votingPhase: false,
        resultsPhase: false
    });
    
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogTopic, setDialogTopic] = useState("");

    const fetchPhases = useCallback(async () => {
        try {
            const [reg, vote, results] = await Promise.all([
                axios.get('http://localhost:8000/registration_phase'),
                axios.get('http://localhost:8000/voting_phase'),
                axios.get('http://localhost:8000/results/phase')
            ]);

            setPhases({
                registrationPhase: reg.data.registrationPhase,
                votingPhase: vote.data.votingPhase,
                resultsPhase: results.data.resultsPhase
            });
        } catch (error) {
            console.error("Failed to get phases:", error);
        }
    }, []);

    useEffect(() => {
        fetchPhases();
    }, [fetchPhases, dialogOpen]);

    const handleDialogClose = () => setDialogOpen(false);

    const handlePhaseChange = (e) => {
        setDialogTopic(e.target.id);
        setDialogOpen(true);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <LeftBar />            
            {dialogOpen && (
                <ConfirmDialog 
                    topic={dialogTopic} 
                    dialogOpen={dialogOpen} 
                    handleDialogClose={handleDialogClose} 
                />
            )}
            <Box sx={{ 
                flex: 4, 
                background: 'linear-gradient(to left, #fff, #c8facd)' 
            }}>
                <Stack>
                    <Typography 
                        sx={{ mt: 3, color: theme.palette.primary.main }} 
                        variant="text" 
                        component="h2"
                    >
                        Current States
                    </Typography>
                    <Stack 
                        direction="row" 
                        sx={{ 
                            height: 70, 
                            mt: 3, 
                            display: "flex", 
                            justifyContent: 'space-around' 
                        }}
                    >
                        <PhaseStatus 
                            title="REGISTRATION PHASE" 
                            isActive={phases.registrationPhase} 
                        />
                        <PhaseStatus 
                            title="VOTING PHASE" 
                            isActive={phases.votingPhase} 
                        />
                        <PhaseStatus 
                            title="RESULTS PHASE" 
                            isActive={phases.resultsPhase} 
                        />
                    </Stack>
                    <Typography 
                        sx={{ mt: 8, color: theme.palette.primary.main }} 
                        variant="text" 
                        component="h2"
                    >
                        Change States
                    </Typography>
                    <Stack 
                        sx={{ 
                            mt: 3, 
                            display: 'flex', 
                            justifyContent: 'space-around' 
                        }} 
                        direction="row"
                    >
                        <PhaseChangeCard 
                            title="Change Registration Phase"
                            description="Change the current registration phase. When registration phase is closed, other admins cannot register voters."
                            phaseId="registration"
                            onPhaseChange={handlePhaseChange}
                        />
                        <PhaseChangeCard 
                            title="Change Voting Phase"
                            description="When this phase is changed, voters can vote or be limited from voting depending on whether the phase is open or closed."
                            phaseId="voting"
                            onPhaseChange={handlePhaseChange}
                        />
                        <PhaseChangeCard 
                            title="Change Results Phase"
                            description="When this phase is changed, voters and users can view election results depending on whether the phase is open or close."
                            phaseId="results"
                            onPhaseChange={handlePhaseChange}
                        />
                    </Stack>
                </Stack>
            </Box>
        </Box>
    );
};

export default React.memo(Manage);