import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Link as LinkScroll } from 'react-scroll';

const Navbars = (props) => {
  const token = localStorage.getItem('token');
  const[bgnav,setBgnav] = useState("bg-white");
  const URLS = process.env.REACT_APP_BASE_URL;
 

  const setBackgroundNav = () =>{
    let winheight = window.scrollY;
    winheight > 100 ? setBgnav("bg-white shadow") : setBgnav("bg-white");
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
            {/* <LinkScroll to='home' smooth={true} duration={500}> */}
            {
              props.dataSekolah.logo_sekolah != '-' && (
                <>
                  <img src={URLS+"public/tenant/upload_file/sekolah/"+props.dataSekolah.logo_sekolah} height={100} />
                 <h4><b> {props.sekolahName}</b></h4>
                </>
                
              ) 
            }
            {
              props.dataSekolah.logo_sekolah == '-' && (
                <h4> <span className="badge bg-primary p-2">PPDB</span><b> {props.sekolahName}</b></h4>
              ) 
            }
                
            {/* </LinkScroll> */}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkScroll to='home' smooth={true} duration={500}>
                <Nav.Link href="/#home" >
                  Home
                </Nav.Link>
              </LinkScroll>
              <LinkScroll to='alur' smooth={true} duration={500}>
                <Nav.Link href="#alur" >
                  Alur
                  </Nav.Link>
              </LinkScroll>
              <LinkScroll to='biaya_dan_jadwal' smooth={true} duration={500}>
                <Nav.Link href="#biaya_dan_jadwal" >
                  Jadwal & Biaya
                  </Nav.Link>
              </LinkScroll>
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

export default Navbars