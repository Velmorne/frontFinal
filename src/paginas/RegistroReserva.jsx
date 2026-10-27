import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PanelFormulario } from '../componentes/PanelFormulario'
import { useSesion } from '../contexto/ContextoSesion.jsx'
import { guardarReserva } from '../services/servicioReservas.js'
import { obtenerEspacios } from '../services/servicioEspacios.js' // Asumiendo que creaste este método

const IMAGEN = 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1400&q=80'

export function RegistroReserva() {
  const navegar = useNavigate()
  const { usuario } = useSesion() // Obtenemos el usuario activo

  // 1. Añadimos espacioId al estado
  const [reserva, setReserva] = useState({
    espacioId: '',
    fecha: '',
    tiempo: '',
  })

  const [espacios, setEspacios] = useState([])
  const [errores, setErrores] = useState({})
  const [errorApi, setErrorApi] = useState('')

  // 2. Cargar espacios al montar el componente
  useEffect(() => {
    const cargarEspacios = async () => {
      try {
        const data = await obtenerEspacios()
        setEspacios(data)
      } catch (error) {
        console.error("Error cargando espacios", error)
      }
    }
    cargarEspacios()
  }, [])

  function manejarCambio(evento) {
    const { name, value } = evento.target
    setReserva({ ...reserva, [name]: value })
  }

  function validar() {
    const nuevosErrores = {}
    const hoy = new Date().toISOString().split('T')[0]

    if (reserva.espacioId === '') {
      nuevosErrores.espacioId = 'Seleccione un espacio'
    }
    if (reserva.fecha === '') {
      nuevosErrores.fecha = 'La fecha es obligatoria'
    } else if (reserva.fecha < hoy) {
      nuevosErrores.fecha = 'La fecha no puede ser anterior a hoy'
    }
    if (reserva.tiempo === '') {
      nuevosErrores.tiempo = 'La hora es obligatoria'
    }
    return nuevosErrores
  }

  // 3. Conectar con el backend
  async function manejarEnvio(evento) {
    evento.preventDefault()
    const nuevosErrores = validar()
    setErrores(nuevosErrores)

    if (Object.keys(nuevosErrores).length > 0) {
      return null
    }

    setErrorApi('')
    try {
      // Ensamblamos el objeto tal como lo espera Java

      const reservaAEnviar = {
        date: reserva.fecha,
        time: reserva.tiempo,
        usuario: { id: usuario.id },   
        espacio: { id: reserva.espacioId } 
      }

      await guardarReserva(reservaAEnviar)
      alert('Reserva exitosa')
      navegar('/home')

    } catch (error) {
      const mensaje = error.response?.data?.message || 'No fue posible registrar la reserva'
      setErrorApi(mensaje)
    }
  }

  return (
    <PanelFormulario
      imagen={IMAGEN}
      titulo="Aparta tu espacio"
      subtitulo="Elige la zona, la fecha y la hora, nosotros nos encargamos del resto."
      enlaceVolver="/home"
    >
      <h2 className="fw-bold mb-1">Nueva reserva</h2>
      <p className="text-muted mb-4">Indica cuándo y dónde quieres reservar.</p>

      {errorApi && <div className="alert alert-danger">{errorApi}</div>}

      <form onSubmit={manejarEnvio} noValidate>

        {/* Nuevo campo: Selector de Espacios */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Espacio</label>
          <div className="input-group has-validation">
            <span className="input-group-text"><i className="bi bi-geo-alt"></i></span>
            <select
              name="espacioId"
              className={`form-select ${errores.espacioId ? 'is-invalid' : ''}`}
              value={reserva.espacioId}
              onChange={manejarCambio}
            >
              <option value="">Seleccione un espacio...</option>
              {espacios.map(espacio => (
                <option key={espacio.id} value={espacio.id}>
                  {espacio.name} (Aforo: {espacio.aforo})
                </option>
              ))}
            </select>
            <div className="invalid-feedback">{errores.espacioId}</div>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Fecha</label>
          <div className="input-group has-validation">
            <span className="input-group-text"><i className="bi bi-calendar-event"></i></span>
            <input
              type="date"
              name="fecha"
              className={`form-control ${errores.fecha ? 'is-invalid' : ''}`}
              value={reserva.fecha}
              onChange={manejarCambio}
            />
            <div className="invalid-feedback">{errores.fecha}</div>
          </div>
        </div>

        <div className="mb-4">
          <label className="form-label fw-semibold">Hora</label>
          <div className="input-group has-validation">
            <span className="input-group-text"><i className="bi bi-clock"></i></span>
            <input
              type="time"
              name="tiempo"
              className={`form-control ${errores.tiempo ? 'is-invalid' : ''}`}
              value={reserva.tiempo}
              onChange={manejarCambio}
            />
            <div className="invalid-feedback">{errores.tiempo}</div>
          </div>
        </div>

        <button type="submit" className="btn btn-marca btn-lg w-100">
          <i className="bi bi-calendar-check me-2"></i>Confirmar reserva
        </button>
      </form>
    </PanelFormulario>
  )
}
