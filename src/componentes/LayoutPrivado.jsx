import { Outlet } from 'react-router-dom'
import { BarraNavegacion } from './BarraNavegacion.jsx'
import { PiePagina } from './PiePagina.jsx'

// Estructura común de las páginas privadas: barra arriba, la página en medio y el pie abajo.
// <Outlet /> es el lugar donde React Router pinta la página que se pidió
// (Home, Reservar, Zonas comunes, Nuevo espacio...).
export function LayoutPrivado() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <BarraNavegacion />
      <main className="con-barra flex-grow-1">
        <Outlet />
      </main>
      <PiePagina />
    </div>
  )
}
