// userReducer.js
const initialState = {
  user: {
    id: 1,
    name: 'John Doe',
    email: 'johndoe@example.com',
    // Otros campos del usuario
  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'EDIT_USER':
      // Actualiza el estado para permitir la edición del usuario
      return {
        ...state,
        isEditing: true,
      };

    case 'UPDATE_USER':
      // Actualiza la información del usuario con los nuevos datos
      return {
        ...state,
        user: action.payload, // action.payload contiene los nuevos datos del usuario
        isEditing: false,
      };

    default:
      return state;
  }
};

export default userReducer;
