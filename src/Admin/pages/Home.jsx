import React from 'react'
import { Table } from 'react-bootstrap'
import { GoAlertFill } from "react-icons/go";
import { FaCalendarCheck, FaImages } from "react-icons/fa";

const Home = () => {
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
                                        <tr>
                                            <td>Jalur Prestasi</td>
                                            <td>12 Nov 2023</td>
                                            <td>13 Des 2023</td>
                                            <td>Rp.XXX.XXX,00</td>
                                            <td>Rp.XXX.XXX,00</td>
                                            <td>DiBuka</td>
                                        </tr>
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