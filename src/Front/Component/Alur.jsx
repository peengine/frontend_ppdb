import React from 'react'
import vector from './Images/alur.png';
const Alur = (props) => {

  const alur = props.alur;

  return (
    <>
    <section id='alur'>
    <br /><br /> <br />
            <div className="container py-5 mt-3 my-2">
                <div className="row">
                    <div className="col-md-6">
                        <div className="text">
                            <h2>Alur Pendaftarannya Bagaimana ?</h2>
                            <ul className='list-group'>
                              {
                                alur && alur.map((result) =>{
                                  return(
                                    <li> <p>{result.ket}</p></li>      
                                  );
                                })
                              }
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-6">
                      <div className="image">
                        <img src={vector} className='alur-image img'></img>
                      </div>
                    </div>
                </div>
            </div>
            <br />
        </section>
    </>
  )
}

export default Alur