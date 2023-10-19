import React, {useState,useEffect} from 'react';
import axios from 'axios'
import styles from './data.module.css'

function DataEvents () {
    const [datos, setDatos]=useState([])
    const [paginaActual, setPaginaActual] = useState(1);
    const [elementosPorPagina] = useState(5);
    const [editingEventId, seteditingEventId] = useState(null);
    const [editedEvent, setEditedEvent] = useState({});

    useEffect(()=>{
        const obtenerDatos = async () => {
            try {
                const response = await axios.get('/events');
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

    const editHandler = (id) => {
      seteditingEventId(id);
    };
    
    const saveHandler = async(id)=>{
        try {
            // eslint-disable-next-line
            // const response = await axios.put(`('/:id'${id}`, editedEvent);
            seteditingEventId(null);
            window.location.reload();
        } catch (error) {
           console.log(error)
        }
    }
    
   

    return(
        <div className={styles.eventos}>
            <table className={styles.tabla}>
                    <thead className={styles.columnas}>
                        <tr>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Rating</th>
                        <th>Estado</th>  
                        <th>Acción</th>
                    </tr></thead>
        <tbody className={styles.filas}>
          {elementosPaginaActual.map((dato) => (
            <tr key={dato.id}>
              <td>
              </td>
              <td>
                  {editingEventId===dato.id ? (
                      <input
                        type="text"
                        value={editedEvent.title}
                        onChange={(e) => setEditedEvent({
                            ...editedEvent,
                            title: e.target.value,
                        })
                        }
                      />
                ) : (<p className={styles.name}>{dato.title}</p>)}
              </td>
              <td>
                {editingEventId===dato.id ? (
                <input
                    type="text"
                    value={editedEvent.price}
                    onChange={(e) =>
                    setEditedEvent({
                    ...editedEvent,
                    price: e.target.value,
                    })}/>) : 
                    (<span>${dato.price}</span>)}
                </td>
                <td>
                {editingEventId===dato.id ? (
                <input
                type="text"
                value={editedEvent.stock}
                onChange={(e) =>
                setEditedEvent({
                ...editedEvent,
                stock: e.target.value,
            })}/>) 
            : (<span>{dato.stock}</span>)}
                </td>
              <td>🌟 {dato.rating}</td>
              
              <td>
                {editingEventId === dato.id ? (
                <button onClick={() => saveHandler(dato.id)} className={styles.buttonE}>Guardar</button>
                ) : (
                <button onClick={() => editHandler(dato.id)} className= {styles.buttonE}>Editar</button>
                )}
               
              </td>
            </tr>
          ))}
        </tbody> 
            </table>
            <div className={styles.pagination}>
              {paginaActual===1?null:<button onClick={irPaginaAnterior} className= {styles.buttonflecha}>&lt;</button>}
              <span>{paginaActual}</span>
              {paginaActual < Math.ceil(datos.length/elementosPorPagina)&&(<button onClick={irPaginaSiguiente} className= {styles.buttonflecha}>&gt;</button>)}
            </div>
        </div>
    )
}

export default DataEvents;