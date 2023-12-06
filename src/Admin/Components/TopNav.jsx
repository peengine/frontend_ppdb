import React from 'react'
import { Container, Navbar,Nav,NavDropdown, Tabs, Tab } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { FaUserCircle } from "react-icons/fa";
import axios from 'axios';

const TopNav = (props) => {
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL
  const token = localStorage.getItem('token');
  const logoutHandler = async (e) => {
    axios.defaults.headers.common['Authorization'] = 'Bearer '+token
      await axios.post(BASE_URL+'auth/logout').then((response)=>{
        localStorage.removeItem('token')
        navigate('/signin')
      }).catch((error) => {
        console.log(error)
      })
  }
  return (
    <>
      <div className="bg-primary" >
      <Navbar expand="lg" sticky='top'>
        <Container>
          <Navbar.Brand href="/dashboard">
            {/* Logo And Brand here */}
            <Link to='/dashboard' className=' text-white text-decoration-none'>
                <h4> <span className="badge bg-white text-primary p-2">PPDB</span><b> SMK LOREM</b></h4>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
                <NavDropdown title={props.username} >
                  <NavDropdown.Item href="/profile"> <FaUserCircle/> Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={()=> logoutHandler() }>Signout</NavDropdown.Item>
                </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
     
      </div>
       
    </>
  )
}

export default TopNav