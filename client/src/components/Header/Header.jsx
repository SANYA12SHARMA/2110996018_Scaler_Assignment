import React from 'react'
import logo from '../../assets/images/logo.png';
const Header = () => {
  return (
    <header>
    <div className="logo">
        <img src={logo} alt="Cab Logo" />
    </div>
    <nav>
      <ul>
        <li>
          Users
        </li>
        <li>
          Cab Bookings
        </li>
      </ul>
    </nav>
  </header>
  )
}

export default Header
