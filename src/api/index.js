import axios from 'axios'

export const repetsApiUrl = 'http://192.168.0.11:8000/api'
// export const repetsApiUrl = 'https://repetsapi-production.up.railway.app/api'


export const repetsAPI = axios.create({
    baseURL: repetsApiUrl,
    headers: {
        'Content-Type': 'application/json'
    }
})