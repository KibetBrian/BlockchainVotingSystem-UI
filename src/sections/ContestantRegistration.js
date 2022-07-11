import { Button, Card, IconButton, ListItem, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { BsX } from 'react-icons/bs'
import LeftBar from './LeftBar'
import TopBar from '../components/TopBar'
import { useDispatch, useSelector } from 'react-redux'
import { theme } from '../theme'
import { MdOutlineAddPhotoAlternate } from 'react-icons/md'
import { useState, useEffect } from 'react'
import client from '../axios'
import { isFetching } from '../redux/userSlice'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import { DataGrid } from '@mui/x-data-grid';
const ContestantRegistration = () => {

    const user = useSelector(state => state.user);
    const [contestantData, setContestantData] = useState({});
    const [RegisteredCandidates, setRegisteredCandidates] = useState([]);
    const [backDropOpen, setBackDropOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    

    const handleChange = (e) => {
        setContestantData({ ...contestantData, [e.target.name]: e.target.value })
    }

    const dispatch = useDispatch();

    useEffect(() => {
        const FetchRegisteredCandidates = async () => {
            const res = await client.get("/candidates")
            try {
                const data = await res.data;
                setRegisteredCandidates(data);
            } catch (e) {
                console.log(error)
            }
        }
        FetchRegisteredCandidates();
    }, [backDropOpen])

    const HandleRegistration = async () => {
        setBackDropOpen(true)
        let num = Number(contestantData.nationalIdNumber);
        contestantData.nationalIdNumber = num;

        try {
            dispatch(isFetching(true))
            const response = await client.post("/candidate/register", contestantData);
            setMessage("Candidate Registered");
            dispatch(isFetching(false))
        } catch (e) {
            dispatch(isFetching(false));
            setError("Candidate Registration Failded")
            console.log(e);
        }

    }


    const HandleBackDropClose = () => {
        setBackDropOpen(false);
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 150 },
        {
            field: 'fullName',
            headerName: 'Full Name',
            width: 170,
            editable: false,
        },
        {
            field: 'position',
            headerName: 'Position',
            width: 150,
            editable: true,
        },
        {
            field: 'address',
            headerName: 'Ethereum Address',
            width: 360,
            editable: false,
        },

    ];

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
                <Typography variant="text" component="h2" sx={{ m: 1 }}>Register a new candidate</Typography>
                <Box sx={{ display: 'flex', m: 1 }}>
                    <Box sx={{ flex: 1, m: 2 }}>
                        <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', borderRadius: theme.border.regular, boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)", height: '370px', padding: "20px" }}>
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
                        <Card variant="outlined" sx={{ borderRadius: theme.border.regular, boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)", padding: "20px", height: "370px", display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-around' }}>
                            <TextField onChange={handleChange} name="fullName" sx={{ border: theme.border.regular, width: "45%" }} id="outlined-basic" label="Full Name" variant="outlined" />
                            <TextField onChange={handleChange} name="email" sx={{ borderRadius: theme.border.regular, width: "45%" }} id="outlined-basic" label="Email Address" variant="outlined" />
                            <TextField onChange={handleChange} type={"number"} name="nationalIdNumber" sx={{ borderRadius: theme.border.regular, width: "45%" }} id="outlined-basic" label="National Id Number" variant="outlined" />
                            <TextField onChange={handleChange} name="region" sx={{ borderRadius: theme.border.regular, width: "45%" }} id="outlined-basic" label="Region" variant="outlined" />
                            <TextField onChange={handleChange} name="description" sx={{ border: theme.border.regular, width: "45%" }} id="outlined-basic" label="Description" variant="outlined" />
                            <TextField onChange={handleChange} name="position" sx={{ border: theme.border.regular, width: "45%" }} id="outlined-basic" label="Position" variant="outlined" />
                            <TextField onChange={handleChange} name="ethereumAddress" sx={{ borderRadius: theme.border.regular, width: "100%" }} id="outlined-basic" label="Ethereum Address" variant="outlined" />
                            <TextField onChange={handleChange} name="imageAddress" sx={{ borderRadius: theme.border.regular, width: "100%" }} id="outlined-basic" label="Image Address" variant="outlined" />
                        </Card>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                    <Button onClick={HandleRegistration} sx={{ mr: 3, color: theme.palette.primary.white }} size="large" variant="contained">Register</Button>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', m: 2 }}>
                    <Stack sx= {{width: "75vw"}}>
                        <Typography  component="h5" variant="h5" sx={{ m: 1,mb:2, display: 'flex', justifyContent: 'center'}}>
                            Registered Candidates
                        </Typography>
                        <DataGrid
                            rows={RegisteredCandidates}
                            columns={columns}
                            pageSize={5}
                            autoHeight
                            rowsPerPageOptions={[5]}
                            disableSelectionOnClick
                        />  
                    </Stack>
                </Box>
            </Box>
        </Box>
    )
}

export default ContestantRegistration