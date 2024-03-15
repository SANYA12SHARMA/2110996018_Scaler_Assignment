
const UserCard = (props) => {
    // Check if props.ele.userCabData is defined before accessing its length property
    const cabDataLength = props.ele.userCabData ? props.ele.userCabData.length : 0;
    return (
        
        props.flag===1?(
        <div className="users__inner__left__display__each">
            <div className="users__inner__left__display__each__sno">
                {props.ele.userEmail}
            </div>
            <div className="users__inner__left__display__each__sno">
                {cabDataLength}
            </div>
        </div>):(
            <div className="users__inner__left__display__each">
            <div className="users__inner__left__display__each__sno">
                    {props.ele._id.slice(0,5)}
                </div>
            <div className="users__inner__left__display__each__sno">
                {props.ele.userEmail}
            </div>
            <div className="users__inner__left__display__each__sno">
                {cabDataLength}
            </div>
        </div>
        )
    );
}

export default UserCard;
