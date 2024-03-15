import UserCard from '../components/Users/UserCard';
import logo from '../assets/images/bike.jpg';
const Users = (props) => {
  return (
         <div className="userContainer">
             <div style={{height:'30rem'}}>
                 <img src={logo} style={{width:"100%",height:"100%"}} alt="users"/>
             </div>
             <div className="userContent">
                 <div className="userContent1">
                     <div style={{border:"none"}} className="userTop">
                         <div className="userTop1">User Email</div>
                         <div className="userTop1">Bookings</div>
                     </div>
                     {
                        props.allUserLoading?(
                            <>Loading</>
                        ):(
                            props.allUsers.map((ele)=>{
                                return(
                                    <>
                                    <UserCard key={ele._id} flag={props.flag} ele={ele}/>
                                    </>
                                )
                            })
                        )
                        
                    }
                 </div>
             </div>
         </div>
         );
}

export default Users;
