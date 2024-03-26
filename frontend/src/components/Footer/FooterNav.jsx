import { Link } from "react-router-dom"

export const FooterNav = () => {
  return (
         <div className="flex flex-col items-start mb-4">
                    <Link to='/about' className="text-white mb-2"> ABOUT US </Link>
                    <Link to='/shop' className="text-white mb-2"> SHOP </Link>
                    <Link to='/dogs' className="text-white mb-2"> DOGS </Link>
                    <Link to='/cats' className="text-white mb-2"> CATS </Link>
                </div>
  )
}
