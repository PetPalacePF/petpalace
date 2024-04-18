import User from '../../Admin/users/User.jsx'

const UsersTable = ({usersData, setUsersData}) => {

  return (
    <table className="w-full text-left mt-6">
        <thead className='h-8'>
            <tr>
              <th>User</th>
              <th>Country</th>
              <th>Phone</th>
              <th>Purchases</th>
              <th>Admin</th>
              <th>Disabled</th>
            </tr>
        </thead>
        <tbody className=''>
            {
              usersData?.orders &&
              usersData.orders.map(user => (
                <User
                  key={user.id}
                  id={user.id}
                  name={user.name}
                  country={user.country}
                  phone={user.phone}
                  purchases={user.purchases}
                  admin={user.admin}
                  enabled={user.enabled}
                  user={user}
                  usersData={usersData}
                  setUsersData={setUsersData}
                />
              ))
            }
        </tbody>
    </table>
  )
}

export default UsersTable