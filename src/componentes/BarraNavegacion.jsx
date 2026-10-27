import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSesion } from '../contexto/ContextoSesion.jsx'

// Barra superior que se muestra en TODAS las páginas privadas.
// Se pinta una sola vez desde LayoutPrivado, no desde cada página.
export function BarraNavegacion() {
  const navegar = useNavigate()
  const { usuario, esAdministrador, cerrarSesion } = useSesion()

  // En pantallas pequeñas el menú se abre y cierra con el botón ☰
  const [menuAbierto, setMenuAbierto] = useState(false)

  function salir() {
    cerrarSesion()
    navegar('/login')
  }

  function cerrarMenu() {
    setMenuAbierto(false)
  }

  // NavLink marca automáticamente como "active" el enlace de la página actual
  function claseEnlace({ isActive }) {
    return `nav-link ${isActive ? 'active fw-semibold' : ''}`
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top barra-principal">
      <div className="container">
        <Link to="/home" className="navbar-brand d-flex align-items-center gap-2 fw-bold" onClick={cerrarMenu}>
          <i className="bi bi-buildings-fill fs-4"></i> Paseo App
        </Link>

        <button
          type="button"
          className="navbar-toggler"
          aria-label="Abrir menú"
          aria-expanded={menuAbierto}
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${menuAbierto ? 'show' : ''}`}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/home" className={claseEnlace} onClick={cerrarMenu}>
                <i className="bi bi-house me-1"></i>Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/listaespacios" className={claseEnlace} onClick={cerrarMenu}>
                <i className="bi bi-grid me-1"></i>Zonas comunes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/reservas" className={claseEnlace} onClick={cerrarMenu}>
                <i className="bi bi-calendar-check me-1"></i>Reservar
              </NavLink>
            </li>
            {/* Solo el administrador ve la opción de crear espacios */}
            {esAdministrador && (
              <li className="nav-item">
                <NavLink to="/espacios" className={claseEnlace} onClick={cerrarMenu}>
                  <i className="bi bi-door-open me-1"></i>Nuevo espacio
                </NavLink>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center gap-3">
            <span className="text-white-50 small">
              <i className="bi bi-person-circle me-1"></i>{usuario.name} · {usuario.rol}
            </span>
            <button type="button" onClick={salir} className="btn btn-light btn-sm">
              <i className="bi bi-box-arrow-right me-1"></i>Salir
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
