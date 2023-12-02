import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import BerkasPendaftar from '../pages/BerkasPendaftar'
import Home from '../pages/Home'
import Pembayaran from '../pages/Pembayaran'
import Pendaftar from '../pages/Pendaftar'

const TabsNav = () => {
  return (
   <>
    <Tabs defaultActiveKey="home" transition={true} id="noanim-tab-example" className='bg-primary' >
          <Tab eventKey="home" title="Dashboard">
            <br />
            <Home/>
          </Tab>
          <Tab eventKey="pendaftar" title="Data Pendaftaran">
            <br />
            <Pendaftar/>
          </Tab>
          <Tab eventKey="berkas" title="Kelengkapan">
            <br />
            <BerkasPendaftar/>
          </Tab>
          <Tab eventKey="pembayaran" title="Pembayaran">
            <br />
            <Pembayaran/>
          </Tab>
        </Tabs>
   </>
  )
}

export default TabsNav