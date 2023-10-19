// EditUserForm.js
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { editUser, updateUser } from './userActions';

const EditUserForm = ({ user, onSubmit }) => {
  const [editedUser, setEditedUser] = useState(user);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(editedUser);
  };

  return (
    <div>
      <h2>Edit User Information</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={editedUser.name} onChange={handleInputChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={editedUser.email} onChange={handleInputChange} />
        </div>
        {/* Otros campos */}
        <button type="submit">Save</button>
      </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditUserForm);
