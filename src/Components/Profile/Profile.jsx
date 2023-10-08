import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getUserProfileFromToken } from "../../Redux/actions/auth_actions";
import { logout } from "../../Redux/actions/login_actions";
import { Link } from "react-router-dom"; 

const Profile = ({ isAuthenticated, logout }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      // Solo obtén los datos del usuario si está autenticado
      getUserProfileFromToken()
        .then((data) => {
          setUserData(data);
        })
        .catch((error) => {
          console.error("Error al obtener los datos del usuario:", error);
        });
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    // Llama a la acción de logout cuando se hace clic en el botón
    logout();
  };

  return (
    <div>
      {userData ? (
        <div>
          <h2>{userData.userName}</h2>
          <p>{userData.email}</p>
        </div>
      ) : (
        <div>Loading ...</div>
      )}

      {/* Renderiza el botón de "Cerrar sesión" y lo envuelve en un componente Link */}
      {isAuthenticated && (
        <div>
          <Link to="/home"> {/* Enlace a la página de inicio */}
            <button onClick={handleLogout}>Cerrar sesión</button>
          </Link>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);