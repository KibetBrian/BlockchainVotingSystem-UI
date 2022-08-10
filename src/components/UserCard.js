import { Box, Card, CardActions, CardMedia, CardContent, Typography, Button, Dialog, DialogTitle, ListItemText, Toolbar, Tooltip } from '@mui/material'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { theme } from '../theme'
import { FaVoteYea } from 'react-icons/fa'
import { FiMoreVertical } from 'react-icons/fi'
import { ethers } from "ethers";
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Backdrop from '@mui/material/Backdrop';
import { useSelector, useDispatch } from 'react-redux'
import userSlice, { isFetching } from '../redux/userSlice'
import abi from '../abi.json'
import { MdCancel } from 'react-icons/md'
import ClickAwayListener from '@mui/base/ClickAwayListener';

const ProcessingDialog = ({ open, message, error, handleClose }) => {

    const user = useSelector(state => state.user);

    return (

        <Backdrop
            sx={{ color: '#000', zIndex: 100 }}
            open={open}
        >
            <Stack>
                <Box sx={{ height: "250px", borderRadius: theme.border.regular, width: "300px", color: "#fff", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: "center", backgroundColor: "#fff" }}>
                    {console.log(user.isFetching, "User if fetching")}
                    {user.isFetching ? <Box>
                        <Typography sx={{ color: "#000", mt: 1 }} component="h5" variant="h5">Casting your vote</Typography>
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
        </Backdrop>

    )
}


const ConfirmDialog = ({ data, open, handleDialogClose }) => {

    const dispatch = useDispatch();

    const [errorMessage, setErrorMessage] = useState('');
    const [errorDialogOpen, setErrorDialogOpen] = useState(false);
    const [account, setAccount] = useState(null);

    //Processing Dialog data
    const [processingDialogOpen, setProcessingDialogOpen] = useState(false);
    const [processingDialogMessage, setProcessingDialogMessage] = useState(null);
    const [processingDialogError, setProcessingDialogError] = useState(null);

    const handleClose = () => {
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

        setProcessingDialogOpen(true)
        dispatch(isFetching(true));

        ConnectMetamask();

        const president = "president"
        const governor = "governor"

        const ContractAddress = "0xcbF73404D5c90994A6Fb0107405263892F4b6d29";

        let ethereum = window.ethereum;
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const contractInstance = new ethers.Contract(ContractAddress, abi, signer);

        console.log(contractInstance)
        if (data.position === president) {
            const response = await contractInstance.CastPresident(data.ethereumAddress);
            const another =  await response.wait();
            
            console.log("This is response from the blockchain",another);
            setProcessingDialogMessage("You have successfully cast your vote");
            dispatch(isFetching(false));
            try{
                //Update user voted
            }catch(e){
                //Error occurred
                setProcessingDialogError(e);
            }
        }
        if (data.position === governor) {
            const response = await contractInstance.CastGovernor(data.ethereumAddress);
            console.log(response);
        }

        console.log("Contract Instance", contractInstance);
        console.log("This is contestant data", data)

    }


    return (
        <Dialog maxWidth="xl" open={open}>
            <ProcessingDialog open={processingDialogOpen} message={processingDialogMessage} error={processingDialogError} handleClose={handleClose} />
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
                        <Button onClick={handleDialogClose} sx={{ width: '80%' }} variant="outlined" size="medium" startIcon={<MdCancel />}>Cancel</Button>
                    </CardActions>
                </CardContent>
            </Card>
        </Dialog>
    )
}

const UserCard = ({ data }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user);

    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [votingPhase, setVotingPhase] = useState(false);
    const [registrationPhase, setRegistrationPhase] = useState(null);

    //wallet data
    const [errorMessage, setErrorMessage] = useState('');
    const [errorDialogOpen, setErrorDialogOpen] = useState(false);
    const [account, setAccount] = useState(null);
    const ContractAddress = "0xcbF73404D5c90994A6Fb0107405263892F4b6d29";

    let ethereum = window.ethereum;


    const ConnectMetamask = async () => {
        if (!ethereum) {
            setErrorMessage("No wallet installed on this browser");
            setErrorDialogOpen(true);
            return
        }
        let accounts = await ethereum.request({ method: 'eth_accounts' });
        console.log(accounts, "This is accounts")
        setAccount(accounts[0]);

        if (!account) {
            setErrorMessage("Seems you have not logged into your wallet");
            setErrorDialogOpen(true);
            return
        }
    }

    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const contractInstance = new ethers.Contract(ContractAddress, abi, signer);

    useEffect(() => {
        ConnectMetamask();
        const FetchPhases = async () => {

            const votingPhase = await contractInstance.GetVotingPhase();
            setVotingPhase(votingPhase);
            console.log("Voting phase", votingPhase)


            const registrationPhase = await contractInstance.GetRegisrationPhase();
            setRegistrationPhase(registrationPhase);

        }
        FetchPhases();

    }, [])


    const HandleDialogBoxOpen = () => {
        setConfirmDialogOpen(true)
    }

    const handleDialogClose = () => {
        setConfirmDialogOpen(false)
    }

    return (
        <Box>
            <ConfirmDialog data={data} open={confirmDialogOpen} handleDialogClose={handleDialogClose} />
            <Card sx={{ width: 350, mt: 4, borderRadius: theme.border.regular }}>
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
                        <Tooltip title={!votingPhase ? "Voting phase not open" : !user.data.registeredVoter ? "You are not registered to vote" : user.data.votedGovernor && data.position === "governor" ? "You already voted for governor" : user.data.votedPresident && data.position === "president" ? "You already voted for president" : "Vote"}>
                            <span>
                                <Button disabled={!votingPhase || !user.data.registeredVoter || user.data.votedGovernor && data.position === "governor" || user.data.votedPresident && data.position === "president"} onClick={HandleDialogBoxOpen} variant="outlined" size="medium" endIcon={<FaVoteYea />}>Vote</Button>
                            </span>
                        </Tooltip>
                        <Tooltip title="More">
                            <Button variant="outlined" size="medium" endIcon={<FiMoreVertical />}>More</Button>
                        </Tooltip>
                    </CardActions>
                </CardContent>
            </Card>
        </Box>
    )
}

export default UserCard