import { Box, Button, Stack, Typography, IconButton } from '@mui/material';
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BiTrendingUp } from 'react-icons/bi';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';

import TopBar from '../components/TopBar';
import TopLinearProgress from '../components/TopLinearProgress';
import { theme } from '../theme';
import client from '../axios';
import { isFetching } from '../redux/userSlice';

Chart.register(ArcElement);

const carouselData = [
  {
    id: 1,
    imageAddress: "https://images.pexels.com/photos/103123/pexels-photo-103123.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    quote1: "Trust,",
    quote2: "...but verify",
  },
  {
    id: 2,
    imageAddress: "https://images.pexels.com/photos/552779/pexels-photo-552779.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    quote1: "The first duty of a man is to",
    quote2: "...think for himself",
  },
  {
    id: 3,
    imageAddress: "https://images.pexels.com/photos/801885/pexels-photo-801885.jpeg?auto=compress&cs=tinysrgb&w=600",
    quote1: "Elections belong to the people.",
    quote2: "...It's their decision",
  },
];

const chartOptions = {
  responsive: false,
  maintainAspectRatio: false,
  legend: {
    display: true,
    position: "right"
  },
  elements: {
    arc: {
      borderWidth: 0
    }
  }
};

const TimeLineDots = ({ id }) => (
  <Box sx={{ width: '50px', display: 'flex', justifyContent: 'space-around' }}>
    {carouselData.map(data => (
      <Box
        key={data.id}
        sx={{
          width: '9px',
          height: '9px',
          borderRadius: '50%',
          backgroundColor: data.id === id ? theme.palette.primary.white : theme.palette.primary.darkGreen
        }}
      />
    ))}
  </Box>
);

const SummaryCard = ({ title, total, percentage, data, options }) => (
  <Box sx={{
    flex: 1,
    p: 2,
    m: 2,
    display: 'flex',
    justifyContent: 'space-around',
    borderRadius: theme.border.regular,
    boxShadow: 3,
    height: '130px'
  }}>
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
      <Typography component="p">{title}</Typography>
      <Stack sx={{ display: 'flex', alignItems: 'center' }} direction="row">
        <Box sx={{
          display: 'flex',
          mr: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: '30px',
          height: '30px',
          borderRadius: '50%',
          backgroundColor: theme.palette.primary.lightGreen
        }}>
          <BiTrendingUp style={{ color: theme.palette.primary.main }} />
        </Box>
        <Typography sx={{ fontSize: theme.fonts.small, fontWeight: "500" }} variant="h1" component="p">
          {percentage}%
        </Typography>
      </Stack>
      <Typography sx={{ fontWeight: "600", fontSize: theme.fonts.sm }} variant="h1" component="p">
        {total}
      </Typography>
    </Box>
    <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Doughnut options={options} width="90px" height="90px" data={data} />
    </Box>
  </Box>
);

const Carousel = ({ loading }) => {
  const [currentSlide, setCurrentSlide] = useState(carouselData[0]);

  const handleNext = () => {
    setCurrentSlide(prev => {
      const currentIndex = carouselData.findIndex(slide => slide.id === prev.id);
      const nextIndex = (currentIndex + 1) % carouselData.length;
      return carouselData[nextIndex];
    });
  };

  const handlePrev = () => {
    setCurrentSlide(prev => {
      const currentIndex = carouselData.findIndex(slide => slide.id === prev.id);
      const prevIndex = currentIndex === 0 ? carouselData.length - 1 : currentIndex - 1;
      return carouselData[prevIndex];
    });
  };

  return (
    <Box sx={{ 
      height: "250px", 
      borderRadius: theme.border.regular, 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'space-between' 
    }}>
      {loading && <TopLinearProgress />}
      <Box 
        sx={{ 
          position: "absolute", 
          zIndex: -1, 
          objectFit: 'cover', 
          filter: 'brightness(50%)', 
          height: "250px", 
          width: "320px", 
          borderRadius: theme.border.regular 
        }} 
        component="img" 
        src={currentSlide.imageAddress} 
      />
      <Stack sx={{ m: 2, zIndex: 1 }} justifyContent="space-between" alignItems="center" direction="row">
        <TimeLineDots id={currentSlide.id} />
        <Box>
          <IconButton onClick={handlePrev}>
            <FaCaretLeft style={{ fontSize: '17px', color: theme.palette.primary.lightGrey }} />
          </IconButton>
          <IconButton onClick={handleNext}>
            <FaCaretRight style={{ fontSize: '17px', color: theme.palette.primary.lightGrey }} />
          </IconButton>
        </Box>
      </Stack>
      <Stack sx={{ m: 2 }}>
        <Typography sx={{ fontSize: theme.fonts.medium }} color={theme.palette.primary.white} variant="h5">
          {currentSlide.quote1}
        </Typography>
        <Typography sx={{ fontSize: theme.fonts.small }} color={theme.palette.primary.white} variant="p">
          {currentSlide.quote2}
        </Typography>
      </Stack>
    </Box>
  );
};

