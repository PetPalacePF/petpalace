import { Routes, Route } from "react-router-dom"
import { Link } from "react-router-dom"

// * Routes
import Dashboard from './Dashboard.jsx'
import Categories from './Categories.jsx'
import Products from './Products.jsx'
import Orders from './Orders.jsx'

// * Components
import AdminNavbar from '../../components/Admin/AdminNavbar'

const AdminPanel = ({allCategories}) => {
  return (
    <div className="flex">
        <AdminNavbar />
        <div className="w-full p-6">
          <Routes>
              <Route path='/' element={<Dashboard/>} />
              <Route path='/categories' element={<Categories allCategories={allCategories} />} />
              <Route path='/products' element={<Products/>} />
              <Route path='/orders' element={<Orders/>} />
          </Routes>
        </div>
    </div>
  )
}

export default AdminPanel