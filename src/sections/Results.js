import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Button, Card, IconButton, Slide, CardActions, 
  InputBase, CardContent, CardMedia, Typography, 
  Box, Backdrop, LinearProgress, ClickAwayListener 
} from '@mui/material';
import { BsSearch } from 'react-icons/bs';

import { theme } from '../theme';
import LeftBar from './LeftBar';
import client from '../axios';
import { setUserData, isFetching } from '../redux/userSlice';

const SearchBar = ({ changeState, setSearchInput }) => {
  const handleClose = () => changeState(false);
  const handleFilter = (e) => setSearchInput(e.target.value);

  return (
    <Box 
      sx={{ 
        zIndex: 1, 
        height: '40px', 
        left: '30%', 
        position: 'absolute', 
        backdropFilter: 'blur(6px)', 
        width: '50%', 
        display: 'flex', 
        padding: 2, 
        justifyContent: 'space-between', 
        alignItems: "center", 
        borderRadius: theme.border.regular, 
        boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" 
      }}
    >
      <BsSearch />
      <InputBase
        sx={{ ml: 3, flex: 1 }}
        placeholder="Search...."
        inputProps={{ 'aria-label': 'search...' }}
        onChange={handleFilter}
      />
      <Button 
        onClick={handleClose} 
        sx={{ 
          ":hover": { backgroundColor: theme.palette.primary.darkGreen }, 
          backgroundColor: theme.palette.primary.main, 
          color: theme.palette.primary.white 
        }}
      >
        Search
      </Button>
    </Box>
  );
};

const TopBar = ({ setSearchInput }) => {
  const [searchBarOpen, setSearchBarOpen] = useState(false);

  const handleClickAway = () => setSearchBarOpen(false);
  const toggleSearchBar = () => setSearchBarOpen(prev => !prev);

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ height: 70, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <IconButton 
          sx={{ opacity: searchBarOpen ? '0' : '1' }} 
          onClick={toggleSearchBar}
        >
          <BsSearch />
        </IconButton>
        <Slide direction='down' in={searchBarOpen}>
          <Box sx={{ width: '50vw' }}>
            {searchBarOpen && (
              <SearchBar 
                setSearchInput={setSearchInput} 
                changeState={setSearchBarOpen} 
              />
            )}
          </Box>
        </Slide>
        <Typography 
          variant='h5' 
          sx={{ 
            fontWeight: 'bold', 
            opacity: searchBarOpen ? 0 : 1, 
            color: theme.palette.primary.main 
          }}
        >
          Voting Results
        </Typography>
      </Box>
    </ClickAwayListener>
  );
};

const CardComponent = React.memo(({ data }) => (
  <Card sx={{ maxWidth: 345, mt: 2 }}>
    <CardMedia
      component="img"
      height="200"
      image={data.imageAddress}
      sx={{ objectFit: 'inherit' }}
      alt={data.fullName}
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
));

// Main Results component with optimized data fetching and filtering
const Results = () => {
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  
  const dispatch = useDispatch();
  const { isFetching: isLoading } = useSelector(state => state.user);

  const fetchData = async () => {
    try {
      dispatch(isFetching(true));
      const { data: results } = await client.get("/results/presidential");
      setData(results);
    } catch (error) {
      console.error("Failed to fetch results:", error);
    } finally {
      dispatch(isFetching(false));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = data.filter(candidate => 
    candidate.fullName.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <LeftBar />
      <Box 
        sx={{ 
          flex: 4, 
          display: 'flex', 
          height: '100vh', 
          flexFlow: 'row wrap', 
          justifyContent: 'space-around', 
          overflowY: 'scroll' 
        }}
      >
        <TopBar setSearchInput={setSearchInput} />
        
        <Backdrop
          sx={{ color: '#000', zIndex: 100 }}
          open={isLoading}
        >
          <Box 
            sx={{ 
              width: "300px", 
              height: "250px", 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              backgroundColor: "#fff", 
              borderRadius: theme.border.regular 
            }}
          >
            <Typography sx={{ color: "#000", mt: 1 }} variant="h5">
              Fetching Results
            </Typography>
            <Box sx={{ width: '100%', mt: 3 }}>
              <LinearProgress />
            </Box>
          </Box>
        </Backdrop>
        
        {filteredData.map((candidate, index) => (
          <CardComponent key={candidate.id || index} data={candidate} />
        ))}
      </Box>
    </Box>
  );
};

export default Results;