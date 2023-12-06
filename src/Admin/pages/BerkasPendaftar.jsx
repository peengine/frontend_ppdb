import React from 'react'
import { PiCubeTransparentFill } from "react-icons/pi";
import { FaPaste } from "react-icons/fa";
const BerkasPendaftar = () => {
  return (
   <>
    <div>
        <form method='POST' encType='multipart/form-data' >
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card card-primary shadow m-3">
                            <div className="card-body">
                                <h5 className="card-title"> <PiCubeTransparentFill/> Kelengkapan Pendaftaran</h5>
                                <small className='card-subtitle'>Pilih Kompetensi Keahlian dan Lengkapi kelengkapan pendaftaran disini</small>
                                <hr />
                                <div className="form-group m-2">
                                    <label htmlFor="pilihan_jurusan_utama">Pilihan Jurusan Utama</label>
                                    <select name="pilihan_jurusan_utama" id="pilihan_jurusan_utama" className='form-control form-select'>
                                        <option value="">-- Pilih Jurusan Utama --</option>
                                    </select>
                                </div>
                                <div className="form-group m-2">
                                    <label htmlFor="pilihan_jurusan_utama">Pilihan Jurusan Cadangan</label>
                                    <select name="pilihan_jurusan_cadangan" id="pilihan_jurusan_cadangan" className='form-control form-select'>
                                        <option value="">-- Pilih Jurusan Cadangan --</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card card-primary shadow m-3">
                            <div className="card-body">
                                <h5 className="card-title"> <FaPaste/> Berkas Pendaftaran</h5>
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
        </form>
    </div>
     
   </>
  )
}

export default BerkasPendaftar