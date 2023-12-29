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
import Blank from '../Constants/Blank'
import { useLocation } from 'react-router-dom'
const Home = () => {

  const[serverActive,setServerActive] = useState(false);
  const[jurusan,setJurusan] = useState({});
  const[sekolah,setSekolah] = useState({})
  const[menus,setMenus] = useState([]);
  const[posts,setPosts] = useState([])
  const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL
  
  useEffect(()=>{
    fetch()
  },[])

  const fetch = async (e) => {
    try{
      await axios.get(BASE_URL+'menus').then((response) => {
        setMenus(response.data.data.menus)
      }).catch((err) =>{
        setServerActive(false);
        console.log('Error :'+err)
      })
      await axios.get(BASE_URL+'posts').then((response) => {
        setPosts(response.data.data.posts);
      }).catch((err) =>{
        setServerActive(false);
        console.log('Error :'+err)
      })
      await axios.get(BASE_URL+'sekolah').then((response) => {
        setSekolah(response.data.data);
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
      <Navbars sekolahName={sekolah.nama_sekolah} customMenu={menus} dataSekolah={sekolah} />
        <Hero sekolahName={sekolah.nama_sekolah} tahunAjaran={sekolah.tahun_ajaran.tahun_ajaran} posts={posts} />
        <WhyUs why_us={sekolah.why_us} />
        <Jurusan jurusan={jurusan}/>
        <Alur alur={sekolah.alur}/>
        <Seleksi seleksi={sekolah.seleksi} />
        <BiayaDanJadwal gelombang={sekolah.gelombang} tahunAjaran={sekolah.tahun_ajaran.tahun_ajaran}/>
        <Footer sekolahName={sekolah.nama_sekolah} dataSekolah={sekolah} sekolahSlug={sekolah.slug} alamatSekolah={sekolah.alamat_sekolah}/>
    </div>
       
    </>
    
  )
}else{
  return (
    <>
    <Blank/>
    </>
  )
}
  
}

export default Home