import axios from 'axios'

export const clienteApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8080',
    headers: { 'Content-Type': 'application/json' },
})