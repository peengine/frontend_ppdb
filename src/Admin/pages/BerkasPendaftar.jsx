import React from 'react'

const BerkasPendaftar = () => {
  return (
   <>
     <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="card card-primary shadow m-3">
                        <div className="card-body">
                            <h5 className="card-title">Kelengkapan Pendaftaran</h5>
                            <small className='card-subtitle'>Pilih Kompetensi Keahlian dan Lengkapi kelengkapan pendaftaran disini</small>
                            <hr />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="card card-primary shadow m-3">
                        <div className="card-body">
                            <h5 className="card-title">Berkas Pendaftaran</h5>
                            <small className='card-subtitle'>Lengkapi Berkas Pendaftaran Kamu disini !</small>
                            <hr />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <button type="submit" className='btn btn-primary m-3' >Simpan</button>
                </div>
            </div>
        </div>
   </>
  )
}

export default BerkasPendaftar