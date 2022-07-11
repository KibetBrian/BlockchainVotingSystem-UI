import { Button, Card, IconButton, ListItem, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { BsX } from 'react-icons/bs'
import LeftBar from './LeftBar'
import TopBar from '../components/TopBar'
import { theme } from '../theme'
import { MdOutlineAddPhotoAlternate } from 'react-icons/md'
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux'

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'firstName',
        headerName: 'First name',
        width: 150,
        editable: true,
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        width: 150,
        editable: true,
    },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];


const VoterRegistration = () => {
    const user = useSelector(state => state.user);

    return (
        <Box sx={{ display: 'flex' }}>
            <LeftBar />
            <Box sx={{ flex: 4, height: '100vh', overflowY: 'scroll' }}>
                <TopBar />
                <Typography variant="text" component="h2" sx={{ m: 1 }}>{user.isAdmin ? "Register a new voter": "Request to be registered"}</Typography>
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
                                    Upload voter's passport here
                                </Typography>
                            </Box>
                        </Card>
                    </Box>
                    <Box sx={{ flex: 2, m: 2 }}>
                        <Card variant="outlined" sx={{ borderRadius: theme.border.regular, boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)", padding: "20px", height: "300px", display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-around' }}>
                            <TextField sx={{ border: theme.border.regular, width: "45%" }} id="outlined-basic" name="fullName" label="Full Name" variant="outlined" />
                            <TextField sx={{ borderRadius: theme.border.regular, width: "45%" }} name="email" id="outlined-basic" label="Email Address" variant="outlined" />
                            <TextField sx={{ borderRadius: theme.border.regular, width: "45%" }} name={"nationalIdNumber"} id="outlined-basic" label="National Id Number" variant="outlined" />
                            <TextField sx={{ borderRadius: theme.border.regular, width: "45%" }} name="region" id="outlined-basic" label="Region" variant="outlined" />
                            <TextField sx={{ borderRadius: theme.border.regular, width: "100%" }} name="voterAddress" id="outlined-basic" label="Ethereum Address" variant="outlined" />
                            <TextField sx={{ borderRadius: theme.border.regular, width: "100%" }} name="imageAddress" id="outlined-basic" label="Image Address" variant="outlined" />
                        </Card>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                    <Button sx={{ mr: 3, color: theme.palette.primary.white }} size="large" variant="contained">{user.isAdmin ? "Register": "Submit Data"}</Button>
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'center', m:2}}>
                    <Typography component="h5" variant="h5" sx={{m:1}}>
                       Recently Registered Voters
                    </Typography>
                </Box>
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        disableSelectionOnClick
                    />
                </Box>
            </Box>
        </Box>
    )
}

export default VoterRegistration