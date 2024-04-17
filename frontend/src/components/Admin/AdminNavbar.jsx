import { Link } from "react-router-dom"

const AdminNavbar = () => {
  return (
    <div className="bg-violetamain text-white font-bold flex flex-col gap-4 h-screen p-6 w-[200px] fixed">
      <Link to='/'>Home</Link>
      <Link to='/admin'>Dashboard</Link>
      <Link to='/admin/categories'>Categories</Link>
      <Link to='/admin/products'>Products</Link>
      <Link to='/admin/Purchase'>Purchase</Link>
      <Link to='/admin/users'>Users</Link>
    </div>
  )
}

export default AdminNavbar