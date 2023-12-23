import React from 'react'
import { Container, Navbar,Nav,NavDropdown, Tabs, Tab } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { FaUserCircle } from "react-icons/fa";
import axios from 'axios';
import Swal from 'sweetalert2';

const TopNav = (props) => {
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL
  const token = localStorage.getItem('token');
  const logoutHandler = async (e) => {

      Swal.fire({
        title: 'Are You sure want to Logout ?',
        showCancelButton: true,
        confirmButtonText: 'Yes, Logout',
        denyButtonText: `Cancel`,
      }).then( async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          axios.defaults.headers.common['Authorization'] = 'Bearer '+token
          await axios.post(BASE_URL+'auth/logout').then((response)=>{
            localStorage.removeItem('token')
            localStorage.removeItem('tabs')
            navigate('/signin')
          }).catch((error) => {
            console.log(error)
          }) 
        }
      })
  }
  return (
    <>
      <div className="bg-primary" >
      <Navbar expand="lg" sticky='top'>
        <Container>
          <Navbar.Brand href="/dashboard">
                <h4 className="text-white"> <span className="badge bg-white text-primary p-2">PPDB</span><b> {props.dataSekolah.nama_sekolah}</b></h4>
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