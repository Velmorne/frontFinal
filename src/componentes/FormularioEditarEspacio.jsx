import { useState } from 'react'
import { modificarEspacio } from '../services/servicioEspacios.js'

// Formulario que aparece dentro de la tarjeta cuando el administrador
// hace clic en "Editar". Permite cambiar nombre, descripción y aforo.
//
// Props:
//   espacio     -> el espacio que se va a editar (para llenar los campos)
//   alGuardar   -> se llama con el espacio actualizado que devuelve el back
//   alCancelar  -> se llama cuando el usuario cierra el formulario sin guardar
export function FormularioEditarEspacio({ espacio, alGuardar, alCancelar }) {
  // Los campos empiezan con los datos actuales del espacio
  const [datos, setDatos] = useState({
    name: espacio.name,
    description: espacio.description ?? '',
    aforo: espacio.aforo ?? '',
  })
  const [errores, setErrores] = useState({})
  const [errorApi, setErrorApi] = useState('')
  const [guardando, setGuardando] = useState(false)

  function manejarCambio(evento) {
    const { name, value } = evento.target
    setDatos({ ...datos, [name]: value })
  }

  // Mismas reglas que el formulario de registro de espacios
  function validar() {
    const nuevosErrores = {}
    if (datos.name.trim() === '') {
      nuevosErrores.name = 'El nombre es obligatorio'
    }
    if (datos.description.trim().length < 10) {
      nuevosErrores.description = 'La descripción debe tener mínimo 10 caracteres'
    }
    if (datos.aforo === '' || Number(datos.aforo) <= 0) {
      nuevosErrores.aforo = 'El aforo debe ser un número mayor a 0'
    }
    return nuevosErrores
  }

  async function manejarEnvio(evento) {
    evento.preventDefault()

    // 1. Validar en el front
    const nuevosErrores = validar()
    setErrores(nuevosErrores)
    if (Object.keys(nuevosErrores).length > 0) {
      return
    }

    // 2. Enviar al back
    setErrorApi('')
    setGuardando(true)
    try {
      const espacioActualizado = await modificarEspacio(espacio.id, {
        name: datos.name.trim(),
        description: datos.description.trim(),
        aforo: Number(datos.aforo),
      })
      // 3. Avisar a la lista para que pinte los datos nuevos
      alGuardar(espacioActualizado)
    } catch (error) {
      // 4. El back respondió con error (ej. nombre repetido): mostrar su mensaje
      const mensaje = error.response?.data?.message || 'No fue posible modificar el espacio'
      setErrorApi(mensaje)
    } finally {
      setGuardando(false)
    }
  }

  return (
    <form onSubmit={manejarEnvio} noValidate>
      {errorApi && <div className="alert alert-danger py-2 small">{errorApi}</div>}

      <div className="mb-2">
        <label className="form-label">Nombre</label>
        <input
          type="text"
          name="name"
          className={`form-control form-control-sm ${errores.name ? 'is-invalid' : ''}`}
          value={datos.name}
          onChange={manejarCambio}
        />
        <div className="invalid-feedback">{errores.name}</div>
      </div>

      <div className="mb-2">
        <label className="form-label">Descripción</label>
        <textarea
          name="description"
          rows="3"
          className={`form-control form-control-sm ${errores.description ? 'is-invalid' : ''}`}
          value={datos.description}
          onChange={manejarCambio}
        />
        <div className="invalid-feedback">{errores.description}</div>
      </div>

      <div className="mb-3">
        <label className="form-label">Aforo</label>
        <input
          type="number"
          name="aforo"
          min="1"
          className={`form-control form-control-sm ${errores.aforo ? 'is-invalid' : ''}`}
          value={datos.aforo}
          onChange={manejarCambio}
        />
        <div className="invalid-feedback">{errores.aforo}</div>
      </div>

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-marca btn-sm flex-grow-1" disabled={guardando}>
          {guardando ? 'Guardando...' : 'Guardar'}
        </button>
        <button type="button" className="btn btn-outline-secondary btn-sm" onClick={alCancelar} disabled={guardando}>
          Cancelar
        </button>
      </div>
    </form>
  )
}
