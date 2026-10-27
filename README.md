# Paseo San Francisco — Gestión de zonas comunes

Aplicación web para administrar y reservar las zonas comunes de la unidad residencial **Paseo San Francisco** (Sabaneta, Antioquia).
Los residentes pueden consultar los espacios disponibles y reservarlos en una fecha y hora; los administradores, además, pueden registrar nuevos espacios, cumpliendo los estandares del cliente (Juan Jose Gallego).

Proyecto académico del curso **Backend II — CESDE**.

---

## 👥 Autores

| Nombre | GitHub |
|---|---|
| Kevin Stiward Balvin García | [@KevinBalvin03](https://github.com/KevinBalvin03) |
| Sebastián Chávez Acosta | [@Velmorne](https://github.com/Velmorne) |

---

## 🎯 Objetivo

Reemplazar el manejo manual (llamadas, cuadernos o filas en portería) de las reservas de zonas comunes por una plataforma web sencilla que permita:

- Consultar las zonas comunes de la unidad con su foto, descripción y aforo.
- Reservar un espacio en una fecha y hora, evitando que dos personas reserven el mismo espacio al mismo tiempo.
- Diferenciar lo que puede hacer un **residente** (`USUARIO`) de lo que puede hacer un **administrador** (`ADMINISTRADOR`).

---

## 🧩 Arquitectura

El proyecto está dividido en dos repositorios que se comunican por HTTP con JSON:

```
┌─────────────────────────┐        HTTP / JSON        ┌──────────────────────────────┐
│  Frontend (este repo)   │  ───────────────────────► │  Backend                     │
│  React + Vite + Axios   │  ◄───────────────────────  │  Spring Boot + JPA + H2      │
│  http://localhost:5173  │                            │  http://localhost:8080       │
└─────────────────────────┘                            └──────────────────────────────┘
```

- **Frontend:** [Velmorne/frontFinal](https://github.com/Velmorne/frontFinal)
- **Backend:** [KevinBalvin03/CummunityZonesPSF_Back](https://github.com/KevinBalvin03/CummunityZonesPSF_Back)

---

## 🛠️ Tecnologías

### Frontend
| Tecnología | Uso |
|---|---|
| React 19 | Interfaz de usuario |
| Vite | Servidor de desarrollo y compilación |
| React Router | Navegación y rutas protegidas por sesión y rol |
| Axios | Peticiones HTTP al backend |
| Bootstrap 5 + Bootstrap Icons | Estilos y componentes visuales |

### Backend
| Tecnología | Uso |
|---|---|
| Java 17 + Spring Boot 4 | API REST |
| Spring Data JPA (Hibernate) | Acceso a datos |
| H2 (en memoria) | Base de datos de desarrollo |
| MapStruct | Conversión entre entidades y DTOs |
| Maven | Gestión de dependencias y ejecución |

---

## ▶️ Cómo ejecutar el proyecto

Se necesitan **los dos proyectos corriendo al mismo tiempo**, cada uno en su propia terminal.

### Requisitos
- **Java 17** o superior (`java -version`)
- **Node.js 20.19** o superior (`node -v`)
- Git

### 1. Backend

```bash
git clone https://github.com/KevinBalvin03/CummunityZonesPSF_Back.git
cd CummunityZonesPSF_Back
./mvnw spring-boot:run        # En Windows (PowerShell): .\mvnw.cmd spring-boot:run
```

Queda disponible en `http://localhost:8080`. Al arrancar se cargan datos de prueba automáticamente (`dataInicial.sql`).
La consola de la base de datos está en `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:PsfBBDD`, usuario `sa`, sin contraseña).

### 2. Frontend

```bash
git clone https://github.com/Velmorne/frontFinal.git
cd frontFinal
npm install
npm run dev
```

Abrir `http://localhost:5173`.

> Por defecto el frontend se conecta a `http://localhost:8080/paseoapi/v1`. Para usar otra dirección, crear un archivo `.env` en la raíz con `VITE_API_URL=http://otra-direccion/paseoapi/v1`.

### Usuarios de prueba

| Correo | Contraseña | Rol |
|---|---|---|
| kevin@test.com | 123456 | ADMINISTRADOR |
| ana@test.com | 123456 | USUARIO |
| carlos@test.com | 123456 | USUARIO |
| laura@test.com | 123456 | USUARIO |

> La base de datos es en memoria: los datos creados se pierden al reiniciar el backend y se vuelven a cargar los de prueba.

---

## ✨ Funcionalidades

| Funcionalidad | Residente | Administrador |
|---|:---:|:---:|
| Registrarse e iniciar sesión | ✅ | ✅ |
| Ver las zonas comunes | ✅ | ✅ |
| Reservar un espacio | ✅ | ✅ |
| Registrar un nuevo espacio | — | ✅ |

**Reglas de negocio que valida el backend:**
- El correo de un usuario no se puede repetir y la contraseña debe tener mínimo 6 caracteres.
- El nombre de un espacio no se puede repetir y su aforo debe ser mayor a 0.
- No se puede reservar en una fecha pasada.
- Un espacio no se puede reservar dos veces en la misma fecha y hora.
- No se puede eliminar un usuario o un espacio que tenga reservas.

---

## 🔌 API (resumen)

Base: `http://localhost:8080/paseoapi/v1`

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/usuarios` | Registrar usuario |
| POST | `/usuarios/login` | Iniciar sesión |
| GET | `/usuarios` · `/usuarios/{id}` | Listar / buscar usuarios |
| PUT · DELETE | `/usuarios/{id}` | Modificar / eliminar usuario |
| GET · POST | `/espacios` | Listar / crear espacios |
| GET · PUT · DELETE | `/espacios/{id}` | Buscar / modificar / eliminar espacio |
| GET · POST | `/reservas` | Listar / crear reservas |
| GET · PUT · DELETE | `/reservas/{id}` | Buscar / modificar / eliminar reserva |
| GET | `/reservas/usuario/{usuarioId}` | Reservas de un usuario |
| GET | `/reservas/espacio/{espacioId}` | Reservas de un espacio |

Ejemplo para crear una reserva:

```json
POST /paseoapi/v1/reservas
{
  "date": "2026-11-05",
  "time": "10:00:00",
  "usuario": { "id": "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb" },
  "espacio": { "id": "11111111-1111-1111-1111-111111111111" }
}
```

La colección completa de peticiones para Insomnia está en el repositorio del backend: `docs/insomniaCollections/CommunityZonesPSF.yaml`.

---

## 📁 Estructura del frontend

```
src/
├── main.jsx               # Punto de entrada
├── App.jsx                # Definición de rutas
├── estilos.css            # Estilos globales y colores de la marca
├── contexto/
│   └── ContextoSesion.jsx # Usuario con sesión iniciada (guardado en localStorage)
├── rutas/
│   ├── RutaPrivada.jsx    # Solo usuarios con sesión
│   └── RutaPorRol.jsx     # Solo ciertos roles (ej. ADMINISTRADOR)
├── componentes/           # Barra, pie de página, logo, layout y tarjetas
├── paginas/               # Pantallas: Login, Registro, Home, Zonas, Reservas...
└── services/              # Conexión con el backend (Axios)
    ├── clienteApi.js      # Instancia de Axios con la URL base
    ├── servicioAuth.js
    ├── servicioUsuarios.js
    ├── servicioEspacios.js
    └── servicioReservas.js
```

**Flujo de una petición:** la página llama a una función de `services/` → esa función usa `clienteApi` (Axios) → el backend responde → la página muestra el resultado o el mensaje de error.

---

## 🧱 Estructura del backend

El backend está organizado por capas:

```
controladores  →  servicios  →  validadores  →  repositorios  →  base de datos (H2)
      ↑                ↓
     DTOs   ←   mapeadores (MapStruct)
```

| Capa | Responsabilidad |
|---|---|
| `controladores` | Reciben las peticiones HTTP y devuelven la respuesta |
| `servicios` | Lógica de negocio (interfaz + implementación) |
| `validadores` | Reglas de negocio (datos obligatorios, duplicados, disponibilidad) |
| `repositorios` | Consultas a la base de datos con Spring Data JPA |
| `modelos` | Entidades: `Usuario`, `Espacio`, `Reserva` |
| `dtos` / `mapeadores` | Lo que la API devuelve, sin exponer datos sensibles como la contraseña |
| `enums` | Valores fijos, como los roles |
| `configuraciones` | CORS, para permitir las peticiones del frontend |

---

## 🚧 Desarrollo

Resumen de cómo se construyó el proyecto:

1. **Backend inicial:** entidades, repositorios, servicios y controladores para usuarios, espacios y reservas, con base de datos H2.
2. **Arquitectura por capas:** se agregaron DTOs, mapeadores con MapStruct, validadores, servicios con interfaz y el enum de roles.
3. **Relaciones y reglas:** cada reserva quedó ligada a un usuario y a un espacio, con validación de disponibilidad por fecha y hora. Se agregaron el login, la búsqueda por id y las consultas de reservas por usuario y por espacio.
4. **Datos de prueba:** carga automática de usuarios, espacios y reservas al arrancar, y colección de peticiones para Insomnia.
5. **Frontend:** formularios de registro, login, espacios y reservas con validación; contexto de sesión y rutas protegidas por rol.
6. **Integración front–back:** se unificaron los nombres de los campos con la API, se centralizó la URL base en Axios y se conectaron todos los formularios con el backend.
7. **Interfaz:** barra de navegación y pie de página comunes a todas las páginas privadas, y una identidad visual propia para Paseo San Francisco.

### Flujo de trabajo con Git

- Cada tarea se desarrolla en una rama propia creada desde `main` actualizado (`featureNombre/descripcion`).
- Los cambios entran a `main` solo mediante **pull request** revisado por el otro integrante.
- Antes de subir cambios se verifica que el proyecto compile (`npm run build`) y que no queden marcas de conflicto.
