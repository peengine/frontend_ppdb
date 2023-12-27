import React from 'react'
import { Link } from 'react-router-dom'

const Hero = (props) => {
  return (
    <>
        <section id='home'>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="text">
                            <h3> <b>PPDB {props.sekolahName}</b></h3>
                            <p> Untuk calon pendaftar tahun ajaran <b>{props.tahunAjaran}</b> bisa mendaftar 
                                melalui website ini atau langsung datang ke tempat pendaftaran</p>
                            <Link to={'/dashboard'} type='button' className='btn btn-primary shadow'>Daftar Sekarang</Link>
                        </div>
                    </div>
                    <div className="col-md-6">  
                        <div className="image">
                            <img src='assets/hero-img.svg' className='home-img'></img>
                        </div>
                    </div>
                </div>
            </div>
            <br />
        </section>
    </>
  )
}

export default Hero