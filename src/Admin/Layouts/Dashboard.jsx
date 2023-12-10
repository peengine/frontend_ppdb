import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import TabsNav from '../Components/TabsNav';
import TopNav from '../Components/TopNav';

const Dashboard = () => {
  const [user,setUser] = useState({});
  const [sekolah,setSekolah] = useState({});
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL
  const token = localStorage.getItem('token');
  useEffect(()=>{
    if(!token){
      navigate('/signin')
    }

    if(token){
      fetchData()
      fetchSekolah();
    }
  },[])
  const fetchData = async (e) => {
    axios.defaults.headers.common['Authorization'] = 'Bearer '+token
    await axios.post(BASE_URL+'auth/me').then((response)=>{
      if(response.data.name  == null ){
        localStorage.removeItem('token');
        navigate('/signin')
      }else{
        setUser(response.data)
      }
      
    }).catch((error) => {
      console.log(error)
    })
  }
  const fetchSekolah = async (e) => {
    await axios.get(BASE_URL+'sekolah').then((response)=>{
      if(response.data.data.nama_sekolah != null){
        setSekolah(response.data.data);
      }
    }).catch((err) =>{
      console.log(err)
    })
  }


  return (
    <div>
        <TopNav dataSekolah={sekolah} username={user.name} />
        <TabsNav/>
        <Outlet/>
    </div>
    
  )
}

export default Dashboard