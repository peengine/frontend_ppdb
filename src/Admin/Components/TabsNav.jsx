import React from 'react'
import { AiFillDashboard } from "react-icons/ai";
import { FaUser,FaPaste, FaCashRegister } from "react-icons/fa";
import { Tab, Tabs } from 'react-bootstrap'
import BerkasPendaftar from '../pages/BerkasPendaftar'
import Home from '../pages/Home'
import Pembayaran from '../pages/Pembayaran'
import Pendaftar from '../pages/Pendaftar'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

const TabsNav = () => {

  const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL
  const URLS = process.env.REACT_APP_BASE_URL
  const token = localStorage.getItem('token');
  const navigate = useNavigate()


  const[gelombang,setGelombang] = useState({})
  const[pendaftar,setPendaftar] = useState({})
  const[jurusan,setJurusan] = useState({})
  const[type_berkas,setTypeBerkas] = useState({})
  const[validation,setValidation] = useState()
  const[catchError,setCatchError] = useState()
  useEffect(()=>{
    if(!token){
        navigate('/signin')
    }
    if(token){
        fetch()
    }
},[]);

  const fetch = async (e) => {
          
    try{
        //fetch Gelombang
        await axios.get(BASE_URL+'gelombang').then((response)=>{
            setGelombang(response.data)
        }).catch((error)=>{
            setValidation(error)
        })
        //Fetch Pendaftar
        axios.defaults.headers.common['Authorization'] = 'Bearer '+token
        await axios.post(BASE_URL+'auth/pendaftar').then((response)=>{
            if(response.data.data != null){
              setPendaftar(response.data.data)
            }
        }).catch((error) =>{
            setValidation(error)
        })
        //Jurusan
        await axios.get(BASE_URL+'jurusan').then((response)=>{
            setJurusan(response.data)
        }).catch((error)=>{
          setValidation(error)
        })
        //Fetch Type Berkas
        await axios.get(BASE_URL+'type_berkas').then((response)=>{
            setTypeBerkas(response.data)
        }).catch((error)=>{
            setValidation(error)
        })
        //Fetch Me
        axios.defaults.headers.common['Authorization'] = 'Bearer '+token
        await axios.post(BASE_URL+'auth/me').then((response)=>{
          if(response.data.name == null){
            localStorage.removeItem('token');
            navigate('/signin')
          }
        }).catch((error) => {
          setValidation(error)
        })
    }catch(err){
        setCatchError(err)
    }
  }

  return (
   <>
        <Tabs defaultActiveKey="home" transition={true} id="noanim-tab-example" className='bg-primary' >
          <Tab eventKey="home" title={( <small><AiFillDashboard/> Dashboard </small> )}>
            <br />
            <Home dataGelombang={gelombang} />
          </Tab>
          <Tab eventKey="pendaftar"  title={( <small><FaUser/> Data Pendaftaran </small> )}>
            <br />
            <Pendaftar dataPendaftar={pendaftar}/>
          </Tab>
            <Tab eventKey="berkas"  title={( <small><FaPaste/> Berkas </small> )}>
              <br />
              <BerkasPendaftar dataPendaftar={pendaftar} dataJurusan={jurusan} dataTypeBerkas={type_berkas} />
            </Tab>
          <Tab eventKey="administrasi"  title={( <small><FaCashRegister/> Administrasi </small> )}>
            <br />
            <Pembayaran dataPendaftar={pendaftar} />
          </Tab>
        </Tabs>
   </>
  )
}

export default TabsNav