import Cards from "../components/Cards/Cards";
import { Header } from "../components/Header/Header";
import { NavBar } from "../components/Nav Bar/NavBar";
import { Carusel } from "./Carusel";

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
        <h1>Carrousel</h1>
        <Carusel />
      </div>
      <div>
        <h1>Most Recent</h1>
        <Cards />
      </div>
    </div>
  )

};

export default Home;
