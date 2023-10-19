import CantUsuarios from "./Cantidades/Usuarios/CantUsuarios"
import CantEvent from "./Cantidades/Eventos/CantEvent"
import CantCompras from "./Cantidades/Compras/CantCompras"
import TopEventos from "./topEventos/topEventos"
import { Link } from "react-router-dom"
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
            <Link to ="./servi">
                <button className={style.btn1}>
                    INGRESAR A PERFIL DE ORGANIZADOR
                </button>
                </Link>
            
            
            
        </div>

    )
}

export default Dashboard