import {useState, useEffect} from 'react'

import {listarUsuarios} from '../services/servicioUsuarios.js'

import {TarjetaUsuario} from '../componentes/TarjetaUsuario'


export function ListaUsuarios(){

    const[usuarios, setUsuarios]=useState([])

    const[cargando, setCargando]=useState(true)

    const[error, setError]=useState('')

    async function cargarUsuarios(){
        try{
            const datos=await listarUsuarios()
            setUsuarios(datos)

        }catch{
            setError("No fue posible cargar los espacios") 
        }finally{
            setCargando(false)
        }
    }

    function alCargarComponente(){
        cargarUsuarios()
    }

    useEffect(alCargarComponente,[])

    function pintarUsuario(usuario){

        return(
            <div className="col-md-4" key={usuario.id}>
                < TarjetaUsuario usuario={usuario} />
            </div>
        )
    }

    if(cargando){
        return(
            <p className="text-center my-5">Cargando usuarios...</p>
        )
    }

    if(error != ''){
        return (
            <div className="alert alert-danger my-5">{error}</div>
        )
    }

    return(

        <>
            <section className="row g-4 my-5">
                {usuarios.map(pintarUsuario)}
            </section>
        </>

    )
}