import { clienteApi } from './clienteApi.js'

export async function iniciarSesion(email, password) {
    const respuesta = await clienteApi.post('/usuarios/login', { email, password })
    return respuesta.data
}