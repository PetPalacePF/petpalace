import { useLocation } from "react-router-dom"

import { useState, useEffect } from "react"

import axios from '../../config/axios.js'

const useGetUsers = ( page = 1 ) => {

    const [ usersData, setUsersData ] = useState([])
    const location = useLocation()

    useEffect(() => {
        console.log('a');
        axios.get(`/users?page=${page}`)
            .then(res => res.data)
            .then(data => setUsersData(data))
            .catch(err => {
                setUsersData(err.response.data.orders)
                console.log(err)
            })

    }, [location.search])

    return {
        usersData,
        setUsersData
    }

}

export default useGetUsers