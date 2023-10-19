import React, {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

import styles from './datagrid.module.css'

function Datagrid () {
    const [datos, setDatos]=useState([])
    const [paginaActual, setPaginaActual] = useState(1);
    const [elementosPorPagina] = useState(10);
    

    useEffect(()=>{
        const obtenerDatos = async () => {
            try {
                const response = await axios.get('/user');
                setDatos(response.data);
              } catch (error) {
                console.error('Error al obtener los datos:', error);
              }
          };
      
          obtenerDatos();
    }, []);

    const indiceUltimoElemento = paginaActual * elementosPorPagina;
    const indicePrimerElemento = indiceUltimoElemento - elementosPorPagina;
    const elementosPaginaActual = datos.slice(indicePrimerElemento, indiceUltimoElemento);

    const cambiarPagina = (numeroPagina) => {
        setPaginaActual(numeroPagina);
    };

    const paginacion = [];
    for (let i = 1; i <= Math.ceil(datos.length / elementosPorPagina); i++) {
        paginacion.push(
            <button
                key={i}
                onClick={() => cambiarPagina(i)}
                className={paginaActual === i ? 'active' : ''}
            >
            {i}
            </button>
        );
    }
    
    const irPaginaAnterior = () => {
      if (paginaActual > 1) {
        setPaginaActual(paginaActual - 1);
      }
    };
    
    const irPaginaSiguiente = () => {
      if (paginaActual < Math.ceil(datos.length / elementosPorPagina)) {
        setPaginaActual(paginaActual + 1);
      }
    };


   
    return(
      <div className={styles.usuarios}>
        <table className={styles.tabla}>
          <thead className={styles.columnas}>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Estado</th>
              <th>Es Administrador</th> 
              <th>Acción</th>
              <th>País</th>
              <th>Ciudad</th>
            </tr></thead>
          <tbody className={styles.filas}>
            {elementosPaginaActual.map((dato) => (
            
              <tr key={dato.id}>
                <td>{dato.firstName}</td>
                <td>{dato.lastName}</td>
                <td>{dato.email}</td>
                <td>{dato.active ? <p>Desactivado</p> : <p>Activo</p>}</td>
                <td>{dato.isAdmin ? <p>Administrador</p> : <p>Usuario</p>}</td>
                <td>
  <Link to={`/profile/${dato._id}`}>Ver Perfil</Link>
</td>
                <td>{dato.country ? dato.country : "No disponible"}</td>
                <td>{dato.city ? dato.city : "No disponible"}</td>


              <td></td>
                </tr>
            ))}
          </tbody>         
        </table>
        <div className={styles.pagination}>
          {paginaActual===1?null:<button onClick={irPaginaAnterior}>&lt;</button>}
          <span>{paginaActual}</span>
          {paginaActual < Math.ceil(datos.length/elementosPorPagina)&&(<button onClick={irPaginaSiguiente}>&gt;</button>)}
        </div>
      </div>
    );
}

export default Datagrid;