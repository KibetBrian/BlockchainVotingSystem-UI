import { Box, Card, CardActions, CardMedia, CardContent, Typography, Button, Dialog, DialogTitle, ListItemText } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { theme } from '../theme'
import { FaVoteYea } from 'react-icons/fa'
import { FiMoreVertical } from 'react-icons/fi'
import { ethers } from "ethers";
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Backdrop from '@mui/material/Backdrop';
import {useSelector, useDispatch} from 'react-redux'
import { isFetching } from '../redux/userSlice'
import abi from '../abi.json'


const ProcessingDialog = ({ open, message, error, handleClose }) => {

    const user = useSelector(state => state.user);


    return (
    
    <Backdrop
        sx={{ color: '#000', zIndex: 100 }}
        open={open}
    >
        <Stack>
            <Box sx={{ height: "250px", borderRadius: theme.border.regular, width: "300px", color: "#fff", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: "center", backgroundColor: "#fff" }}>

                {user.isFetching ? <Box>
                    <Typography sx={{ color: "#000", mt: 1 }} component="h5" variant="h5">Processing Submitted Data</Typography>
                    <Box sx={{ width: '100%', mt: 2 }}>
                        <LinearProgress />
                    </Box>
                </Box> : <Box sx={{ color: "#000" }}>
                    {message ? message : error}
                    {console.log("Error", error, "Message", message)}
                </Box>}


            </Box>
            <Box sx={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                <Button onClick={handleClose} variant="contained" sx={{ color: theme.palette.primary.white, mt: 1 }}>
                    Close
                </Button>
            </Box>
        </Stack>
    </Backdrop>)
}


const ConfirmDialog = ({ data, open }) => {

    const dispatch = useDispatch();

    const [errorMessage, setErrorMessage] = useState('');
    const [errorDialogOpen, setErrorDialogOpen] = useState(false);
    const [account, setAccount] = useState(null);

    //Processing Dialog data
    const [processingDialogOpen, setProcessingDialogOpen] = useState(false);
    const [processingDialogMessage, setProcessingDialogMessage] = useState(null);
    const [processingDialogError, setProcessingDialogError] = useState(null);

    const handleClose = ()=>{
        setProcessingDialogOpen(false);
    }


    const ConnectMetamask = async () => {
        let ethereum = window.ethereum;

        if (!ethereum) {
            setErrorMessage("No wallet installed on this browser");
            setErrorDialogOpen(true);
            return
        }
        let accounts = await ethereum.request({ method: 'eth_accounts' });
        setAccount(accounts[0]);

        if (!account) {
            setErrorMessage("Seems you have not logged into your wallet");
            setErrorDialogOpen(true);
            return
        }
    }

    const HandleCastingProcess = async () => {
        ConnectMetamask();
        
        const ContractAddress = "0x3311797f5BE82be3550dd3d22BF1AC76A6118C4F";
        let ethereum = window.ethereum;
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer =  provider.getSigner()
        
        const contractInstance = new ethers.Contract(ContractAddress, abi, signer);
        const presidentialCandidates = await contractInstance.GetPresidentCandidates();
        console.log("Presidential Candidates", presidentialCandidates);
        console.log("Contract Instance", contractInstance);
        
        
        dispatch(isFetching(true));
        setProcessingDialogOpen(true);
        //const voting = await contractInstance.CastPresident("0x64E9BfED055Ec0b189c55aBEC941b22585Fa50d7");
        //console.log("Voting Results", voting);

        const candidates = await contractInstance.GetGovernorCandidates();
        console.log("Presidential Candidates", candidates);
        
        // const res = await contractInstance.GetCandidateVotes("0x64E9BfED055Ec0b189c55aBEC941b22585Fa50d7");
        // console.log("jingpingvoters", res);

        const phase = await contractInstance.GetCandidateVotes("0x9907A0cF64Ec9Fbf6Ed8FD4971090DE88222a9aC");
        console.log("phase", phase.toNumber());
        const phas1 = await contractInstance.GetCandidateVotes("0x64E9BfED055Ec0b189c55aBEC941b22585Fa50d7");
        console.log("phase1", phas1.toNumber());
        const phas2 = await contractInstance.GetCandidateVotes("0x475bFaa1848591ae0E6aB69600f48d828f61a80E");
        console.log("phase2", phas2.toNumber());

        console.log("This is votes", phase.toNumber());
        
    }



    return (

        <Dialog maxWidth="xl" open={open}>
            <ProcessingDialog open = {processingDialogOpen} message = {processingDialogMessage} error = {processingDialogError} handleClose = {handleClose}/>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <DialogTitle>Confirm Vote</DialogTitle>
            </Box>
            <ListItemText>Are you  want to vote for this president</ListItemText>
            <Card sx={{ width: 300, mt: 4, borderRadius: theme.border.regular }}>
                <CardMedia sx={{ objectFit: 'inherit' }}
                    component="img"
                    height="160"
                    image={data.imageAddress}
                    alt="green iguana"

                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {data.fullName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {data.description}
                    </Typography>
                    <CardActions sx={{ display: 'flex', justifyContent: 'space-around', mt: 1 }}>
                        <Button onClick={HandleCastingProcess} sx={{ width: '80%' }} variant="outlined" size="medium" endIcon={<FaVoteYea />}>Vote</Button>
                    </CardActions>
                </CardContent>
            </Card>
        </Dialog>
    )
}

const UserCard = ({ data }) => {
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

    const HandleDialogBoxOpen = () => {
        setConfirmDialogOpen(true)
    }

    return (
        <Box>
            <ConfirmDialog data={data} open={confirmDialogOpen} />
            <Card sx={{ width: 300, mt: 4, borderRadius: theme.border.regular }}>
                <CardMedia sx={{ objectFit: 'inherit' }}
                    component="img"
                    height="160"
                    image={data.imageAddress}
                    alt="green iguana"

                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {data.fullName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {data.description}
                    </Typography>
                    <CardActions sx={{ display: 'flex', justifyContent: 'space-around', mt: 1 }}>
                        <Button onClick={HandleDialogBoxOpen} variant="outlined" size="medium" endIcon={<FaVoteYea />}>Vote</Button>
                        <Button variant="outlined" size="medium" endIcon={<FiMoreVertical />}>More</Button>
                    </CardActions>
                </CardContent>
            </Card>
        </Box>
    )
}

export default UserCard