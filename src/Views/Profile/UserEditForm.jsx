import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../actions/userActions';

const UserEditForm = ({ user, updateUser }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser({ id: user.id, name, email });
    // Redirige de nuevo al perfil del usuario
    // Implementa esta parte según tu estructura de rutas
  };

  return (
    <div>
      <h1>Editar Perfil</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = {
  updateUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserEditForm);