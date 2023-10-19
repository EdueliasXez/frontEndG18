import CantUsers from "./Cantidades/Usuarios/CantUsers"
import CantEvent from "./Cantidades/Eventos/CantEvent"
import TopEventos from "./topEventos/topEvents"
import NavBarAdmin from "./../NavAdmin/NavBarAdmin"

import style from "./Dashboard.module.css"

function Dashboard () {

    return(
        <div className={style.Dashboard}>
            
            <div className={style.content2}>
                <NavBarAdmin/>
            </div>
            
            <div className={style.content1}>
                <CantUsers/>
            </div>
        
            <div className={style.content}>
                <TopEventos/>
            </div>
            <div className={style.content2}>
                <CantEvent/>
            </div>
            
            
            
        </div>

    )
}

export default Dashboard







// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import CantUsers from './Cantidades/Usuarios/CantUsers';
// import CantEvent from './Cantidades/Eventos/CantEvent';
// import TopEventos from './topEventos/topEvents';
// import NavBarAdmin from './../NavAdmin/NavBarAdmin';
// import style from './Dashboard.module.css';

// import { getUserProfileFromToken } from "../../../Redux/actions/auth_actions";

// function Dashboard() {
//   const user = useSelector(state => state.user);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     // Verificamos si el usuario es administrador antes de llamar a getUserProfileFromToken
//     if (user && user.isAdmin) {
//       dispatch(getUserProfileFromToken());
//     }
//   }, [dispatch, user]);

//   const isAdmin = user && user.isAdmin;

//   return (
//     <div className={style.Dashboard}>
//       <div className={style.content2}>
//         <NavBarAdmin />
//       </div>
//       {isAdmin && (
//         <div className={style.content1}>
//           <CantUsers />
//         </div>
//       )}
//       {isAdmin && (
//         <div className={style.content}>
//           <TopEventos />
//         </div>
//       )}
//       {isAdmin && (
//         <div className={style.content2}>
//           <CantEvent />
//         </div>
//       )}
//     </div>
//   );
// }

// export default Dashboard;











































////////////////////

// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import CantUsers from './Cantidades/Usuarios/CantUsers';
// import CantEvent from './Cantidades/Eventos/CantEvent';
// import TopEventos from './topEventos/topEvents';
// import NavBarAdmin from './../NavAdmin/NavBarAdmin';
// import style from './Dashboard.module.css';


// import { getUserProfileFromToken } from "../../../Redux/actions/auth_actions"

// function Dashboard() {
  
//   const user = useSelector(state => state.user);
//   const dispatch = useDispatch();

//   useEffect(() => {

//     dispatch(getUserProfileFromToken());
//   }, [dispatch]);


//   const isAdmin = user && user.isAdmin;

//   return (
//     <div className={style.Dashboard}>
//       <div className={style.content2}>
//         <NavBarAdmin />
//       </div>
//       {isAdmin && (
//         <div className={style.content1}>
//           <CantUsers />
//         </div>
//       )}
//       {isAdmin && (
//         <div className={style.content}>
//           <TopEventos />
//         </div>
//       )}
//       {isAdmin && (
//         <div className={style.content2}>
//           <CantEvent />
//         </div>
//       )}
//     </div>
//   );
// }

// export default Dashboard;





























