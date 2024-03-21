import Cards from "../components/Cards/Cards";
import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";
import { NavBar } from "../components/Nav Bar/NavBar";
import { Carusel } from "./Carusel";
import { Epigraph } from "./Epigraph";

const Home = () => {

  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <NavBar />
      </div>
      <div>
        <Carusel />
      </div>
      <div>
        <Epigraph />
      </div>
      <div className="bg-pink">
        <div className="px-20 relative">
          <hr className="absolute w-[100px] border-black" />
          <h1 className="relative text-4l font-bold">Most Recent</h1>
          <Cards />
        </div>
        <div className="px-20 relative mt-10">
          <hr className="absolute w-[100px] border-black" />
          <h1 className="relative text-4l font-bold">Top highlights</h1>
          <Cards />
        </div>
        <Footer/>
      </div>
    </div>
  )

};

export default Home;
