import { setUser, clearUser } from '..reducer/auth_reducer'; // Asegúrate de que estas acciones se importen correctamente

export const loginWithGoogle = (response) => async (dispatch) => {
  const { tokenId } = response; // Obtiene el token de acceso de la respuesta de Google

  try {
    // Envia el token de acceso al servidor para verificar la autenticación
    const serverResponse = await fetch('/api/google-auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tokenId }),
    });

    const userData = await serverResponse.json();

    if (serverResponse.status === 200) {
      // Si la autenticación es exitosa, llama a setUser para almacenar los datos del usuario en Redux
      dispatch(setUser(userData));

      // Redirige al usuario a la página correspondiente (por ejemplo, su perfil)
      // ...
    } else {
      // Si la autenticación falla, puedes mostrar un mensaje de error o realizar acciones adicionales
      // ...
    }
  } catch (error) {
    // Manejo de errores, por ejemplo, mostrar un mensaje de error genérico
    console.error('Error de autenticación:', error);
    // ...
  }
};

export const logout = () => (dispatch) => {
  // Realiza acciones para cerrar la sesión, como eliminar tokens y limpiar el estado de Redux
  // ...

  // Llama a clearUser para eliminar los datos del usuario del estado de Redux
  dispatch(clearUser());

  // Redirige al usuario a la página de inicio de sesión o a donde sea necesario
  // ...
};