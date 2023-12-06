import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import { AiFillDashboard } from 'react-icons/ai'
import Profile from '../pages/Profile'

const ProfileTabs = () => {
  return (
    <>
        <Tabs defaultActiveKey="profile" transition={true} id="noanim-tab-example" className='bg-primary' >
          <Tab eventKey="profile" title={( <small><AiFillDashboard/> Profile </small> )}>
            <br />
            <Profile/>
          </Tab>
        </Tabs>
    </>
  )
}

export default ProfileTabs