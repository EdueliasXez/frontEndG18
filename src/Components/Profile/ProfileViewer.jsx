import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getUserProfileFromId, getUserProfileFromToken } from "../../Redux/actions/auth_actions";
import { handleActiveUser } from "../../Redux/actions/softDelete_actions";
import { Link, useParams } from "react-router-dom";
import styles from "./Profile.module.css";

const ProfileViewer = ({ getUserProfileFromId }) => {
  const { idUser } = useParams();
  const [userData, setUserData] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [active, setActive] = useState(false);
  const [userUnavailable, setUserUnavailable] = useState(false);

  useEffect(() => {
    getUserProfileFromToken()
      .then((data) => {
        setIsAdmin(data.isAdmin);
      })
      .catch((error) => {
        console.error("Error al obtener los datos del usuario:", error);
      });

    getUserProfileFromId(idUser)
      .then((data) => {
        setUserData(data);
        setActive(data.active);
      })
      .catch((error) => {
        console.error("Error al obtener los datos del usuario:", error);
        setUserUnavailable(true); // Usuario no disponible
      });
  }, [getUserProfileFromId, idUser]);

  return (
    <div className={styles["profile-container"]}>
      {userUnavailable ? (
        <p className={styles["unavailable-message"]}>El usuario no está disponible</p>
      ) : (
        userData ? (
          <div>
            <h2 className={styles["profile-header"]}>Perfil de {userData.userName}</h2>
            <div className={styles["profile-info"]}>
              <p><strong>Nombre de usuario:</strong> {userData.userName}</p>
              <p><strong>ID:</strong> {userData._id}</p>
              <p><strong>Nombre:</strong> {userData.firstName} {userData.lastName}</p>
              <p><strong>Fecha de nacimiento:</strong> {userData.birthdate}</p>
              <p><strong>País:</strong> {userData.country}</p>
              <p><strong>Ciudad:</strong> {userData.city}</p>
              <p><strong>¿Es proveedor de servicios?</strong> {userData.isServiceProvider ? "Sí" : "No"}</p>
            </div>
            {isAdmin && (
              <button
                className={styles["deactivate-button"]}
                onClick={() => {
                  handleActiveUser(userData._id, !active);
                  setActive(!active);
                }}
              >
                {active ? "Desactivar" : "Activar"}
              </button>
            )}
            <Link to={`/editUser/${userData._id}`}>
              <button className={styles["edit-button"]}>Editar Usuario</button>
            </Link>
          </div>
        ) : (
          <div>Loading ...</div>
        )
      )}
      <Link to="/home">
        <button className={styles["home-button"]}>Volver al Inicio</button>
      </Link>
    </div>
  );
};

const mapDispatchToProps = {
  getUserProfileFromId,
};

export default connect(null, mapDispatchToProps)(ProfileViewer);
