import React from 'react'
import Header from '../components/Header/Header'
import Routers from '../routes/Routers'
import { BrowserRouter } from 'react-router-dom'
const Layout = () => {
  return (
    <>
        <BrowserRouter>
        <Header />
        <Routers />
        </BrowserRouter>
    </>
  )
}
export default Layout