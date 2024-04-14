import { useState } from 'react'
import Filters from '../../components/Admin/categories/Filters'

const AdminCategories = ({ allCategories, setAllCategories }) => {

  const [filteredCategories, setFilteredCategories] = useState([]);


  return (
    <>
      <div className='border-b-2 border-[#A1A2A2] mb-4'>
        <h1 className='font-semibold text-2xl pb-1'>Categories</h1>
      </div>
      <div className='flex gap-4'>
        <Filters setAllCategories={setAllCategories} allCategories={allCategories} filteredCategories={filteredCategories} setFilteredCategories={setFilteredCategories} />
      </div>
    </>
  )

}

export default AdminCategories