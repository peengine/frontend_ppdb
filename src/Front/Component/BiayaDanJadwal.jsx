import React from 'react'

const BiayaDanJadwal = (props) => {
    const month = ["Jan","Feb","March","April","May","June","July","Aug","Sept","Oct","Nov","Dec"];
    const biaya = props.gelombang.ppdb_biaya_daftar_masuk
    const tanggalBuka = new Date(props.gelombang.tgl_dibuka_gelombang)
    const tanggalTutup = new Date(props.gelombang.tgl_ditutup_gelombang)


  return (
    <>
    <section id="biaya_dan_jadwal">
        <br /><br /> <br />
        <div className="container py-5 mt-3 my-2">
            <div className="row">
                <div className="col-md-12">
                    <div className="text-center text">
                        <h2>Biaya Dan Jadwal</h2>
                        <p>
                            Berikut Rincian Biaya masuk dan Jadwal Kegiatan PPDB tahun ajaran {props.tahunAjaran}
                        </p>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-5 mt-3">
                    <div className="card shadow">
                        <div className="card-body p-4 text-center">
                                <h4><b>Biaya Pendaftaran</b> </h4>
                                <p>{props.gelombang.nama_gelombang}</p>
                                <hr />
                                <br />
                                <h1><b>Rp.{biaya}</b></h1>
                                <br />
                                <p>
                                    Pembayaran Bisa Melalui transfer ke No.Virtual Account yang tertera pada saat pendaftaran atau Langsung Ditempat
                                </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-5 mt-3">
                    <div className="card shadow">
                        <div className="card-body p-4 text-center">
                                <h4><b>Jadwal Pendaftaran</b> </h4>
                                <p>{props.gelombang.nama_gelombang}</p>
                                <hr />
                                <h1><b>{tanggalBuka.getDate()} {month[tanggalBuka.getMonth()]}</b></h1>
                                <small>s/d</small>
                                <h1><b>{tanggalTutup.getDate()} {month[tanggalTutup.getMonth()]}</b></h1>
                                <br />
                                <p>
                                    Pastikan anda sudah terdaftar,Jadwal Bisa Berubah Sewaktu Waktu
                                </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default BiayaDanJadwal