import { Link } from "react-router-dom";
import { FooterNav } from "./FooterNav";
import { Contact } from "./Contact";

export const Footer = () => {
    return (
        <footer className="bg-black py-10 text-white text-lg w-full">
            <div className="container mx-auto flex flex-wrap items-center">
                <div className="mb-5 md:w-1/2 text-left">
                    <Link to='/' className="text-white">🐾PET PALACE</Link>
                </div>
                <div className="mb-5 md:w-1/2 text-right">
                    ¡Haz que la cola de tu peludo amigo nunca deje de moverse!
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
