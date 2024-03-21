import axios from '../config/axios.js'

const postCategory = async (body) => {
    try {
        
        const { data } = await axios.post('/categories', body)
        return data

    } catch (error) {
        console.log(error)
        return error        
    }
}

export default postCategory