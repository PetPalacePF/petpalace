import { useState } from 'react'

import Categories from '../../components/Admin/categories/Categories'
import CreateForm from "../../components/Admin/categories/CreateForm"

import ResetFilter from '../../assets/resetfilter.png'
import PlusIcon from '../../assets/plusicon.png'
import Filters from '../../components/Admin/categories/Filters'

const AdminCategories = ({allCategories}) => {

  const [ creatingCategory, setCreatingCategory ] = useState(false)

  return (
    <>

      <div className='border-b-2 border-[#A1A2A2] mb-4'>
        <h1 className='font-semibold text-2xl pb-1'>Categories</h1>
      </div>

      <div className='flex gap-4'>
        <Filters />
        <div
            className='border-2 border-violetamain rounded-lg w-[33px] flex items-center justify-center font-semibold text-violetamain'
        >
          <img src={ResetFilter} />
        </div>

        <div className='border-2 border-violetamain rounded-lg w-[33px] flex items-center justify-center font-semibold text-violetamain'>
          <img src={PlusIcon} />
        </div>

      </div>

      {/* <CreateForm /> */}

      <Categories allCategories={allCategories} />

    </>
  )
  
}

export default AdminCategories