import React from 'react'
import style from  './Card.module.css';
import { NavLink } from "react-router-dom";



const Card = ({id, title, imageSrc, price, date, location,isActive, stock}) => {
  return (
    <div className={style.card}>
    <NavLink to={`/detail/${id}`} style={{ textDecoration: "none" }}>
        <img className={style.image} src={imageSrc} alt="" />
        <div className={style.detailCard}>
          <h1>${price}</h1>
          <h3 key={id}>{title}</h3>
      </div>
      </NavLink>
      <button>Comprar boletos</button>
    </div>
  
  );
}

export default Card;
