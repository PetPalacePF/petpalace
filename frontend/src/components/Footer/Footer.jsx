import { Link } from "react-router-dom";
import { FooterNav } from "./FooterNav";
import { Contact } from "./Contact";

export const Footer = () => {
    return (
        <footer className="bg-black py-10 text-white text-lg w-full">
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                    <div className="pb-4">
                        <Link to='/' className="text-white">🐾PET PALACE</Link>
                    </div>
                    <div>
                        <p className="m-0 pb-4">¡Keep your furry friend's tail wagging non-stop!</p>
                    </div>
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
