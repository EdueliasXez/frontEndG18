import {Link} from 'react-router-dom'
import DataEvents from './datagrid/data'

import styles from './EventAdmin.module.css'

function EventAdmin () {

    return(
        <div className={styles.Eventos}>
            <div className={styles.info}>
                <h1 className={styles.titulo}>Eventos</h1>
                <Link to='/admin/formEvent'>
                    <button>Agregar Evento</button>
                </Link>
            </div>
            <DataEvents />
        </div>
    )
}

export default EventAdmin;