import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Link as LinkScroll } from 'react-scroll';

const Navbars = (props) => {
  const token = localStorage.getItem('token');
  const[bgnav,setBgnav] = useState("bg-transparent");

  const setBackgroundNav = () =>{
    let winheight = window.scrollY;
    winheight > 100 ? setBgnav("bg-white") : setBgnav("bg-transparent");
    console.log(bgnav)
  }
  useEffect(()=>{
    window.addEventListener("scroll",setBackgroundNav)
    return () => {
      window.removeEventListener('scroll', setBackgroundNav);
    };
  },[])

  return (
    <>
      <Navbar expand="lg" sticky='top' className={`${bgnav}`}>
        <Container>
          <Navbar.Brand href="#home">
            {/* Logo And Brand here */}
            <LinkScroll to='home' smooth={true} duration={500}>
                <h4> <span className="badge bg-primary p-2">PPDB</span><b> {props.sekolahName}</b></h4>
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
              <LinkScroll to='biaya_dan_jadwal' smooth={true} duration={500}>
                <Nav.Link href="#biaya_dan_jadwal" >Jadwal</Nav.Link>
              </LinkScroll>
              <LinkScroll to='biaya_dan_jadwal' smooth={true} duration={500}>
                <Nav.Link href="#biaya_dan_jadwal" >Biaya</Nav.Link>
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