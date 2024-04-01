import axios from "../config/axios.js"

const postProduct = async (body) =>{
    try {
        
        const {data} = await axios.post('/products', body)
        return data

    } catch (error) {
        console.log(error)
        return error     
    }
}


export default postProduct