import { Box, Button, Card, CardActionArea, CardContent, CardMedia, IconButton, Stack, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import TopBar from './TopBar'
import { theme } from '../theme'
import { BiTrendingUp } from 'react-icons/bi'
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js'
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa'
import TopLinearProgress from './TopLinearProgress'
import client from '../axios'
import { useSelector } from 'react-redux'

Chart.register(ArcElement);

const imageAddress = "https://images.pexels.com/photos/7177235/pexels-photo-7177235.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"


const Feed = () => {

  const userData = useSelector(state => state.user.data);
  const [TotalVoters, setTotalVoters] = useState(0);
  const [TotalUsers, setTotalUsers] = useState(0);
  const [TotalVotedVoters, setTotalVotedVoters] = useState(0);

  useEffect(() => {

    const FetchTotalVoters = async () => {
      const response = await client.get('/voter/total');
      const data = await response.data
      setTotalVoters(data);
    }

    const FetchTotalUsers = async () => {
      const response = await client.get('/user/total');
      const data = response.data
      setTotalUsers(data);
    }

    const FetchTotalVotedVoters = async () => {
      const response = await client.get('/voter/voted');
      const data = response.data;
      setTotalVotedVoters(data);
    }
    FetchTotalVoters();
    FetchTotalUsers();
    FetchTotalVotedVoters();
  }, [])


  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, [])

  const data = {
    labels: [
      'Men',
      'Women'
    ],
    datasets: [{
      data: [300, 50],
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
  const options = {
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
      {carouselData.map(data => <Box key={data.id} sx={data.id === id ? { width: '9px', height: '9px', borderRadius: '50%', backgroundColor: theme.palette.primary.white } : { width: '9px', height: '9px', borderRadius: '50%', backgroundColor: theme.palette.primary.darkGreen }} />)}
    </Box>

  )
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
  ]

  var curIndex = 0;
  const Carousel = () => {
    const [data, setData] = useState(carouselData[curIndex]);

    const handleAdd = () => {
      curIndex += 1
      if (curIndex >= carouselData.length) {
        curIndex = 0;
      }
      setData(carouselData[curIndex])
    }

    const handleSub = () => {
      curIndex -= 1;
      if (curIndex <= -1) {
        curIndex = carouselData.length - 1
      }
      setData(carouselData[curIndex])

    }

    return (
      <Box sx={{ height: "250px", borderRadius: theme.border.regular, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        {loading && <TopLinearProgress />}
        <Box sx={{ position: "absolute", zIndex: -1, objectFit: 'cover', filter: 'brightness(50%)', height: "250px", width: "320px", borderRadius: theme.border.regular }} component="img" src={data.imageAddress} />
        <Stack sx={{ m: 2, zIndex: 1, }} justifyContent="space-between" alignItems="center" direction="row">
          <TimeLineDots id={data.id} />
          <Box>
            <IconButton onClick={handleSub}>
              <FaCaretLeft style={{ fontSize: '17px', color: theme.palette.primary.lightGrey }} />
            </IconButton>
            <IconButton onClick={handleAdd}>
              <FaCaretRight style={{ fontSize: '17px', color: theme.palette.primary.lightGrey }} />
            </IconButton>
          </Box>
        </Stack>
        <Stack sx={{ m: 2 }}>
          <Typography sx={{ fontSize: theme.fonts.medium }} color={theme.palette.primary.white} variant="h5">{data.quote1}</Typography>
          <Typography sx={{ fontSize: theme.fonts.small }} color={theme.palette.primary.white} variant="p">{data.quote2}</Typography>
        </Stack>
      </Box>
    )
  }

  const SummaryCard = ({ title, total }) => (
    <Box sx={{ flex: 1, p: 2, m: 2, display: 'flex', justifyContent: 'space-around', borderRadius: theme.border.regular, boxShadow: 3, flex: 1, height: '130px' }}>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
        <Typography component="p">
          {title}
        </Typography>
        <Stack sx={{ display: 'flex', alignItems: 'center' }} direction="row">
          <Box sx={{ display: 'flex', mr: 1, justifyContent: 'center', alignItems: 'center', width: '30px', height: '30px', borderRadius: '50%', backgroundColor: theme.palette.primary.lightGreen }}>
            <BiTrendingUp style={{ color: theme.palette.primary.main }} />
          </Box>
          <Typography sx={{ fontSize: theme.fonts.small, fontWeight: "500" }} variant="h1" component="p">
            +20.4%
          </Typography>
        </Stack>
        <Typography sx={{ fontWeight: "600", fontSize: theme.fonts.sm }} variant="h1" component={"p"}>
          {total}
        </Typography>
      </Box>
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Doughnut options={options} width={"90px"} height={"90px"} data={data} />
      </Box>
    </Box>
  )

  return (
    <Box sx={{ flex: 4 }}>
      <TopBar />
      <Stack sx={{ display: 'flex', mt: 3 }} direction="row">
        <Stack sx={{ flex: 2, display: 'flex' }}>
          <Box sx={{ pl: 3, pr: 3, pt: 4, display: 'flex', width: "90%", borderRadius: theme.border.auth, height: "220px", backgroundColor: theme.palette.primary.lightGreen }}>
            <Stack sx={{ flex: 4, display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
              <Typography sx={{ fontSize: theme.fonts.sl }} component={"p"} variant={"h1"}>
                Welcome back {userData.fullName}!
              </Typography>
              <Typography component="p">
                Everything clear at one sight.
              </Typography>
              <Button sx={{ textTransform: 'none', fontSize: theme.fonts.medium, display: 'flex', height: '40px', justifyContent: 'center', width: '20%', pt: 2, backgroundColor: theme.palette.primary.main, color: theme.palette.primary.white, ":hover": { backgroundColor: theme.palette.primary.darkGreen } }}>
                stats
              </Button>
            </Stack>
            <Stack sx={{ flex: 2, display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ width: '100%', height: '50%' }} component="img" src="/assets/illustration_welcome.png">

              </Box>
            </Stack>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
            <SummaryCard title={"Total Users"} total={TotalUsers} />
            <SummaryCard title={"Registered Voters"} total={TotalVoters} />
          </Box>
        </Stack>
        <Box sx={{ flex: 1, ml: 4, mr: 5 }}>
          <Box>
            <Carousel data={data} />
          </Box>
          <Box sx={{ flex: 1, p: 1, mt: 4, display: 'flex', justifyContent: 'space-around', borderRadius: theme.border.regular, boxShadow: 3, height: '200px', width: '100%' }}>
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
              <Typography component="p">
                Voter Turnout
              </Typography>
              <Stack sx={{ display: 'flex', alignItems: 'center' }} direction="row">
                <Box sx={{ display: 'flex', mr: 1, justifyContent: 'center', alignItems: 'center', width: '30px', height: '30px', borderRadius: '50%', backgroundColor: theme.palette.primary.lightGreen }}>
                  <BiTrendingUp style={{ color: theme.palette.primary.main }} />
                </Box>
                <Typography sx={{ fontSize: theme.fonts.small, fontWeight: "500" }} variant="h1" component="p">
                  +20.4%
                </Typography>
              </Stack>
              <Typography sx={{ fontWeight: "500" }} variant="h4" component={"p"}>
                {TotalVotedVoters}
              </Typography>
            </Box>
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Doughnut options={options} width={"90px"} height={"90px"} data={data} />
            </Box>
          </Box>
        </Box>
      </Stack>
    </Box >
  )
}
export default Feed