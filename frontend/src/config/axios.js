import axios from 'axios'

import {
    FRONTEND_URL,
    BACKEND_URL,
    URL
} from './config.js'

const instance = axios.create({
    baseURL: URL
})

export default instance