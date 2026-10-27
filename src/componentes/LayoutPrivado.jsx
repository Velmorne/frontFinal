import { Outlet } from 'react-router-dom'
import { BarraNavegacion } from './BarraNavegacion.jsx'

// Estructura común de las páginas privadas: barra arriba y la página debajo.
// <Outlet /> es el lugar donde React Router pinta la página que se pidió
// (Home, Reservar, Zonas comunes, Nuevo espacio...).
export function LayoutPrivado() {
  return (
    <>
      <BarraNavegacion />
      <main className="con-barra">
        <Outlet />
      </main>
    </>
  )
}
