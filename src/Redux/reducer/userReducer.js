const initialState = {
    id: 1, // ID del usuario (puedes obtenerlo desde la base de datos)
    name: 'Usuario de Ejemplo',
    email: 'usuario@example.com',
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_USER':
        return { ...state, ...action.payload };
      default:
        return state;
    }
  };
  
  export default userReducer;