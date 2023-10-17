import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from 'axios'; // Importa Axios
import { getUserProfileFromToken } from "../../../Redux/actions/auth_actions"; 

import "./SucessPage.css";

const SucessPage = (props) => {
  const { checkoutData, isAuthenticated } = props;
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      getUserProfileFromToken() 
        .then((data) => {
          setUserId(data._id);
          const cartItems = checkoutData.cartItems;
          if (cartItems) {
            const requestData = {
              cartItems: cartItems, 
              userId: data._id
            };
            axios.post('checkout/success', requestData)
              .then(response => {
              })
              .catch(error => {

              });
          }
        })
        .catch((error) => {
          console.error("Error al obtener el userId:", error);
        });
    }
  }, [checkoutData, isAuthenticated]);

  return (
    <div className="thank-you-container">
      <h2>¡Gracias por confiar en nosotros! 😄</h2>
      <p>Tu compra fue hecha con éxito, te invitamos a compartir tu experiencia en el evento.</p>
      <Link to="/home">
        <button className="back-button">Volver al Inicio</button>
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    checkoutData: state.cart.checkoutData,
    isAuthenticated: state.login.isAuthenticated,
  };
};

export default connect(mapStateToProps)(SucessPage);
