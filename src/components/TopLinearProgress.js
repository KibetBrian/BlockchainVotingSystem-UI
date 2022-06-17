import React from 'react'
import Grid from '@mui/material/Grid'
import { LinearProgress } from '@mui/material';


const TopLinearProgress = () => {
    return (
        <Grid sx={{ position: 'absolute', top: 0, left:"23%", width: '75vw' }} xs item>
            {<LinearProgress value={80} variant={"indeterminate"} title="test" />}
        </Grid>
    )
}

export default TopLinearProgress