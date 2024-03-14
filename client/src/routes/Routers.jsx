import React from 'react'
import Bookings from '../pages/Bookings'
import Users from '../pages/Users'
import {Route,Routes} from 'react-router-dom';
import Home from '../pages/Home';
import { useEffect,useState } from 'react';
import Axios from 'axios';
import destinationsId from '../assets/data/destinationsId.json';
const Routers = (props) => {

  
  const [email,setEmail]=useState("")
  const [sourceLocation,setSourceLocation]=useState("")
  const [destLocation,setDestLocation]=useState("")
  const [totalTime,setTotalTime]=useState(null)
  const [cabDisplayLoading,setCabDisplayLoading]=useState(true);
  const [cabData,setCabData]=useState([]);
  const [allUsers,setAllUsers]=useState([])
  const [allUserLoading,setAllUserLoading]=useState(true)
  const [allCabs,setAllCabs]=useState([])
  const [allCabsLoading,setAllCabsLoading]=useState(true)

  function fetchAllUsers()
  {
    setAllUserLoading(true)
    Axios.get('http://localhost:5000/api/user/userData',
    {}
    ).then((res)=>{
      setAllUsers(res.data.data)
      setAllUserLoading(false)
    });
  }

  function fetchCabs()
  {
    setCabDisplayLoading(true)
    Axios.get('http://localhost:5000/api/cab/findCab',
    {}
    ).then((res)=>{
      // console.log
      if(res.data!==null)
      {
        setCabData(res.data)
      }
      setCabDisplayLoading(false);
    });
  }


  function fetchAllCabDetail()
  {
    setAllCabsLoading(true)
    Axios.get('http://localhost:5000/api/allBookings/allCabBookings',
    {}
    ).then((res)=>{
      console.log(res.data)
      if(res.data!==null)
      {
        setAllCabs(res.data)
      }
      setAllCabsLoading(false);
    });
  }

  useEffect(() => {
    fetchCabs();
    fetchAllUsers();
    fetchAllCabDetail()
  }, []);

  function changeSource(value)
  {
    setSourceLocation(value);
  }
  function changeEmail(value)
  {
    setEmail(value);
  }
  function changeDest(value)
  {
    setDestLocation(value);
  }


  function checkFairClicked()
  {var emailCheck=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(emailCheck.test(email)===false)
    {
      alert("Email is incorrect");
      return;
    }
    if(sourceLocation===destLocation)
    {
      alert("Both Locations are same");
      return;
    }
    if(sourceLocation==="" || destLocation==="" || email==="")
    {
      alert("Field is empty");
      return;
    }


    
    setCabDisplayLoading(true)
    Axios.post("http://localhost:5000/api/path/shortestPath",
    {
      source:destinationsId[sourceLocation],
      destination:destinationsId[destLocation]
    }).then((res)=>{
      setTotalTime(res.data)
      setCabDisplayLoading(false);
    });

  }
  function cabBookClicked(ele,price,time)
  {
    if(time===null || email==="" || sourceLocation==="" || destLocation==="")
    {
      alert("check fair first")
      return
    }
    Axios.post("http://localhost:5000/api/user/bookCab",
    {

      source:sourceLocation,
      destination:destLocation,
      userCabData:ele,
      totalTime:time,
      totalPrice:price,
      userEmail:email

    }).then((res)=>{
      console.log(res.data)
      fetchAllUsers();
      fetchAllCabDetail()
    });
  }
  return (
    <Routes>
      <Route path="/users" element={<Users/>}/>
      <Route path="/" element={<Home/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/bookings" element={<Bookings changeDest={changeDest} sourceLocation={sourceLocation} 
          totalTime={totalTime} changeEmail={changeEmail}
          changeSource={changeSource} destLocation={destLocation}
          checkFairClicked={checkFairClicked} cabData={cabData}
          cabDisplayLoading={cabDisplayLoading} cabBookClicked={cabBookClicked}/>}/>
    </Routes>
  )
}

export default Routers
