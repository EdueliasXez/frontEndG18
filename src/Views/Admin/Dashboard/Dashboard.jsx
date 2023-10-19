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



