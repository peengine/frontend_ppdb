import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Dashboard from '../Admin/Layouts/Dashboard'
import Profiles from '../Admin/Layouts/Profiles'
import Register from '../Auth/Register'
import Signin from '../Auth/Signin'
import Blank from '../Constants/Blank'
import NotFound from '../Constants/NotFound'
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
          <Route path='/profile' element={<Profiles/>} >
              <Route index element={<Blank/>}></Route>
          </Route>
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </Router>
    </>
  )
}

export default WebRoutes