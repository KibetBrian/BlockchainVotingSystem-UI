
import React, { useState } from 'react'
import { Box } from '@mui/material'
import Login from './pages/Login'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Contestants from './sections/Contestants'
import WatchList from './sections/WatchList'
import News from './sections/News'
import LeftBar from './sections/LeftBar'
import { useSelector } from 'react-redux'

const App = () => {
  const user = useSelector((state) => state.user.user.payload)

  return (
    <BrowserRouter>

      <Routes>

        <Route path='/'>
          <Route index element={user ? <Home /> : <Navigate to="/auth/login" />} />
          <Route path={"/auth/login"} element={user ? <Navigate to="/" /> : <Login />} />
          <Route path={"news"} element={<News />} />
          <Route path="contestants" element={<Contestants />} />
          <Route path="watchlist" element={<WatchList />} />

        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App