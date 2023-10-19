import {Link} from 'react-router-dom'
import DataEvents from './datagrid/data'

import styles from './EventAdmin.module.css'

function EventAdmin () {

    return(
        <div className={styles.Events}>
            <div className={styles.info}>
                <h1 className={styles.titulo}>Eventos</h1>
                <Link to='/admin/create'>
                    <button>Agregar Evento</button>
                </Link>
            </div>
            <DataEvents />
        </div>
    )
}

export default EventAdmin;






// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
// import DataEvents from './datagrid/data';
// import styles from './EventAdmin.module.css';

// import { getUserProfileFromToken } from "../../../Redux/actions/auth_actions"

// function EventAdmin() {
    
//     const user = useSelector(state => state.user);
//     const dispatch = useDispatch();

//     useEffect(() => {
        
//         dispatch(getUserProfileFromToken());
//     }, [dispatch]);

    
//     const isAdmin = user && user.isAdmin;

//     return (
//         <div className={styles.Events}>
//             <div className={styles.info}>
//                 <h1 className={styles.titulo}>Eventos</h1>
//                 {isAdmin && (
//                     <Link to='/admin/create'>
//                         <button>Agregar Evento</button>
//                     </Link>
//                 )}
//             </div>
//             {isAdmin && <DataEvents />} 
//         </div>
//     );
// }

// export default EventAdmin;





