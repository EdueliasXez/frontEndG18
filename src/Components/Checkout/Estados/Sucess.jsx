import React from "react";
import { Link } from "react-router-dom";
import "./SucessPage.css"; 

const SucessPage = () => {
  return (
    <div className="thank-you-container">
      <h2>¡Gracias por confiar en nosotros! 😄</h2>
      <p>Tu compra fue hecha con exito, te invitamos a compartir tu experiencia en el evento.</p>
      <Link to="/home">
        <button className="back-button">Volver al Inicio</button>
      </Link>
    </div>
  );
};

export default SucessPage;
