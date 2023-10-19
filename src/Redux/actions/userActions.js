// userActions.js
export const editUser = (user) => {
  return {
    type: 'EDIT_USER',
    payload: user,
  };
};

export const updateUser = (user) => {
  return {
    type: 'UPDATE_USER',
    payload: user,
  };
};