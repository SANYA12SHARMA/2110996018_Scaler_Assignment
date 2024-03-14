
import * as React from 'react';
import BookingForm from '../assets/data/bookingForm.json';
import Places from '../assets/data/destinations.json';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import BookingCard from '../components/Bookings/BookingCard';

const Booking = (props) => {
    return (
        <div className="booking__outer">
            <div className="booking__inner">
                <div className="booking__inner__left">
                    <div className="booking__inner__left__heading">
                        {BookingForm.heading}
                    </div>
                    <div className="booking__each">
                        <div className="booking__each__heading">
                            {BookingForm.email.label}
                        </div>
                        <div className="booking__each__field">
                            <input type={BookingForm.email.type} placeholder={BookingForm.email.placeholder}
                                className="booking__inputfield" onChange={(e) => { props.changeEmail(e.target.value) }} />
                        </div>
                    </div>
                    <div className="booking__each">
                        <div className="booking__each__heading">
                            {BookingForm.source.label}
                        </div>
                        <div className="booking__each__field">
                            <Autocomplete
                                disablePortal
                                defaultValue={null}
                                sx={{ borderRadius: "5px", border: "2px solid black", outline: "none" }}
                                id="combo-box-demo"
                                placeholder={BookingForm.source.placeholder}
                                options={Places}
                                value={props.sourceLocation}
                                onChange={(event, newVal) => {
    const newLabel = newVal ? newVal.label : null;
    if (newLabel !== null) {
        props.changeSource(newLabel);
    } else {
        props.changeSource("");
    }
}}

                                renderInput={(params) => <TextField {...params} label="" />}
                            />
                        </div>
                    </div>
                    <div className="booking__each">
                        <div className="booking__each__heading">
                            {BookingForm.dest.label}
                        </div>
                        <div className="booking__each__field">
                            <Autocomplete
                                disablePortal
                                defaultValue={null}
                                sx={{ borderRadius: "5px", border: "2px solid black", outline: "none" }}
                                id="combo-box-demo"
                                placeholder={BookingForm.dest.placeholder}
                                options={Places}
                                value={props.destLocation}
                                onChange={(event, newVal) => {
    const newLabel = newVal ? newVal.label : null;
    if (newLabel !== null) {
        props.changeDest(newLabel);
    } else {
        props.changeDest("");
    }
}}

                                renderInput={(params) => <TextField {...params} label="" />}
                            />
                        </div>
                    </div>
                    <div className="booking__left__button">
                        <div className="booking__left__button__each" onClick={() => { props.checkFairClicked() }}>
                            Check Fair<span className='nav__icon'>▶</span>
                        </div>
                    </div>
                </div>
                <div className="booking__inner__right">
                    <div className="booking__inner__right__heading">
                        <span style={{ textDecoration: "underline" }}>Pick Up:</span> {props.sourceLocation ? (props.sourceLocation) : ("Select Pick-Up")} <span className='nav__icon'>▶</span>
                       <span style={{ textDecoration: "underline" }}>Drop:</span> {props.destLocation ? (props.destLocation) : ("Select Drop")} 
                    </div>
                    <div className="booking__inner__right__time">
                        <span style={{ textDecoration: "underline" }}>Minimum Time:</span> {'\u00A0'} {props.totalTime ? (<>{props.totalTime} min</>) : ("Check Fair!")} 

                    </div>
                    <div className="booking__inner__right__display">
                        {
                            props.cabDisplayLoading ? (
                                <>
                                    loading
                                </>
                            ) : (
                                props.cabData.map((ele) => {
                                    return (
                                        <BookingCard ele={ele} totalTime={props.totalTime} cabBookClicked={props.cabBookClicked} />
                                    )
                                })
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Booking;
