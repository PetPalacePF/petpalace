import axios from '../../../config/axios.js'

const User = ({ id, name, country, phone, purchases, admin, enabled, usersData, setUsersData, user }) => {

    const adminId = JSON.parse(window.localStorage.getItem("userData"))?.id;

    const handleDisabledChange = () => {
        axios.put('/admin/users', {
            ...user,
            userAdmin_id: adminId,
            enabled: !enabled 
        })
        .then(res => res.data)
        .then(data => {
            const newOrdersUsers = usersData.orders.map(order => {
                if(data.user.id === order.id) {
                    return data.user
                }
                return order
            })
            setUsersData({...usersData, orders:newOrdersUsers})
            
        })
        .catch(err => console.log(err))
    }

    const handleAdminChange = () => {
        axios.put('/admin/users', {
            ...user,
            userAdmin_id: adminId,
            admin: !admin 
        })
        .then(res => res.data)
        .then(data => {
            const newOrdersUsers = usersData.orders.map(order => {
                if(data.user.id === order.id) {
                    return data.user
                }
                return order
            })
            setUsersData({...usersData, orders:newOrdersUsers})
            
        })
        .catch(err => console.log(err))
    }

    return (
        <tr className='h-16 border-t border-[#A1A2A2]'>
            <td>
                <div className='flex gap-2 items-center'>
                    <p>{name}</p>
                </div>
            </td>
            <td>
                {country ? country : 'Incompleted'}
            </td>
            <td>
                {phone ? phone : 'Incompleted'}
            </td>
            <td>
                {purchases?.length > 0 ? purchases : 0}
            </td>
            <td>
                <input 
                    type="checkbox"
                    checked={admin}
                    value={admin}
                    onChange={handleAdminChange}
                />
            </td>
            <td>
                <input 
                    type="checkbox"
                    checked={!enabled}
                    value={!enabled}
                    onChange={handleDisabledChange}
                />
            </td>
        </tr>
    )
}

export default User