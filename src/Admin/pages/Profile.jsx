import React from "react";
import vectors from '../Components/Images/2.png'
import { FaImages,FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
const Profile = () => {

  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL
  const token = localStorage.getItem('token');

  const [profile,setProfile] = useState({})

  useEffect(()=>{
    if(token){
      fetch();
    }
    if(!token){
      navigate('/signin')
    }
  })

  const fetch = async (e) =>{

    try{
      
    }catch(e){
      
    }

  }


  return (
    <>
      <div>
        <form method="POST" encType="multipart/form-data">
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
                        <img src={vectors} width={"100%"} height={"100%"} />
                      </div>
                      <div className="col-md-9 justify-content-center">
                        <div className="form-group">
                          <label htmlFor="formFile">Foto </label>
                          <input
                            type="file"
                            accept="image/*,image/jpeg,image/png"
                            name="foto"
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
                      Isi Data Kamu disini !
                    </small>
                    <hr />
                      <div className="form-group">
                        <label htmlFor="name">Nama</label>
                        <input type="text" name="name" id="name" className="form-control form-input" placeholder="Nama" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" className="form-control form-input" placeholder="Email" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="no_hp">Email</label>
                        <input type="no_hp" name="no_hp" id="no_hp" className="form-control form-input" placeholder="No Hp" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="Bio">Bio</label>
                        <textarea name="bio" id="bio" placeholder="Bio" className="form-control form-input" cols="30" rows="5"></textarea>
                      </div>
                      <div className="form-group">
                        <label htmlFor="Alamat">Alamat</label>
                        <textarea name="alamat" id="alamat" placeholder="Alamat" className="form-control form-input" cols="30" rows="5"></textarea>
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
