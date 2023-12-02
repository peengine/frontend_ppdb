import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Dashboard from '../Admin/Dashboard'
import Register from '../Auth/Register'
import Signin from '../Auth/Signin'
import Blank from '../Constants/Blank'
import Home from '../Front/Home'

const WebRoutes = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home/>} ></Route>
          <Route exact path='/signin' element={<Signin/>} ></Route>
          <Route exact path='/register' element={<Register/>} ></Route>
          <Route path='/dashboard' element={<Dashboard/>} >
              <Route index element={<Blank/>}></Route>
              
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default WebRoutes