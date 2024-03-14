import React from 'react';
import logo1 from '../assets/images/logo1.jpg';
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <>
        <section>
        <div className='container'>
        <h2 className='heading'>
            The Ride that's always smooth
        </h2>
        <div className='home_logo'>
        <img src={logo1} alt=""/>
        <Link to='/'><button className='btn'> Get Started</button></Link>
        <Link to='/bookings'><button className='btn'>Book Now</button></Link>
        </div>
        </div>
        </section>
    </>
        
  )
}

export default Home