const Feed = () => {
  const userData = useSelector(state => state.user.data);
  const dispatch = useDispatch();

  const [stats, setStats] = useState({
    totalVoters: 0,
    totalUsers: 0,
    totalVotedVoters: 0,
    voterTurnout: 0
  });
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [votersRes, usersRes, votedRes, turnoutRes] = await Promise.all([
        client.get('/voter/total'),
        client.get('/user/total'),
        client.get('/voter/voted'),
        client.get('/voter/turnout')
      ]);

      setStats({
        totalVoters: votersRes.data,
        totalUsers: usersRes.data,
        totalVotedVoters: votedRes.data,
        voterTurnout: turnoutRes.data
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const chartData = {
    labels: ['Men', 'Women'],
    datasets: [{
      data: [stats.totalUsers, stats.totalVoters],
      backgroundColor: [
        theme.palette.primary.main,
        theme.palette.primary.lightGreen,
      ],
      hoverBackgroundColor: [
        theme.palette.primary.darkGreen,
        theme.palette.primary.darkGreen,
      ]
    }]
  };

  return (
    <Box sx={{ flex: 4 }}>
      <TopBar />
      {loading && <TopLinearProgress />}
      
      <Stack sx={{ display: 'flex', mt: 3 }} direction="row">
        <Stack sx={{ flex: 2, display: 'flex' }}>
          {/* Welcome Card */}
          <Box sx={{ 
            pl: 3, 
            pr: 3, 
            pt: 4, 
            display: 'flex', 
            width: "90%", 
            borderRadius: theme.border.auth, 
            height: "220px", 
            backgroundColor: theme.palette.primary.lightGreen 
          }}>
            <Stack sx={{ 
              flex: 4, 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-around' 
            }}>
              <Typography 
                sx={{ fontSize: theme.fonts.sl }} 
                component="p" 
                variant="h1"
              >
                Welcome back {userData.fullName}!
              </Typography>
              <Typography component="p">
                Everything clear at one sight.
              </Typography>
              <Button 
                sx={{ 
                  textTransform: 'none', 
                  fontSize: theme.fonts.medium, 
                  display: 'flex', 
                  height: '40px', 
                  justifyContent: 'center', 
                  width: '20%', 
                  pt: 2, 
                  backgroundColor: theme.palette.primary.main, 
                  color: theme.palette.primary.white, 
                  ":hover": { 
                    backgroundColor: theme.palette.primary.darkGreen 
                  } 
                }}
              >
                stats
              </Button>
            </Stack>
            <Stack sx={{ flex: 2, display: 'flex', justifyContent: 'center' }}>
              <Box 
                sx={{ width: '100%', height: '50%' }} 
                component="img" 
                src="/assets/illustration_welcome.png" 
              />
            </Stack>
          </Box>

          {/* Summary Cards */}
          <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
            <SummaryCard
              title="Total Users"
              total={stats.totalUsers}
              percentage={100}
              data={chartData}
              options={chartOptions}
            />
            <SummaryCard
              title="Registered Voters"
              total={stats.totalVoters}
              percentage={(stats.totalVoters/stats.totalUsers * 100).toFixed(2)}
              data={chartData}
              options={chartOptions}
            />
          </Box>
        </Stack>

        {/* Right Section */}
        <Box sx={{ flex: 1, ml: 4, mr: 5 }}>
          <Box>
            <Carousel loading={loading} />
          </Box>
          
          {/* Voter Turnout Card */}
          <Box sx={{ 
            flex: 1, 
            p: 1, 
            mt: 4, 
            display: 'flex', 
            justifyContent: 'space-around', 
            borderRadius: theme.border.regular, 
            boxShadow: 3, 
            height: '200px', 
            width: '100%' 
          }}>
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
              <Typography component="p">
                Voter Turnout
              </Typography>
              <Stack sx={{ display: 'flex', alignItems: 'center' }} direction="row">
                <Box sx={{ 
                  display: 'flex', 
                  mr: 1, 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  width: '30px', 
                  height: '30px', 
                  borderRadius: '50%', 
                  backgroundColor: theme.palette.primary.lightGreen 
                }}>
                  <BiTrendingUp style={{ color: theme.palette.primary.main }} />
                </Box>
                <Typography sx={{ fontSize: theme.fonts.small, fontWeight: "500" }} variant="h1" component="p">
                  {(stats.voterTurnout/stats.totalVoters*100).toFixed(2)}%
                </Typography>
              </Stack>
              <Typography sx={{ fontWeight: "500" }} variant="h4" component="p">
                {stats.voterTurnout}
              </Typography>
            </Box>
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Doughnut options={chartOptions} width="90px" height="90px" data={chartData} />
            </Box>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default Feed;