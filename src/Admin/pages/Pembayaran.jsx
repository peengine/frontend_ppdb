import React from 'react'

const Pembayaran = () => {
  return (
    <>
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="card card-primary shadow m-3">
                        <div className="card-body">
                            <h5 className="card-title">Administrasi</h5>
                            <small className='card-subtitle'>Upload Bukti dan Lakukan Pembayaran disini!</small>
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

export default Pembayaran