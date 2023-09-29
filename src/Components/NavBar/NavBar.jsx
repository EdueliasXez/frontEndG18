import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { buttonnk } from "react-router-dom";
import style from "./NavBar.module.css"
import { Link } from "react-router-dom";

const NavBar = () =>{
    return (
    //  <div className={style.navbar}>
    //      <div> 
    //         <p className={style.pnav}>CbuttonCKY TICKET</p>
    //      </div>
    //           <div className={style.containernav}>
    //              <div>
    //                <button className={style.btn} nk to="/Login" className={style.btn2}>
    //                  <button className={style.btn}   >LOGIN</button>
    //                  </buttonnk>
    //                  <button className={style.btn}  className={style.btn3}>
    //                     <span>Categories</span>
    //                   </button>
    //              </div>           
    //                 <div>
    //                   <input
    //                    className={style.navinput} 
    //                   type="text"
    //                   placeholder="Busca un Evento..."/>
    //                   <button className={style.btn}  className={style.btn1}>
    //                      <span>Search</span>
    //                   </button>
                      
    //                </div>
       
    //              </div>
               
    //         </div>
    
  
<header> 
<nav>
<ul><ul>
<button className={style.btn} > CATEGORIES </button></ul> 
<Link to="/contact/"> <button className={style.btn} > CONTACT US </button>   </Link> 

<Link to="/checkout/"> <button className={style.btn3} > CHECKOUT </button>   </Link> 

<Link to="/login/"> <button className={style.btn2} > LOG IN </button>   </Link> 
<button className={style.btn1} > SEARCH </button>
<ul>
    <input className={style.navinput} 
    type="text"
    placeholder="Busca un Evento..."/>
</ul></ul>


</nav>  
</header>

    )
}
 
export default NavBar;