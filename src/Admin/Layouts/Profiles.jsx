import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import ProfileTabs from '../Components/ProfileTabs';
import TopNav from '../Components/TopNav';
const Profiles = () => {
    const [user,setUser] = useState({});
    const navigate = useNavigate();
    const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL
    const token = localStorage.getItem('token');
    useEffect(()=>{
      if(!token){
        navigate('/signin')
      }
  
      if(token){
        fetchData()
      }
    },[])
    const fetchData = async (e) => {
      axios.defaults.headers.common['Authorization'] = 'Bearer '+token
      await axios.post(BASE_URL+'auth/me').then((response)=>{
        if(response.data == {}){
          localStorage.removeItem('token');
          navigate('/signin')
        }else{
          setUser(response.data)
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  return (
    <>
    <div>
        <TopNav username={user.name} />
        <ProfileTabs/>
        <Outlet/>
    </div>
    </>
  )
}

export default Profiles