// Logo de la marca: ícono dentro de un cuadro azul + nombre.
// Se usa en la barra, en el pie de página y en login/registro,
// así si se cambia el nombre o el ícono se hace en un solo lugar.
//
// fondo="oscuro" -> texto blanco (barra y pie de página)
// fondo="claro"  -> texto azul (formularios con fondo blanco)
const NOMBRE_MARCA = 'Paseo San Francisco'

export function Logo({ fondo = 'oscuro', grande = false }) {
  const claseTexto = fondo === 'claro' ? 'texto-marca' : 'text-white'

  return (
    <span className={`logo-marca d-inline-flex align-items-center gap-2 ${grande ? 'logo-grande' : ''}`}>
      <span className="logo-icono">
        <i className="bi bi-house-heart-fill"></i>
      </span>
      <span className={`fw-bold ${claseTexto}`}>{NOMBRE_MARCA}</span>
    </span>
  )
}
