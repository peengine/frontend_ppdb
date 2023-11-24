import Hero from "./Component/Hero"
import Navbars from "./Component/Navbars"

const Home = () => {
  return (
    <>
    <div className="bg-light">
      <Navbars/>
      <Hero/>
    </div>
    
    </>
  )
}

export default Home