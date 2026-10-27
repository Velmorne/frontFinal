export function TarjetaUsuario({usuario}){
    return(
        <>
            <section className="card p-4 shadow">
                <h5 className="card-title fw-bold">{usuario.name}</h5>
                <p className="text-muted">{usuario.email}</p>
                <p className="text-muted">{usuario.rol}</p>
            </section>

        </>

    )
}