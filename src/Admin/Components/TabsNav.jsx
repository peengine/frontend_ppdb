import React from 'react'
import { AiFillDashboard } from "react-icons/ai";
import { FaUser,FaPaste, FaCashRegister } from "react-icons/fa";
import { Tab, Tabs } from 'react-bootstrap'
import BerkasPendaftar from '../pages/BerkasPendaftar'
import Home from '../pages/Home'
import Pembayaran from '../pages/Pembayaran'
import Pendaftar from '../pages/Pendaftar'

const TabsNav = () => {
  return (
   <>
        <Tabs defaultActiveKey="home" transition={true} id="noanim-tab-example" className='bg-primary' >
          <Tab eventKey="home" title={( <small><AiFillDashboard/> Dashboard </small> )}>
            <br />
            <Home/>
          </Tab>
          <Tab eventKey="pendaftar" title={( <small><FaUser/> Data Pendaftaran </small> )}>
            <br />
            <Pendaftar/>
          </Tab>
          <Tab eventKey="berkas" title={( <small><FaPaste/> Berkas </small> )}>
            <br />
            <BerkasPendaftar/>
          </Tab>
          <Tab eventKey="administrasi" title={( <small><FaCashRegister/> Administrasi </small> )}>
            <br />
            <Pembayaran/>
          </Tab>
        </Tabs>
   </>
  )
}

export default TabsNav