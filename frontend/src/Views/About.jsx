import React from "react";
import { useEffect } from "react";

import { Footer } from "../components/Footer/Footer";
import { Link } from "react-router-dom";

import logo from "../assets/logo.png";
import bgAbout from "../assets/bg-About2.jpg";
import catDog from "../assets/catDog-About.png";
import turtle from "../assets/turtle-About.png";
import rabbit from "../assets/rabbit-About.png";

const About = () => {
  useEffect(() => {
    window.localStorage.setItem("buyNow", JSON.stringify(false));
  }, []);

  return (
    <div className="mx-auto" style={{ backgroundImage: `url(${bgAbout})` }}>
      <div className="max-w-5xl mx-auto mt-[36px]">
        <div className="flex flex-col items-center relative backdrop-filter backdrop-blur-md bg-violetahome bg-opacity-50 rounded-lg shadow-md p-8">
          <div className="flex items-center mb-4" >
            <img src={logo} alt="Pet Palace Logo" className="w-8 h-8 mr-2" />
            <h1 className="text-4xl font-bold">
              <span className="border-b-2 border-black pb-2">About Us</span>
            </h1>
          </div>
          <h2 className="text-xl font-semibold mt-8">
            <img src={catDog} className="w-8 h-8 mr-2 inline" />
            <span>Welcome to Pet Palace: Your Premier Pet Destination</span>
          </h2>
          <p className=" mb-6 ml-2 max-w-full text-left">
            At Pet Palace, we're dedicated to catering to every aspect of your
            pet's well-being. As pet lovers ourselves, we understand the
            importance of providing the best care for your furry companions.
            That's why we've curated an extensive catalogue of premium pet
            supplies, ensuring your pets have access to the finest products
            available. From nutritious foods to stylish accessories, we have
            everything your pets need to stay happy and healthy. Explore our
            vast selection and discover products tailored to your pet's unique
            preferences and needs. Whether you have a playful pup, a curious
            kitten, or any other adorable companion, Pet Palace has something
            special for every furry friend. Shopping at Pet Palace isn't just
            convenient; it's also a rewarding experience. Earn loyalty rewards
            with every purchase and enjoy exclusive discounts and promotions
            crafted just for you and your beloved pets. Join our community of
            pet lovers today and experience the ultimate destination for all
            your pet needs.
          </p>
          <h2 className="text-xl font-semibold mt-8">
            <img src={turtle} className="w-8 h-8 mr-2 inline" />
            <span>Our values:</span>
          </h2>
          <p className="mb-6 ml-2 max-w-full text-left">
            At Pet Palace we comply with a series of values ​​so that our
            clients have the best possible service. These values ​​are: Free
            Shipping, Easy Payment, Quick Return and Quality assurance. Free
            shipping on all orders over $89. Throughout the United States,
            Canada, Europe and South America. We deliver 24 hours a day, 7 days
            a week. Contactless delivery is also possible. Stay safe and save
            with Casual Style. An easy and intuitive payment method. You just
            have to give us your information along with your card when
            completing the purchase process and that's it!. Enjoy your purchase.
            A quick return where the return costs are on us. Please return any
            item you are not satisfied with within 14 days of receiving the
            product. We will refund your money when you request it. Simply
            contact us within the estimated time frame. Last but not least we
            have quality insurance, where we care about our reputation and most
            importantly the comfort of our customers. With us, it's always "What
            you see is what you get."
          </p>
          <h2 className="text-xl font-semibold mt-8">
            <img src={rabbit} className="w-8 h-8 mr-2 inline" />
            <span>Let's connect!</span>
          </h2>
          <p className="ml-2 max-w-full text-left">
            To contact us you can go to the{" "}
            <Link
              to="/contact"
              className="text-violetamain underline mb-2 hover:text-purple-700"
            >
              contact section
            </Link>{" "}
            or through one of the contacts that appear in the footer of the
            page.
          </p>
        </div>
      </div>
      <div className="mt-20 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default About;
