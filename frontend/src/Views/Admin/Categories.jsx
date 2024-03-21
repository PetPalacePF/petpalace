import Categories from '../../components/Admin/categories/Categories'
import CreateForm from "../../components/Admin/categories/CreateForm"


const AdminCategories = ({allCategories}) => {

  return (
    <div className='w-full p-6'>
      <div className='border-b-2 border-[#A1A2A2]'>
        <h1 className='font-semibold text-2xl pb-1'>Categories</h1>
      </div>
      <CreateForm />
      <Categories allCategories={allCategories} />
    </div>
  )
  
}

export default AdminCategories