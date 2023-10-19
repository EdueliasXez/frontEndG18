import { Link } from "react-router-dom"

import styles from './NavBarAdmin.module.css'

function NavBarAdmin () {

    return(
        <div className={styles.menu}>
            <div className={styles.item}>
                <span className={styles.title}>MAIN</span>
                <Link to="/admin" className={styles.listItem}>
                    <span className={styles.itemTitle} >INICIO</span>
                </Link>

                <Link to="/admin/users" className={styles.listItem}>
                    <span className={styles.itemTitle}>Usuarios</span>
                    
                </Link>
                <Link to="/admin/events" className={styles.listItem}>
                    <span className={styles.itemTitle} >Eventos</span>
                </Link>

                <Link to="/admin/tickets" className={styles.listItem}>
                    <span className={styles.itemTitle} >Boleteria Comprados</span>
                </Link>
               
            </div>
        </div> 
    )
}

export default NavBarAdmin;