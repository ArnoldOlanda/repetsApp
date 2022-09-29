import axios from 'axios'

export const repetsAPI = axios.create({
    // baseURL:'https://repetsapi-production.up.railway.app/api',
    baseURL:'http://192.168.1.50:8000/api',
    headers: {
        'Content-Type': 'application/json'
    }
})