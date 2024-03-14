

const BookingCard = (props) => {
    return (
        <div className="booking__cab__card">
            <div className="booking__cab__card__img">
                <img src={require('../../assets/images/' + props.ele.cabImage)} style={{ width: "100%", height: "100%" }} />
            </div>
            <div className="booking__cab__card__content">
                <div className="booking__cab__card__content__top">
                    <div className="booking__cab__card__content__left">
                        <div className="booking__cab__card__content__left__heading">
                            {props.ele.cabName}
                        </div>
                        <div className="booking__cab__card__content__left__heading__small">
                            {props.totalTime ? (
                                <>
                                    {props.totalTime} min
                                </>
                            ) : (
                                <>
                                    -
                                </>
                            )}
                        </div>
                    </div>
                    <div className="booking__cab__card__content__right">
                        <div className="booking__cab__card__content__left__heading">
                            {props.totalTime * props.ele.cabPrice}/-
                        </div>
                        <div className="booking__cab__card__content__left__heading__small">
                            {props.ele.cabPrice}/min
                        </div>
                    </div>
                </div>
                <div className="booking__cab__card__content__bottom" onClick={() => { props.cabBookClicked(props.ele, props.totalTime * props.ele.cabPrice, props.totalTime) }}>
                    Book ▶
                </div>
            </div>
        </div>
    );
}

export default BookingCard;
