import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import vectors from "../Components/Images/2.png";

const Pembayaran = (props) => {
  const token = localStorage.getItem('token');
  

  const pPembayaran = props.dataPendaftar.data_pembayaran != null ? props.dataPendaftar.data_pembayaran : [];
  const [showHide, setShowHide] = useState("");
  const[pembayaran,setPembayaran] = useState([]);
  const navigate = useNavigate()
  
  
  useEffect(()=>{
    if(!token){
      navigate('/signin')
    }
    setPembayaran(pPembayaran);
  },[props])

  const handleType = (e) => {
    const { value, name } = e.target;
    setShowHide(value);
  };
  if(pembayaran.length > 0){
    return(
      <>
      <div className="container">

      </div>
      </>
    );
   
  }else{
    return (
      <>
        <form method="POST" encType="multipart/form-data">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="card card-primary shadow m-3">
                  <div className="card-body">
                    <h5 className="card-title">Administrasi</h5>
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
                          <h3>SMK LOREM IPSUM SIT DULUR AMET</h3>
                          <small>
                            Lorem Ipsum sit Dolor Amet ohkasjldfjlaksjdfjkasdf
                          </small>
                          <p>Jl. Lorem Ipsum Sit Dolor Amet</p>
                        </div>
                        <div className="col-md-5 text-end">
                          <span className="badge bg-danger m-2">Belum Lunas</span>
                          <div className="alert alert-dark text-end">
                            <small>Biaya Pendaftaran</small>
                            <h2>Rp.109.000.000,00</h2>
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
                          <img src={vectors} width={"300px"} />
                          <div className="form-group">
                            <label htmlFor="bukti_pembayaran">
                              Bukti Pembayaran
                            </label>
                            <input
                              type="file"
                              name="bukti_pembayaran"
                              id="bukti_pembayaran"
                              className="form-control form-input"
                            />
                          </div>
                        </div>
                        <div className="col-md-5 text-end">
                          <span className="badge bg-danger m-2">Belum Lunas</span>
                          <div className="alert alert-dark text-end">
                            <small>Biaya Pendaftaran</small>
                            <h2>Rp.109.000.000,00</h2>
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
