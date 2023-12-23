import React from 'react'

const Seleksi = (props) => {

    const seleksi = props.seleksi
    const URLS = process.env.REACT_APP_BASE_URL

  return (
    <>
    <section id="seleksi" className='bg-light'>
    <br /><br /> <br />
        <div className="container py-5 mt-3 my-2">
            <div className="row">
                <div className="col-md-12">
                    <div className="text-center text">
                        <h2>Tahap Seleksi Apa Aja Sih ?</h2>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">
                {
                    seleksi && seleksi.map((result)=>{
                        return(
                            <div className="col-md-4 mt-3" key={result.id}>
                                <div className="card shadow ">
                                    <div className="card-body p-4 text-center">
                                            <img src={URLS+result.foto_seleksi} width={100} height={100} className='img img-circle my-2'/>
                                            <p>{result.ket_seleksi} </p>
                                            <hr />
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    </section>
    </>
  )
}

export default Seleksi