import { useNavigate } from "react-router-dom"

import arrowLeft from '../users/img/arrowLeft.png'
import arrowRight from '../users/img/arrowRight.png'

const ProductsPaginated = ({ page = 1, productsData }) => {

    const navigate = useNavigate()

    const handlePreviousPage = () => {
        if( page > 1 ) {
            navigate(`/admin/products?page=${parseInt(page) - 1}`)
        } 
    }
    const handleNextPage = () => {
        if(productsData.totalPages >= parseInt(page) + 1) {
            navigate(`/admin/products?page=${parseInt(page) + 1}`)
        }
    }

    return (
        <div className='my-4 text-end flex items-center justify-end gap-3'>
            <button
                onClick={handlePreviousPage}
            >
                <img
                    className="w-3" 
                    src={arrowLeft}
                />
            </button>
            <p>{page}</p>
            <button
                onClick={handleNextPage}
            >
                <img
                    className="w-3" 
                    src={arrowRight}
                />
            </button>
        </div>
    )
}

export default ProductsPaginated