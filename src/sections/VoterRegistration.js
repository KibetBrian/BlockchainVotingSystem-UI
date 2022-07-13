import { Button, Card, IconButton, ListItem, Stack, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { BsX } from 'react-icons/bs'
import LeftBar from './LeftBar'
import { useState, useRef, useEffect } from 'react'
import TopBar from '../components/TopBar'
import { theme } from '../theme'
import { MdOutlineAddPhotoAlternate } from 'react-icons/md'
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux'
import { ethers } from "ethers";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import ListItemText from '@mui/material/ListItemText';
import { AiTwotoneCopy } from 'react-icons/ai'
import client from '../axios'
import { GrFormCheckmark } from 'react-icons/gr'
import { MdFreeCancellation } from 'react-icons/md'
import LinearProgress from '@mui/material/LinearProgress';
import Backdrop from '@mui/material/Backdrop';
import { isFetching } from '../redux/userSlice'



const RegisteredVotersColumns = [
    { field: 'id', headerName: 'ID', width: 300 },
    {
        field: 'ethereumAddress',
        headerName: 'Ethereum Address',
        width: 500,
        editable: false,
    },

];
const RegisteredVotersRows = [
    { id: 1, fullName: 'Snow', address: '0x1234567890123456789012345678901234567890' },
];

const PendingVoterRegistrationRequestColumns = [
    {
        field: 'id',
        headerName: 'ID',
        width: 100
    },
    {
        field: 'fullName',
        headerName: 'Full Name',
        width: 170,
        editable: false,
    },
    {
        field: 'email',
        headerName: 'Voter\'s Email',
        width: 170,
        editable: false,
    },
    {
        field: 'nationalIDNumber',
        headerName: 'National ID Number',
        width: 170,
        editable: false,
    },
    {
        field: 'voted',
        headerName: 'Voted',
        width: 100,
        editable: false,
    },
    {
        field: 'verified',
        headerName: 'Verified',
        width: 100,
        editable: false,
    },
    {
        field: 'ethereumAddress',
        headerName: 'Ethereum Address',
        width: 360,
        editable: false,
    },
    {
        field: 'reject',
        headerName: 'Reject',
        width: 100,
        editable: false,
        renderCell: (rowData) => {
            const HandleAction = async () => {
                const [voterData, setVoterData] = useState(rowData.rows)
                const [confirmVoterDialogOpen, setConfirmVoterDialogOpen] = useState(false);

                const confirmVoterHandleClose = () => {
                    setConfirmVoterDialogOpen(false);
                }

                const [confirmVoterMessage, setConfirmVoterMessage] = useState("");

                console.log(rowData)
                try {
                    const response = await client.post("voter/reject", { ethereumAddress: rowData.row.ethereumAddress });
                    console.log(response.data)
                } catch (err) {
                    console.log(err)
                }
            }

            return (         

                    <IconButton onClick={HandleAction}>
                            <MdFreeCancellation />
                    </IconButton>
            )
        }
    },
    {
        field: 'confirm',
        headerName: 'Confirm',
        width: 100,
        editable: false,
        renderCell: (rowData) => {

            const handleAction = async () => {
                console.log(rowData)
                try {
                    const response = await client.post("voter/confirm", { ethereumAddress: rowData.row.ethereumAddress });

                    console.log(response.data)
                } catch (err) {
                    console.log(err)
                }
            }

            return (
                <Box>
                    <IconButton onClick={handleAction}>
                        <GrFormCheckmark />
                    </IconButton>
                </Box>
            )
        }
    },


];

const MessageDialog = ({ title, message }) => {
    const [dialogOpen, setDialogOpen] = useState(false)
    return (
        <Dialog>
            <DialogTitle>{title}</DialogTitle>
            <ListItemText>{message}</ListItemText>
            <Button>Close</Button>
        </Dialog>
    )
}


const ErrorDialog = ({ open, onClose, message }) => {
    return (
        <Dialog sx={{ height: '600px' }} open={open}>
            <DialogTitle>Wallet Error</DialogTitle>
            <ListItem>
                <ListItemText sx={{ fontWeight: "bold", color: theme.palette.primary.darkGreen }}>Error: </ListItemText>
                <ListItemText>{message}</ListItemText>
            </ListItem>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 3 }}>
                <Button sx={{ color: "#fff", width: "50%" }} variant={"contained"} onClick={onClose}>Ok</Button>
            </Box>
        </Dialog>
    )
}
const PendingVoterRegistration = () => {
    const [pendingVoters, setPendingVoters] = useState([]);
    console.log("This is pending voters", pendingVoters)

    useEffect(() => {
        const HandleFetchData = async () => {
            try {
                const response = await client.get("voter/pending");
                setPendingVoters(response.data.pendingVoters);
            }
            catch (e) {
                console.log(e)
            }
        }
        HandleFetchData();
    }, [])
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', m: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', m: 2 }}>
                <Typography component="h5" variant="h5" sx={{ m: 1 }}>
                    Pending Voter Registration
                </Typography>
            </Box>
            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={pendingVoters}
                    columns={PendingVoterRegistrationRequestColumns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    disableSelectionOnClick
                />
            </Box>
        </Box>)
}

