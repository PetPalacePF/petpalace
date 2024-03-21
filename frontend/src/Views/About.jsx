import React from "react";
import { Header } from "../components/Header/Header";
import { NavBar } from "../components/Nav Bar/NavBar";

const About = () => {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <NavBar />
      </div>
      <div>
        <h1>About Us</h1>
        <p></p>
        <h2>Tech Stack:</h2>
        <ul>
          <li>React.js</li>
          <li>||</li>
          <li>JavaScript</li>
          <li>||</li>
          <li>Node.js</li>
          <li>||</li>
          <li>Express.js</li>
          <li>||</li>
          <li>PostrgreSQL</li>
          <li>||</li>
          <li>Tailwind.css</li>
        </ul>
        <h2>My Focus:</h2>
        <p>FInal Project of Henry Bootcamp</p>
        <h2>About this project:</h2>
        <p>
          With a well coordinated group, we managed to build this awesome
          webapp. An e-commerce that's all about pets. Buy products, food, get
          in touch with veterinarians, etc. OBVIAMENTE FALTA TEXTO DESPUES LE
          MANDO MAS GUITARREO
        </p>
        <h2>Let's Connect:</h2>
        <p>Aca iria el footer?</p>
      </div>
    </div>
  );
};

export default About;
