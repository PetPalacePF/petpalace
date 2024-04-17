/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Routes, Route } from "react-router-dom"
import { Link } from "react-router-dom"

// * Routes
import Dashboard from './Dashboard.jsx'
import Categories from './Categories.jsx'
import Products from './Products.jsx'
import Orders from './Orders.jsx'

// * Components
import ProductForm from "../../components/Admin/ProductForm";
import AdminNavbar from '../../components/Admin/AdminNavbar'
import Users from "./Users.jsx"

const AdminPanel = ({ allCategories, setAllCategories }) => {
  return (
    <div className="flex">
      <AdminNavbar />
      <div className="w-full ml-[200px] p-6">
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/categories' element={<Categories allCategories={allCategories} setAllCategories={setAllCategories} />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/new' element={<ProductForm />} />
          <Route path='/Purchase' element={<Orders />} />
          <Route path='/users' element={<Users/>} />
        </Routes>
      </div>
    </div>
  )
}

export default AdminPanel