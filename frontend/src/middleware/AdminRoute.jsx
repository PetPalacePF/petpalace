import { useNavigate } from 'react-router-dom'
const AdminRoute = ({ children }) => {

    const navigate = useNavigate()

    const userData = JSON.parse(window.localStorage.getItem("userData"))

    if(userData?.admin) return children
    else return navigate('/')
}

export default AdminRoute