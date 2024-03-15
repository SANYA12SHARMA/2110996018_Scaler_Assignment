import logo from '../assets/images/logo2.jpg';
import UserCard from '../components/Users/UserCard';
const Cabs = (props) => {
  return (
        <div className="cabContent">
            <div style={{height:'30rem'}}>
                <img src={logo} style={{width:"100%",height:"100%"}} alt="cab"/>
            </div>
            <div className="cabContent1">
                <div className="cabContentTop">
                    <p>Cab Name</p>
                    <p>Booked By</p>
                </div>
                <div className="cabContentBottom">
                    {
                        props.allCabsLoading ? (
                            <>Loading</>
                        ) : (
                            props.allCabs.map((ele) => (
                                <UserCard flag={props.flag} ele={ele} />
                            ))
                        )
                    }
                </div>
            </div>
            </div>
  );
}

export default Cabs;
