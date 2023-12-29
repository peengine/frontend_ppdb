import React from "react";
import vectors from "../Components/Images/2.png";
import { FaImages, FaUser } from "react-icons/fa";
import { IoSchool } from "react-icons/io5";
import { RiParentFill } from "react-icons/ri";
import { Accordion, Form } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const Pendaftar = (props) => {
  const ortu = ["Ayah", "Ibu", "Wali"];
  const agama = ["Islam", "Kristen", "Katholik", "Hindu", "Budha", "Konghucu"];
  const URLS = process.env.REACT_APP_BASE_URL;
  const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL
  const token = localStorage.getItem("token");

  const pPp =props.dataPendaftar.pendaftar != null && props.dataPendaftar.pendaftar.foto != "-"? URLS + props.dataPendaftar.pendaftar.foto: vectors;
  const pSiswa = props.dataPendaftar.pendaftar != null ? props.dataPendaftar.pendaftar : {};
  const pOrtu = props.dataPendaftar.data_orangtua != null ? props.dataPendaftar.data_orangtua : [];
  const pLain = props.dataPendaftar.data_lain != null ? props.dataPendaftar.data_lain : {};

  const [pp, setPp] = useState(vectors);
  const[foto_profile,setFProfile] = useState()
  const [valOrtu, setOrtu] = useState([]);
  const [valSiswa, setSiswa] = useState({});
  const [dataLainSiswa, setDataLain] = useState({});

  const [Ayah, setAyah] = useState({});
  const [Ibu, setIbu] = useState({});
  const [Wali, setWali] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
    setSiswa(pSiswa);
    setOrtu(pOrtu);
    setDataLain(pLain);
    setPp(pPp);
    valOrtu.map((result) => {
      switch (result.type_ortu) {
        case "ayah":
          setAyah(result);
          break;
        case "ibu":
          setIbu(result);
          break;
        case "wali":
          setWali(result);
          break;
      }
    });
  }, [props]);

  const onChangePpHandler = (e) => {
    setPp(URL.createObjectURL(e.target.files[0]));
    setFProfile(e.target.files[0]);
  };
  const siswaHandleChange = (e) => {
    const { name, value } = e.target;
    setSiswa((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const dataLainHandleChange = (e) => {
    const { name, value } = e.target;
    setDataLain((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const dataAyahHandleChange = (e) =>{
    const { name, value } = e.target
      
      setAyah((prev) => {
        return { ...prev, [name]: value };
      });
      // setOrtu([Ayah])
      
      // setAyah((prev) => {
      //   return { ...prev, ['type_ortu']: 'ayah' };
      // });
  }
  const dataOrangtuaHandleChange = (e) => {
    const { name, value } = e.target;
    if (name.endsWith("ayah")) {
      const { name, value } = e.target;
      const nyname = name.replace("_ayah","")
      setAyah((prev) => {
        return { ...prev, ['type_ortu']: 'ayah' };
      });
      setAyah((prev) => {
        return { ...prev, [nyname]: value };
      });
    
    }
    if (name.endsWith("ibu")) {
      const { name, value } = e.target;
      const nyname = name.replace("_ibu","")
      setIbu((prev) => {
        return { ...prev, ['type_ortu']: 'ibu' };
      });
      setIbu((prev) => {
        return { ...prev, [nyname]: value };
      });
     
    }
    if (name.endsWith("wali")) {
      const { name, value } = e.target;
      const nyname = name.replace("_wali","")
      setWali((prev) => {
        return { ...prev, ['type_ortu']: 'wali' };
      });
      setWali((prev) => {
        return { ...prev, [nyname]: value };
      });
     
    }
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("foto_pendaftar",foto_profile)
    fd.append("pendaftar", JSON.stringify(valSiswa))
    fd.append("data_orangtua", JSON.stringify([Ayah,Ibu,Wali]) )
    fd.append("data_lain", JSON.stringify(dataLainSiswa))
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
                 window.location.reload()
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

  };
  const inputNumOnly = (event) =>{
    return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))
  }

  return (
    <>
      <div>
        <form onSubmit={onSubmitHandler}  encType="multipart/form-data" method="POST">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="card card-primary shadow m-3">
                  <div className="card-body">
                    <h5 className="card-title">
                      {" "}
                      <FaImages /> Foto
                    </h5>
                    <small className="card-subtitle">
                      Upload Foto Kamu disini !
                    </small>
                    <hr />
                    <div className="row">
                      <div className="col-md-3">
                        <img src={pp} width={"100%"} height={"100%"} />
                      </div>
                      <div className="col-md-9 justify-content-center">
                        <div className="form-group">
                          <label htmlFor="formFile">Foto </label>
                          <input
                            type="file"
                            accept="image/*,image/jpeg,image/png"
                            name="foto"
                            onChange={(e) =>onChangePpHandler(e)}
                            id="formFile"
                            className="form-control form-input"
                          />
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
                    <h5 className="card-title">
                      {" "}
                      <FaUser /> Identitas
                    </h5>
                    <small className="card-subtitle">
                      Masukkan identitas kamu dengan baik dan benar disini!
                    </small>
                    <hr />
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group m-2">
                          <label htmlFor="nisn">NISN</label>
                          <input
                            type="number"
                            onChange={(e) =>siswaHandleChange(e)}
                            onKeyPress={(e)=>inputNumOnly(e)}
                            pattern="[0-9]"
                            defaultValue={valSiswa.nisn}
                            name="nisn"
                            id="nisn"
                            className="form-input form-control"
                            placeholder="NISN"
                            required
                          />
                        </div>
                        <div className="form-group m-2">
                          <label htmlFor="nik">NIK</label>
                          <input
                            type="number"
                            onChange={(e) =>siswaHandleChange(e)}
                            onKeyPress={(e)=>inputNumOnly(e)}
                            pattern="[0-9]"
                            defaultValue={valSiswa.nik}
                            name="nik"
                            id="nik"
                            className="form-input form-control"
                            placeholder="NIK"
                            required
                          />
                        </div>
                        <div className="form-group m-2">
                          <label htmlFor="kip">KIP</label>
                          <input
                            type="number"
                            onChange={(e) =>siswaHandleChange(e)}
                            onKeyPress={(e)=>inputNumOnly(e)}
                            pattern="[0-9]"
                            name="kip"
                            defaultValue={valSiswa.kip ? valSiswa.kip : '-'}
                            id="kip"
                            className="form-input form-control"
                            placeholder="KIP"
                          />
                        </div>
                        <div className="form-group m-2">
                          <label htmlFor="nama">Nama</label>
                          <input
                            type="text"
                            onChange={(e) =>siswaHandleChange(e)}
                            defaultValue={valSiswa.nama}
                            name="nama"
                            id="nama"
                            className="form-input form-control"
                            placeholder="Nama"
                            required
                          />
                        </div>
                        <div className="form-group m-2">
                          <label htmlFor="alamat">Alamat</label>
                          <textarea
                            name="alamat"
                            onChange={(e) =>siswaHandleChange(e)}
                            id="alamat"
                            defaultValue={valSiswa.alamat}
                            className="form-control form-input"
                            placeholder="Alamat"
                            cols="30"
                            rows="7"
                            required
                          ></textarea>
                        </div>
                        <div className="form-group m-2">
                          <label htmlFor="tempat_lahir">Tempat Lahir</label>
                          <input
                            type="text"
                            onChange={(e) =>siswaHandleChange(e)}
                            name="tempat_lahir"
                            defaultValue={valSiswa.tempat_lahir}
                            id="tempat_lahir"
                            className="form-input form-control"
                            placeholder="Tempat Lahir"
                            required
                          />
                        </div>
                        <div className="form-group m-2">
                          <label htmlFor="tanggal_lahir">Tanggal Lahir</label>
                          <input
                            type="date"
                            onChange={(e) =>siswaHandleChange(e)}
                            name="tanggal_lahir"
                            defaultValue={valSiswa.tanggal_lahir}
                            id="tanggal_lahir"
                            className="form-input form-control"
                            placeholder="Tanggal Lahir"
                            required
                          />
                        </div>
                        <div className="form-group m-2">
                          <label htmlFor="jenis_kelamin">Jenis Kelamin</label>
                          <Form.Select
                            onChange={(e) =>siswaHandleChange(e)}
                            value={valSiswa.jenis_kelamin}
                            name="jenis_kelamin"
                            id="jenis_kelamin"
                            className="form-control form-input"
                            required
                          >
                            <option value="">--Pilih Jenis Kelamin--</option>
                            <option value="L" key={"L"}>Laki Laki</option>
                            <option value="P" key={"P"}>Perempuan</option>
                          </Form.Select>
                        </div>
                        <div className="form-group m-2">
                          <label htmlFor="agama">Agama</label>
                          <Form.Select aria-label="agama"
                            onChange={(e) => siswaHandleChange(e)}
                            value={valSiswa.agama}
                            name="agama"
                            id="agama"
                            className="form-control form-input"
                            required
                          >
                            <option value="">--Pilih Agama--</option>
                            {agama &&
                              agama.map((result) => {
                                return <option value={result} key={result}>{result}</option>;
                              })}
                          </Form.Select>
                        </div>
                        <div className="form-group m-2">
                          <label htmlFor="jml_saudara">Jumlah Saudara</label>
                          <input
                            type="number"
                            onChange={(e) =>siswaHandleChange(e)}
                            name="jml_saudara"
                            id="jml_saudara"
                            className="form-input form-control"
                            placeholder="Jumlah Saudara"
                            defaultValue={valSiswa.jml_saudara ? valSiswa.jml_saudara : 0}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group m-2">
                          <label htmlFor="anak_ke">Anak Ke</label>
                          <input
                            type="number"
                            onChange={(e) =>siswaHandleChange(e)}
                            name="anak_ke"
                            id="anak_ke"
                            className="form-input form-control"
                            placeholder="Anak Ke"
                            defaultValue={valSiswa.anak_ke ? valSiswa.anak_ke : 1}
                          />
                        </div>
                        <div className="form-group m-2">
                          <label htmlFor="hobi">Hobi</label>
                          <input
                            type="text"
                            onChange={(e) =>siswaHandleChange(e)}
                            name="hobi"
                            id="hobi"
                            className="form-input form-control"
                            placeholder="Hobi"
                            defaultValue={valSiswa.hobi ? valSiswa.hobi : '-'}
                          />
                        </div>
                        <div className="form-group m-2">
                          <label htmlFor="cita_cita">Cita Cita</label>
                          <input
                            type="text"
                            onChange={(e) =>siswaHandleChange(e)}
                            name="cita_cita"
                            id="cita_cita"
                            className="form-input form-control"
                            placeholder="Cita Cita"
                            defaultValue={valSiswa.cita_cita ? valSiswa.cita_cita : '-'}
                          />
                        </div>
                        <div className="form-group m-2">
                          <label htmlFor="no_hp">No Hp</label>
                          <input
                            type="number"
                            onChange={(e) =>siswaHandleChange(e)}
                            name="no_hp"
                            id="no_hp"
                            className="form-input form-control"
                            placeholder="No Hp"
                            defaultValue={valSiswa.no_hp}
                            required
                          />
                        </div>
                        <div className="form-group m-2">
                          <label htmlFor="email">Email</label>
                          <input
                            type="mail"
                            onChange={(e) =>siswaHandleChange(e)}
                            name="email"
                            id="email"
                            className="form-input form-control"
                            placeholder="Email"
                            defaultValue={valSiswa.email}
                            required
                          />
                        </div>
                        <div className="form-group m-2">
                          <label htmlFor="yg_membiayai">Yang Membiayai</label>
                          <input
                            type="text"
                            onChange={(e) =>siswaHandleChange(e)}
                            name="yg_membiayai"
                            id="yg_membiayai"
                            className="form-input form-control"
                            placeholder="Yang Membiayai"
                            defaultValue={valSiswa.yg_membiayai  ? valSiswa.yg_membiayai : '-'}
                          />
                        </div>
                        <div className="form-group m-2">
                          <label htmlFor="disabilitas">Disabilitas</label>
                          <input
                            type="text"
                            onChange={(e) =>siswaHandleChange(e)}
                            name="disabilitas"
                            id="disabilitas"
                            className="form-input form-control"
                            placeholder="Disabilitas"
                            defaultValue={valSiswa.disabilitas  ? valSiswa.disabilitas : '-'}
                          />
                        </div>
                        <div className="form-group m-2">
                          <label htmlFor="kebutuhan_khusus">
                            Kebutuhan khusus
                          </label>
                          <input
                            type="text"
                            onChange={(e) =>siswaHandleChange(e)}
                            name="kebutuhan_khusus"
                            id="kebutuhan_khusus"
                            className="form-input form-control"
                            placeholder="Kebutuhan Khusus"
                            defaultValue={valSiswa.kebutuhan_khusus  ? valSiswa.kebutuhan_khusus : '-'}
                          />
                        </div>
                        <div className="form-group m-2">
                          <label htmlFor="status_tempat_tinggal">
                            Status Tempat Tinggal
                          </label>
                          <input
                            type="text"
                            onChange={(e) =>siswaHandleChange(e)}
                            name="status_tempat_tinggal"
                            id="status_tempat_tinggal"
                            className="form-input form-control"
                            placeholder="Status Tempat Tinggal"
                            defaultValue={valSiswa.status_tempat_tinggal  ? valSiswa.status_tempat_tinggal : '-'}
                          />
                        </div>
                        <div className="form-group m-2">
                          <label htmlFor="jarak_tempat_tinggal">
                            Jarak Tempat Tinggal (Meter)
                          </label>
                          <input
                            type="number"
                            onChange={(e) =>siswaHandleChange(e)}
                            name="jarak_tempat_tinggal"
                            id="jarak_tempat_tinggal"
                            className="form-input form-control"
                            placeholder="Jarak Tempat Tinggal"
                            defaultValue={valSiswa.jarak_tempat_tinggal  ? valSiswa.jarak_tempat_tinggal : '0'}
                          />
                        </div>
                        <div className="form-group m-2">
                          <label htmlFor="waktu_tempuh">
                            Waktu Tempuh (Menit)
                          </label>
                          <input
                            type="number"
                            onChange={(e) =>siswaHandleChange(e)}
                            name="waktu_tempuh"
                            id="waktu_tempuh"
                            className="form-input form-control"
                            placeholder="Waktu Tempuh"
                            defaultValue={valSiswa.waktu_tempuh  ? valSiswa.waktu_tempuh : '0'}
                          />
                        </div>
                        <div className="form-group m-2">
                          <label htmlFor="transportasi">Transportasi</label>
                          <input
                            type="text"
                            onChange={(e) =>siswaHandleChange(e)}
                            name="transportasi"
                            id="transportasi"
                            className="form-input form-control"
                            placeholder="Transportasi"
                            defaultValue={valSiswa.transportasi  ? valSiswa.cita_cita : '-'}
                          />
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
                    <h5 className="card-title">
                      <RiParentFill /> OrangTua
                    </h5>
                    <small className="card-subtitle">
                      Masukkan Data Orang tua kamu disini !
                    </small>
                    <hr />
                    <Accordion defaultActiveKey={0}>
                              <Accordion.Item eventKey={0} key={0}>
                                <Accordion.Header>Ayah</Accordion.Header>
                                <Accordion.Body>
                                  <div className="container">
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div className="form-group">
                                          <label htmlFor="nama">Nama</label>
                                          <input
                                            type="text"
                                            onChange={(e) => dataAyahHandleChange(e)}
                                            defaultValue={Ayah.nama}
                                            placeholder="Nama"
                                            className="form-input form-control"
                                            name={
                                              "nama"
                                            }
                                            
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="nik">NIK</label>
                                          <input
                                            type="number"
                                            onChange={(e) =>dataOrangtuaHandleChange(e)}
                                            defaultValue={Ayah.nik}
                                            placeholder="NIK"
                                            className="form-input form-control"
                                            name={"nik_ayah"}
                                           
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="tempat_lahir">
                                            Tempat Lahir
                                          </label>
                                          <input
                                            type="text"
                                            onChange={(e) =>dataOrangtuaHandleChange(e)}
                                            defaultValue={Ayah.tempat_lahir}
                                            placeholder="Tempat Lahir"
                                            className="form-input form-control"
                                            name={
                                              "tempat_lahir_ayah"
                                            }
                                            
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="tanggal_lahir">
                                            Tanggal Lahir
                                          </label>
                                          <input
                                            type="date"
                                            onChange={(e) =>dataOrangtuaHandleChange(e)}
                                            defaultValue={Ayah.tanggal_lahir}
                                            placeholder="Tanggal Lahir"
                                            className="form-input form-control"
                                            name={
                                              "tanggal_lahir_ayah"
                                            }
                                          
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="alamat">Alamat</label>
                                          <textarea
                                            onChange={(e) =>dataOrangtuaHandleChange(e)}
                                            defaultValue={Ayah.alamat}
                                            name={
                                              "alamat_ayah"
                                            }
                                            className="form-control"
                                            placeholder="Alamat"
                                            cols="30"
                                            rows="6"
                                          
                                          ></textarea>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="form-group">
                                          <label htmlFor="no_hp">No Hp</label>
                                          <input
                                            type="text"
                                            onChange={(e) =>dataOrangtuaHandleChange(e)}
                                            defaultValue={Ayah.no_hp}
                                            placeholder="No Hp"
                                            className="form-input form-control"
                                            name={
                                              "no_hp_ayah"
                                            }
                                          
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="status">Status</label>
                                          <input
                                            type="text"
                                            onChange={(e) =>dataOrangtuaHandleChange(e)}
                                            defaultValue={Ayah.status}
                                            placeholder="Status"
                                            className="form-input form-control"
                                            name={
                                              "status_ayah"
                                            }
                                          
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="pekerjaan_utama">
                                            Pekerjaan Utama
                                          </label>
                                          <input
                                            type="text"
                                            onChange={(e) =>dataOrangtuaHandleChange(e)}
                                            defaultValue={Ayah.pekerjaan_utama}
                                            placeholder="Pekerjaan Utama"
                                            className="form-input form-control"
                                            name={
                                              "pekerjaan_utama_ayah"
                                            }
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="pendidikan_terakhir">
                                            Pendidikan Terakhir
                                          </label>
                                          <input
                                            type="text"
                                            onChange={(e) =>dataOrangtuaHandleChange(e)}
                                            defaultValue={
                                              Ayah.pendidikan_terakhir
                                            }
                                            placeholder="Pendidikan Terakhir"
                                            className="form-input form-control"
                                            name={
                                              "pendidikan_terakhir_ayah"
                                            }
                                           
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="domisili">
                                            Domisili
                                          </label>
                                          <input
                                            type="text"
                                            onChange={(e) =>dataOrangtuaHandleChange(e)}
                                            defaultValue={Ayah.domisili}
                                            placeholder="Domisili"
                                            className="form-input form-control"
                                            name={
                                              "domisili_ayah"
                                            }
                                           
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="penghasilan_rata_rata">
                                            Penghasilan Rata Rata
                                          </label>
                                          <input
                                            type="number"
                                            onChange={(e) =>dataOrangtuaHandleChange(e)}
                                            defaultValue={
                                              Ayah.penghasilan_rata_rata
                                            }
                                            placeholder="Penghasilan Rata Rata"
                                            className="form-input form-control"
                                            name={
                                              "penghasilan_rata_rata_ayah"
                                            }
                                           
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="status_tempat_tinggal">
                                            Status Tempat Tinggal
                                          </label>
                                          <input
                                            type="text"
                                            onChange={(e) =>dataOrangtuaHandleChange(e)}
                                            defaultValue={
                                              Ayah.status_tempat_tinggal
                                            }
                                            placeholder="Status Tempat Tinggal"
                                            className="form-input form-control"
                                            name={
                                              "status_tempat_tinggal_ayah"
                                            }
                                          
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Accordion.Body>
                              </Accordion.Item>
                              <Accordion.Item eventKey={1} key={1}>
                                <Accordion.Header>Ibu</Accordion.Header>
                                <Accordion.Body>
                                  <div className="container">
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div className="form-group">
                                          <label htmlFor="nama">Nama</label>
                                          <input
                                            type="text"
                                            onChange={(e) =>dataOrangtuaHandleChange(e)}
                                            defaultValue={Ibu.nama}
                                            placeholder="Nama"
                                            className="form-input form-control"
                                            name={
                                              "nama_ibu"
                                            }
                                           
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="nik">NIK</label>
                                          <input
                                            type="number"
                                            onChange={(e) =>dataOrangtuaHandleChange(e)}
                                            defaultValue={Ibu.nik}
                                            placeholder="NIK"
                                            className="form-input form-control"
                                            name={"nik_ibu"}
                                          
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="tempat_lahir">
                                            Tempat Lahir
                                          </label>
                                          <input
                                            type="text"
                                            onChange={(e) =>dataOrangtuaHandleChange(e)}
                                            defaultValue={Ibu.tempat_lahir}
                                            placeholder="Tempat Lahir"
                                            className="form-input form-control"
                                            name={
                                              "tempat_lahir_ibu"
                                            }
                                           
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="tanggal_lahir">
                                            Tanggal Lahir
                                          </label>
                                          <input
                                            type="date"
                                            onChange={(e) =>dataOrangtuaHandleChange(e)}
                                            defaultValue={Ibu.tanggal_lahir}
                                            placeholder="Tanggal Lahir"
                                            className="form-input form-control"
                                            name={
                                              "tanggal_lahir_ibu"
                                            }
                                         
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="alamat">Alamat</label>
                                          <textarea
                                            onChange={(e) =>dataOrangtuaHandleChange(e)}
                                            defaultValue={Ibu.alamat}
                                            name={
                                              "alamat_ibu"
                                            }
                                            className="form-control"
                                            placeholder="Alamat"
                                            cols="30"
                                            rows="6"
                                          
                                          ></textarea>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="form-group">
                                          <label htmlFor="no_hp">No Hp</label>
                                          <input
                                            type="text"
                                            onChange={(e) =>dataOrangtuaHandleChange(e)}
                                            defaultValue={Ibu.no_hp}
                                            placeholder="No Hp"
                                            className="form-input form-control"
                                            name={
                                              "no_hp_ibu"
                                            }
                                          
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="status">Status</label>
                                          <input
                                            type="text"
                                            onChange={(e) =>dataOrangtuaHandleChange(e)}
                                            defaultValue={Ibu.status}
                                            placeholder="Status"
                                            className="form-input form-control"
                                            name={
                                              "status_ibu"
                                            }
                                           
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="pekerjaan_utama">
                                            Pekerjaan Utama
                                          </label>
                                          <input
                                            type="text"
                                            onChange={(e) =>dataOrangtuaHandleChange(e)}
                                            defaultValue={Ibu.pekerjaan_utama}
                                            placeholder="Pekerjaan Utama"
                                            className="form-input form-control"
                                            name={
                                              "pekerjaan_utama_ibu"
                                            }
                                          
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="pendidikan_terakhir">
                                            Pendidikan Terakhir
                                          </label>
                                          <input
                                            type="text"
                                            onChange={(e) =>dataOrangtuaHandleChange(e)}
                                            defaultValue={
                                              Ibu.pendidikan_terakhir
                                            }
                                            placeholder="Pendidikan Terakhir"
                                            className="form-input form-control"
                                            name={
                                              "pendidikan_terakhir_ibu"
                                            }
                                          
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="domisili">
                                            Domisili
                                          </label>
                                          <input
                                            type="text"
                                            onChange={(e) =>dataOrangtuaHandleChange(e)}
                                            defaultValue={Ibu.domisili}
                                            placeholder="Domisili"
                                            className="form-input form-control"
                                            name={
                                              "domisili_ibu"
                                            }
                                           
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="penghasilan_rata_rata">
                                            Penghasilan Rata Rata
                                          </label>
                                          <input
                                            type="number"
                                            onChange={(e) =>dataOrangtuaHandleChange(e)}
                                            defaultValue={
                                              Ibu.penghasilan_rata_rata
                                            }
                                            placeholder="Penghasilan Rata Rata"
                                            className="form-input form-control"
                                            name={
                                              "penghasilan_rata_rata_ibu"
                                            }
                                           
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="status_tempat_tinggal">
                                            Status Tempat Tinggal
                                          </label>
                                          <input
                                            type="text"
                                            onChange={(e) =>dataOrangtuaHandleChange(e)}
                                            defaultValue={
                                              Ibu.status_tempat_tinggal
                                            }
                                            placeholder="Status Tempat Tinggal"
                                            className="form-input form-control"
                                            name={
                                              "status_tempat_tinggal_ibu"
                                            }
                                          
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Accordion.Body>
                              </Accordion.Item>
                              <Accordion.Item eventKey={2} key={2}>
                                <Accordion.Header>Wali</Accordion.Header>
                                <Accordion.Body>
                                  <div className="container">
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div className="form-group">
                                          <label htmlFor="nama">Nama</label>
                                          <input
                                            type="text"
                                            onChange={(e) =>dataOrangtuaHandleChange(e)}
                                            defaultValue={Wali.nama}
                                            placeholder="Nama"
                                            className="form-input form-control"
                                            name={
                                              "nama_wali"
                                            }
                                           
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="nik">NIK</label>
                                          <input
                                            type="number"
                                            onChange={(e) =>dataOrangtuaHandleChange(e)}
                                            defaultValue={Wali.nik}
                                            placeholder="NIK"
                                            className="form-input form-control"
                                            name={"nik_wali"}
                                          
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="tempat_lahir">
                                            Tempat Lahir
                                          </label>
                                          <input
                                            type="text"
                                            onChange={(e) =>dataOrangtuaHandleChange(e)}
                                            defaultValue={Wali.tempat_lahir}
                                            placeholder="Tempat Lahir"
                                            className="form-input form-control"
                                            name={
                                              "tempat_lahir_wali"
                                            }
                                          
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="tanggal_lahir">
                                            Tanggal Lahir
                                          </label>
                                          <input
                                            type="date"
                                            onChange={(e) =>dataOrangtuaHandleChange(e)}
                                            defaultValue={Wali.tanggal_lahir}
                                            placeholder="Tanggal Lahir"
                                            className="form-input form-control"
                                            name={
                                              "tanggal_lahir_wali"
                                            }
                                          
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="alamat">Alamat</label>
                                          <textarea
                                            onChange={(e) =>dataOrangtuaHandleChange(e)}
                                            defaultValue={Wali.alamat}
                                            name={
                                              "alamat_wali"
                                            }
                                            className="form-control"
                                            placeholder="Alamat"
                                            cols="30"
                                            rows="6"
                                          
                                          ></textarea>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="form-group">
                                          <label htmlFor="no_hp">No Hp</label>
                                          <input
                                            type="text"
                                            onChange={(e) =>dataOrangtuaHandleChange(e)}
                                            defaultValue={Wali.no_hp}
                                            placeholder="No Hp"
                                            className="form-input form-control"
                                            name={
                                              "no_hp_wali"
                                            }
                                          
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="status">Status</label>
                                          <input
                                            type="text"
                                            onChange={(e) =>dataOrangtuaHandleChange(e)}
                                            defaultValue={Wali.status}
                                            placeholder="Status"
                                            className="form-input form-control"
                                            name={
                                              "status_wali"
                                            }
                                          
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="pekerjaan_utama">
                                            Pekerjaan Utama
                                          </label>
                                          <input
                                            type="text"
                                            onChange={(e) =>dataOrangtuaHandleChange(e)}
                                            defaultValue={Wali.pekerjaan_utama}
                                            placeholder="Pekerjaan Utama"
                                            className="form-input form-control"
                                            name={
                                              "pekerjaan_utama_wali"
                                            }
                                          
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="pendidikan_terakhir">
                                            Pendidikan Terakhir
                                          </label>
                                          <input
                                            type="text"
                                            onChange={(e) =>dataOrangtuaHandleChange(e)}
                                            defaultValue={
                                              Wali.pendidikan_terakhir
                                            }
                                            placeholder="Pendidikan Terakhir"
                                            className="form-input form-control"
                                            name={
                                              "pendidikan_terakhir_wali"
                                            }
                                          
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="domisili">
                                            Domisili
                                          </label>
                                          <input
                                            type="text"
                                            onChange={(e) =>dataOrangtuaHandleChange(e)}
                                            defaultValue={Wali.domisili}
                                            placeholder="Domisili"
                                            className="form-input form-control"
                                            name={
                                              "domisili_wali"
                                            }
                                          
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="penghasilan_rata_rata">
                                            Penghasilan Rata Rata
                                          </label>
                                          <input
                                            onChange={(e) =>dataOrangtuaHandleChange(e)}
                                            type="number"
                                            defaultValue={
                                              Wali.penghasilan_rata_rata
                                            }
                                            placeholder="Penghasilan Rata Rata"
                                            className="form-input form-control"
                                            name={
                                              "penghasilan_rata_rata_wali"
                                            }
                                          
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="status_tempat_tinggal">
                                            Status Tempat Tinggal
                                          </label>
                                          <input
                                            onChange={(e) =>dataOrangtuaHandleChange(e)}
                                            type="text"
                                            defaultValue={
                                              Wali.status_tempat_tinggal
                                            }
                                            placeholder="Status Tempat Tinggal"
                                            className="form-input form-control"
                                            name={
                                              "status_tempat_tinggal_wali"
                                            }
                                          
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Accordion.Body>
                              </Accordion.Item>
                    </Accordion>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="card card-primary shadow m-3">
                  <div className="card-body">
                    <h5 className="card-title">
                      {" "}
                      <IoSchool /> Asal Sekolah
                    </h5>
                    <small className="card-subtitle">
                      Masukkan asal sekolah kamu disini !
                    </small>
                    <hr />
                    <div className="form-group m-2">
                      <label htmlFor="asal_sekolah">Asal Sekolah</label>
                      <input
                        type="text"
                        onChange={(e) =>dataLainHandleChange(e)}
                        defaultValue={dataLainSiswa.asal_sekolah}
                        name="asal_sekolah"
                        id="asal_sekolah"
                        className="form-input form-control"
                        placeholder="Asal Sekolah"
                        required
                      />
                    </div>
                    <div className="form-group m-2">
                      <label htmlFor="alamat_sekolah">Alamat Sekolah</label>
                      <textarea
                        onChange={(e) =>dataLainHandleChange(e)}
                        name="alamat_sekolah"
                        defaultValue={dataLainSiswa.alamat_sekolah}
                        id="alamat_sekolah"
                        className="form-control form-input"
                        cols="30"
                        rows="5"
                        placeholder="Alamat Sekolah"
                        required
                      ></textarea>
                    </div>
                    <div className="form-group m-2">
                      <label htmlFor="no_telp_sekolah">No Hp Sekolah</label>
                      <input
                        type="text"
                        onChange={(e) =>dataLainHandleChange(e)}
                        name="no_telp_sekolah"
                        defaultValue={dataLainSiswa.no_telp_sekolah}
                        id="no_telp_sekolah"
                        className="form-input form-control"
                        placeholder="No Telp Sekolah"
                        required
                      />
                    </div>
                    <div className="form-group m-2">
                      <label htmlFor="provinsi_sekolah">Provinsi Sekolah</label>
                      <input
                        type="text"
                        onChange={(e) =>dataLainHandleChange(e)}
                        name="provinsi_sekolah"
                        id="provinsi_sekolah"
                        defaultValue={dataLainSiswa.provinsi_sekolah}
                        placeholder="Provinsi Sekolah"
                        className="form-control form-input"
                        required
                      />
                    </div>
                    <div className="form-group m-2">
                      <label htmlFor="kota_sekolah">Kota Sekolah</label>
                      <input
                        type="text"
                        onChange={(e) =>dataLainHandleChange(e)}
                        name="kota_sekolah"
                        defaultValue={dataLainSiswa.kota_sekolah}
                        id="kota_sekolah"
                        placeholder="Kota Sekolah"
                        className="form-control form-input"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <button type="submit" className="btn btn-primary m-3">
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Pendaftar;
