import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <>
        <section id='home'>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="text">
                            <h3>PPDB SMK LOREM PAKIS</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                            <Link to={'/signin'} type='button' className='btn btn-primary shadow'>Daftar Sekarang</Link>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="image">
                            <img src='assets/hero-img.svg' ></img>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Hero