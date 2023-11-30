import React from 'react'
import vector_jurusan from './Images/jurusan.jpg'
const Jurusan = () => {
  return (
    <>
    <section id="jurusan">
    <br /><br /> <br />
        <div className="container py-5 mt-3 my-2">
            <div className="row">
                <div className="col-md-12">
                    <div className="text-center text">
                        <h2>Konsentrasi Keahlian</h2>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-4 mt-3">
                    <div className="card shadow">
                        <div className="card-body p-4 text-center">
                                <img src={vector_jurusan} width={100} height={100} className='img img-circle my-2'/>
                                <h4><b>Lorem ipsum dolor sit amet</b> </h4>
                                <hr />
                                <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mt-3">
                    <div className="card shadow">
                        <div className="card-body p-4 text-center">
                                <img src={vector_jurusan} width={100} height={100} className='img img-circle my-2'/>
                                <h4><b>Lorem ipsum dolor sit amet</b> </h4>
                                <hr />
                                <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mt-3">
                    <div className="card shadow">
                        <div className="card-body p-4 text-center">
                                <img src={vector_jurusan} width={100} height={100} className='img img-circle my-2'/>
                                <h4><b>Lorem ipsum dolor sit amet</b> </h4>
                                <hr />
                                <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default Jurusan