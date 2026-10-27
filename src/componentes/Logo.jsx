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
