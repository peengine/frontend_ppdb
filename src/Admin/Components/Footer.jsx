import React from 'react'
import { FaCopyright } from 'react-icons/fa'

const Footer = () => {
    
    
  return (
    <div>
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-3">
                    <div className="card-title">
                        Copyright <FaCopyright/> 2023 <b><a href="#" className='text-decoration-none text-black'>PE Engine Software</a> </b>
                    </div>
                </div>
                <div className="col-md-3 text-end m-3">
                    <div className="card-title">
                        <b>PPDB</b> Version : <b>Beta</b>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer