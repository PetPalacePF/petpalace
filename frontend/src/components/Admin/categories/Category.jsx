import { useState } from "react"

import axios from '../../../config/axios.js'

const Category = ({ id, name, products, setAllCategories, allCategories }) => {

    const [ formName, setFormName ] = useState('')
    const [ editName, setEditName ] = useState(false)

    const handlePutName = () => {
        axios.put('/categories', {
            id,
            name:formName
        })
        .then(res => res.data)
        .then(data => {
            setAllCategories({
                ...allCategories,
                byId: {
                    ...allCategories.byId,
                    [data.id]: {
                        ...data,
                        products: []
                    } 
                }
            })
            setEditName(false)
        })
    }

    const handleDelete = () => {
        axios.delete(`/categories/${id}`)
            .then(res => res.data)
            .then(data => {
                const newAllIds = allCategories.allIds.filter(idCategory => idCategory !== id)
                const newById = newAllIds.reduce((acc, idCategory) => {
                    acc[idCategory] = allCategories.byId[idCategory]
                    return acc
                }, {})
                console.log(newAllIds, newById, allCategories)
                setAllCategories({
                    loading:false,
                    error:'',
                    allIds: newAllIds,
                    byId: newById,
                })
            })
            .catch(err => console.log(err))
    }

    return (
        <tr className='h-16 border-t border-[#A1A2A2]'>
            <td className="w-[600px]">
                {
                    editName 
                    ? <input 
                        className="border border-[#ccc] rounded-lg outline-none px-4 py-1 text-sm focus:shadow-sm focus:shadow-blue-400"
                        onBlur={handlePutName}
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                    />
                    : <p onClick={() => console.log(allCategories)}>{ name }</p>
                }
            </td>
            <td>
                {products.length}
            </td>
            <td>
                <div className='flex gap-4'>
                    <button
                        onClick={handleDelete}
                    >Delete</button>
                    <button
                        onClick={() => setEditName(true)}
                    >Edit</button>
                </div>
            </td>
        </tr>
    )
}



export default Category