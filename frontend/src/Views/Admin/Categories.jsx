
import { useState } from 'react'

import BackgroundBlur from '../../components/BackgroundBlur/BackgroundBlur'

import Categories from '../../components/Admin/categories/Categories'
import CreateForm from "../../components/Admin/categories/CreateForm"

import ResetFilter from '../../assets/resetfilter.png'
import PlusIcon from '../../assets/plusicon.png'
import Filters from '../../components/Admin/categories/Filters'

const AdminCategories = ({ allCategories, setAllCategories }) => {

  const [ creatingCategory, setCreatingCategory ] = useState(false)
  const [showCart, setShowCart] = useState(false);

  const handleCreateCategory = () => {
    setCreatingCategory(true)
    setTimeout(() => {
      setShowCart(true)
    }, 100);
  }

  const handleCloseCategory = () => {
    setShowCart(false)
    setTimeout(() => {
      setCreatingCategory(false)
    }, 100)
  }

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

        <button 
          onClick={handleCreateCategory}
          className='border-2 border-violetamain rounded-lg w-[33px] flex items-center justify-center font-semibold text-violetamain'>
          <img src={PlusIcon} />
        </button>

      </div>
      <Categories setAllCategories={setAllCategories} allCategories={allCategories} />
      {
        creatingCategory &&
        <BackgroundBlur
          showCart={showCart}
          onClick={handleCloseCategory}
        >
          {
            showCart &&
            <CreateForm 
              creatingCategory={creatingCategory} 
              setCreatingCategory={setCreatingCategory}
              setAllCategories={setAllCategories}
              allCategories={allCategories}
            />
          }
        </BackgroundBlur>
      }
    </>
  )
  
}

export default AdminCategories