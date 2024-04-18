import { useLocation } from "react-router-dom"

import UsersTable from "../../components/Admin/users/UsersTable"
import useGetUsers from "../../hooks/users/useGetUsers"
import UsersPaginated from "../../components/Admin/users/UsersPaginated"

const Users = () => {

  const location = useLocation()
  const { usersData, setUsersData } = useGetUsers(location.search.split('')[location.search.length - 1])

  return (
    <>
      <div className='border-b-2 border-[#A1A2A2] mb-4'>
        <h1 className='font-semibold text-2xl pb-1'>Users</h1>
      </div>
        {
          usersData?.orders?.length > 0
          ? <UsersTable usersData={usersData} setUsersData={setUsersData} />
          : <div>
            <p>No hay usuarios en esta página</p>
          </div>
        }
        <UsersPaginated usersData={usersData} setUsersData={setUsersData} page={location.search.split('')[location.search.length - 1]} />
    </>
  )
}

export default Users