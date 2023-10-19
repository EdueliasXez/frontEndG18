import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getUserProfileFromToken } from "../../Redux/actions/auth_actions";
import { getTicketsByUserId } from "../../Redux/actions/events_actions";
import { logout } from "../../Redux/actions/login_actions";
import { Link } from "react-router-dom";
import styles from "./Profile.module.css";

const Profile = ({ isAuthenticated, logout, getTicketsByUserId }) => {
  const [userData, setUserData] = useState(null);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      getUserProfileFromToken()
        .then((data) => {
          setUserData(data);
          getTicketsByUserId(data._id)
            .then((tickets) => {
              setTickets(tickets);
              console.log('desde profile', tickets);
            })
            .catch((error) => {
              console.error("Error al obtener los tickets:", error);
            });
        })
        .catch((error) => {
          console.error("Error al obtener los datos del usuario:", error);
        });
    }
  }, [isAuthenticated, getTicketsByUserId]);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className={styles["profile-container"]}>
      {userData ? (
        <div>
          <h2 className={styles["profile-header"]}>Bienvenido, {userData.userName}!</h2>
          <div className={styles["profile-info"]}>
            <p><strong>Nombre de usuario:</strong> {userData.userName}</p>
            <p><strong>ID</strong> {userData._id}</p>
            <p><strong>Nombre:</strong> {userData.firstName} {userData.lastName}</p>
            <p><strong>Fecha de nacimiento:</strong> {userData.birthdate}</p>
            <p><strong>Correo electrónico:</strong> {userData.email}</p>
            <p><strong>País:</strong> {userData.country}</p>
            <p><strong>Ciudad:</strong> {userData.city}</p>
            <p><strong>¿Es proveedor de servicios?</strong> {userData.isServiceProvider ? "Sí" : "No"}</p>
          </div>
          <div className={styles["tickets-container"]}>
            <h3>Mis tickets</h3>
            {tickets.map((ticket) => (
              <li key={ticket._id}>
                <p>{ticket.eventName}</p>
                <p>Fecha del evento {ticket.date}</p>
                <p>Precio: {ticket.price}</p>
              </li>
            ))}
          </div>
        </div>
      ) : (
        <div>Loading ...</div>
      )}

      {isAuthenticated && (
        <div>
          <Link to="/home">
            <button className={styles["logout-button"]} onClick={handleLogout}>Cerrar sesión</button>
          </Link>
          <Link to="/home"> 
            <button className={styles["home-button"]}>Volver al Inicio</button>
          </Link>
          {userData ? (
  <Link to={`/editUser/${userData._id}`}>
    <button>Editar Usuario</button>
  </Link>
  
) : (
  <p>Cargando datos del usuario...</p>
)}
{userData && userData.isServiceProvider && (
  <Link to="/admin/servi">
    <button className={styles["admin-button"]}>Administrar Servicios</button>
  </Link>
)}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.login.isAuthenticated,
});

const mapDispatchToProps = {
  logout,
  getTicketsByUserId,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
