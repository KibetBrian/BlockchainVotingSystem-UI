
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
import VoterRegistration from './sections/VoterRegistration'
import ContestantRegistration from './sections/ContestantRegistration'
import SystemInformation from './sections/SystemInformation'
import SignUp from './pages/SignUp'

const App = () => {
  const user = useSelector(state => state.user);


  return (
    <BrowserRouter>

      <Routes>

        <Route path='/'>
          <Route index element={user.data ? <Home /> : <Navigate to="/auth/login" />} />
          <Route path={"/auth/"}>
            <Route path={"/auth/login"} element={user.data ? <Navigate to="/" /> : <Login />} />
            <Route path={"/auth/signup"} element={user.data ? <Navigate to="/" /> : <SignUp />} />
          </Route>
          <Route path={"news"} element={<News />} />
          <Route path={"/voter/registration"} element={<VoterRegistration />} />
          <Route path="contestants" element={<Contestants />} />
          <Route path={"/contestant/registration"} element={<ContestantRegistration />} />
          <Route path={"/information"} element={<SystemInformation />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App