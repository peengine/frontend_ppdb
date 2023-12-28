import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Blank from '../../../Constants/Blank';
import NotFound from '../../../Constants/NotFound';
import { formatTanggal } from '../../../Helpers/ValHelpers';
import ConstantFoot from './ConstantFoot';
import ConstantNav from './ConstantNav';

const PostView = () => {
    const URLS = process.env.REACT_APP_BASE_URL
    const[serverActive,setServerActive] = useState(false);
    const[pages,setPages] = useState(null);
    const[sekolah,setSekolah] = useState({})
    const[menus,setMenus] = useState([]);
    const[posts,setPosts] = useState([]);
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
          await axios.get(BASE_URL+'posts').then((response) => {
            setPosts(response.data.data.posts)
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
        console.log(pname[pname.length - 1])
        try{
            await axios.get(BASE_URL+'posts/'+pname[pname.length - 1]).then((response) => {
              setPages(response.data.data.post)
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
                                <img src={URLS+pages.foto_post}style={{maxHeight:"400px"}} className='d-block w-100'/>
                            </div>
                            <br />
                            <h2>{pages.title_post}</h2>
                            <small>{pages.subtitle_post}</small>
                            <br /> <hr />
                            <div className="row">
                                <div className="col-md-8">
                                    <div dangerouslySetInnerHTML={{ __html: pages.desc_post }} />  
                                </div>
                                <div className="col-md-4">
                                    <h3>Recently Post</h3>
                                    {
                                        posts.length < 0 && (
                                            <>
                                                <div className="text-center">
                                                    Belum Tersedia
                                                </div>
                                            </>
                                        )
                                    }
                                     {
                                        posts.length > 0 && posts.map((result) =>{
                                            if(result.id !== pages.id){
                                                return(
                                                    <>
                                                    <Link to={"/post/"+result.slug_post} className="row text-decoration-none text-black">
                                                        <div className="col-md-4">
                                                            <img src={URLS+result.foto_post} className='d-block w-100'/>
                                                        </div>
                                                        <div className="col-md-8">
                                                            <p>{result.title_post} <small>{result.subtitle_post}</small></p>
                                                            <small>{formatTanggal(result.created_at)}</small>
                                                            <hr />
                                                        </div>
                                                    </Link>
                                                    <br />
                                                    </>
                                                )
                                            }
                                        }) 
                                    }
                                </div>
                            </div>
                                                    
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

export default PostView