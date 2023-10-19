// UserInformation.js
import React from 'react';
import { connect } from 'react-redux';
import { editUser, updateUser } from './userActions';

const UserInformation = ({ user }) => {
  return (
    <div>
      <h2>User Information</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      {/* Otros campos */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  isEditing: state.isEditing,
});

const mapDispatchToProps = {
  editUser,
  updateUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInformation);
