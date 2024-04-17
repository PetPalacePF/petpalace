import { useEffect } from "react";

import Cards from "../components/Cards/Cards";
import TopRatedCards from "../components/Cards/TopRatedCards";
import { Footer } from "../components/Footer/Footer";
import Carousel from "../components/Home/Carusel/Carousel";
import { Epigraph } from "./Epigraph";
import newOrderGenerator from "../utils/newOrderGenerator";

const Home = () => {
  useEffect(() => {
    // newOrderGenerator();
    window.localStorage.setItem("buyNow", JSON.stringify(false));
  }, []);

  return (
    <div>
      <div>
        <Carousel />
      </div>
      <div>
        <Epigraph />
      </div>
      <div className="flex flex-col items-center">
        <div className="relative">
          <hr className="absolute w-[100px] border-black" />
          <h1 className="relative text-4l font-bold">Top Rated</h1>
          <TopRatedCards />
        </div>
        <div className="relative mt-10">
          <hr className="absolute w-[100px] border-black" />
          <h1 className="relative text-4l font-bold">Popular Picks</h1>
          <Cards />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
