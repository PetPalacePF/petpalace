import { Link } from "react-router-dom"

export const FooterNav = () => {
  return (
         <div className="flex flex-col items-start mb-4">
                    <Link to='/about' className="text-white mb-2 hover:text-gray-300 hover:underline"> ABOUT US </Link>
                    <Link to='/contact' className="text-white mb-2 hover:text-gray-300 hover:underline"> CONTACT US </Link>
                    <Link to='/shop' className="text-white mb-2 hover:text-gray-300 hover:underline"> SHOP </Link>
                    {/*<Link to='/dogs' className="text-white mb-2"> DOGS </Link>
                    <Link to='/cats' className="text-white mb-2"> CATS </Link>*/}
                </div>
  )
}
