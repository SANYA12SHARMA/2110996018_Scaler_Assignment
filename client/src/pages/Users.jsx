import UserCard from '../components/Users/UserCard';
import logo from '../assets/images/bike.jpg';
const Users = (props) => {
  return (
    <>
    <div className="users__outer">
        <div className="users__inner">
            <div className="users__inner__left">
                <img src={logo} style={{width:"100%",height:"100%"}}/>
            </div>
            <div className="users__inner__right">
                <div className="users__inner__left__heading">
                    All Users
                </div>
                <div className="users__inner__left__display">
                        
                    <div style={{border:"none"}} className="users__inner__left__display__each">
                        <div className="users__inner__left__display__each__sno">
                            SNo.
                        </div>
                        <div className="users__inner__left__display__each__sno">
                            User Email
                        </div>
                        <div className="users__inner__left__display__each__sno">
                            Bookings
                        </div>
                    </div>
                    {
    Array.isArray(props.allUsers) && props.allUsers.length > 0 ? (
        props.allUsers.map((ele) => (
            <UserCard ele={ele} key={ele.id} />
        ))
    ) : (
        <p></p>
    )
}
                </div>
            </div>
        </div>
    </div>
    </>
  );
}

export default Users;
