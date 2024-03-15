import destinations from '../assets/data/destinations.json';
import BookingCard from '../components/Bookings/BookingCard';

const Booking = (props) => {
    return (
            <div className="bookingContainer">
                <div className="bookingDetails">
                    <div style={{marginBottom: '2rem'}}>
                        <p style={{marginBottom: '10px'}}>Email</p>
                        <input type="email" placeholder="abc@gmail.com" style={{ width:"300px", height:"50px",border: "2px solid black", outline: "none" }} onChange={(e) => { props.changeEmail(e.target.value) }} />
                    </div>
                    <div style={{marginBottom: '2rem'}}>
                        <p style={{marginBottom: '10px'}}>Pick up Point</p>
                        <select value={props.sourceLocation} onChange={(event) => {props.changeSource(event.target.value);}} style={{ width:"300px", height:"50px",border: "2px solid black", outline: "none" }}>
                            <option value="" disabled>Select source</option>
                            {destinations.map((place, index) => (
                                <option key={index} value={place.label}>{place.label}</option>))}
                        </select>
                    </div>
                    <div style={{marginBottom: '2rem'}}>
                        <p style={{marginBottom: '10px'}}>Drop Point</p>
                        <select value={props.destLocation} onChange={(event) => {props.changeDest(event.target.value);}} style={{ width:"300px", height:"50px",border: "2px solid black", outline: "none" }}>
                            <option value="" disabled>Select Destination</option>
                            {destinations.map((place, index) => (
                                <option key={index} value={place.label}>{place.label}</option>))}
                        </select>
                    </div>
                    <div className="costBtn" onClick={() => { props.checkFairClicked() }}>Check Cost</div>
             
                </div>
                <div className="cabContainer">
                    <div className="cabHeading">
                        <span style={{ textDecoration: "underline" }}>Pick Up Point:</span> {props.sourceLocation ? (props.sourceLocation) : ("Select Pick-Up")} 
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span style={{ textDecoration: "underline" }}>Drop Point:</span> {props.destLocation ? (props.destLocation) : ("Select Drop")} 
                    </div>
                    <div className="cabsDisplay">
                    {
                        props.cabDisplayLoading ? (
                                <>
                                    fetching Data
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
                    <div style={{ marginTop: "20px" }}>
                        <span >Minimum Time to reach from {props.sourceLocation} to {props.destLocation} = </span> {'\u00A0'} {props.totalTime ? (<>{props.totalTime} minutes.</>) : ("Source Destination not mentioned.")} 
                    </div>
                </div>
            </div>
    );
}

export default Booking;
