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

const TabsNav = (props) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate()


  useEffect(()=>{
    if(!token){
        navigate('/signin')
    }
},[]);

  return (
    <>
          <Tabs defaultActiveKey={"home"} transition={true} id="noanim-tab-example" className='bg-primary' >
            <Tab eventKey="home" title={( <small><AiFillDashboard/> Dashboard </small> )}>
              <br />
              <Home dataSekolah={props.dataSekolah}/>
            </Tab>
            <Tab eventKey="pendaftar"  title={( <small><FaUser/> Data Diri </small> )}>
              <br />
              <Pendaftar dataPendaftar={props.dataPendaftar}/>
            </Tab>
              <Tab eventKey="berkas"  title={( <small><FaPaste/> Berkas </small> )}>
                <br />
                <BerkasPendaftar dataPendaftar={props.dataPendaftar} dataSekolah={props.dataSekolah} />
              </Tab>
            <Tab eventKey="administrasi"  title={( <small><FaCashRegister/> Administrasi </small> )}>
              <br />
              <Pembayaran dataPendaftar={props.dataPendaftar} dataSekolah={props.dataSekolah} />
            </Tab>
          </Tabs>
    </>
  )
}

export default TabsNav