import { useState, useEffect } from 'react';
import { obtenerEspacios } from '../services/servicioEspacios';
import { useSesion } from '../contexto/ContextoSesion.jsx';
import { FormularioEditarEspacio } from '../componentes/FormularioEditarEspacio.jsx';

export function ListaEspacios() {
  const { esAdministrador } = useSesion();

  const [espacios, setEspacios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [idEditando, setIdEditando] = useState(null);
  const [mensajeExito, setMensajeExito] = useState('');

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const data = await obtenerEspacios();
        setEspacios(data);
      } catch (err) {
        console.error("Error obteniendo espacios:", err);
        setError('No se pudieron cargar los espacios desde el servidor.');
      } finally {
        setCargando(false);
      }
    };
    cargarDatos();
  }, []);

  function abrirEdicion(id) {
    setMensajeExito('');
    setIdEditando(id);
  }

  function cerrarEdicion() {
    setIdEditando(null);
  }

  function actualizarEnLista(espacioActualizado) {
    setEspacios(espacios.map((espacio) =>
      espacio.id === espacioActualizado.id ? espacioActualizado : espacio
    ));
    setIdEditando(null);
    setMensajeExito(`"${espacioActualizado.name}" se actualizó correctamente.`);
  }

  if (cargando) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <i className="bi bi-exclamation-triangle me-2"></i>{error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4 mb-5">
      <h2 className="fw-bold mb-1">Zonas Comunes</h2>
      <p className="text-muted mb-4">Explora los espacios disponibles para reservar.</p>

      {mensajeExito && (
        <div className="alert alert-success" role="alert">
          <i className="bi bi-check-circle me-2"></i>{mensajeExito}
        </div>
      )}

      <div className="row g-4">
        {espacios.length === 0 ? (
          <p className="text-center text-muted">Aún no hay espacios registrados.</p>
        ) : (
          espacios.map((espacio) => (
            <div className="col-12 col-md-6 col-lg-4" key={espacio.id}>
              <div className="card h-100 shadow-sm border-0 position-relative">
                {esAdministrador && idEditando !== espacio.id && (
                  <button
                    type="button"
                    className="btn btn-light btn-sm position-absolute top-0 end-0 m-2 shadow-sm z-1"
                    onClick={() => abrirEdicion(espacio.id)}
                  >
                    <i className="bi bi-pencil me-1"></i>Editar
                  </button>
                )}

                <img
                  src={espacio.photo}
                  className="card-img-top"
                  alt={espacio.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  {idEditando === espacio.id ? (
                    <FormularioEditarEspacio
                      espacio={espacio}
                      alGuardar={actualizarEnLista}
                      alCancelar={cerrarEdicion}
                    />
                  ) : (
                    <>
                      <h5 className="card-title fw-bold">{espacio.name}</h5>
                      <p className="card-text text-muted mb-3">{espacio.description}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="badge bg-light text-dark border">
                          <i className="bi bi-people me-1"></i> Aforo: {espacio.aforo}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
