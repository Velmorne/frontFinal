import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PanelFormulario } from '../componentes/PanelFormulario'
import { guardarEspacio } from '../services/servicioEspacios.js'

const IMAGEN = 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1400&q=80'

export function RegistroEspacio() {
  const navegar = useNavigate()

  const [espacio, setEspacio] = useState({
    name: '',
    description: '',
    photo: '',
    aforo: '',
  })
  const [errores, setErrores] = useState({})
  const [errorApi, setErrorApi] = useState('')

  function manejarCambio(evento) {
    const { name, value } = evento.target
    setEspacio({ ...espacio, [name]: value })
  }

  function validar() {
    const nuevosErrores = {}
    if (espacio.name.trim() === '') {
      nuevosErrores.name = 'El nombre es obligatorio'
    }
    if (espacio.description.trim().length < 10) {
      nuevosErrores.description = 'La descripción debe tener mínimo 10 caracteres'
    }
    if (!/^https?:\/\/\S+$/.test(espacio.photo)) {
      nuevosErrores.photo = 'Ingrese una URL válida (http:// o https://)'
    }
    if (espacio.aforo === '' || Number(espacio.aforo) <= 0) {
      nuevosErrores.aforo = 'El aforo debe ser un número mayor a 0'
    }
    return nuevosErrores
  }

  async function manejarEnvio(evento) {
    evento.preventDefault()

    const nuevosErrores = validar()
    setErrores(nuevosErrores)
    if (Object.keys(nuevosErrores).length > 0) {
      return
    }

    setErrorApi('')
    try {
      await guardarEspacio({ ...espacio, aforo: Number(espacio.aforo) })
      navegar('/listaespacios')
    } catch (error) {
      const mensaje = error.response?.data?.message || 'No fue posible registrar el espacio'
      setErrorApi(mensaje)
    }
  }

  return (
    <PanelFormulario
      imagen={IMAGEN}
      titulo="Registra una zona común"
      subtitulo="Piscina, salón social, gimnasio, BBQ... cada espacio con su foto y aforo."
      enlaceVolver="/home"
    >
      <h2 className="fw-bold mb-1">Nuevo espacio</h2>
      <p className="text-muted mb-4">Completa la información del espacio.</p>

      {errorApi && <div className="alert alert-danger">{errorApi}</div>}
      <form onSubmit={manejarEnvio} noValidate>
        <div className="mb-3">
          <label className="form-label fw-semibold">Nombre</label>
          <div className="input-group has-validation">
            <span className="input-group-text"><i className="bi bi-door-open"></i></span>
            <input
              type="text"
              name="name"
              placeholder="Salón social"
              className={`form-control ${errores.name ? 'is-invalid' : ''}`}
              value={espacio.name}
              onChange={manejarCambio}
            />
            <div className="invalid-feedback">{errores.name}</div>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Descripción</label>
          <div className="input-group has-validation">
            <span className="input-group-text"><i className="bi bi-card-text"></i></span>
            <textarea
              name="description"
              rows="3"
              placeholder="Describe el espacio y sus condiciones de uso"
              className={`form-control ${errores.description ? 'is-invalid' : ''}`}
              value={espacio.description}
              onChange={manejarCambio}
            />
            <div className="invalid-feedback">{errores.description}</div>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Foto (URL)</label>
          <div className="input-group has-validation">
            <span className="input-group-text"><i className="bi bi-image"></i></span>
            <input
              type="url"
              name="photo"
              placeholder="https://..."
              className={`form-control ${errores.photo ? 'is-invalid' : ''}`}
              value={espacio.photo}
              onChange={manejarCambio}
            />
            <div className="invalid-feedback">{errores.photo}</div>
          </div>
        </div>

        <div className="mb-4">
          <label className="form-label fw-semibold">Aforo</label>
          <div className="input-group has-validation">
            <span className="input-group-text"><i className="bi bi-people"></i></span>
            <input
              type="number"
              name="aforo"
              min="1"
              placeholder="Cantidad máxima de personas"
              className={`form-control ${errores.aforo ? 'is-invalid' : ''}`}
              value={espacio.aforo}
              onChange={manejarCambio}
            />
            <div className="invalid-feedback">{errores.aforo}</div>
          </div>
        </div>

        <button type="submit" className="btn btn-marca btn-lg w-100">
          <i className="bi bi-save me-2"></i>Guardar espacio
        </button>
      </form>
    </PanelFormulario>
  )
}
