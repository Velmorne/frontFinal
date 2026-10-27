import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ProveedorSesion } from './contexto/ContextoSesion'
import { RutaPrivada } from './rutas/RutaPrivada'
import { RutaPorRol } from './rutas/RutaPorRol'
import { LayoutPrivado } from './componentes/LayoutPrivado'
import { RegistroUsuario } from './paginas/RegistroUsuario'
import { Login } from './paginas/Login'
import { Home } from './paginas/Home'
import { RegistroEspacio } from './paginas/RegistroEspacio'
import { RegistroReserva } from './paginas/RegistroReserva'
import {ListaEspacios} from './paginas/ListaEspacios'

export function App() {
  return (
    <ProveedorSesion>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegistroUsuario />} />
          <Route path="/login" element={<Login />} />

          <Route element={<RutaPrivada />}>
            <Route element={<LayoutPrivado />}>
              <Route path="/home" element={<Home />} />
              <Route path="/reservas" element={<RegistroReserva />} />
              <Route path="/listaespacios" element={<ListaEspacios />} />

              <Route element={<RutaPorRol rolesPermitidos={['ADMINISTRADOR']} />}>
                <Route path="/espacios" element={<RegistroEspacio />} />
              </Route>
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </ProveedorSesion>
  )
}
