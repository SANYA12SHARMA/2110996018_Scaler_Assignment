import React from 'react'
import { destinations } from '../assets/data/destinations';
import { useState } from 'react';
const Bookings = () => {
    const [source,setSource]=useState("Chandigarh");
    const [destination,setDestination]=useState("Delhi");
  return (
    <div className='container'>
    <div className='booking_container'>
        <div className='booking_form'>
            <div className='booking_heading'>
            Book Now..
            </div>
            <div className='booking_field'>
            <div className='booking_field_heading'>
                Email
            </div>
                <input type="email" placeholder='abc@gmail.com' className='booking_input'></input>
            </div>
            <div className='booking_field'>
            <div className='booking_field_heading'>
                PickUp Point
            </div>
                <input type="text" placeholder='Chandigarh' className='booking_input'></input>
            </div>
            <div className='booking_field'>
            <div className='booking_field_heading'>
            Drop Point
            </div>
                <input type="text" placeholder='Delhi' className='booking_input'></input>

            </div>
            <div className="booking_button">
                    <div className="booking_button_each">
                        Check Fair
                    </div>
                </div>
        </div>
    </div>
    </div>
  )
}

export default Bookings
