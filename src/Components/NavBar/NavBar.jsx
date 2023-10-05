import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { buttonnk } from "react-router-dom";
import style from "./NavBar.module.css"
import { Link } from "react-router-dom";
import FilterBar from "../SideBar/SideBar";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const NavBar = () =>{


    return (  
  
<header> 
<nav>
<ul>
<Link to="/about/"> <button className={style.btn} > NOSOTROS </button>   </Link> 
<Link to="/Checkout"><ShoppingCartIcon  className={style.carrito}/></Link>

<Link to="/login/"> <button className={style.login} > LOG IN </button>   </Link> 
{/* <button className={style.btn1} >BUSCAR </button>
<ul>
    <input className={style.navinput} 
    type="text"
    placeholder="Busca un Evento..."/>
</ul> */}
</ul>


</nav>  
</header>

    )
}
 
export default NavBar;

