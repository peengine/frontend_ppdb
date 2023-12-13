import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {

  const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [confirmationPassword,setConfirmationPassword] = useState("")
  const[sekolah,setSekolah] = useState({})


  const[validation,setValidation] = useState([])

  const navigate = useNavigate()

  useEffect(()=>{
    
    if(localStorage.getItem('token')){
      navigate('/dashboard')
    }
    fetchSekolah()
  },[]);
  const registerHandler = async (e) =>{
    e.preventDefault()

    const fd = new FormData();
    fd.append('name',name)
    fd.append('email',email)
    fd.append('password',password)
    fd.append('password_confirmation',confirmationPassword)
    try{
      await axios.post(BASE_URL+"auth/register",fd).then((response) => {
        navigate('/signin')
      }).catch((error) => {
        setValidation(error.response.data);
      })
    }catch(err){
      setValidation({"error" : [`Oops,Server is busy or not Connected, Please Try Again Later!`]});   
    }
    
  }
  const fetchSekolah = async (e) => {
    await axios.get(BASE_URL+'sekolah').then((response)=>{
      if(response.data.data.nama_sekolah != null){
        setSekolah(response.data.data);
      }
    }).catch((err) =>{
      console.log(err)
    })
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
                  <h4> <span className="badge bg-primary p-2">PPDB</span><b> {sekolah.nama_sekolah}</b></h4>
                </div>
                <form onSubmit={registerHandler}>
                  <div className="card shadow card-primary card-outline">
                    <div className="card-body p-3">
                      <div className="text-center">
                      <h4>Register Account</h4>
                      <small>All account registration forms must be filled out correctly</small>
                      </div>
                      {validation.error && (
                        <div className="alert alert-danger text-center mb-3 mt-3">
                          {validation.error}
                        </div>
                      )}
                        <div className="form-group m-2 mb-3">
                          <label htmlFor="name">Full Name</label>
                          <input type="text" value={name} onChange={(e) => setName(e.target.value) } placeholder='Your name' name="name" id="name" className='form-control form-input' />
                          {
                            validation.name && (
                              <small className='text-danger'>
                                { validation.name[0] }
                              </small>
                            )
                          }
                        </div>
                        <div className="form-group m-2 mb-3">
                          <label htmlFor="email">Email</label>
                          <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} name="email" id="email" className='form-control form-input' />
                          {
                            validation.email && (
                              <small className='text-danger'>
                                { validation.email[0] }
                              </small>
                            )
                          }
                        </div>
                        <div className="form-group m-2 mb-3">
                          <label htmlFor="password">Password</label>
                          <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} name="password" id="password" className='form-control form-input' />
                          {
                            validation.password && (
                              <small className='text-danger'>
                                { validation.password[0] }
                              </small>
                            )
                          }
                        </div>
                        <div className="form-group m-2 mb-3">
                          <label htmlFor="password">Verify Password</label>
                          <input type="password" placeholder='Verify Password' value={ confirmationPassword } onChange={(e) => setConfirmationPassword(e.target.value)} name="confirm_password" id="confirm_password" className='form-control form-input' />
                        </div>
                        <button type="submit" className='btn btn-primary form-control'>Register</button>
                          <div className="text-center">
                            <small>or</small>
                            <br />
                            <small>Already Have Account ? Sign in <a href="/signin">here</a></small>
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

export default Register