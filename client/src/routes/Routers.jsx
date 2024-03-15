import React from 'react'
import Bookings from '../pages/Bookings'
import Users from '../pages/Users'
import {Route,Routes} from 'react-router-dom';
import Home from '../pages/Home';
import { useEffect,useState } from 'react';
import Axios from 'axios';
import destinationsId from '../assets/data/destinationsId.json';
import Cabs from '../pages/Cabs';


const Routers = () => {
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
    Axios.get('https://cab-backend-rouge.vercel.app/api/getUserData/userData',
    {}
    ).then((res)=>{
      setAllUsers(res.data.data);
      setAllUserLoading(false);
    });
  }
  function fetchCabs()
  {
    setCabDisplayLoading(true)
    Axios.get('https://cab-backend-rouge.vercel.app/api/cab/findCab',
    {}
    ).then((res)=>{
      if(res.data!==null)
      {
        setCabData(res.data);
      }
      setCabDisplayLoading(false);
    });
  }
  function fetchAllCabDetail()
  {
    setAllCabsLoading(true)
    Axios.get('https://cab-backend-rouge.vercel.app/api/allBookings/allCabBookings',
    {}
    ).then((res)=>{
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
  {
    var emailCheck=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
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
    setCabDisplayLoading(true);
    Axios.post('https://cab-backend-rouge.vercel.app/api/path/shortestPath',
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
      alert("Check Pricing.");
      return;
    }
    Axios.post('https://cab-backend-rouge.vercel.app/api/user/bookCab',
    {
      userEmail:email,
      userCabData:ele,
      totalTime:time,
      totalPrice:price,
      source:sourceLocation,
      destination:destLocation,

    }).then((res)=>{
      if(res.data.data===false)
      {
        alert(res.data.message);
        return
      }
      console.log(res.data)
      alert("Cab Booked Successfully");
      fetchAllUsers();
      fetchAllCabDetail();
    });
  }
  return (
    <Routes>
     
      <Route path="/" element={<Home/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/bookings" element={<Bookings changeDest={changeDest} sourceLocation={sourceLocation} 
          totalTime={totalTime} changeEmail={changeEmail}
          changeSource={changeSource} destLocation={destLocation}
          checkFairClicked={checkFairClicked} cabData={cabData}
          cabDisplayLoading={cabDisplayLoading} cabBookClicked={cabBookClicked}/>}/>
          <Route path="/cabs" element={<Cabs flag={0}
        allCabs={allCabs} allCabsLoading={allCabsLoading}/>}/>
         <Route path="/users" element={<Users flag={1} allUsers={allUsers} allUserLoading={allUserLoading}/>}/>
    </Routes>
  )
}
export default Routers
