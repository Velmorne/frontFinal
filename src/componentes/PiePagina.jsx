import { Logo } from './Logo.jsx'

export function PiePagina() {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <div className="container d-flex flex-wrap justify-content-between align-items-center gap-3">
        <Logo fondo="oscuro" />
        <div className="text-white-50 small">
          <i className="bi bi-geo-alt me-1"></i>Sabaneta, Antioquia, Colombia
          <span className="mx-2">|</span>© 2026 Todos los derechos reservados
        </div>
      </div>
    </footer>
  )
}
