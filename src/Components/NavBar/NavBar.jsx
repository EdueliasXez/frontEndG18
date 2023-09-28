import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import style from "./NavBar.module.css"

const NavBar = () =>{
    return (
            <div className={style.navbar}>
                <div>
                    <p className={style.pnav}>"Clicky Ticket"</p>
                </div>
             

                <div className={style.containernav}>
                      <div>
        <Link to="/Login" className={style.btn2}>
        <button  >LOGIN</button>
        </Link>
                  </div>
                    <div>
          <input
           className={style.navinput} 
            type="text"
            placeholder="Busca un Evento..."
          />
        <button className={style.btn1}>
            <span>Buscar</span>
          </button>
        </div>
                </div>
               
            </div>
    )
}

export default NavBar;