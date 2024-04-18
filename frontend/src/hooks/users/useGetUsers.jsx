import { useState, useEffect } from "react"

import axios from '../../config/axios.js'

const useGetUsers = () => {
    const [ usersData, setUsersData ] = useState([])

    useEffect(() => {

        axios.get('/users')
            .then(res => res.data)
            .then(data => setUsersData(data))
            .catch(err => console.log(err))

    }, [])

    return {
        usersData,
        setUsersData
    }

}

export default useGetUsers