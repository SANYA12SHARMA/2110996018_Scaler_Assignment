const BookingCard = (props) => {
    return (
        <div className="bookingCabContainer">
                <img src={require('../../assets/images/' + props.ele.cabImage)} style={{ width: "50px", height: "60px" }} alt="cab"/>
            <div className="bookingCabContent">
                <div className="bookingCabContent_1">
                    <div>
                        <p style={{fontWeight:'bold'}}>{props.ele.cabName}</p>
                        <p>{props.totalTime ? (
                                <>
                                    {props.totalTime} min
                                </>
                            ) : (
                                <>
                                    -
                                </>
                            )}
                        </p>
                    </div>
                    <p>{props.totalTime * props.ele.cabPrice}/-</p>
                    <p>{props.ele.cabPrice}/min</p>
                </div>
                <div className="bookingCabBookBtn" onClick={() => { 
                     console.log("Button clicked"); 
                     console.log("Props Data: ",props.ele);
                    props.cabBookClicked(props.ele, props.totalTime * props.ele.cabPrice, props.totalTime) }}>
                    Book 
                </div>
            </div>
        </div>
    );
}

export default BookingCard;
