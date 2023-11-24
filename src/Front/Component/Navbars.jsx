import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Link as LinkScroll } from 'react-scroll';

const Navbars = () => {


  const token = localStorage.getItem('token');

  return (
    <>
      <Navbar expand="lg" className="bg-transparent">
      <Container>
        <Navbar.Brand href="#home">
          {/* Logo And Brand here */}
          <LinkScroll to='home' smooth={true} duration={500}>
              <h4> <span className="badge bg-primary p-2">PPDB</span> SMK LOREM</h4>
          </LinkScroll>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkScroll to='home' smooth={true} duration={500}>
              <Nav.Link href="#home" >Home</Nav.Link>
            </LinkScroll>
            <LinkScroll to='alur' smooth={true} duration={500}>
              <Nav.Link href="#alur" >Alur Pendaftaran</Nav.Link>
            </LinkScroll>
            <LinkScroll to='jadwal' smooth={true} duration={500}>
              <Nav.Link href="#jadwal" >Jadwal</Nav.Link>
            </LinkScroll>
            <LinkScroll to='biaya' smooth={true} duration={500}>
              <Nav.Link href="#biaya" >Biaya</Nav.Link>
            </LinkScroll>
            { !token && (
              <Link to={'/signin'} className='text-decoration-none'>
                <Nav.Link href="#link" >Sign in</Nav.Link>
              </Link>
            )}
            { token && (
              <Link to={'/dashboard'} className=' text-decoration-none'>
                <Nav.Link href="#link" >Dashboard</Nav.Link>
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

export default Navbars