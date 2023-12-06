import bg from './Component/Images/bg.jpg'
import Hero from "./Component/Hero"
import Jurusan from "./Component/Jurusan"
import Navbars from "./Component/Navbars"
import WhyUs from "./Component/WhyUs"
import Alur from "./Component/Alur"
import Seleksi from "./Component/Seleksi"
import BiayaDanJadwal from "./Component/BiayaDanJadwal"
import Footer from "./Component/Footer"
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import NotAvailable from '../Constants/NotAvailable'
const Home = () => {

  const[serverActive,setServerActive] = useState(false);
  
  
  const[jurusan,setJurusan] = useState({});
  const[gelombang,setGelombang] = useState({});

  const[namaSekolah,setNamaSekolah] = useState("");
  const[slugSekolah,setSlugSekolah] = useState("");
  const[tentangSekolah,setTentangSekolah] = useState("");
  const[alamatSekolah,setAlamatSekolah] = useState("");
  const[tahunAjaran,setTahunAjaran] = useState("");
  const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL

  useEffect(()=>{
    fetch()
  },[])

  const fetch = async (e) => {
    try{
      await axios.get(BASE_URL+'sekolah').then((response) => {
        setJurusan(response.data.data.jurusan);
        setNamaSekolah(response.data.data.nama_sekolah);
        setTahunAjaran(response.data.data.tahun_ajaran.tahun_ajaran);
        setSlugSekolah(response.data.data.slug);
        setTentangSekolah(response.data.data.tentang_sekolah)
        setAlamatSekolah(response.data.data.alamat_sekolah)
        setGelombang(response.data.data.gelombang)
        setServerActive(true);
      }).catch((err) =>{
        setServerActive(false);
        console.log('Error :'+err)
      })
      await axios.get(BASE_URL+'jurusan').then((response) => {
        setJurusan(response.data);
        setServerActive(true);
      }).catch((err) =>{
        setServerActive(false);
        console.log('Error :'+err)
      })
    }catch(e){
      setServerActive(false);
      console.log(e)
    }
  }

if(serverActive){
  return (
    <>
    <div className='backgrounds-bodys' style={{backgroundImage:`url(${bg})`,backgroundSize:'100% cover',backgroundRepeat:'no-repeat'}}>
      <Navbars sekolahName={namaSekolah} />
        <Hero sekolahName={namaSekolah} tahunAjaran={tahunAjaran} />
        <WhyUs/>
        <Jurusan jurusan={jurusan}/>
        <Alur/>
        <Seleksi/>
        <BiayaDanJadwal gelombang={gelombang} tahunAjaran={tahunAjaran}/>
        <Footer sekolahName={namaSekolah} sekolahSlug={slugSekolah} alamatSekolah={alamatSekolah}/>
    </div>
       
    </>
    
  )
}else{
  return (
    <>
    <NotAvailable/>
    </>
  )
}
  
}

export default Home