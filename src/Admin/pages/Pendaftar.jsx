import React from 'react'

const Pendaftar = () => {



    const onSubmitHandler = ()=>{

    }

  return (
    <>
        <div>
            <form onSubmit={()=> onSubmitHandler()} method='POST'>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card card-primary shadow m-3">
                                <div className="card-body">
                                    <h5 className="card-title">Foto</h5>
                                    <small className='card-subtitle'>Upload Foto Kamu disini !</small>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-4">

                                        </div>
                                        <div className="col-md-8">
                                            <div className="form-group">
                                                <label htmlFor="formFile">Foto </label>
                                                <input type="file" accept='image/*,image/jpeg,image/png' name="foto" id="formFile" className='form-control form-input' />
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card card-primary shadow m-3">
                                <div className="card-body">
                                    <h5 className="card-title">Identitas</h5>
                                    <small className='card-subtitle'>Masukkan identitas kamu dengan baik dan benar disini!</small>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group m-2">
                                                <label htmlFor="nisn">NISN</label>
                                                <input type="text" name="nisn" id="nisn" className='form-input form-control' placeholder='NISN' />
                                            </div>
                                            <div className="form-group m-2">
                                                <label htmlFor="nik">NIK</label>
                                                <input type="text" name="nik" id="nik" className='form-input form-control' placeholder='NIK' />
                                            </div>
                                            <div className="form-group m-2">
                                                <label htmlFor="nama">Nama</label>
                                                <input type="text" name="nama" id="nama" className='form-input form-control' placeholder='Nama' />
                                            </div>
                                        </div>
                                        <div className="col-md-6">

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card card-primary shadow m-3">
                                <div className="card-body">
                                    <h5 className="card-title">Asal Sekolah</h5>
                                    <small className='card-subtitle'>Masukkan asal sekolah kamu disini !</small>
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
            </form>
            
        </div>
        
    </>
  )
}

export default Pendaftar