import axios from '../../../config/axios.js'

import Trash from './trash.png'
const Product = ({
    id,
    name,
    brand,
    rating,
    price,
    stock,
    enabled,
    img,
    productsData,
    setProductsData,
    productInfo
}) => {

    const handleChangeProduct = (e) => {
        const newProducts = productsData.products.map(product => {
            if (product.id === id) {
                product[e.target.name] = e.target.value
                return product
            }
            return product
        })
        setProductsData({
            ...productsData,
            productsData: newProducts
        })
    }

    const handlePutProduct = () => {
        const productPut = productsData.products.filter(product => product.id === id)
        productPut[0].categories = productPut[0].Categories.map(category => category.id)
        axios.put('/products', ...productPut
        )
            .then(res => res.data)
            .then(data => {
                console.log(data)
            })
            .catch(err => console.log(err))
    }

    const handleDeleteProduct = (name) => {
        const deleted = window.confirm(`Are you sure you want to delete the ${name} product?`)
        if(deleted) {
            axios.delete(`/products/${id}`)
                .then(res => res.data)
                .then(data => {
                    const newProducts = productsData.products.filter(product => product.id !== id)
                    setProductsData({
                        ...productsData,
                        products: newProducts
                    })
                })
                .catch(err => console.log(err))
        }
    }

    const handleEnabledChange = () => {
        axios.put('/products', {
            ...productInfo,
            enabled: !enabled,
            categories: productInfo.Categories.map(category => category.id)
        })
        .then(res => res.data)
        .then(data => {
            const newProducts = productsData.products.map(product => {
                if(data.updatedProduct.id === product.id) {
                    return data.updatedProduct
                }
                return product
            })
            setProductsData({...productsData, products:newProducts})
        })
        .catch(err => console.log(err))
    }

    return (
        <tr className='h-16 border-t border-[#A1A2A2]'>
            <td>
                <div className='flex gap-2 items-center'>
                    <img
                        src={img}
                        className='w-12'
                    />
                    <p>{name}</p>
                </div>
            </td>
            <td>
                {brand}
            </td>
            <td>
                <input
                    className='border max-w-[80px] rounded-lg text-sm font-medium px-2 py-1 outline-none focus:shadow-sm focus:shadow-blue-400'
                    type='number'
                    name='price'
                    value={price}
                    onChange={handleChangeProduct}
                    onBlur={handlePutProduct}
                />
            </td>
            <td>
                <input
                    className='border max-w-[80px] rounded-lg text-sm font-medium px-2 py-1 outline-none focus:shadow-sm focus:shadow-blue-400'
                    type='number'
                    value={stock}
                    onChange={handleChangeProduct}
                    onBlur={handlePutProduct}
                    name='stock'
                />
            </td>
            <td>
                {rating}
            </td>
            <td>
                <input 
                    type="checkbox"
                    checked={enabled}
                    value={enabled}
                    onChange={handleEnabledChange}
                />
            </td>
            <td>
                <button
                    onClick={() => handleDeleteProduct(name)}
                    className='w-7 h-7 border border-[#ccc] bg-[#eee] hover:bg-[#ccc] rounded-full flex items-center justify-center transition-all'
                >
                    <img
                        src={Trash}
                        className='w-4'
                    />
                </button>
            </td>
        </tr>
    )
}

export default Product