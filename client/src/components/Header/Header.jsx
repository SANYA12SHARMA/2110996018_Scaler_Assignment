import React from 'react'
import logo from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';
const Header = () => {
  return (
      <header>
          <div className="logo">
              <img src={logo} alt="Cab Logo"  />
          </div>
          <h1 style={{textDecoration:'underline'}}>Book Your Cab</h1>
          <nav>
              <ul>
                  <li>
                      <Link to='/'>Home</Link>
                  </li>
                  <li>
                      <Link to='/users'>Users</Link>
                  </li>
                  <li>
                      <Link to='/cabs'>Cab Bookings</Link>
                  </li>
              </ul>
          </nav>
      </header>
  )
}

export default Header
