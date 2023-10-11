import CantUsuarios from "./Cantidades/Usuarios/CantUsuarios"
import CantEvent from "./Cantidades/Eventos/CantEvent"
import CantCompras from "./Cantidades/Compras/CantCompras"
import TopEventos from "./topEventos/topEventos"

import style from "./Dashboard.module.css"

function Dashboard () {

    return(
        <div className={style.Dashboard}>
            
            <div className={style.content1}>
                <CantUsuarios/>
            </div>
            {/* <div className={style.content4}>
                <CantCompras/>
            </div> */}
        
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