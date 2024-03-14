
import back4 from '../assets/images/back4.jpg';
import UserCard from '../components/Users/UserCard';

const Cabs = (props) => {
  return (
    <>
    <div className="cabs__outer">
        <div className="cabs__inner">
            <div className="cabs__inner__right">
                <div className="cabs__inner__left__heading">
                    All Cabs
                </div>
                <div style={{border:"none"}} className="cabs__inner__left__display__each">
                    <div className="cabs__inner__left__display__each__sno">
                        SNo.
                    </div>
                    <div className="cabs__inner__left__display__each__sno">
                        Cab Name
                    </div>
                    <div className="cabs__inner__left__display__each__sno">
                        Email
                    </div>
                </div>
                <div className="cabs__inner__left__display">
                    {
                        props.allCabsLoading ? (
                            <>Loading</>
                        ) : (
                            props.allCabs.map((ele) => (
                                <UserCard flag={props.flag} ele={ele} key={ele.id} />
                            ))
                        )
                    }
                </div>
            </div>
            <div className="cabs__inner__left">
                <img src={back4} style={{width:"100%",height:"100%"}}/>
            </div>
        </div>
    </div>
    </>
  );
}

export default Cabs;
