import { Box,Card, CardActions,CardMedia, CardContent, Typography, Button } from '@mui/material'
import React from 'react'
import { theme } from '../theme'
import {FaVoteYea} from 'react-icons/fa'
import {FiMoreVertical} from 'react-icons/fi'

const UserCard = () => {
    return (
        <Box>
            <Card sx={{ maxWidth: 345, mt:4, borderRadius: theme.border.regular }}>
                <CardMedia sx={{objectFit: 'inherit'}}
                    component="img"
                    height="160"
                    image="https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="green iguana"

                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Contestant 1
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica
                    </Typography>
                    <CardActions sx={{ display: 'flex', justifyContent: 'space-around', mt:1 }}>
                        <Button variant="outlined" size="medium" endIcon={<FaVoteYea/>}>Vote</Button>
                        <Button variant = "outlined" size="medium" endIcon={<FiMoreVertical/>}>More</Button>
                    </CardActions>
                </CardContent>
            </Card>
        </Box>
    )
}

export default UserCard