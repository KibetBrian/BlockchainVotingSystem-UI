import { Button, InputBase } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { theme } from '../theme'
import { BsSearch } from 'react-icons/bs'

const SearchBar = (props) => {
    const handleClick = () => {
        props.changeState(false)
    }
    return (
        <>
            <Box sx={{ zIndex: 1, height: '50px', left: '23%', position: 'absolute', backdropFilter: 'blur(6px)', width: '50%', display: 'flex', padding: 2, justifyContent: 'space-between', alignItems: "center", borderRadius: theme.border.regular, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}>
                <BsSearch />
                <InputBase
                    sx={{ ml: 3, flex: 1, }}
                    placeholder="Search...."
                    inputProps={{ 'aria-label': 'search...' }}
                />
                <Button onClick={handleClick} sx={{ ":hover": { backgroundColor: theme.palette.primary.darkGreen }, backgroundColor: theme.palette.primary.main, color: theme.palette.primary.white }}>
                    Search
                </Button>
            </Box>
        </>
    )
}

export default SearchBar