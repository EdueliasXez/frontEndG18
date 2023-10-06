// authActions.js

// Constantes de acciones
// Acciones de inicio de sesión
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

// Acciones de registro
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

// Acción de éxito para el inicio de sesión
export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
}

// Acción de falla para el inicio de sesión
export function loginFailure(error) {
  return {
    type: LOGIN_FAILURE,
    error,
  };
}

// Acción de éxito para el registro
export function registerSuccess(user) {
  return {
    type: REGISTER_SUCCESS,
    user,
  };
}

// Acción de falla para el registro
export function registerFailure(error) {
  return {
    type: REGISTER_FAILURE,
    error,
  };
}