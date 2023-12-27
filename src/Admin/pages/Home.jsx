import React from 'react'
import { Table } from 'react-bootstrap'
import { GoAlertFill } from "react-icons/go";
import { FaCalendarCheck } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { formatRupiah, formatTanggal } from '../../Helpers/ValHelpers';

const Home = (props) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    useEffect(()=>{
        if(!token){
            navigate('/signin')
        }
    },[props]);

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
                            {
                                props.dataPendaftar.pengumuman && props.dataPendaftar.pengumuman.map((response)=>{
                                    return(
                                        <div className={"alert alert-"+response.type_pengumuman} key={response.id}>
                                            <GoAlertFill/> {response.type_pengumuman}<br />
                                             <small>{formatTanggal(response.created_at)}</small>
                                             <br />
                                             <hr />
                                            <p>{response.isi_pengumuman}</p>
                                        </div>
                                    )
                                })
                            }
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
                                            props.dataSekolah.all_gelombang && props.dataSekolah.all_gelombang.map((result)=>{
                                                return(
                                                    <tr key={result.id}>
                                                        <td>{result.nama_gelombang}</td>
                                                        <td>{result.tgl_dibuka_gelombang}</td>
                                                        <td>{result.tgl_ditutup_gelombang}</td>
                                                        <td>{formatRupiah(result.ppdb_biaya_daftar_masuk)}</td>
                                                        <td>{formatRupiah(result.ppdb_biaya_dsp)}</td>
                                                        <td>
                                                            {
                                                                    result.status_gelombang === '0' ? <span className='badge bg-danger'>Closed</span> : <span className='badge bg-primary'>Open</span>
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