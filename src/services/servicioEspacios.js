import { clienteApi } from './clienteApi.js'

const RUTA = '/espacios'

export async function obtenerEspacios() {
    try {
        const respuesta = await clienteApi.get(RUTA)
        return respuesta.data
    } catch (error) {
        console.error('Error al obtener los espacios:', error)
        throw error
    }
}

export async function guardarEspacio(espacio) {
    try {
        const respuesta = await clienteApi.post(RUTA, espacio)
        return respuesta.data
    } catch (error) {
        console.error('Error al guardar el espacio:', error)
        throw error
    }
}