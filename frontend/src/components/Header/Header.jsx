import { Link } from "react-router-dom"
import { SearchBar } from "../Search Bar/SearchBar"

export const Header = () => {
    return (
        <>
            🐾PET PALACE
            <SearchBar />
            <Link> 🛒MY CART </Link>
           
        </>
    )
}
