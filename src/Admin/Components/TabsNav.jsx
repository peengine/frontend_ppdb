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
import { useState } from 'react';

const TabsNav = (props) => {
  const token = localStorage.getItem('token');
  const tabs = localStorage.getItem('tabs');
  const navigate = useNavigate() 
  const gelombang = props.dataSekolah.gelombang
  const[ts,setTs] = useState("")
  
  useEffect(()=>{
    if(!token){
        navigate('/signin')
    }
    if(!tabs){
      localStorage.setItem('tabs',"home")
      setTs("home")
    }
},[props]);
useEffect(()=>{
  if(!tabs){
    localStorage.setItem('tabs',"home")
    setTs("home")
  }
},[])

  const TabSelectHandler = (key)=>{
    setTs(key)
    localStorage.setItem('tabs',key)
  }

if(gelombang != null){
  return (
    <>
          <Tabs defaultActiveKey={ts} activeKey={tabs} onSelect={(key) => TabSelectHandler(key)} transition={true} id="noanim-tab-example" className='bg-primary' >
            <Tab eventKey="home" title={( <small><AiFillDashboard/> Dashboard </small> )}>
              <br />
              <Home dataSekolah={props.dataSekolah} dataPendaftar={props.dataPendaftar}/>
            </Tab>
            <Tab eventKey="pendaftar"  title={( <small><FaUser/> Data Diri </small> )}>
              <br />
              <Pendaftar dataPendaftar={props.dataPendaftar}/>
            </Tab>
            {
              props.dataPendaftar.pendaftar != null ? (
                
                  <Tab eventKey="berkas"  title={( <small><FaPaste/> Berkas </small> )}>
                  <br />
                  <BerkasPendaftar dataPendaftar={props.dataPendaftar} dataSekolah={props.dataSekolah} />
                </Tab>  
               
              ) : (null)
            }
            {
              props.dataPendaftar.pendaftar != null && props.dataPendaftar.data_berkas.length > 0 ? (
                <Tab eventKey="administrasi"  title={( <small><FaCashRegister/> Administrasi </small> )}>
                  <br />
                  <Pembayaran dataPendaftar={props.dataPendaftar} dataSekolah={props.dataSekolah} />
                </Tab>
              ) : (null)
            }
              
           
          </Tabs>
    </>
  )
}else{
  return (
    <>
          <Tabs defaultActiveKey={"home"} transition={true} id="noanim-tab-example" className='bg-primary' >
            <Tab eventKey="home" title={( <small><AiFillDashboard/> Dashboard </small> )}>
              <br />
              <Home dataSekolah={props.dataSekolah} dataPendaftar={props.dataPendaftar}/>
            </Tab>
          </Tabs>
    </>
  )
}
  
}

export default TabsNav