const UserCard = (props) => {
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
                {props.ele.cabName}
            </div>
            <div className="users__inner__left__display__each__sno">
                {props.ele.userEmail}
            </div>
        </div>
        )
    );
}

export default UserCard;
