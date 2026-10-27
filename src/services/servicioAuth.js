import { clienteApi } from './clienteApi.js'

export async function iniciarSesion(email, password) {
    const respuesta = await clienteApi.post('/paseoapi/v1/usuarios/login', { email, password })
    return respuesta.data
}