import React from 'react'
import Bookings from '../pages/Bookings'
import Users from '../pages/Users'
import {Route,Routes} from 'react-router-dom';
import Home from '../pages/Home';
const Routers = () => {
  return (
    <Routes>
      <Route path="/users" element={<Users/>}/>
      <Route path="/" element={<Home/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/bookings" element={<Bookings/>}/>
    </Routes>
  )
}

export default Routers
