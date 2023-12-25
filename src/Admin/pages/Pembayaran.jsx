import { BlobProvider } from "@react-pdf/renderer";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Table } from "react-bootstrap";
import { FaAddressCard, FaCashRegister, FaPrint } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { formatRupiah, formatTanggal, getStatus } from "../../Helpers/ValHelpers";
import vectors from "../Components/Images/2.png";
import KartuPendaftaran from "../Components/templates/KartuPendaftaran";

const Pembayaran = (props) => {
  const token = localStorage.getItem('token');
  const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL
  const pPembayaran = props.dataPendaftar.data_pembayaran != null ? props.dataPendaftar.data_pembayaran : [];
  const pSekolah = props.dataSekolah != null ? props.dataSekolah : {};

  const [showHide, setShowHide] = useState("");
  const[pembayaran,setPembayaran] = useState([]);
  const[sekolah,setSekolah] = useState({})
  const[img,setImg] = useState(vectors)
  const[via,setVia] = useState("")
  const[pBukti,setBukti] = useState("-")
  const[ket,setKet] = useState("")

  const navigate = useNavigate()
  
  
  useEffect(()=>{
    if(!token){
      navigate('/signin')
    }
    setSekolah(pSekolah)
    setPembayaran(pPembayaran);
  },[props])

  const handleType = (e) => {
    const { value } = e.target;
    setShowHide(value);
    setVia(value)
  };
  const handleBukti = (e) => {
    setImg(URL.createObjectURL(e.target.files[0]));
    setBukti(e.target.files[0]);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("via_pembayaran",via)
    fd.append("bukti_pembayaran",pBukti)
    fd.append("ket_pembayaran",ket)


    Swal.fire({
      title: 'Are You sure want to save ?',
      icon:'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `Cancel`,
    }).then( async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios.defaults.headers.common['Authorization'] = 'Bearer '+token
        await axios.post(BASE_URL+'auth/pendaftar/set',fd).then((response)=>{
          if(response.status === 200){
            if(typeof response.data != 'undefined'){
              if(response.data.message){
                Swal.fire(response.data.message, '', 'success').then((result)=>{
                  window.location.reload();
                })
              }
              if(response.data.error){
                Swal.fire(response.data.error, '', 'danger')
              }
            }
            
           
          }
        }).catch((error) => {
          console.log(error)
        })
      }
    })
  }


  if(pembayaran.length > 0){
    return(
      <>
      <div className="container">
        <div className="row">
          <div className="col-md-12" key={"card-1"}>
            <div className="card card-primary shadow m-3">
              <div className="card-body">
                <h5 className="card-title">
                <FaCashRegister/>Riwayat Administrasi
                </h5>
                <small className="card-subtitle">
                  Informasi Riwayat Pembayaran tagihan pendaftaran ada disini !
                </small>
                <hr />
                <div className="table-responsive">
                  <Table striped bordered hover className="text-center" >
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Methode</th>
                        <th>Tanggal</th>
                        <th>Kode</th>
                        <th>Type</th>
                        <th>Nominal</th>
                        <th>Status</th>
                      </tr>
                      
                    </thead>
                    <tbody>
                      {pembayaran && pembayaran.map((result,index)=>{
                        return (
                          <tr key={index + 1}>
                            <td>{index + 1}</td>
                            <td>{result.via_pembayaran}</td>
                            <td>{formatTanggal(result.created_at)}</td>
                            <td>{result.kode_pembayaran}</td>
                            <td>{result.type_pembayaran}</td>
                            <td>{formatRupiah(result.nominal_pembayaran)}</td>
                            <td>
                             {getStatus(result.status_pembayaran)}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12" key={"card-2"}>
            <div className="card card-primary shadow m-3">
              <div className="card-body">
                <h5 className="card-title">
                  <FaAddressCard/> Kartu Pendaftaran
                </h5>
                <small>
                  Cetak Kartu Pendaftaran disini !
                </small>
                <hr />
                <div className="table-responsive">
                  <Table striped bordered hover className="text-center">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Act</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr key={'act1'}>
                        <td>1</td>
                        <td>Kartu Pendaftaran Siswa</td>
                        <td><BlobProvider document={<KartuPendaftaran dataProps={props} />}>
                            {({blob,url})=>(
                              <a href={url} target={"_blank"} className="btn btn-primary"><FaPrint/> Cetak</a>
                            )}
                          </BlobProvider></td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
    );
   
  }else{
    return (
      <>
        <form method="POST" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="card card-primary shadow m-3">
                  <div className="card-body">
                    <h5 className="card-title"><FaCashRegister/> Administrasi</h5>
                    <small className="card-subtitle">
                      Informasi tagihan pembayaran pendaftaran tersedia disini!
                    </small>
                    <hr />
                    <div className="alert alert-primary">
                      <p>Silahkan Memilih Methode Pembayaran Yang di inginkan</p>
                      <p>
                        {" "}
                        <b>- Tunai / Bayar Ditempat (Offline)</b> bagi yang
                        melakukan pendaftaran secara langsung di sekolah
                      </p>
                      <p>
                        {" "}
                        <b>- Tranfer / Transfer Virtual Account (Online)</b>{" "}
                        pembayaran biaya pendaftaran melalui tranfer tanpa harus
                        datang ke sekolah
                      </p>
                    </div>
                    <div className="form-group m-2">
                      <label htmlFor="type_pembayaran">Methode Pembayaran</label>
                      <select
                        name="type_pembayaran"
                        onChange={handleType}
                        id="type_pembayaran"
                        className="form-control form-select"
                        required
                      >
                        <option value="">-- Pilih Methode Pembayaran --</option>
                        <option value="Tunai">
                          Tunai / Bayar Ditempat (Offline)
                        </option>
                        <option value="Transfer">
                          Transfer / Transfer Virtual Account (Online)
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {showHide === "Tunai" && (
              <div className="row">
                <div className="col-md-12">
                  <div className="card card-primary shadow m-3">
                    <div className="card-body">
                      <div className="card-title">Pembayaran Via Tunai</div>
                      <small className="card-subtitle">
                        Untuk Proses Pembayaran Tunai (Offline), Silahkan Datang
                        Langsung Ke
                      </small>
                      <hr />
                      <div className="row">
                        <div className="col-md-7">
                          <h3>{sekolah.nama_sekolah}</h3>
                          <small>
                            {sekolah.slug}
                          </small>
                          <p>{sekolah.alamat_sekolah}</p>
                        </div>
                        <div className="col-md-5 text-end">
                          <span className="badge bg-danger m-2">Belum Lunas</span>
                          <div className="alert alert-dark text-end">
                            <small>Biaya Pendaftaran ({sekolah.gelombang.nama_gelombang})</small>
                            <h2>{formatRupiah(sekolah.gelombang.ppdb_biaya_daftar_masuk)}</h2>
                          </div>
                        </div>
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Simpan
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {showHide === "Transfer" && (
              <div className="row">
                <div className="col-md-12">
                  <div className="card card-primary shadow m-3">
                    <div className="card-body">
                      <div className="card-title">Pembayaran Via Transfer</div>
                      <small className="card-subtitle">
                        Untuk Proses Pembayaran Transfer (Online), masukkan data
                        dan upload bukti tranfer disini !
                      </small>
                      <hr />
                      <div className="row">
                        <div className="col-md-7">
                          <img src={img} width={"300px"} />
                          <div className="form-group">
                            <label htmlFor="bukti_pembayaran">
                              Bukti Pembayaran
                            </label>
                            <input
                              type="file"
                              name="bukti_pembayaran"
                              onChange={(e) => handleBukti(e)}
                              id="bukti_pembayaran"
                              className="form-control form-input"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="ket_pembayaran">Keterangan Pembayaran</label>
                            <textarea name="ket_pembayaran" onChange={(e) => setKet(e.target.value)} placeholder="Keterangan Pembayaran" id="ket_pembayaran" className="form-control form-input" cols="30" rows="10"></textarea>
                          </div>
                        </div>
                        <div className="col-md-5 text-end">
                          <span className="badge bg-danger m-2">Belum Lunas</span>
                          <div className="alert alert-dark text-end">
                            <small>Biaya Pendaftaran ({sekolah.gelombang.nama_gelombang})</small>
                            <h2>{formatRupiah(sekolah.gelombang.ppdb_biaya_daftar_masuk)}</h2>
                          </div>
                          <hr />
                          <div className="text-start">
                            <div className="card-title">
                              Rekening Pembayaran
                            </div>
                            <small className="card-subtitle">
                              Rekening tujuan Pembayaran Pendaftaran disini !
                            </small>
                            <hr />
                            <p> <b>- BCA :</b> 2349-0809-234 </p>
                            <p> <b>- BRI :</b> 2349-08092-34 </p>
                            <p> <b>- MANDIRI :</b> 2349-0809-234 </p>
                          </div>
                        </div>
                      </div>
                      <br />
                      <button type="submit" className="btn btn-primary">
                        Simpan
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </form>
      </>
    );
  }
  
};

export default Pembayaran;
