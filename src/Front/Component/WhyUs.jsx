import React from 'react'
import vector from '../Component/Images/why_us.png'
const WhyUs = () => {
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
                                <li> <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p></li>
                                <li> <p> Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p></li>
                                <li> <p>  Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? .</p></li>
                                <li> <p> Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p></li>
                                <li> <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></li>
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