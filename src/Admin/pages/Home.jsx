import React from 'react'
import { Table } from 'react-bootstrap'
import { GoAlertFill } from "react-icons/go";
import { FaCalendarCheck, FaImages } from "react-icons/fa";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { formatRupiah } from '../../Helpers/ValHelpers';

const Home = () => {

    
    const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL
    const token = localStorage.getItem('token');
    
    const [gelombang,setGelombang] = useState({});
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
            //fetch Gelombang
            await axios.get(BASE_URL+'gelombang').then((response)=>{
                setGelombang(response.data)
            }).catch((error)=>{
                console.log(error)
            })
           
        }catch(err){
            console.log(err)
        }
        

    }


  return (
    <>
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="card card-primary shadow m-3">
                        <div className="card-body">
                            <h5 className="card-title"> <GoAlertFill/> Pengumuman</h5>
                            <small className='card-subtitle'>Semua Pengumuman Akan Muncul disini !</small>
                            <hr />
                            <div className="alert alert-danger">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="card card-primary shadow m-3">
                        <div className="card-body">
                            <h5 className="card-title"> <FaCalendarCheck/> Biaya Dan Jadwal</h5>
                            <small className='card-subtitle'>Data Jalur Yang Tersedia dan terbuka akan tersedia disini !</small>
                            <hr />
                            <div className="table-responsive">
                                <Table striped bordered hover className='text-center'>
                                    <thead>
                                        <tr>
                                            <th rowSpan={2}>Jalur</th>
                                            <th colSpan={2}>Tanggal</th>
                                            <th colSpan={2}>Biaya</th>
                                            <th rowSpan={2}>Status</th>
                                        </tr>
                                        <tr>
                                            <th>Dibuka</th>
                                            <th>Ditutup</th>
                                            <th>Daftar</th>
                                            <th>DSP</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            gelombang.data && gelombang.data.map((result)=>{
                                                return(
                                                    <tr>
                                                        <td>{result.nama_gelombang}</td>
                                                        <td>{result.tgl_dibuka_gelombang}</td>
                                                        <td>{result.tgl_ditutup_gelombang}</td>
                                                        <td>{formatRupiah(result.ppdb_biaya_daftar_masuk)}</td>
                                                        <td>{formatRupiah(result.ppdb_biaya_dsp)}</td>
                                                        <td>
                                                            {
                                                                    result.status_gelombang == '0' ? <span className='badge bg-danger'>Closed</span> : <span className='badge bg-primary'>Open</span>
                                                            }
                                                            
                                                        </td>
                                                    </tr>
                                                )
                                            })

                                        }
                                    </tbody>
                                </Table>
                            </div>
                            <div className="alert alert-primary">
                                <p><b>*)</b> Jadwal Bisa Berubah Sewaktu Waktu</p>
                                <p><b>*)</b> Semua Biaya yang sudah dibayarkan tidak bisa dikembalikan</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Home