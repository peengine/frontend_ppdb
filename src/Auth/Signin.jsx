import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signin = () => {

  const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const[validation,setValidation] = useState([]);
  const[sekolah,setSekolah] = useState({});
  const navigate = useNavigate()

  useEffect(()=>{
    if(localStorage.getItem('token')){
      navigate('/dashboard')
    }
    fetchSekolah()
  },[]);

  const fetchSekolah = async (e) => {
    await axios.get(BASE_URL+'sekolah').then((response)=>{
      if(response.data.data.nama_sekolah != null){
        setSekolah(response.data.data);
      }
    }).catch((err) =>{
      console.log(err)
    })
  }

  const signinHandler = async (e) => {
      e.preventDefault();
      const fd = new FormData();
      fd.append('email',email)
      fd.append('password',password)
      try{
        await axios.post(BASE_URL+"auth/login",fd,{
          validateStatus:(status) =>{
            if(status !== 200){
              setValidation({error:["Validation Failed, Try Again Later"]});
            }
            return status == 200;
          }
        }).then((response) => {
          localStorage.setItem('token',response.data.access_token);
          navigate('/')
        }).catch((error) => {
          setValidation(error.response.data);
        })
      }catch(err){
        setValidation({"error" : [`Oops,Server is busy or not Connected, Please Try Again Later!`]});
      }
     
  }

  return (
    <>
    <div className="bg-light">
      <div className="container">
        <div className="d-flex align-items-center" style={{height:"100vh"}}>
          <div style={{width:"100%"}}>
            <div className="row justify-content-center">
              <div className="col-md-5">
                <div className="text-center">
                  <h4> <span className="badge bg-primary p-2">PPDB</span><b>{sekolah.nama_sekolah}</b></h4>
                </div>
                  
                <form onSubmit={signinHandler}>
                  <div className="card shadow card-primary card-outline">
                    <div className="card-body p-3">
                     
                      <div className="text-center">
                      <h4>Sign in</h4>
                      <small>Please enter your email address and password here</small>
                      </div>
                      
                      {validation.error && (
                        <div className="alert alert-danger text-center mb-3 mt-3">
                          {validation.error}
                        </div>
                      )}
                        <div className="form-group m-2 mb-3">
                          <label htmlFor="email">Email</label>
                          <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value) } name="email" id="email" className='form-control form-input  '  />
                          {validation.email && (
                            <small className='text-danger'>
                              { validation.email[0] }
                            </small>
                          )}
                        </div>
                        <div className="form-group m-2 mb-3">
                          <label htmlFor="password">Password</label>
                          <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value) } name="password" id="password" className='form-control form-input' />
                          {validation.password && (
                            <small className='text-danger'>
                              { validation.password[0] }
                            </small>
                          )}
                        </div>
                        <button type="submit"  className='btn btn-primary form-control'>Sign in</button>
                          <div className="text-center">
                            <small>or</small>
                            <br />
                            <small>Don't Have Account ? Register <a href="/register">here</a></small>
                            <hr />
                            <a href="/" className='btn btn-danger form-control'>Back to Home</a>
                          </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      
    </>
  )
}

export default Signin