import UsersTable from "../../components/Admin/users/UsersTable"
import useGetUsers from "../../hooks/users/useGetUsers"

const Users = () => {

  const { usersData, setUsersData } = useGetUsers()
  
  console.log(usersData)

  return (
    <>
      <div className='border-b-2 border-[#A1A2A2] mb-4'>
        <h1 className='font-semibold text-2xl pb-1'>Users</h1>
        <UsersTable usersData={usersData} setUsersData={setUsersData} />
      </div>
      {/* <AllProducts productsData={productsData} /> */}
    </>
  )
}

export default Users