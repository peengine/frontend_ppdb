import React from 'react'
import vectors from '../Components/Images/2.png'
import { FaImages,FaUser } from "react-icons/fa";
import { IoSchool } from "react-icons/io5";
import { RiParentFill } from "react-icons/ri";
import { Accordion, Form } from 'react-bootstrap';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Pendaftar = () => {

    const ortu = [
        'Ayah',
        'Ibu',
        'Wali'
    ];
    const agama = [
        'Islam',
        'Kristen',
        'Katholik',
        'Hindu',
        'Budha',
        'Konghucu'
    ];

    const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL
    const URLS = process.env.REACT_APP_BASE_URL
    const token = localStorage.getItem('token');

    const[pp,setPp] = useState(vectors);
    const [valOrtu,setOrtu] = useState([]);
    const[valSiswa,setSiswa] = useState({});
    const[dataLainSiswa,setDataLain] = useState({});
    const[validation,setValidation] = useState()
    const navigate = useNavigate()

    useEffect(()=>{
        if(token){
            fetch();
        }
        if(!token){
            navigate('/signin')
        }
    },[])


    const fetch = async (e) => {
        
        try{
            //Getting Data
            axios.defaults.headers.common['Authorization'] = 'Bearer '+token
            await axios.post(BASE_URL+'auth/pendaftar').then((response)=>{
                //SetSiswa
                if(response.data.data.pendaftar !== null){
                    setSiswa(response.data.data.pendaftar)
                    response.data.data.pendaftar.foto !== '-' ? setPp(URLS+response.data.data.pendaftar.foto) : setPp(vectors)
                }
                //SetDataLain
                if(response.data.data.data_lain !== null){
                    setDataLain(response.data.data.data_lain)
                }
                //setOrtu
                if(response.data.data.data_orangtua !== null){
                    setOrtu(response.data.data.data_orangtua)
                }
            }).catch((error) =>{
                setValidation(error)
            })

        }catch(err){
           console.log(err)
        }

    }

    const onSubmitHandler = ()=>{

    }

    const onChangePpHandler = (e) =>{
        setPp(URL.createObjectURL(e.target.files[0]))
    }
  return (
    <>
        <div>
            <form onSubmit={()=> onSubmitHandler()} method='POST'>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card card-primary shadow m-3">
                                <div className="card-body">
                                    <h5 className="card-title"> <FaImages/> Foto</h5>
                                    <small className='card-subtitle'>Upload Foto Kamu disini !</small>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-3">
                                            <img src={pp} width={'100%'} height={'100%'} />
                                        </div>
                                        <div className="col-md-9 justify-content-center">
                                            <div className="form-group">
                                                <label htmlFor="formFile">Foto </label>
                                                <input  type="file"
                                                        accept='image/*,image/jpeg,image/png' 
                                                        name="foto"
                                                        onChange={onChangePpHandler} 
                                                        id="formFile" 
                                                        className='form-control form-input' />
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
                                    <h5 className="card-title"> <FaUser/> Identitas</h5>
                                    <small className='card-subtitle'>Masukkan identitas kamu dengan baik dan benar disini!</small>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-6"> 
                                            <div className="form-group m-2">
                                                <label htmlFor="nisn">NISN</label>
                                                <input type="text" defaultValue={valSiswa.nisn} name="nisn" id="nisn" className='form-input form-control' placeholder='NISN' />
                                            </div>
                                            <div className="form-group m-2">
                                                <label htmlFor="nik">NIK</label>
                                                <input type="text" defaultValue={valSiswa.nik} name="nik" id="nik" className='form-input form-control' placeholder='NIK' />
                                            </div>
                                            <div className="form-group m-2">
                                                <label htmlFor="kip">KIP</label>
                                                <input type="text" name="kip" defaultValue={valSiswa.kip} id="kip" className='form-input form-control' placeholder='KIP' />
                                            </div>
                                            <div className="form-group m-2">
                                                <label htmlFor="nama">Nama</label>
                                                <input type="text" defaultValue={valSiswa.nama} name="nama" id="nama" className='form-input form-control' placeholder='Nama' />
                                            </div>
                                            <div className="form-group m-2">
                                                <label htmlFor="alamat">Alamat</label>
                                                <textarea name="alamat" id="alamat" defaultValue={valSiswa.alamat} className='form-control form-input' placeholder='Alamat' cols="30" rows="7" ></textarea>
                                            </div>
                                            <div className="form-group m-2">
                                                <label htmlFor="tempat_lahir">Tempat Lahir</label>
                                                <input type="text" name="tempat_lahir" defaultValue={valSiswa.tempat_lahir} id="tempat_lahir" className='form-input form-control' placeholder='Tempat Lahir' />
                                            </div>
                                            <div className="form-group m-2">
                                                <label htmlFor="tanggal_lahir">Tanggal Lahir</label>
                                                <input type="date" name="tanggal_lahir" defaultValue={valSiswa.tanggal_lahir} id="tanggal_lahir" className='form-input form-control' placeholder='Tanggal Lahir' />
                                            </div>
                                            <div className="form-group m-2">
                                                <label htmlFor="jenis_kelamin">Jenis Kelamin</label>
                                                <Form.Select  value={valSiswa.jenis_kelamin} name="jenis_kelamin" id="jenis_kelamin" className='form-control form-input'>
                                                    <option value="L" key={"L"}>Laki Laki</option>
                                                    <option value="P" key={"P"} >Perempuan</option>
                                                </Form.Select>
                                            </div>
                                            <div className="form-group m-2">
                                                <label htmlFor="agama">Agama</label>
                                                <Form.Select value={valSiswa.agama} name="agama" id="agama" className='form-control form-input'>
                                                   {
                                                    agama && agama.map((result)=>{
                                                        return(
                                                            <option value={result} key={result}>{result}</option>
                                                        );
                                                    })
                                                   }
                                                </Form.Select>
                                            </div>
                                            <div className="form-group m-2">
                                                <label htmlFor="jml_saudara">Jumlah Saudara</label>
                                                <input type="number"  name="jml_saudara" id="jml_saudara" className='form-input form-control' placeholder='Jumlah Saudara' defaultValue={valSiswa.jml_saudara} />
                                            </div>
                                           
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group m-2">
                                                <label htmlFor="anak_ke">Anak Ke</label>
                                                <input type="number" name="anak_ke" id="anak_ke" className='form-input form-control' placeholder='Anak Ke' defaultValue={valSiswa.anak_ke} />
                                            </div>
                                            <div className="form-group m-2">
                                                <label htmlFor="hobi">Hobi</label>
                                                <input type="text" name="hobi" id="hobi" className='form-input form-control' placeholder='Hobi' defaultValue={valSiswa.hobi} />
                                            </div>
                                            <div className="form-group m-2">
                                                <label htmlFor="cita_cita">Cita Cita</label>
                                                <input type="text" name="cita_cita" id="cita_cita" className='form-input form-control' placeholder='Cita Cita' defaultValue={valSiswa.cita_cita} />
                                            </div>
                                            <div className="form-group m-2">
                                                <label htmlFor="no_hp">No Hp</label>
                                                <input type="number" name="no_hp" id="no_hp" className='form-input form-control' placeholder='No Hp' defaultValue={valSiswa.no_hp} />
                                            </div>
                                            <div className="form-group m-2">
                                                <label htmlFor="email">Email</label>
                                                <input type="mail" name="email" id="email" className='form-input form-control' placeholder='Email' defaultValue={valSiswa.email} />
                                            </div>
                                            <div className="form-group m-2">
                                                <label htmlFor="yg_membiayai">Yang Membiayai</label>
                                                <input type="text" name="yg_membiayai" id="yg_membiayai" className='form-input form-control' placeholder='Yang Membiayai' defaultValue={valSiswa.yg_membiayai} />
                                            </div>
                                            <div className="form-group m-2">
                                                <label htmlFor="disabilitas">Disabilitas</label>
                                                <input type="text" name="disabilitas" id="disabilitas" className='form-input form-control' placeholder='Disabilitas' defaultValue={valSiswa.disabilitas} />
                                            </div>
                                            <div className="form-group m-2">
                                                <label htmlFor="kebutuhan_khusus">Kebutuhan khusus</label>
                                                <input type="text" name="kebutuhan_khusus" id="kebutuhan_khusus" className='form-input form-control' placeholder='Kebutuhan Khusus' defaultValue={valSiswa.kebutuhan_khusus} />
                                            </div>
                                            <div className="form-group m-2">
                                                <label htmlFor="status_tempat_tinggal">Status Tempat Tinggal</label>
                                                <input type="text" name="status_tempat_tinggal" id="status_tempat_tinggal" className='form-input form-control' placeholder='Status Tempat Tinggal' defaultValue={valSiswa.status_tempat_tinggal} />
                                            </div>
                                            <div className="form-group m-2">
                                                <label htmlFor="jarak_tempat_tinggal">Jarak Tempat Tinggal (Meter)</label>
                                                <input type="number" name="jarak_tempat_tinggal" id="jarak_tempat_tinggal" className='form-input form-control' placeholder='Jarak Tempat Tinggal' defaultValue={valSiswa.jarak_tempat_tinggal} />
                                            </div>
                                            <div className="form-group m-2">
                                                <label htmlFor="waktu_tempuh">Waktu Tempuh (Menit)</label>
                                                <input type="number" name="waktu_tempuh" id="waktu_tempuh" className='form-input form-control' placeholder='Waktu Tempuh' defaultValue={valSiswa.waktu_tempuh} />
                                            </div>
                                            <div className="form-group m-2">
                                                <label htmlFor="transportasi">Transportasi</label>
                                                <input type="text" name="transportasi" id="transportasi" className='form-input form-control' placeholder='Transportasi' defaultValue={valSiswa.transportasi} />
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
                                        <RiParentFill/> OrangTua
                                    </h5>
                                    <small className="card-subtitle">
                                        Masukkan Data Orang tua kamu disini !
                                    </small>
                                    <hr />
                                   <Accordion defaultActiveKey={0}>
                                        {
                                            ortu && ortu.map((result,index)=>{
                                                
                                                return(
                                                    <Accordion.Item eventKey={index}>
                                                        <Accordion.Header>{result}</Accordion.Header>
                                                        <Accordion.Body>
                                                            <div className="container">
                                                                <div className="row">
                                                                    <div className="col-md-6">
                                                                        <div className="form-group">
                                                                            <label htmlFor="nama">Nama</label>
                                                                            <input type="text" placeholder='Nama' className='form-input form-control' name={'nama_'+result.toLowerCase()} />
                                                                        </div>
                                                                        <div className="form-group">
                                                                            <label htmlFor="nik">NIK</label>
                                                                            <input type="number" placeholder='NIK' className='form-input form-control' name={'nik_'+result.toLowerCase()}  />
                                                                        </div>
                                                                        <div className="form-group">
                                                                            <label htmlFor="tempat_lahir">Tempat Lahir</label>
                                                                            <input type="text" placeholder='Tempat Lahir' className='form-input form-control' name={'tempat_lahir_'+result.toLowerCase()} />
                                                                        </div>
                                                                        <div className="form-group">
                                                                            <label htmlFor="tanggal_lahir">Tanggal Lahir</label>
                                                                            <input type="date" placeholder='Tanggal Lahir' className='form-input form-control' name={'tgl_lahir_'+result.toLowerCase()}  />
                                                                        </div>
                                                                        <div className="form-group">
                                                                            <label htmlFor="alamat">Alamat</label>
                                                                            <textarea name={'alamat_'+result.toLowerCase()} className='form-control' placeholder='Alamat' cols="30" rows="6"></textarea>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <div className="form-group">
                                                                            <label htmlFor="no_hp">No Hp</label>
                                                                            <input type="text" placeholder='No Hp' className='form-input form-control' name={'no_hp_'+result.toLowerCase()} />
                                                                        </div>
                                                                        <div className="form-group">
                                                                            <label htmlFor="status">Status</label>
                                                                            <input type="text" placeholder='Status' className='form-input form-control' name={'status_'+result.toLowerCase()}   />
                                                                        </div>
                                                                        <div className="form-group">
                                                                            <label htmlFor="pekerjaan_utama">Pekerjaan Utama</label>
                                                                            <input type="text" placeholder='Pekerjaan Utama' className='form-input form-control' name={'pekerjaan_utama_'+result.toLowerCase()} />
                                                                        </div>
                                                                        <div className="form-group">
                                                                            <label htmlFor="pendidikan_terakhir">Pendidikan Terakhir</label>
                                                                            <input type="text" placeholder='Pendidikan Terakhir' className='form-input form-control' name={'pendidikan_terakhir_'+result.toLowerCase()} />
                                                                        </div>
                                                                        <div className="form-group">
                                                                            <label htmlFor="domisili">Domisili</label>
                                                                            <input type="text" placeholder='Domisili' className='form-input form-control' name={'domisili_'+result.toLowerCase()} />
                                                                        </div>
                                                                        <div className="form-group">
                                                                            <label htmlFor="penghasilan_rata_rata">Penghasilan Rata Rata</label>
                                                                            <input type="number" placeholder='Domisili' className='form-input form-control' name={'penghasilan_rata_rata_'+result.toLowerCase()} />
                                                                        </div>
                                                                        <div className="form-group">
                                                                            <label htmlFor="status_tempat_tinggal">Status Tempat Tinggal</label>
                                                                            <input type="text" placeholder='Status Tempat Tinggal' className='form-input form-control' name={'status_tempat_tinggal_'+result.toLowerCase()} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                )
                                            })
                                        }
                                        
                                   </Accordion>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card card-primary shadow m-3">
                                <div className="card-body">
                                    <h5 className="card-title"> <IoSchool/> Asal Sekolah</h5>
                                    <small className='card-subtitle'>Masukkan asal sekolah kamu disini !</small>
                                    <hr />
                                    <div className="form-group m-2">
                                        <label htmlFor="asal_sekolah">Asal Sekolah</label>
                                        <input type="text" defaultValue={dataLainSiswa.asal_sekolah} name="asal_sekolah" id="asal_sekolah" className='form-input form-control' placeholder='Asal Sekolah' />
                                    </div>
                                    <div className="form-group m-2">
                                        <label htmlFor="alamat_sekolah">Alamat Sekolah</label>
                                        <textarea name="alamat_sekolah" defaultValue={dataLainSiswa.alamat_sekolah} id="alamat_sekolah" className='form-control form-input' cols="30" rows="5" placeholder='Alamat Sekolah'></textarea>
                                    </div>
                                    <div className="form-group m-2">
                                        <label htmlFor="no_telp_sekolah">No Hp Sekolah</label>
                                        <input type="text" name="no_telp_sekolah" defaultValue={dataLainSiswa.no_telp_sekolah} id="no_telp_sekolah" className='form-input form-control' placeholder='No Telp Sekolah' />
                                    </div>
                                    <div className="form-group m-2">
                                        <label htmlFor="provinsi_sekolah">Provinsi Sekolah</label>
                                        <input type="text" name="provinsi_sekolah" id="provinsi_sekolah" defaultValue={dataLainSiswa.provinsi_sekolah} placeholder='Provinsi Sekolah' className='form-control form-input' />
                                    </div>
                                    <div className="form-group m-2">
                                        <label htmlFor="kota_sekolah">Kota Sekolah</label>
                                        <input type="text" name="kota_sekolah"  defaultValue={dataLainSiswa.kota_sekolah} id="kota_sekolah" placeholder='Kota Sekolah' className='form-control form-input' />
                                    </div>
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

export default Pendaftar