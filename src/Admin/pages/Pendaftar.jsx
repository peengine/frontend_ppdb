import React from "react";
import vectors from "../Components/Images/2.png";
import { FaImages, FaUser } from "react-icons/fa";
import { IoSchool } from "react-icons/io5";
import { RiParentFill } from "react-icons/ri";
import { Accordion, Form } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Pendaftar = (props) => {
  const ortu = ["Ayah", "Ibu", "Wali"];
  const agama = ["Islam", "Kristen", "Katholik", "Hindu", "Budha", "Konghucu"];
  const URLS = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem("token");

  const pPp =props.dataPendaftar.pendaftar != null && props.dataPendaftar.pendaftar.foto != "-"? URLS + props.dataPendaftar.pendaftar.foto: vectors;
  const pSiswa = props.dataPendaftar.pendaftar != null ? props.dataPendaftar.pendaftar : {};
  const pOrtu = props.dataPendaftar.data_orangtua != null ? props.dataPendaftar.data_orangtua : [];
  const pLain = props.dataPendaftar.data_lain != null ? props.dataPendaftar.data_lain : {};

  const [pp, setPp] = useState(vectors);
  const [valOrtu, setOrtu] = useState([]);
  const [valSiswa, setSiswa] = useState({});
  const [dataLainSiswa, setDataLain] = useState({});

  const [Ayah, setAyah] = useState({});
  const [Ibu, setIbu] = useState({});
  const [Wali, setWali] = useState({});

  const [validation, setValidation] = useState();
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
    const { name, files } = e.target;
    setSiswa((prev) => {
      return { ...prev, [name]: files[0] };
    });
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
  const dataOrangtuaHandleChange = (e) => {
    const { name, value } = e.target;
    if (name.endsWith("ayah")) {
      setAyah((prev) => {
        return { ...prev, [name.replace("_ayah", "")]: value };
      });
    }
    if (name.endsWith("ibu")) {
      setIbu((prev) => {
        return { ...prev, [name.replace("_ibu", "")]: value };
      });
    }
    if (name.endsWith("wali")) {
      setWali((prev) => {
        return { ...prev, [name.replace("_wali", "")]: value };
      });
    }
    setOrtu([Ayah, Ibu, Wali]);
    console.log(valOrtu);
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div>
        <form onSubmit={() => onSubmitHandler()} method="POST">
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
                            onChange={onChangePpHandler}
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
                            type="text"
                            onChange={siswaHandleChange}
                            defaultValue={valSiswa.nisn}
                            name="nisn"
                            id="nisn"
                            className="form-input form-control"
                            placeholder="NISN"
                          />
                        </div>
                        <div className="form-group m-2">
                          <label htmlFor="nik">NIK</label>
                          <input
                            type="text"
                            onChange={siswaHandleChange}
                            defaultValue={valSiswa.nik}
                            name="nik"
                            id="nik"
                            className="form-input form-control"
                            placeholder="NIK"
                          />
                        </div>
                        <div className="form-group m-2">
                          <label htmlFor="kip">KIP</label>
                          <input
                            type="text"
                            onChange={siswaHandleChange}
                            name="kip"
                            defaultValue={valSiswa.kip}
                            id="kip"
                            className="form-input form-control"
                            placeholder="KIP"
                          />
                        </div>
                        <div className="form-group m-2">
                          <label htmlFor="nama">Nama</label>
                          <input
                            type="text"
                            onChange={siswaHandleChange}
                            defaultValue={valSiswa.nama}
                            name="nama"
                            id="nama"
                            className="form-input form-control"
                            placeholder="Nama"
                          />
                        </div>
                        <div className="form-group m-2">
                          <label htmlFor="alamat">Alamat</label>
                          <textarea
                            name="alamat"
                            onChange={siswaHandleChange}
                            id="alamat"
                            defaultValue={valSiswa.alamat}
                            className="form-control form-input"
                            placeholder="Alamat"
                            cols="30"
                            rows="7"
                          ></textarea>
                        </div>
                        <div className="form-group m-2">
                          <label htmlFor="tempat_lahir">Tempat Lahir</label>
                          <input
                            type="text"
                            onChange={siswaHandleChange}
                            name="tempat_lahir"
                            defaultValue={valSiswa.tempat_lahir}
                            id="tempat_lahir"
                            className="form-input form-control"
                            placeholder="Tempat Lahir"
                          />
                        </div>
                        <div className="form-group m-2">
                          <label htmlFor="tanggal_lahir">Tanggal Lahir</label>
                          <input
                            type="date"
                            onChange={siswaHandleChange}
                            name="tanggal_lahir"
                            defaultValue={valSiswa.tanggal_lahir}
                            id="tanggal_lahir"
                            className="form-input form-control"
                            placeholder="Tanggal Lahir"
                          />
                        </div>
                        <div className="form-group m-2">
                          <label htmlFor="jenis_kelamin">Jenis Kelamin</label>
                          <Form.Select
                            onChange={siswaHandleChange}
                            value={valSiswa.jenis_kelamin}
                            name="jenis_kelamin"
                            id="jenis_kelamin"
                            className="form-control form-input"
                          >
                            <option value="L">Laki Laki</option>
                            <option value="P">Perempuan</option>
                          </Form.Select>
                        </div>
                        <div className="form-group m-2">
                          <label htmlFor="agama">Agama</label>
                          <Form.Select
                            onChange={siswaHandleChange}
                            value={valSiswa.agama}
                            name="agama"
                            id="agama"
                            className="form-control form-input"
                          >
                            {agama &&
                              agama.map((result) => {
                                return <option value={result}>{result}</option>;
                              })}
                          </Form.Select>
                        </div>
                        <div className="form-group m-2">
                          <label htmlFor="jml_saudara">Jumlah Saudara</label>
                          <input
                            type="number"
                            onChange={siswaHandleChange}
                            name="jml_saudara"
                            id="jml_saudara"
                            className="form-input form-control"
                            placeholder="Jumlah Saudara"
                            defaultValue={valSiswa.jml_saudara}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group m-2">
                          <label htmlFor="anak_ke">Anak Ke</label>
                          <input
                            type="number"
                            onChange={siswaHandleChange}
                            name="anak_ke"
                            id="anak_ke"
                            className="form-input form-control"
                            placeholder="Anak Ke"
                            defaultValue={valSiswa.anak_ke}
                          />
                        </div>
                        <div className="form-group m-2">
                          <label htmlFor="hobi">Hobi</label>
                          <input
                            type="text"
                            onChange={siswaHandleChange}
                            name="hobi"
                            id="hobi"
                            className="form-input form-control"
                            placeholder="Hobi"
                            defaultValue={valSiswa.hobi}
                          />
                        </div>
                        <div className="form-group m-2">
                          <label htmlFor="cita_cita">Cita Cita</label>
                          <input
                            type="text"
                            onChange={siswaHandleChange}
                            name="cita_cita"
                            id="cita_cita"
                            className="form-input form-control"
                            placeholder="Cita Cita"
                            defaultValue={valSiswa.cita_cita}
                          />
                        </div>
                        <div className="form-group m-2">
                          <label htmlFor="no_hp">No Hp</label>
                          <input
                            type="number"
                            onChange={siswaHandleChange}
                            name="no_hp"
                            id="no_hp"
                            className="form-input form-control"
                            placeholder="No Hp"
                            defaultValue={valSiswa.no_hp}
                          />
                        </div>
                        <div className="form-group m-2">
                          <label htmlFor="email">Email</label>
                          <input
                            type="mail"
                            onChange={siswaHandleChange}
                            name="email"
                            id="email"
                            className="form-input form-control"
                            placeholder="Email"
                            defaultValue={valSiswa.email}
                          />
                        </div>
                        <div className="form-group m-2">
                          <label htmlFor="yg_membiayai">Yang Membiayai</label>
                          <input
                            type="text"
                            onChange={siswaHandleChange}
                            name="yg_membiayai"
                            id="yg_membiayai"
                            className="form-input form-control"
                            placeholder="Yang Membiayai"
                            defaultValue={valSiswa.yg_membiayai}
                          />
                        </div>
                        <div className="form-group m-2">
                          <label htmlFor="disabilitas">Disabilitas</label>
                          <input
                            type="text"
                            onChange={siswaHandleChange}
                            name="disabilitas"
                            id="disabilitas"
                            className="form-input form-control"
                            placeholder="Disabilitas"
                            defaultValue={valSiswa.disabilitas}
                          />
                        </div>
                        <div className="form-group m-2">
                          <label htmlFor="kebutuhan_khusus">
                            Kebutuhan khusus
                          </label>
                          <input
                            type="text"
                            onChange={siswaHandleChange}
                            name="kebutuhan_khusus"
                            id="kebutuhan_khusus"
                            className="form-input form-control"
                            placeholder="Kebutuhan Khusus"
                            defaultValue={valSiswa.kebutuhan_khusus}
                          />
                        </div>
                        <div className="form-group m-2">
                          <label htmlFor="status_tempat_tinggal">
                            Status Tempat Tinggal
                          </label>
                          <input
                            type="text"
                            onChange={siswaHandleChange}
                            name="status_tempat_tinggal"
                            id="status_tempat_tinggal"
                            className="form-input form-control"
                            placeholder="Status Tempat Tinggal"
                            defaultValue={valSiswa.status_tempat_tinggal}
                          />
                        </div>
                        <div className="form-group m-2">
                          <label htmlFor="jarak_tempat_tinggal">
                            Jarak Tempat Tinggal (Meter)
                          </label>
                          <input
                            type="number"
                            onChange={siswaHandleChange}
                            name="jarak_tempat_tinggal"
                            id="jarak_tempat_tinggal"
                            className="form-input form-control"
                            placeholder="Jarak Tempat Tinggal"
                            defaultValue={valSiswa.jarak_tempat_tinggal}
                          />
                        </div>
                        <div className="form-group m-2">
                          <label htmlFor="waktu_tempuh">
                            Waktu Tempuh (Menit)
                          </label>
                          <input
                            type="number"
                            onChange={siswaHandleChange}
                            name="waktu_tempuh"
                            id="waktu_tempuh"
                            className="form-input form-control"
                            placeholder="Waktu Tempuh"
                            defaultValue={valSiswa.waktu_tempuh}
                          />
                        </div>
                        <div className="form-group m-2">
                          <label htmlFor="transportasi">Transportasi</label>
                          <input
                            type="text"
                            onChange={siswaHandleChange}
                            name="transportasi"
                            id="transportasi"
                            className="form-input form-control"
                            placeholder="Transportasi"
                            defaultValue={valSiswa.transportasi}
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
                      {ortu &&
                        ortu.map((result, index) => {
                          let valor = valOrtu.filter((response) => {
                            return response.type_ortu === result.toLowerCase();
                          })[0];
                          if (typeof valor !== "undefined") {
                            return (
                              <Accordion.Item eventKey={index}>
                                <Accordion.Header>{result}</Accordion.Header>
                                <Accordion.Body>
                                  <div className="container">
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div className="form-group">
                                          <label htmlFor="nama">Nama</label>
                                          <input
                                            type="text"
                                            defaultValue={valor.nama}
                                            placeholder="Nama"
                                            className="form-input form-control"
                                            name={
                                              "nama_" + result.toLowerCase()
                                            }
                                            onChange={dataOrangtuaHandleChange}
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="nik">NIK</label>
                                          <input
                                            type="number"
                                            defaultValue={valor.nik}
                                            placeholder="NIK"
                                            className="form-input form-control"
                                            name={"nik_" + result.toLowerCase()}
                                            onChange={dataOrangtuaHandleChange}
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="tempat_lahir">
                                            Tempat Lahir
                                          </label>
                                          <input
                                            type="text"
                                            defaultValue={valor.tempat_lahir}
                                            placeholder="Tempat Lahir"
                                            className="form-input form-control"
                                            name={
                                              "tempat_lahir_" +
                                              result.toLowerCase()
                                            }
                                            onChange={dataOrangtuaHandleChange}
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="tanggal_lahir">
                                            Tanggal Lahir
                                          </label>
                                          <input
                                            type="date"
                                            defaultValue={valor.tanggal_lahir}
                                            placeholder="Tanggal Lahir"
                                            className="form-input form-control"
                                            name={
                                              "tgl_lahir_" +
                                              result.toLowerCase()
                                            }
                                            onChange={dataOrangtuaHandleChange}
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="alamat">Alamat</label>
                                          <textarea
                                            defaultValue={valor.alamat}
                                            name={
                                              "alamat_" + result.toLowerCase()
                                            }
                                            className="form-control"
                                            placeholder="Alamat"
                                            cols="30"
                                            rows="6"
                                            onChange={dataOrangtuaHandleChange}
                                          ></textarea>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="form-group">
                                          <label htmlFor="no_hp">No Hp</label>
                                          <input
                                            type="text"
                                            defaultValue={valor.no_hp}
                                            placeholder="No Hp"
                                            className="form-input form-control"
                                            name={
                                              "no_hp_" + result.toLowerCase()
                                            }
                                            onChange={dataOrangtuaHandleChange}
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="status">Status</label>
                                          <input
                                            type="text"
                                            defaultValue={valor.status}
                                            placeholder="Status"
                                            className="form-input form-control"
                                            name={
                                              "status_" + result.toLowerCase()
                                            }
                                            onChange={dataOrangtuaHandleChange}
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="pekerjaan_utama">
                                            Pekerjaan Utama
                                          </label>
                                          <input
                                            type="text"
                                            defaultValue={valor.pekerjaan_utama}
                                            placeholder="Pekerjaan Utama"
                                            className="form-input form-control"
                                            name={
                                              "pekerjaan_utama_" +
                                              result.toLowerCase()
                                            }
                                            onChange={dataOrangtuaHandleChange}
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="pendidikan_terakhir">
                                            Pendidikan Terakhir
                                          </label>
                                          <input
                                            type="text"
                                            defaultValue={
                                              valor.pendidikan_terakhir
                                            }
                                            placeholder="Pendidikan Terakhir"
                                            className="form-input form-control"
                                            name={
                                              "pendidikan_terakhir_" +
                                              result.toLowerCase()
                                            }
                                            onChange={dataOrangtuaHandleChange}
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="domisili">
                                            Domisili
                                          </label>
                                          <input
                                            type="text"
                                            defaultValue={valor.domisili}
                                            placeholder="Domisili"
                                            className="form-input form-control"
                                            name={
                                              "domisili_" + result.toLowerCase()
                                            }
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="penghasilan_rata_rata">
                                            Penghasilan Rata Rata
                                          </label>
                                          <input
                                            type="number"
                                            defaultValue={
                                              valor.penghasilan_rata_rata
                                            }
                                            placeholder="Domisili"
                                            className="form-input form-control"
                                            name={
                                              "penghasilan_rata_rata_" +
                                              result.toLowerCase()
                                            }
                                            onChange={dataOrangtuaHandleChange}
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="status_tempat_tinggal">
                                            Status Tempat Tinggal
                                          </label>
                                          <input
                                            type="text"
                                            defaultValue={
                                              valor.status_tempat_tinggal
                                            }
                                            placeholder="Status Tempat Tinggal"
                                            className="form-input form-control"
                                            name={
                                              "status_tempat_tinggal_" +
                                              result.toLowerCase()
                                            }
                                            onChange={dataOrangtuaHandleChange}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Accordion.Body>
                              </Accordion.Item>
                            );
                          } else {
                            return (
                              <Accordion.Item eventKey={index}>
                                <Accordion.Header>{result}</Accordion.Header>
                                <Accordion.Body>
                                  <div className="container">
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div className="form-group">
                                          <label htmlFor="nama">Nama</label>
                                          <input
                                            type="text"
                                            placeholder="Nama"
                                            className="form-input form-control"
                                            name={
                                              "nama_" + result.toLowerCase()
                                            }
                                            onChange={dataOrangtuaHandleChange}
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="nik">NIK</label>
                                          <input
                                            type="number"
                                            placeholder="NIK"
                                            className="form-input form-control"
                                            name={"nik_" + result.toLowerCase()}
                                            onChange={dataOrangtuaHandleChange}
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="tempat_lahir">
                                            Tempat Lahir
                                          </label>
                                          <input
                                            type="text"
                                            placeholder="Tempat Lahir"
                                            className="form-input form-control"
                                            name={
                                              "tempat_lahir_" +
                                              result.toLowerCase()
                                            }
                                            onChange={dataOrangtuaHandleChange}
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="tanggal_lahir">
                                            Tanggal Lahir
                                          </label>
                                          <input
                                            type="date"
                                            placeholder="Tanggal Lahir"
                                            className="form-input form-control"
                                            name={
                                              "tgl_lahir_" +
                                              result.toLowerCase()
                                            }
                                            onChange={dataOrangtuaHandleChange}
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="alamat">Alamat</label>
                                          <textarea
                                            name={
                                              "alamat_" + result.toLowerCase()
                                            }
                                            className="form-control"
                                            placeholder="Alamat"
                                            cols="30"
                                            rows="6"
                                            onChange={dataOrangtuaHandleChange}
                                          ></textarea>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="form-group">
                                          <label htmlFor="no_hp">No Hp</label>
                                          <input
                                            type="text"
                                            placeholder="No Hp"
                                            className="form-input form-control"
                                            name={
                                              "no_hp_" + result.toLowerCase()
                                            }
                                            onChange={dataOrangtuaHandleChange}
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="status">Status</label>
                                          <input
                                            type="text"
                                            placeholder="Status"
                                            className="form-input form-control"
                                            name={
                                              "status_" + result.toLowerCase()
                                            }
                                            onChange={dataOrangtuaHandleChange}
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="pekerjaan_utama">
                                            Pekerjaan Utama
                                          </label>
                                          <input
                                            type="text"
                                            placeholder="Pekerjaan Utama"
                                            className="form-input form-control"
                                            name={
                                              "pekerjaan_utama_" +
                                              result.toLowerCase()
                                            }
                                            onChange={dataOrangtuaHandleChange}
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="pendidikan_terakhir">
                                            Pendidikan Terakhir
                                          </label>
                                          <input
                                            type="text"
                                            placeholder="Pendidikan Terakhir"
                                            className="form-input form-control"
                                            name={
                                              "pendidikan_terakhir_" +
                                              result.toLowerCase()
                                            }
                                            onChange={dataOrangtuaHandleChange}
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="domisili">
                                            Domisili
                                          </label>
                                          <input
                                            type="text"
                                            placeholder="Domisili"
                                            className="form-input form-control"
                                            name={
                                              "domisili_" + result.toLowerCase()
                                            }
                                            onChange={dataOrangtuaHandleChange}
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="penghasilan_rata_rata">
                                            Penghasilan Rata Rata
                                          </label>
                                          <input
                                            type="number"
                                            placeholder="Domisili"
                                            className="form-input form-control"
                                            name={
                                              "penghasilan_rata_rata_" +
                                              result.toLowerCase()
                                            }
                                            onChange={dataOrangtuaHandleChange}
                                          />
                                        </div>
                                        <div className="form-group">
                                          <label htmlFor="status_tempat_tinggal">
                                            Status Tempat Tinggal
                                          </label>
                                          <input
                                            type="text"
                                            placeholder="Status Tempat Tinggal"
                                            className="form-input form-control"
                                            name={
                                              "status_tempat_tinggal_" +
                                              result.toLowerCase()
                                            }
                                            onChange={dataOrangtuaHandleChange}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Accordion.Body>
                              </Accordion.Item>
                            );
                          }
                        })}
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
                        onChange={dataLainHandleChange}
                        defaultValue={dataLainSiswa.asal_sekolah}
                        name="asal_sekolah"
                        id="asal_sekolah"
                        className="form-input form-control"
                        placeholder="Asal Sekolah"
                      />
                    </div>
                    <div className="form-group m-2">
                      <label htmlFor="alamat_sekolah">Alamat Sekolah</label>
                      <textarea
                        onChange={dataLainHandleChange}
                        name="alamat_sekolah"
                        defaultValue={dataLainSiswa.alamat_sekolah}
                        id="alamat_sekolah"
                        className="form-control form-input"
                        cols="30"
                        rows="5"
                        placeholder="Alamat Sekolah"
                      ></textarea>
                    </div>
                    <div className="form-group m-2">
                      <label htmlFor="no_telp_sekolah">No Hp Sekolah</label>
                      <input
                        type="text"
                        onChange={dataLainHandleChange}
                        name="no_telp_sekolah"
                        defaultValue={dataLainSiswa.no_telp_sekolah}
                        id="no_telp_sekolah"
                        className="form-input form-control"
                        placeholder="No Telp Sekolah"
                      />
                    </div>
                    <div className="form-group m-2">
                      <label htmlFor="provinsi_sekolah">Provinsi Sekolah</label>
                      <input
                        type="text"
                        onChange={dataLainHandleChange}
                        name="provinsi_sekolah"
                        id="provinsi_sekolah"
                        defaultValue={dataLainSiswa.provinsi_sekolah}
                        placeholder="Provinsi Sekolah"
                        className="form-control form-input"
                      />
                    </div>
                    <div className="form-group m-2">
                      <label htmlFor="kota_sekolah">Kota Sekolah</label>
                      <input
                        type="text"
                        onChange={dataLainHandleChange}
                        name="kota_sekolah"
                        defaultValue={dataLainSiswa.kota_sekolah}
                        id="kota_sekolah"
                        placeholder="Kota Sekolah"
                        className="form-control form-input"
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
