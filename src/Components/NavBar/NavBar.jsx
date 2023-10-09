import React, { useState } from "react";
import { Link } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ClearIcon from '@mui/icons-material/Clear'; // Importa el icono Clear
import style from "./NavBar.module.css";
import SidebarCart from "../Cart/Cart";
import { useAuth0 } from "@auth0/auth0-react";
import { connect } from 'react-redux';
import { filterEvents } from '../../Redux/actions/events_actions';

const NavBar = ({ isAuthenticated, filterEvents }) => {
  const [cartVisible, setCartVisible] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  const toggleCart = () => {
    setCartVisible(!cartVisible);
    console.log(localStorage)
  };

  const handleSearch = () => {
    filterEvents(searchKeyword);
  };

  const handleClearSearch = () => {
    setSearchKeyword(''); 
    filterEvents(''); 
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
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
          {isAuthenticated ? (
            <Link to="/profile/"> 
              <button className={style.login}>PERFIL</button>
            </Link>
          ) : (
            <Link to="/login/"> 
              <button className={style.login}>LOG IN</button>
            </Link>
          )}
          <button className={style.btn1} onClick={handleSearch}>
            Buscar
          </button>
          <button className={style.clearButton} onClick={handleClearSearch}>
            <ClearIcon className={style.clearIcon} />
          </button>
          <ul>
            <input
              className={style.navinput}
              type="text"
              placeholder="Busca un Evento..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </ul>
        </ul>
      </nav>
      {cartVisible && <SidebarCart />}
    </header>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.login.isAuthenticated,
});

const mapDispatchToProps = {
  filterEvents,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
