import React from 'react'

const Category = ({ name, products, }) => {

  return (
    <tr className='h-16 border-t border-[#A1A2A2]'>
        <td>
            {name}
        </td>
        <td>
            {products.length}
        </td>
        <td>
            <div className='flex gap-4'>
                <button>Borrar</button>
                <button>Editar</button>
            </div>
        </td>
    </tr>
  )
}



export default Category