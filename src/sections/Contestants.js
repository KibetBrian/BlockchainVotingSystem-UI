import React, { useEffect, useState, useCallback } from 'react';
import { Box, Typography, LinearProgress, Backdrop } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

import TopBarContestants from '../components/TopBarContestants';
import UserCard from '../components/UserCard';
import LeftBar from './LeftBar';
import client from '../axios';
import { isFetching } from '../redux/userSlice';
import { theme } from '../theme';

const POSITIONS = [
  { title: "President", priority: 1 },
  { title: "Governor", priority: 2 },
  { title: "CEO", priority: 3 }
];

const CANDIDATE_ENDPOINTS = {
  President: "/candidates/presidential",
  Governor: "/candidates/gubernatorial"
};

const Contestants = () => {
  const [currentPage, setCurrentPage] = useState('President');
  const [candidatesData, setCandidatesData] = useState([]);

  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const fetchCandidates = useCallback(async () => {
    try {
      dispatch(isFetching(true));
      
      // Simulated delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const endpoint = CANDIDATE_ENDPOINTS[currentPage];
      const res = await client.get(endpoint);
      
      setCandidatesData(res.data);
    } catch (error) {
      console.error('Error fetching candidates:', error);
    } finally {
      dispatch(isFetching(false));
    }
  }, [currentPage, dispatch]);

  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates]);

  const handlePositionChange = (position) => {
    setCurrentPage(position);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <LeftBar />
      <Box sx={{ flex: 4 }}>
        <TopBarContestants 
          positions={POSITIONS} 
          currentPage={currentPage} 
          setCurrentPage={handlePositionChange} 
        />
        <Backdrop
          sx={{ color: '#000', zIndex: 100 }}
          open={user.isFetching}
        >
          <Box sx={backdropStyles}>
            <Typography sx={{ color: "#000", mt: 1 }} variant="h5">
              {`Fetching ${currentPage}`}
            </Typography>
            <Box sx={{ width: '100%', mt: 3 }}>
              <LinearProgress />
            </Box>
          </Box>
        </Backdrop>
        <Box sx={candidatesContainerStyles}>
          {candidatesData.map((data, index) => (
            <UserCard key={index} data={data} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

const backdropStyles = {
  width: "300px", 
  height: "250px", 
  display: 'flex', 
  flexDirection: 'column', 
  alignItems: 'center', 
  justifyContent: 'center', 
  backgroundColor: "#fff", 
  borderRadius: theme.border.regular
};

const candidatesContainerStyles = {
  height: '90vh', 
  justifyContent: 'space-around', 
  overflowY: 'scroll', 
  display: 'flex', 
  flexFlow: 'row wrap'
};

export default React.memo(Contestants);