const ConfirmDialog = ({ open, onClose, address }) => {
    const CopyAddress = () => {
        navigator.clipboard.writeText(address);
    }
    return (
        <Dialog sx={{ height: '600px' }} open={open}>
            <DialogTitle>Confirm Address</DialogTitle>
            <ListItem>
                <ListItemText sx={{ fontWeight: "bold", color: theme.palette.primary.darkGreen }}>Address: </ListItemText>
                <ListItemText>{address}</ListItemText>
                <AiTwotoneCopy onClick={CopyAddress} />
            </ListItem>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 3 }}>
                <Button sx={{ color: "#fff", width: "50%" }} variant={"contained"} onClick={onClose}>Confirm</Button>
            </Box>
        </Dialog>
    )
}

const RegisteredVoters = () => {
    const [RegisteredVoters, setRegisteredVoters] = useState([]);
    useEffect(() => {
        const FetchRegisteredVoters = async () => {
            try {
                const res = await client.get("voter/registered");
                setRegisteredVoters(res.data);
            } catch (e) {
                console.log(e)
            }
        }
        FetchRegisteredVoters();
    }, [])
    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', m: 2 }}>
                <Typography component="h5" variant="h5" sx={{ m: 1 }}>
                    Recently Registered Voter's Addresses
                </Typography>
            </Box>
            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={RegisteredVoters}
                    columns={RegisteredVotersColumns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    disableSelectionOnClick
                />
            </Box>
        </Box>
    )
}

const ConfirmVoterDialog = ({ data, open, handleClose, message, action }) => {
    return (
        <Dialog open={true}>
            <DialogTitle>Confirm {action}</DialogTitle>
            <ListItem>
                <ListItemText>Voters Name: {data.fullName}</ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText>VotersIdNumber: {data.nationalIdNumber}</ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText>VotersAddress: {data.votersAddress}</ListItemText>
            </ListItem>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 3 }}>
                <Button onClick={handleClose} sx={{ color: '#fff' }} variant="contained">Confirm</Button>
            </Box>
        </Dialog>

    )
}


