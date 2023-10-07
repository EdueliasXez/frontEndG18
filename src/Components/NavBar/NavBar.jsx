import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SidebarCart from '../Cart/Cart'; 
import style from './NavBar.module.css';

const NavBar = () => {
    const [cartVisible, setCartVisible] = useState(false);

  const toggleCart = () => {
    console.log("Clic en el botón del carrito");
    console.log("Valor de cartVisible:", cartVisible);
    setCartVisible(!cartVisible);
  };
  
  return (
    <header>
      <nav>
        <ul>
          <li>
            <button className={style.btn} onClick={toggleCart}>
              <ShoppingCartIcon />
              CART
            </button>
          </li>
          <li>
            <Link to="/contact/">
              <button className={style.btn}>CONTACT US</button>
            </Link>
          </li>
          <li>
            <Link to="/login/">
              <button className={style.btn2}>LOG IN</button>
            </Link>
          </li>
          <li>
            <button className={style.btn1}>SEARCH</button>
          </li>
          <li>
            <input
              className={style.navinput}
              type="text"
              placeholder="Busca un Evento..."
            />
          </li>
        </ul>
      </nav>
      {cartVisible && <SidebarCart />} 
    </header>
  );
}

export default NavBar;
