import { Link } from 'react-router-dom'
import { Logo } from './Logo.jsx'

export function PanelFormulario({ imagen, titulo, subtitulo, enlaceVolver, children }) {
  return (
    <div className="panel-formulario" style={{ backgroundImage: `url(${imagen})` }}>
      <div className="container">
        <div className="row align-items-center g-5">
          {/* Texto sobre la foto (solo en pantallas grandes) */}
          <div className="col-lg-6 d-none d-lg-block text-white">
            <div className="mb-4">
              <Logo fondo="oscuro" />
            </div>
            <span className="panel-etiqueta mb-3">Zonas comunes</span>
            <h1 className="panel-titulo mt-3 mb-3">{titulo}</h1>
            <p className="lead mb-0 text-white-50">{subtitulo}</p>
          </div>

          {/* Tarjeta con el formulario */}
          <div className="col-lg-5 offset-lg-1">
            <div className="tarjeta-formulario mx-auto" style={{ maxWidth: '480px' }}>
              {/* En celular el logo va dentro de la tarjeta */}
              <div className="mb-4 d-lg-none">
                <Logo fondo="claro" grande />
              </div>

              {enlaceVolver && (
                <Link to={enlaceVolver} className="text-decoration-none text-muted d-inline-block mb-3">
                  <i className="bi bi-arrow-left me-1"></i>Volver al inicio
                </Link>
              )}

              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
