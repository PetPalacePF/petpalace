import { Link } from "react-router-dom";

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
            <div className="container mx-auto flex flex-wrap items-center justify-center md:justify-between">
                <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
                    <Link to='/aboutUs' className="text-white mb-2">ABOUT US</Link>
                    <Link to='/contact' className="text-white mb-2">CONTACT</Link>
                    <Link to='/dogs' className="text-white mb-2">DOGS</Link>
                    <Link to='/cats' className="text-white mb-2">CATS</Link>
                </div>
                <div className="text-center md:text-right">
                    <p> (TELEFONO) </p>
                    <p>petpalacepf@gmail.com</p>
                    <p>Buenos Aires, Argentina.</p>
                </div>
            </div>
        </footer>
    );
};
