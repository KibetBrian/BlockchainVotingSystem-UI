import { Button, Card, IconButton, Slide, CardActions, InputBase, CardContent, CardMedia, Typography } from '@mui/material'
import { BsSearch } from 'react-icons/bs'
import { theme } from '../theme'
import { Box } from '@mui/system'
import React from 'react'
import { useState, useEffect } from 'react'
import { ClickAwayListener } from '@mui/base';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import LeftBar from './LeftBar'
import { setUserData } from '../redux/userSlice.js'
import client from '../axios'
import { isFetching } from '../redux/userSlice.js'
import Backdrop from '@mui/material/Backdrop';
import LinearProgress from '@mui/material/LinearProgress';

const SearchBar = (props) => {
  const handleClick = () => {
    props.changeState(false)
  }
  const handleFilter = (e)=>{
    props.setSearchInput(e.target.value)
  }

  return (
    <>
      <Box sx={{ zIndex: 1, height: '40px', left: '30%', position: 'absolute', backdropFilter: 'blur(6px)', width: '50%', display: 'flex', padding: 2, justifyContent: 'space-between', alignItems: "center", borderRadius: theme.border.regular, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}>
        <BsSearch />
        <InputBase
          sx={{ ml: 3, flex: 1, }}
          placeholder="Search...."
          inputProps={{ 'aria-label': 'search...' }}
          onChange = {handleFilter}
        />
        <Button onClick={handleClick} sx={{ ":hover": { backgroundColor: theme.palette.primary.darkGreen }, backgroundColor: theme.palette.primary.main, color: theme.palette.primary.white }}>
          Search
        </Button>
      </Box>
    </>
  )
}

const TopBar = (props) => {
  const [notMounted, setNotMounted] = useState(true);
  const imageAddress = "https://images.pexels.com/photos/5358099/pexels-photo-5358099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  const countryAddress = "https://countryflagsapi.com/png/ke"
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user)
  const [searchBarOpen, setSearchBarOpen] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    if (anchorEl != null) {
      handleClose()
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    dispatch(setUserData(null))
  }

  const handleClickAway = () => {
    setSearchBarOpen(false)
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ height: 70, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <IconButton sx={searchBarOpen ? { opacity: '0' } : { opacity: '1' }} onClick={() => setSearchBarOpen(true)}>
          <BsSearch />
        </IconButton>
        <Slide direction='down' in={searchBarOpen}>
          <Box sx={{ width: '50vw' }}>
            <Box sx={{ display: 'flex', width: '100%' }}>
              {searchBarOpen && <SearchBar setSearchInput={props.setSearchInput} data={props} changeState={setSearchBarOpen} />}
            </Box>
          </Box>
        </Slide>
        <Typography variant='h5' sx={{ fontWeight: 'bold', opacity: searchBarOpen ? 0 : 1, color: theme.palette.primary.main }}>
          Voting Results
        </Typography>
      </Box>
    </ClickAwayListener >
  )
}


const CardComponent = ({ data }) => (
  <Box>
    <Card sx={{ maxWidth: 345, mt: 2 }}>
      <CardMedia
        component="img"
        height="200"
        image={data.imageAddress}
        sx={{objectFit: 'inherit'}}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data.fullName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Total Votes</Button>
        <Button size="medium">{data.votes}</Button>
      </CardActions>
    </Card>
  </Box>
);

const Results = () => {
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  
  const dispatch = useDispatch();

  const user = useSelector(state => state.user);
  const FetchData = async () => {
    try {
      dispatch(isFetching(true))
      const response = await client.get("/results/presidential");
      setData(response.data);
      dispatch(isFetching(false))
    } catch (e) {
      console.log(e);
      dispatch(isFetching(false))
    }
  }
  useEffect(() => {
    FetchData();
  }, [])
  return (
    <Box sx={{ display: 'flex' }}>
      <LeftBar />
      <Box sx={{ flex: 4, display: 'flex', height: '100vh', flexFlow: 'row wrap', justifyContent: 'space-around', overflowY: 'scroll', }}>
        <TopBar setSearchInput={setSearchInput} data={data} fetchData={FetchData} setData={setData}/>
        <Backdrop
          sx={{ color: '#000', zIndex: 100 }}
          open={user.isFetching}
        >
          <Box sx={{ width: "300px", height: "250px", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: "#fff", borderRadius: theme.border.regular }}>
            <Typography sx={{ color: "#000", mt: 1 }} component="h5" variant="h5">{"Fetching Results"}</Typography>
            <Box sx={{ width: '100%', mt: 3 }}>
              <LinearProgress />
            </Box>
          </Box>
        </Backdrop>
        {data.filter(e=>e.fullName.toLowerCase().includes(searchInput.toLowerCase())).map((item, index) => (<CardComponent key={index} data={item} />))}
      </Box>
    </Box>
  )
}

export default Results