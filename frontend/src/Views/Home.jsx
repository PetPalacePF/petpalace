import Cards from "../components/Cards/Cards";
import TopRatedCards from "../components/Cards/TopRatedCards";
import { Footer } from "../components/Footer/Footer";
import Carousel from "../components/Home/Carusel/Carousel";
import { Epigraph } from "./Epigraph";

const Home = () => {
  return (
    <div>
      <div>
        <Carousel />
      </div>
      <div>
        <Epigraph />
      </div>
      <div className="bg-pink">
        <div className="px-20 relative">
          <h1 className="relative text-4l font-bold">Top Rated</h1>
          <hr className="absolute w-[100px] border-black" />
          <TopRatedCards />
        </div>
        <div className="px-20 relative mt-10">
          <h1 className="relative text-4l font-bold">More Products</h1>
          <hr className="absolute w-[100px] border-black" />
          <Cards />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
