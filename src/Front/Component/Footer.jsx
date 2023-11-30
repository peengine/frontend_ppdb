import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import foot_bg from './Images/footer.png'
import { Link as LinkScroll } from 'react-scroll';
import { Container, Nav, Navbar } from 'react-bootstrap'
const Footer = () => {
  const date = new Date();
  const token = localStorage.getItem('token');

  return (
    <>
    <section id="footer" style={{backgroundImage:`url(${foot_bg})`,backgroundSize:'cover',backgroundRepeat:'no-repeat'}}>
      <div className="container">
        <div className="row  py-5 mt-3 ">
          <div className="col-md-4">
            <h4> <span className="badge bg-primary p-2">PPDB</span> SMK LOREM</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>               
          </div>
          <div className="col-md-4">
              <ul style={{listStyle:'none'}} >
                <li>
                  <LinkScroll to='why_us' smooth={true} duration={500}>
                    <Nav.Link href='#why_us'>Why Us</Nav.Link>
                  </LinkScroll>
                </li>
                <li>
                  <LinkScroll to='jurusan' smooth={true} duration={500}>
                    <Nav.Link href='#jurusan'>Konsentrasi Keahlian</Nav.Link>
                  </LinkScroll>
                </li>
                <li>
                  <LinkScroll to='seleksi' smooth={true} duration={500}>
                    <Nav.Link href='#seleksi'>Tahap Seleksi</Nav.Link>
                  </LinkScroll>
                </li>
                <li>
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
                </li>
              </ul>
          </div>
          <div className="col-md-4">
            <h2>Bingung Mau Menghubungi Kemana ?</h2>
            <ul className=''>
              <li> +62 8XX XXXX XXXX</li>
              <li> <Link className='text-decoration-none' to={'mailto:loremipsum@gmail.com'}>loremipsum@gmail.com</Link> </li>
              <li> <Link className='text-decoration-none' to={'loremipsum.com'}>loremipsum.com</Link> </li>
            
            </ul>
          </div>
        </div>
      </div>
      <hr />
      <div className="container text-center p-3">
        <div className="row">
          <div className="col-md-12">
            <p>Copyright © {date.getFullYear()} All Right Reserved By <Link className='text-decoration-none' to={'https://google.com/'} target={'_blank'}>PE Engine Software</Link> </p>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default Footer