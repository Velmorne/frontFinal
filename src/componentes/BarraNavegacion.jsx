import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSesion } from '../contexto/ContextoSesion.jsx'
import { Logo } from './Logo.jsx'

export function BarraNavegacion() {
  const navegar = useNavigate()
  const { usuario, esAdministrador, cerrarSesion } = useSesion()

  const [menuAbierto, setMenuAbierto] = useState(false)

  function salir() {
    cerrarSesion()
    navegar('/login')
  }

  function cerrarMenu() {
    setMenuAbierto(false)
  }

  function claseEnlace({ isActive }) {
    return `nav-link ${isActive ? 'active fw-semibold' : ''}`
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top barra-principal">
      <div className="container">
        <Link to="/home" className="navbar-brand" onClick={cerrarMenu}>
          <Logo fondo="oscuro" />
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
