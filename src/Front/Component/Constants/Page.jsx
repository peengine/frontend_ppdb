import axios from 'axios'
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import Blank from '../../../Constants/Blank';
import NotFound from '../../../Constants/NotFound';
import ConstantFoot from './ConstantFoot';
import ConstantNav from './ConstantNav';
const Page = (props) => {
    const URLS = process.env.REACT_APP_BASE_URL
    const[serverActive,setServerActive] = useState(false);
    const[pages,setPages] = useState(null);
    const[sekolah,setSekolah] = useState({})
    const[menus,setMenus] = useState([]);
    const location = useLocation()
    const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL
    useEffect(()=>{
        fetch();
        fetchData();
    },[location])

    const fetch = async (e) => {
        try{
          await axios.get(BASE_URL+'menus').then((response) => {
            setMenus(response.data.data.menus)
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
        }catch(e){
          setServerActive(false);
          console.log(e)
        }
    }

    const fetchData = async (e) => {
        const pname = location.pathname.split("/")
        try{
            await axios.get(BASE_URL+'pages/'+pname[pname.length - 1]).then((response) => {
              setPages(response.data.data.pages)
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
        <ConstantNav sekolahName={sekolah.nama_sekolah} customMenu={menus} />
        {
            pages != null && (
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 my-5">
                            <div className="text-center">
                            <img src={URLS+pages.foto_pages}style={{maxHeight:"400px"}} className='img img-circle my-2'/>
                            </div>
                       
                            <br />
                            <h2>{pages.title_pages}</h2>
                            <small>{pages.subtitle_pages}</small>
                            <br /> <hr />
                            <div dangerouslySetInnerHTML={{ __html: pages.isi_pages }} />                          
                        </div>
                    </div>
                </div>
            )
        }
        {
            pages == null && (
               <NotFound/>
            )
        }
        

        <ConstantFoot sekolahName={sekolah.nama_sekolah} dataSekolah={sekolah} sekolahSlug={sekolah.slug} alamatSekolah={sekolah.alamat_sekolah}/>
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

export default Page