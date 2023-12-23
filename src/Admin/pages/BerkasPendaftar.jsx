import React from 'react'
import { PiCubeTransparentFill } from "react-icons/pi";
import { FaPaste } from "react-icons/fa";
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
const BerkasPendaftar = (props) => {

    const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL
    const URLS = process.env.REACT_APP_BASE_URL
    const token = localStorage.getItem('token');
    const pBerkas = props.dataPendaftar.data_berkas != null ? props.dataPendaftar.data_berkas : [];
    const pDataLain = props.dataPendaftar.data_lain != null ? props.dataPendaftar.data_lain : {};
    const[dataLain,setDataLain] = useState({});
    const[berkas,setBerkas] = useState([]);
    const[upBerkas,setUpBerkas] = useState([])
    const[validation,setValidation] = useState({})
    const navigate = useNavigate();
 

    useEffect(()=>{
        if(!token){
            navigate('/signin')
        }
        setBerkas(pBerkas)
        setDataLain(pDataLain)
    },[props]);

    const dataLainHandleChange = (e) => {
        const{name, value} = e.target
        setDataLain((prev) =>{
            return {...prev,[name]:value};
        })
    }
    const berkasHandleChange = (e) => {
        const{name} = e.target
        const spname = name.split('_')
        const data = upBerkas;
        data[spname[spname.length - 1]] = {[name]:e.target.files[0],['name']:name}
        setUpBerkas(data)
    }

    const onSubmitHandler = async (e) =>{
        e.preventDefault();

        const fd = new FormData();
        fd.append("data_lain",JSON.stringify(dataLain));
        upBerkas && upBerkas.map((result)=>{
            fd.append(result['name'],result[result['name']])
        })
        Swal.fire({
            title: 'Are You sure want to save  ?',
            icon:'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `Cancel`,
          }).then( async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              axios.defaults.headers.common['Authorization'] = 'Bearer '+token
              await axios.post(BASE_URL+'auth/pendaftar/set',fd).then((response)=>{
                if(response.data.message){
                  Swal.fire(response.data.message, '', 'success').then((result)=>{
                    window.location.reload();
                  })
                }
                if(response.data.error){
                  Swal.fire(response.data.error, '', 'danger')
                }
              }).catch((err) => {
                setValidation(err);
              })
            }
          })
    }

  return (
   <>
    <div className="container">
        <form method='POST' onSubmit={onSubmitHandler} encType='multipart/form-data' >
           
                <div className="row">
                    <div className="col-md-12">
                        <div className="card card-primary shadow m-3">
                            <div className="card-body">
                                <h5 className="card-title"> <PiCubeTransparentFill/> Kelengkapan Pendaftaran</h5>
                                <small className='card-subtitle'>Pilih Kompetensi Keahlian dan Lengkapi kelengkapan pendaftaran disini</small>
                                <hr />
                                <div className="form-group m-2">
                                    <label htmlFor="pilihan_jurusan_utama">Pilihan Jurusan Utama</label>
                                    <select name="pilihan_jurusan_utama" onChange={(e) => dataLainHandleChange(e)} value={dataLain.pilihan_jurusan_utama} id="pilihan_jurusan_utama" className='form-control form-select' required>
                                        <option value="">-- Pilih Jurusan Utama --</option>
                                        {
                                            props.dataSekolah.jurusan && props.dataSekolah.jurusan.map((result)=>{
                                                return (
                                                    <option value={result.id} key={result.id}>{result.nama_kompetensi}</option>
                                                )
                                            })
                                        }
                                        
                                       
                                    </select>
                                </div>
                                <div className="form-group m-2">
                                    <label htmlFor="pilihan_jurusan_cadangan">Pilihan Jurusan Cadangan</label>
                                    <select name="pilihan_jurusan_cadangan" onChange={(e) => dataLainHandleChange(e)} value={dataLain.pilihan_jurusan_cadangan} id="pilihan_jurusan_cadangan" className='form-control form-select' required>
                                        <option value="">-- Pilih Jurusan Cadangan --</option>
                                        {
                                            props.dataSekolah.jurusan && props.dataSekolah.jurusan.map((result)=>{
                                                return (
                                                    <option value={result.id} key={result.id}>{result.nama_kompetensi}</option>
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
                                    props.dataSekolah.type_berkas && props.dataSekolah.type_berkas.map((result)=>{

                                        const valberkas = berkas.filter((response) => {
                                            return response.type_berkas == result.id
                                        })[0]
                                        if(typeof valberkas !== 'undefined'){
                                            return(
                                                <div key={result.id}>
                                                    <div className="form-group">
                                                        <a href={URLS+valberkas.berkas} target='_blank' className="alert form-control bg-info text-center text-decoration-none">
                                                                {result.nama_berkas+" Lama"}
                                                        </a>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor={"berkas_type_"+result.id}>{result.nama_berkas}</label>
                                                        <input type="file" onChange={(e) => berkasHandleChange(e)} accept='application/pdf,application/doc,application/docx' name={"berkas_type_"+result.id} id={"berkas_type_"+result.id} className='form-control form-input' />
                                                    </div>
                                                    <br />
                                                </div>
                                                
                                            );
                                        }else{
                                            return(
                                                <div  key={result.id}>
                                                    <div className="form-group">
                                                        <label htmlFor={"berkas_type_"+result.id}>{result.nama_berkas}</label>
                                                        <input type="file" onChange={(e) => berkasHandleChange(e)} accept='application/pdf,application/doc,application/docx' name={"berkas_type_"+result.id} id={"berkas_type_"+result.id} className='form-control form-input' />
                                                    </div>
                                                </div>
                                            );    
                                        }
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
            
        </form>
    </div>  
   </>
  )
}

export default BerkasPendaftar