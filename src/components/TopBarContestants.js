import { Button, ClickAwayListener, IconButton, ListItem, Menu, MenuItem } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { BsSearch } from 'react-icons/bs'
import { theme } from '../theme'
import { useState } from 'react'
import SearchBar from './SearchBar'

const CustomSearchBar = ()=>(
    <Box sx={{position: 'absolute',left:'25%', width: '75%', top: 0}}>
        <SearchBar />
    </Box>
)

const TopBarContestants = ({positions, currentPage, setCurrentPage}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const menuItemOpen = Boolean(anchorEl)

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }



    const [searchBarOpen, setSearchBarOpen] = useState(false)
    return (
        <ClickAwayListener onClickAway={()=>setSearchBarOpen(false)}>
            <Box sx={{ height: '10vh', display: 'flex', alignItems: 'center', justifyContent: "space-around", width: '100%' }}>
                {searchBarOpen && <CustomSearchBar />}
                <Box>
                    <IconButton onClick={()=>setSearchBarOpen(true)} sx={{ width: "50px", height: "50px",opacity: searchBarOpen ? 0:1, cursor: searchBarOpen ? "default" : "pointer" }}>
                        <BsSearch style={{ fontSize: theme.fonts.sm, color: theme.palette.primary.grey }} />
                    </IconButton>
                </Box>
                <Box>
                    <Box sx={{opacity: searchBarOpen ? 0:1, cursor: searchBarOpen ? "default" : "pointer", pointerEvents: searchBarOpen ? "none": "default"}}>
                        <Button sx={{width: 105}} variant="outlined" onClick={handleClick}>
                            {currentPage}
                        </Button>
                        <Menu open={menuItemOpen}
                            anchorEl={anchorEl}
                            onClick={handleClose}>
                            {positions.map((eachPosition, index)=>eachPosition.Title != currentPage && (<MenuItem key={index} onClick={eachPosition.onClick}>{eachPosition.Title}</MenuItem>))}
                        </Menu>
                    </Box>
                </Box>
            </Box>
        </ClickAwayListener>
    )
}

export default TopBarContestants