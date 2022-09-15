import axios from 'axios'

export const repetsAPI = axios.create({
    baseURL:'https://repetsapi-production.up.railway.app/api'
})