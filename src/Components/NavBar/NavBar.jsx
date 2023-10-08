import React, { useState } from "react";
import { Link } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import style from "./NavBar.module.css";
import SidebarCart from "../Cart/Cart"

const NavBar = () => {
  const [cartVisible, setCartVisible] = useState(false);

  const toggleCart = () => {
    setCartVisible(!cartVisible);
  };

  return (
    <header>
      <nav>
        <ul>
          <Link to="/about/">
            <button className={style.btn}>NOSOTROS</button>
          </Link>
          <button onClick={toggleCart} className={style.carritoButton}>
            <ShoppingCartIcon className={style.carrito} />
          </button>
          <Link to="/login/">
            <button className={style.login}>LOG IN</button>
          </Link>
          <button className={style.btn1}>BUSCAR</button>
          <ul>
            <input
              className={style.navinput}
              type="text"
              placeholder="Busca un Evento..."
            />
          </ul>
        </ul>
      </nav>
      {cartVisible && <SidebarCart />}
    </header>
  );
};

export default NavBar;
