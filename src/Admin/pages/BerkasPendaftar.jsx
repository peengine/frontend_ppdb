import React from 'react'
import { PiCubeTransparentFill } from "react-icons/pi";
import { FaPaste } from "react-icons/fa";
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const BerkasPendaftar = () => {

    const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL
    const token = localStorage.getItem('token');
    
    const [jurusan,setJurusan] = useState({});
    const [berkas,setBerkas] = useState({});
    const navigate = useNavigate();
 

    useEffect(()=>{
        if(!token){
            navigate('/signin')
        }
        if(token){
            fetch()
        }
    },[]);

    const fetch = async (e) => {
        
        try{
            //fetch Jurusan
            await axios.get(BASE_URL+'jurusan').then((response)=>{
                setJurusan(response.data)
            }).catch((error)=>{
                console.log(error)
            })
            //Fetch Type Berkas
            await axios.get(BASE_URL+'type_berkas').then((response)=>{
                setBerkas(response.data)
            }).catch((error)=>{
                console.log(error)
            })
        }catch(err){
            console.log(err)
        }
        

    }

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
                                    <select name="pilihan_jurusan_utama" id="pilihan_jurusan_utama" className='form-control form-select' required>
                                        <option value="">-- Pilih Jurusan Utama --</option>
                                        {
                                            jurusan.data && jurusan.data.map((result)=>{
                                                return (
                                                    <option value={result.id}>{result.nama_kompetensi}</option>
                                                )
                                            })
                                        }
                                        
                                       
                                    </select>
                                </div>
                                <div className="form-group m-2">
                                    <label htmlFor="pilihan_jurusan_utama">Pilihan Jurusan Cadangan</label>
                                    <select name="pilihan_jurusan_cadangan" id="pilihan_jurusan_cadangan" className='form-control form-select'>
                                        <option value="">-- Pilih Jurusan Cadangan --</option>
                                        {
                                            jurusan.data && jurusan.data.map((result)=>{
                                                return (
                                                    <option value={result.id}>{result.nama_kompetensi}</option>
                                                )
                                            })
                                        }
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
                                {
                                    berkas.data && berkas.data.map((result)=>{
                                        return(
                                            <div className="form-group">
                                                <label htmlFor={"berkas_type_"+result.id}>{result.nama_berkas}</label>
                                                <input type="file" name={"berkas_type_"+result.id} id={"berkas_type_"+result.id} className='form-control form-input' />
                                            </div>
                                        );
                                    })
                                }
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