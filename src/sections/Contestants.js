import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import SearchBar from '../components/SearchBar'
import TopBarContestants from '../components/TopBarContestants'
import UserCard from '../components/UserCard'
import LeftBar from './LeftBar'
import client from '../axios'
import LinearProgress from '@mui/material/LinearProgress';
import Backdrop from '@mui/material/Backdrop';
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { isFetching } from '../redux/userSlice'
import { Typography } from '@mui/material'
import {theme} from '../theme'
const Contestants = () => {
  const positions = [
    {
      Title: "President",
      priority: 1,
      onClick: () => setCurrentPage('President')
    },
    {
      Title: "Governor",
      priority: 2,
      onClick: () => setCurrentPage('Governor')
    },
    {
      Title: "CEO",
      priority: 3,
      onClick: () => setCurrentPage('CEO')
    }
  ]
  const [currentPage, setCurrentPage] = useState('President');
  const [candidatesData, setCandidatesData] = useState([]);

  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [pageData, setPageData] = useState([]);

  const url = "https://jsonplaceholder.typicode.com/photos"

  useEffect(() => {
    if (currentPage === 'President') {
      const FetchData = async () => {
        try {
          dispatch(isFetching(true))
          await new Promise(r => setTimeout(r, 2000));
          const res = await client.get("/candidates/presidential")
          dispatch(isFetching(false))
          setCandidatesData(res.data)
        } catch (e) {
          dispatch(isFetching(false))
          throw (e)
        }
      }
      FetchData()
    }
    if (currentPage === 'Governor') {
      const FetchData = async () => {
        try {
          dispatch(isFetching(true))
          await new Promise(r => setTimeout(r, 2000));
          const res = await client.get("/candidates/gubernatorial")
          dispatch(isFetching(false))
          setCandidatesData(res.data)
        } catch (e) {
          dispatch(isFetching(false))
          throw (e)
        }
      }
      FetchData()
    }
  }, [currentPage])

  return (
    <Box sx={{ display: 'flex' }}>
      <LeftBar />
      <Box sx={{ flex: 4 }}>
        <TopBarContestants positions={positions} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <Backdrop
          sx={{ color: '#000', zIndex: 100 }}
          open={user.isFetching}
        >
          <Box sx = {{width: "300px", height: "250px",display: 'flex', flexDirection: 'column',alignItems: 'center', justifyContent: 'center', backgroundColor: "#fff", borderRadius: theme.border.regular}}>
            <Typography sx={{ color: "#000", mt: 1 }} component="h5" variant="h5">{"Fetching "+ currentPage}</Typography>
            <Box sx={{ width: '100%', mt: 3 }}>
              <LinearProgress />
            </Box>
          </Box>
        </Backdrop>
        <Box sx={{ height: '90vh', justifyContent: 'space-around', overflowY: 'scroll', display: 'flex', flexFlow: 'row wrap' }}>
          {candidatesData.map((data, key) => (<UserCard data={data} key={key} />))}
        </Box>
      </Box>
    </Box >
  )
}

export default Contestants