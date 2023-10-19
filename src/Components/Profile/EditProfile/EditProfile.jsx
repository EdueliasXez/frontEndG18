import React, { useState } from "react";
import { connect } from "react-redux";
import { updateUser } from "./../../../Redux/actions/user_actions";
import { useParams, Link } from "react-router-dom";
const UserEdit = ({ updateUser }) => {
  const { userId } = useParams();
  console.log(userId)
  const [userData, setUserData] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    birthdate: "",
    email: "",
    password: "",
    isServiceProvider: false,
    wantsNotification: false,
    country: "",
    city: "",
    images: "",
    location: "",
    summary: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSave = () => {
    const dataToSubmit = { ...userData };
    for (const key in dataToSubmit) {
      if (dataToSubmit[key] === "" || dataToSubmit[key] === null) {
        delete dataToSubmit[key];
      }
    }
    updateUser(userId, dataToSubmit);
  };

  return (
    <div>
      <h2>Editar Perfil</h2>
      <div>
        <label>Nombre de Usuario:</label>
        <input
          type="text"
          name="userName"
          value={userData.userName}
          onChange={handleInputChange}
        />
        <label>Nombre:</label>
        <input
          type="text"
          name="firstName"
          value={userData.firstName}
          onChange={handleInputChange}
        />
        <label>Apellido:</label>
        <input
          type="text"
          name="lastName"
          value={userData.lastName}
          onChange={handleInputChange}
        />
        <label>Fecha de Nacimiento:</label>
        <input
          type="date"
          name="birthdate"
          value={userData.birthdate}
          onChange={handleInputChange}
        />
        <label>Correo Electrónico:</label>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
        />
        <label>Contraseña:</label>
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleInputChange}
        />
        <label>¿Es proveedor de servicios?</label>
        <input
          type="checkbox"
          name="isServiceProvider"
          checked={userData.isServiceProvider}
          onChange={handleInputChange}
        />
        <label>¿Desea recibir notificaciones?</label>
        <input
          type="checkbox"
          name="wantsNotification"
          checked={userData.wantsNotification}
          onChange={handleInputChange}
        />
        <label>País:</label>
        <input
          type="text"
          name="country"
          value={userData.country}
          onChange={handleInputChange}
        />
        <label>Ciudad:</label>
        <input
          type="text"
          name="city"
          value={userData.city}
          onChange={handleInputChange}
        />
        <label>Imágenes (separadas por coma):</label>
        <input
          type="text"
          name="images"
          value={userData.images}
          onChange={handleInputChange}
        />
        <label>Ubicación:</label>
        <input
          type="text"
          name="location"
          value={userData.location}
          onChange={handleInputChange}
        />
        <label>Descripción:</label>
        <textarea
          name="summary"
          value={userData.summary}
          onChange={handleInputChange}
        />
        <button onClick={handleSave}>Guardar</button>
        <Link to={`/profile`}>Volver al Perfil</Link>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  updateUser,
};

export default connect(null, mapDispatchToProps)(UserEdit);
