import React from 'react'
import vector from '../Component/Images/why_us.png'
const WhyUs = (props) => {

    const wu = props.why_us
  return (
    <>
        <section id='why_us' className='bg-light'>
        <br /><br /> <br />
            <div className="container p-5">
                <div className="row">
                    <div className="col-md-6">
                        <div className="image">
                            <img src={vector} className='img p-3'></img>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="text m-2">
                            <h2>Kenapa Memilih Kita ?</h2>
                            <ul>
                                {
                                    wu && wu.map((result) => {
                                        return (
                                            <li key={result.id}> <p>{result.ket}</p></li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>
    </>
  )
}

export default WhyUs