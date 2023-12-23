import React from 'react'
import vectors from './img/8257.png'
const NotFound = () => {
  return (
    <div className="bg-light">
      <div className="container">
        <div className="d-flex align-items-center" style={{height:'100vh'}}>
          <div style={{width:'100%'}}>
            <div className="row justify-content-center">
              <div className="col-md-8 text-center">
                <img src={vectors} width={'100%'} />
                <h1>404 Not Found</h1>
                <p>Page Not Found, Back to <a href="/">Home</a> </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>  
  )
}

export default NotFound