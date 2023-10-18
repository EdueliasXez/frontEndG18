import React from 'react';
import { connect } from 'react-redux';

const UserProfile = ({ user, editProfile }) => {
  return (
    <div>
      <h1>Perfil de Usuario</h1>
      <p>Nombre: {user.name}</p>
      <p>Correo: {user.email}</p>
      <button onClick={editProfile}>Editar</button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  editProfile: () => {
    // Redirige a la página de edición
    // Implementa esta parte según tu estructura de rutas
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);