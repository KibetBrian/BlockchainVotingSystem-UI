
import React, { useState } from 'react'
import { Box } from '@mui/material'
import Login from './pages/Login'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Charts from './sections/Charts'
import WatchList from './sections/WatchList'
import News from './sections/News'
import LeftBar from './sections/LeftBar'

const App = () => {

  // const [user, setUser] = useState({
  //   name: "Kibet Brian",
  //   age: "23",
  //   description: "Coffee && algorithms"
  // })

  const [user, setUser] = useState(false);

  return (
    <BrowserRouter>

      <Routes>

        <Route path='/'>
          <Route index element={user ? <Home />: <Navigate to="/auth/login" />}/>
          <Route path={"/auth/login"} element={user ? <Navigate to="/" /> : <Login />} />
          <Route path={"news"} element={<News />} />
          <Route path="charts" element={<Charts />} />
          <Route path="watchlist" element={<WatchList />} />

        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App