const VoterRegistration = () => {
    const votersAddressRef = useRef(null);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch()

    const [voterData, setVoterData] = useState({});
    const [dialogOpen, setDialogOpen] = useState(false);
    const [errorDialogOpen, setErrorDialogOpen] = useState(false);
    const [backDropOpen, setBackDropOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");


    const [errorMessage, setErrorMessage] = useState(null);
    const [account, setAccount] = useState(null);

    const ConnectMetamask = async () => {
        let ethereum = window.ethereum;

        if (!ethereum) {
            setErrorMessage("No wallet installed on this browser");
            setErrorDialogOpen(true);
            return
        }
        setDialogOpen(true)
        let accounts = await ethereum.request({ method: 'eth_accounts' });
        setAccount(accounts[0]);
        if (!account) {
            setDialogOpen(false);
            setErrorMessage("Seems you have not logged into your wallet");
            setErrorDialogOpen(true);
            return
        }
        votersAddressRef.current.value = account;

        const provider = new ethers.providers.Web3Provider(ethereum)
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner()
        console.log(provider)
    }

    const HandleBackDropClose = () => {
        setBackDropOpen(false);
    }

    const HandleChange = (e) => {
        setVoterData({ ...voterData, [e.target.name]: e.target.value })
    }

    const HandleSubmit = async () => {

        let num = Number(voterData.nationalIdNumber);
        voterData.nationalIdNumber = num;
        voterData.userId = user.data.id
        if (account) {
            voterData.votersAddress = account;
        }
        setBackDropOpen(true)
        try {
            dispatch(isFetching(true))
            const response = await client.post("/voter/register", voterData)
            setMessage("Voter data submitted successfully")
            dispatch(isFetching(false))
        } catch (e) {
            dispatch(isFetching(false))
            switch (e.response.status) {
                case 400:
                    setMessage("Invalid Data submitted");
                    break;
                case 500:
                    setMessage("Voter Data already submitted");
                    break;
                case 403:
                    setMessage("UserId doesn't match with email provided");
                default:
                    setMessage("Unknown error occurred");
                    console.log("Error ", e)
                    break;
            }
        }

    }

    const handleDialogClose = () => {
        setDialogOpen(false)
    }

    const handleErrorDialogClose = () => {
        setErrorDialogOpen(false)
    }




    return (
        <Box sx={{ display: 'flex' }}>
            <LeftBar />
            <Box sx={{ flex: 4, height: '100vh', overflowY: 'scroll' }}>
                <TopBar />
                <Backdrop
                    sx={{ color: '#000', zIndex: 100 }}
                    open={backDropOpen}
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
                            <Button onClick={HandleBackDropClose} variant="contained" sx={{ color: theme.palette.primary.white, mt: 1 }}>
                                Close
                            </Button>
                        </Box>
                    </Stack>
                </Backdrop>
                {errorDialogOpen ? <ErrorDialog message={errorMessage} open={errorDialogOpen} onClose={handleErrorDialogClose} /> : <ConfirmDialog address={account} open={dialogOpen} onClose={handleDialogClose} />}
                <Typography variant="text" component="h2" sx={{ m: 1 }}>{user.data.isAdmin ? "Register a new voter" : "Request to be registered"}</Typography>
                <Box sx={{ display: 'flex', m: 1 }}>
                    <Box sx={{ flex: 1, m: 2 }}>
                        <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', borderRadius: theme.border.regular, boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)", height: '350px', padding: "20px" }}>
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
                                    Upload voter's passport here
                                </Typography>
                            </Box>
                        </Card>
                    </Box>
                    <Box sx={{ flex: 2, m: 2 }}>
                        <Card variant="outlined" sx={{ borderRadius: theme.border.regular, boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)", padding: "20px", height: "350px", display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-around' }}>
                            <TextField onChange={HandleChange} sx={{ border: theme.border.regular, width: "45%" }} id="outlined-basic" name="votersName" label="Full Name" variant="outlined" />
                            <TextField onChange={HandleChange} sx={{ borderRadius: theme.border.regular, width: "45%" }} name="votersEmail" id="outlined-basic" label="Email Address" variant="outlined" />
                            <TextField onChange={HandleChange} sx={{ borderRadius: theme.border.regular, width: "45%" }} name={"nationalIdNumber"} id="outlined-basic" label="National Id Number" variant="outlined" />
                            <TextField onChange={HandleChange} sx={{ borderRadius: theme.border.regular, width: "45%" }} name="region" id="outlined-basic" label="Region" variant="outlined" />
                            {user.data.isAdmin && <TextField onChange={HandleChange} sx={{ border: theme.border.regular, width: "100%" }} id="outlined-basic" name="userId" label="User Id" variant="outlined" />}
                            <Box sx={{ alignItems: 'center', width: "100%", display: 'flex', justifyContent: 'space-between' }}>
                                <TextField onChange={HandleChange} sx={{ borderRadius: theme.border.regular, width: user.data.isAdmin ? '100%' : '55%' }} defaultValue={account ? account : ''} name="votersAddress" id="outlined-basic" label={account ? "" : "Ethereum Address"} variant="outlined" />
                                {!user.data.isAdmin && <Box sx={{ width: '10%', display: 'flex', justifyContent: 'center' }}>
                                    <Typography component="p" variant="p">OR</Typography>
                                </Box>}
                                {!user.data.isAdmin && <Button onClick={ConnectMetamask} sx={{ color: '#fff', height: '55px', width: "35%" }} variant="contained">GetFromWallet</Button>}
                            </Box>
                            <TextField onChange={HandleChange} sx={{ borderRadius: theme.border.regular, width: "100%" }} name="imageAddress" id="outlined-basic" label="Image Address" variant="outlined" />
                        </Card>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                    <Button onClick={HandleSubmit} sx={{ mr: 3, color: theme.palette.primary.white }} size="large" variant="contained">{user.data.isAdmin ? "Register" : "Submit Data"}</Button>
                </Box>
                {user.data.isAdmin && <PendingVoterRegistration />}
                <RegisteredVoters />
            </Box>
        </Box>
    )
}

export default VoterRegistration