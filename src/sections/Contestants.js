import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import SearchBar from '../components/SearchBar'
import TopBarContestants from '../components/TopBarContestants'
import UserCard from '../components/UserCard'
import LeftBar from './LeftBar'
import { useState } from 'react'
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

  const [pageData, setPageData] = useState([]);

  const url = "https://jsonplaceholder.typicode.com/photos"

  useEffect(() => {
    if (currentPage === 'President') {
      const FetchData = async () => {
        try {
          const res = await fetch(url)
          const data = await res.json()
          setPageData(data.slice(0,10))
        } catch (e) {
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
        <Box sx={{ height: '90vh', justifyContent: 'space-around', overflowY: 'scroll', display: 'flex', flexFlow: 'row wrap' }}>
          { pageData.map(data=>( <UserCard />))}
        </Box>
      </Box>
    </Box >
  )
}

export default Contestants