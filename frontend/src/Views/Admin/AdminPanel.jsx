import { Routes, Route } from "react-router-dom"
import { Link } from "react-router-dom"

// * Routes
import Dashboard from './Dashboard.jsx'
import Categories from './Categories.jsx'
import Products from './Products.jsx'
import Orders from './Orders.jsx'

// * Components
import AdminNavbar from '../../components/Admin/AdminNavbar'

const AdminPanel = () => {
  return (
    <div className="flex gap-4">
        <AdminNavbar />
        <Routes>
            <Route path='/' element={<Dashboard/>} />
            <Route path='/categories' element={<Categories/>} />
            <Route path='/products' element={<Products/>} />
            <Route path='/orders' element={<Orders/>} />
        </Routes>
    </div>
  )
}

export default AdminPanel