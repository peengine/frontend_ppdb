import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ConstantNav = (props) => {
  const token = localStorage.getItem('token');
  const[bgnav,setBgnav] = useState("bg-white");
  const setBackgroundNav = () =>{
    let winheight = window.scrollY;
    winheight > 100 ? setBgnav("bg-white shadow") : setBgnav("bg-white");
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
          <Navbar.Brand href="/">
            {/* Logo And Brand here */}
            {/* <LinkScroll to='home' smooth={true} duration={500}> */}
                <h4> <span className="badge bg-primary p-2">PPDB</span><b> {props.sekolahName}</b></h4>
            {/* </LinkScroll> */}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
             
                <Nav.Link href="/" >
                  Home
                </Nav.Link>
                <Nav.Link href="/" >
                  Alur
                  </Nav.Link>
                <Nav.Link href="/" >
                  Jadwal & Biaya
                  </Nav.Link>
              {
                props.customMenu && props.customMenu.map((result)=>{
                  return (
                    <Link key={result.id_menu} to={'/pages/'+result.slug_pages} className='text-decoration-none'>
                      <Nav.Link href="#link" >
                       {result.nama_menu}
                      </Nav.Link>
                    </Link>
                  )
                })
              }
              { !token && (
                <Link to={'/signin'} className='text-decoration-none'>
                  <Nav.Link href="#link" >
                    Sign in
                  </Nav.Link>
                </Link>
              )}
              { token && (
                <Link  to={'/dashboard'} className='text-decoration-none'>
                  <Nav.Link href="#link" >
                    Dashboard
                  </Nav.Link>
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default ConstantNav