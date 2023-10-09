import React from "react";
import { Link } from "react-router-dom";
import "./CancelPage.css";

const CancelPage = () => {
  return (
    <div className="cancel-container">
      <h2>¡Hubo un problema en la compra! 😞</h2>
      <p>Lo sentimos por las molestias. Por favor, inténtalo nuevamente.</p>
      <Link to="/home">
        <button className="back-button">Volver al Inicio</button>
      </Link>
    </div>
  );
};

export default CancelPage;
