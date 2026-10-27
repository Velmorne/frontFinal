import { clienteApi } from './clienteApi.js'

const RUTA = '/reservas' // Ajusta si tu Controller en Java tiene otra ruta

export async function guardarReserva(reserva) {
    try {
        const respuesta = await clienteApi.post(RUTA, reserva)
        return respuesta.data
    } catch (error) {
        console.error('Error al guardar la reserva:', error)
        throw error
    }
}