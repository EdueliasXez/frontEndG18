import Datagrid from "./datagrid/datagrid"


import style from "./UsersAdmin.module.css"

function UsersAdmin () {

    return(
        <div className={style.usuarios}>
            <div className={style.info}>
                <h1 className={style.titulo}>Usuarios</h1>
            </div>
            <div className={style.table}>
                <Datagrid/>
            </div>
        </div>
    )
}

export default UsersAdmin;









// import React, { useEffect } from 'react';
// import { useSelector, useDispatch  } from 'react-redux';
// import Datagrid from "./datagrid/datagrid";
// import style from "./UsersAdmin.module.css";

// import { getUserProfileFromToken } from "../../../Redux/actions/auth_actions"

// function UsersAdmin() {
    
//     const user = useSelector(state => state.user); 
//     const dispatch = useDispatch();

    
//     useEffect(() => {
        
//         dispatch(getUserProfileFromToken());
//     }, [dispatch]);


//     const isAdmin = user && user.isAdmin;

//     return (
//         <div className={style.usuarios}>
//             <div className={style.info}>
//                 <h1 className={style.titulo}>Usuarios</h1>
//             </div>
//             <div className={style.table}>
//                 {isAdmin ? (
//                     <Datagrid /> 
//                 ) : (
//                     <p>No tienes permiso para acceder a esta página.</p>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default UsersAdmin;









