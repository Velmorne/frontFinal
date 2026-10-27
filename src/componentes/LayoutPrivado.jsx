import { Outlet } from 'react-router-dom'
import { BarraNavegacion } from './BarraNavegacion.jsx'
import { PiePagina } from './PiePagina.jsx'

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
