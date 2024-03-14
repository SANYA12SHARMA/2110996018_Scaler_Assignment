
const UserCard = (props) => {
    return (
        props.flag===1?(
        <div className="users__inner__left__display__each">
            <div className="users__inner__left__display__each__sno">
                {props.ele.userEmail}
            </div>
            <div className="users__inner__left__display__each__sno">
                {props.ele.userCabData.length}
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
                {props.ele.userCabData.length}
            </div>
        </div>
        )
    );
}

export default UserCard;
