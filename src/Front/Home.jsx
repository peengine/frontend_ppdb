import bg from './Component/Images/bg.jpg'
import Hero from "./Component/Hero"
import Jurusan from "./Component/Jurusan"
import Navbars from "./Component/Navbars"
import WhyUs from "./Component/WhyUs"
import Alur from "./Component/Alur"
import Seleksi from "./Component/Seleksi"
import BiayaDanJadwal from "./Component/BiayaDanJadwal"
import Footer from "./Component/Footer"
const Home = () => {

  return (
    <>
    <div className='backgrounds-bodys' style={{backgroundImage:`url(${bg})`,backgroundSize:'100% cover',backgroundRepeat:'no-repeat'}}>
      <Navbars/>
        <Hero/>
        <WhyUs/>
        <Jurusan/>
        <Alur/>
        <Seleksi/>
        <BiayaDanJadwal/>
        <Footer/>
    </div>
       
    </>
    
  )
}

export default Home