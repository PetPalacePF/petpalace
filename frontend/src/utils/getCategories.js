import axios from "../config/axios";

const getCategories = async () => {
    try {
        const { data } = await axios.get('/categories')
        return data

    } catch (error) {
        console.log(error)
        return error
    }
}

export default getCategories;