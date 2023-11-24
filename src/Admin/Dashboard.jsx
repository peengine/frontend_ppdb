import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user,setUser] = useState({});
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL
  const token = localStorage.getItem('token');
  useEffect(()=>{
    if(!token){
      navigate('/signin')
    }

    if(token){
      fetchData()
    }
  },[])
  const fetchData = async (e) => {
    axios.defaults.headers.common['Authorization'] = 'Bearer '+token
    await axios.post(BASE_URL+'auth/me').then((response)=>{
      setUser(response.data)
    }).catch((error) => {
      console.log(error)
    })
  }
const logoutHandler = async (e) => {
  axios.defaults.headers.common['Authorization'] = 'Bearer '+token
    await axios.post(BASE_URL+'auth/logout').then((response)=>{
      localStorage.removeItem('token')
      navigate('/signin')
    }).catch((error) => {
      console.log(error)
    })
}

  return (
    <div className="bg-light">
      <div className="container">
        <div className="d-flex align-items-center" style={{height:"100vh"}}>
          <div style={{width:"100%"}}>
            <div className="row justify-content-center">
              <div className="col-md-5">
                <div className="card">
                  <div className="card-body">
                      <h3>Hi, {user.name}</h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                      <button className='btn btn-danger' type='button' onClick={logoutHandler}>Signout</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard