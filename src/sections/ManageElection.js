import { Button, Card, CardContent, Divider, Paper, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import LeftBar from './LeftBar'
import { theme } from '../theme'

const Manage = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <LeftBar />
            <Box sx={{ flex: 4 }}>
                <Stack>
                    <Typography sx={{ mt: 3 }}>Current States</Typography>
                    <Stack direction={"row"} sx={{ height: 70, mt: 3, display: "flex", justifyContent: 'space-around' }}>
                        <Paper sx={{ backgroundColor: theme.palette.primary.lightGrey, width: '200px' }}>
                            <Box sx={{ display: 'flex', pl: 2, justifyContent: 'center', width: '100%', height: '100%', flexDirection: 'column' }}>
                                <Typography component="h2" >REGISTRATION PHASE</Typography>
                                <Typography sx={{ color: theme.palette.primary.grey }} component="h5" >Open</Typography>
                            </Box>
                        </Paper>
                        <Paper sx={{ backgroundColor: theme.palette.primary.lightGrey, width: '200px' }}>
                            <Box sx={{ display: 'flex', pl: 2, justifyContent: 'center', width: '100%', height: '100%', flexDirection: 'column' }}>
                                <Typography component="h2" >VOTING PHASE</Typography>
                                <Typography sx={{ color: theme.palette.primary.grey }} component="h5" >Closed</Typography>
                            </Box>
                        </Paper>
                        <Paper sx={{ backgroundColor: theme.palette.primary.lightGrey, width: '200px' }}>
                            <Box sx={{ display: 'flex', pl: 2, justifyContent: 'center', width: '100%', height: '100%', flexDirection: 'column' }}>
                                <Typography component="h2" >RESULTS PHASE</Typography>
                                <Typography sx={{ color: theme.palette.primary.grey }} component="h5" >Open</Typography>
                            </Box>
                        </Paper>
                    </Stack>
                    <Typography sx={{ mt: 5 }}>Change Phases</Typography>
                    <Stack sx={{ mt: 3, display: 'flex', justifyContent: 'space-around'}} direction="row">
                        <Card variant="outlined" sx={{ width: '30%' }}>
                            <CardContent sx={{height: '150px'}}>
                                <Typography gutterBottom variant="h5" component="div">
                                    Change Registration Phase
                                </Typography>
                                <Typography sx={{mt: 2}} variant="body2">
                                    Change the current registration phase. When registration phase is closed, other admins cannot register voters.
                                </Typography>
                            </CardContent>
                            <Divider sx={{ mt: 2, mb: 2 }} />
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <Button sx={{ color: theme.palette.primary.main, mb: 2, width: '80%' }} variant="outlined" color="primary">Change Phase</Button>

                            </Box>
                        </Card>
                        <Card variant="outlined" sx={{ width: '30%' }}>
                            <CardContent sx={{height: '150px'}}>
                                <Typography gutterBottom variant="h5" component="div">
                                    Change Voting Phase
                                </Typography>
                                <Typography sx={{mt: 2}} variant="body2">
                                    When this phase is changed, voters can vote or be limited from voting depending on whether the phase is open or closed.
                                </Typography>
                            </CardContent>
                            <Divider sx={{ mt: 2, mb: 2 }} />
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <Button sx={{ color: theme.palette.primary.main, mb: 2, width: '80%' }} variant="outlined" color="primary">Change Phase</Button>
                            </Box>
                        </Card>
                        <Card variant="outlined" sx={{ width: '30%' }}>
                            <CardContent sx={{height: '150px'}}>
                                <Typography gutterBottom variant="h5" component="div">
                                    Change Results Phase
                                </Typography>
                                <Typography sx={{mt: 2}} variant="body2">
                                    When this phase is changed, voters and users can view election results depending on whether the phase is open or close.
                                </Typography>
                            </CardContent>
                            <Divider sx={{ mt: 2, mb: 2 }} />
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <Button sx={{ color: theme.palette.primary.main, mb: 2, width: '80%' }} variant="outlined">Change Phase</Button>

                            </Box>
                        </Card>
                    </Stack>
                </Stack>
            </Box>
        </Box>
    )
}

export default Manage