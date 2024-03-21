import { Link } from "react-router-dom";
import { FooterNav } from "./FooterNav";
import { Contact } from "./Contact";

export const Footer = () => {
    return (
        <footer className="bg-black py-10 text-white text-lg w-full">
            <div className="container mx-auto flex flex-col items-center justify-center md:flex-wrap md:items-center md:justify-between">
                <div className="mb-5 text-center">
                    <Link to='/' className="text-white">🐾PET PALACE</Link>
                </div>
                <div className="mb-5 text-center">
                    <p>¡Haz que la cola de tu peludo amigo nunca deje de moverse!</p>
                </div>
            </div>
            <hr className="border-white my-4" />
            <div className="container mx-auto flex justify-between">
                <FooterNav />
                <Contact />
            </div>
        </footer>
    );
};
