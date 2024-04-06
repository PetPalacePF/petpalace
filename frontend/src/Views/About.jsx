import React from "react";
import { Footer } from "../components/Footer/Footer";

const About = () => {
  return (
    <div className="mx-auto mt-20" style={{ backgroundImage:  "url('./public/Carousel_2.jpg')"}}>
      <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-center border-b-2 border-black pb-2 mb-4">About Us</h1>
        <div className="flex flex-col items-start mt-20 relative backdrop-filter backdrop-blur-md rounded-lg shadow-md p-8">
          <h2 className="text-xl font-semibold mb-2 ml-2">🐾Welcome to Pet Palace - Your Premier Pet Destination</h2>
          <p className=" mb-6 ml-2 max-w-full text-left">
            At Pet Palace, we're dedicated to catering to every aspect of your
            pet's well-being. As pet lovers ourselves, we understand the
            importance of providing the best care for your furry companions.
            That's why we've curated an extensive catalogue of premium pet
            supplies, ensuring your pets have access to the finest products
            available. From nutritious foods to stylish accessories, we have
            everything your pets need to stay happy and healthy. Explore our vast
            selection and discover products tailored to your pet's unique
            preferences and needs. Whether you have a playful pup, a curious
            kitten, or any other adorable companion, Pet Palace has something
            special for every furry friend. Shopping at Pet Palace isn't just
            convenient; it's also a rewarding experience. Earn loyalty rewards
            with every purchase and enjoy exclusive discounts and promotions
            crafted just for you and your beloved pets. Join our community of pet
            lovers today and experience the ultimate destination for all your pet
            needs.
          </p>
          <h2 className="text-xl font-semibold mb-2 ml-2">🐾Expert Care at Your Fingertips</h2>
          <p className="mb-6 ml-2 max-w-full text-left">
            At Pet Palace, we go beyond just providing products. We're committed
            to ensuring your pet receives comprehensive care and attention. That's
            why we offer a unique feature that allows you to connect with
            experienced veterinarians right from the comfort of your home. Have
            questions about your pet's health or behavior? Our team of
            professionals is here to provide expert advice and guidance whenever
            you need it. Whether it's a dietary concern, grooming tips, or general
            wellness advice, our veterinarians are available to assist you every
            step of the way. With Pet Palace, you can rest assured that your pet's
            happiness and well-being are our top priorities. Join us today and
            experience the convenience of expert care at your fingertips. After
            all, at Pet Palace, every pet reigns supreme!
          </p>
          <h2 className="text-xl font-semibold mb-2 ml-2">🐾Let's Connect:</h2>
          <p className="ml-2 max-w-full text-left">
            To contact us you can go to the contact section or through one of the 
            contacts that appear in the footer of the page.
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






