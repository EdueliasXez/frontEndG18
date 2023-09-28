import React from "react";
import { Link } from "react-router-dom";
import style from "./landing.module.css";

function Landing (){
    return (
        <div className={style.landingg}>
            <h1 className={style.h1}>
                "BIENVENIDOS A CLICKY TICKET"
            </h1>
            <div className={style.buttonlanding}>
                <Link to = "/home">
                    <button>INGRESAR</button>
                </Link>
            </div>
        </div>
    )
}

export default Landing;