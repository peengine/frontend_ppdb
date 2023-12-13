import React from "react";
import vectors from '../Components/Images/2.png'
import { FaImages,FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
const Profile = () => {


  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL
  const URLS = process.env.REACT_APP_BASE_URL
  const token = localStorage.getItem('token');

  const [profile,setProfile] = useState({})
  const[user,setUser] = useState({});
  const[file,setFile] = useState(vectors);
  
  const[pp,setPp] = useState()
  const[nama,setNama] = useState("")
  const[email,setEmail] = useState("")
  const[no_hp,setHp] = useState("")
  const[bio,setBio] = useState("")
  const[alamat,setAlamat] = useState("")
  const[validation,setValidation] = useState({})

  useEffect(()=>{
    if(token){
      fetch();
    }
    if(!token){
      navigate('/signin')
    }
  },[])



  const fetch = async (e) =>{

    try{
      //Profile
      axios.defaults.headers.common['Authorization'] = 'Bearer '+token
      await axios.post(BASE_URL+'auth/profile').then((response)=>{
        if(response.data === {}){
          localStorage.removeItem('token');
          navigate('/signin')
        }else{
          setProfile(response.data.data)
          response.data.data.foto_profile !== '-' ? setFile(URLS+response.data.data.foto_profile) : setFile(vectors)
          setHp(response.data.data.no_hp)
          setBio(response.data.data.bio)
          setAlamat(response.data.data.alamat)
          setPp(response.data.data.foto_profile)
        }
      }).catch((error) => {
        console.log(error)
      })
      //User
      axios.defaults.headers.common['Authorization'] = 'Bearer '+token
      await axios.post(BASE_URL+'auth/me').then((response)=>{
        if(response.data.name == null){
          localStorage.removeItem('token');
          navigate('/signin')
        }else{
          setUser(response.data)
          setNama(response.data.name)
          setEmail(response.data.email)
        }
      }).catch((error) => {
        console.log(error)
      })
    }catch(e){
      console.log(e)
    }
  }
  const onChangeHandler = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]))
    setPp(e.target.files[0])
  }

  const updateProfiles = async (e) =>{
    e.preventDefault();

    const fd = new FormData();
    fd.append("foto_profile",pp)
    fd.append("name",nama)
    fd.append("email",email)
    fd.append("no_hp",no_hp)
    fd.append("bio",bio)
    fd.append("alamat",alamat)

    axios.defaults.headers.common['Authorization'] = 'Bearer '+token
    await axios.post(BASE_URL+'auth/profile/update',fd).then((response)=>{
      setValidation(response.data)
    }).catch((err) => {
      setValidation(err.response.data);
    })

  }

  return (
    <>
      <div>
        <form method="POST" encType="multipart/form-data" onSubmit={updateProfiles}>
          <div className="container">
          {validation.error && (
            <div className="row">
              <div className="col-md-12">
                <div className="alert alert-danger text-center mb-3 mt-3">
                  {validation.error}
                </div>
              </div>
            </div>
           
          )}
          {validation.message && (
            <div className="row">
              <div className="col-md-12">
                <div className="alert alert-primary text-center mb-3 mt-3">
                  {validation.message}
                </div>
              </div>
            </div>
           
          )}
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
                          <img src={file} width={"100%"} height={"100%"} id='view-img' />
                      </div>
                      <div className="col-md-9 justify-content-center">
                        <div className="form-group">
                          <label htmlFor="formFile">Foto </label>
                          <input
                            type="file"
                            accept="image/*"
                            name="foto_profile"
                            id="formFile"
                            className="form-control form-input"
                            onChange={onChangeHandler}
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
                      Isi Data Kamu disini !
                    </small>
                    <hr />
                      <div className="form-group">
                        <label htmlFor="name">Nama</label>
                        <input type="text" defaultValue={user.name} name="name" id="name" className="form-control" placeholder="Nama" onChange={(event) => {setNama(event.target.value)}} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" defaultValue={user.email} name="email" id="email" className="form-control form-input" placeholder="Email" onChange={(event) => {setEmail(event.target.value)}} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="no_hp">No Hp</label>
                        <input type="no_hp" defaultValue={profile.no_hp} name="no_hp" id="no_hp" className="form-control form-input" placeholder="No Hp" onChange={(event) => {setHp(event.target.value)}} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="bio">Bio</label>
                        <textarea name="bio" defaultValue={profile.bio} id="bio" placeholder="Bio" className="form-control form-input" cols="30" rows="5" onChange={(event)=>{setBio(event.target.value)}}>{profile.bio}</textarea>
                      </div>
                      <div className="form-group">
                        <label htmlFor="alamat">Alamat</label>
                        <textarea name="alamat" defaultValue={profile.alamat} id="alamat" placeholder="Alamat" className="form-control form-input" cols="30" rows="5" onChange={(event) => {setAlamat(event.target.value)}}>{profile.alamat}</textarea>
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
  );
};

export default Profile;
