import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from 'react-redux';
import './styles.css';
import { connect } from 'react-redux';
import { registerUser, registrationRequest, registrationSuccess, registrationFailure } from '../../Redux/actions/login_actions';

function Formulario(props) {
  console.log(props);
  const {
    dispatch, // Acceso a la función dispatch
    registered,
    registering,
  } = props;



  const [formData, setFormData] = useState({
    userName: '',
    firstName: '',
    lastName: '',
    birthdate: '',
    email: '',
    password: '',
    country: '',
    city: '',
    wantsNotification: false,
    googleProfile: null,
    isServiceProvider: false,
  });

  const [errores, setErrores] = useState({
    userName: '',
    firstName: '',
    lastName: '',
    birthdate: '',
    email: '',
    password: '',
    country: '',
    city: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrores = { ...errores };
    

    if (formData.userName === '') {
      newErrores.userName = '*Campo obligatorio';
    } else {
      newErrores.userName = '';
    }

    if (formData.firstName === '') {
      newErrores.firstName = '*Campo obligatorio';
    } else {
      newErrores.firstName = '';
    }

    if (formData.lastName === '') {
      newErrores.lastName = '*Campo obligatorio';
    } else {
      newErrores.lastName = '';
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(formData.email)) {
      newErrores.email = 'Correo electrónico inválido';
    } else {
      newErrores.email = '';
    }

    if (formData.password === '') {
      newErrores.password = '*Campo obligatorio';
    } else if (formData.password.length < 6) {
      newErrores.password = 'La contraseña debe tener al menos 6 caracteres';
    } else {
      newErrores.password = '';
    }

    if (formData.country === '') {
      newErrores.country = '*Campo obligatorio';
    } else {
      newErrores.country = '';
    }

    if (formData.city === '') {
      newErrores.city = '*Campo obligatorio';
    } else {
      newErrores.city = '';
    }

    setErrores(newErrores);

    if (!Object.values(newErrores).some((error) => error !== '' && error !== false)) {
      dispatch(registrationRequest()); // 2. Dispatch la acción de inicio de registro

      // Llama a la acción de registro de usuario pasando formData
      dispatch(registerUser(formData))
        .then(() => {
          dispatch(registrationSuccess()); // 3. Dispatch la acción de registro exitoso
          console.log('Registro exitoso');
        })
        .catch((error) => {
          dispatch(registrationFailure(error)); // 4. Dispatch la acción de registro fallido
          console.error('Error en el registro:', error);
          alert('error no se pudo registrar el usuario');
        });
    } else {
      console.log('error', newErrores);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <p className="title">Registro</p>
      <p className="message">Regístrese ahora y obtenga acceso completo a nuestra aplicación</p>
      <div className="flex">
        <label>
          <input
            className="input"
            type="text"
            placeholder="Nombre"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errores.firstName && <p className="error">{errores.firstName}</p>}
        </label>
  
        <label>
          <input
            className="input"
            type="text"
            placeholder="Apellido"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errores.lastName && <p className="error">{errores.lastName}</p>}
        </label>
      </div>
  
      <label>
        <input
          className="input"
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errores.email && <p className="error">{errores.email}</p>}
      </label>
  
      <label>
        <input
          className="input"
          type="password"
          placeholder="Contraseña"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errores.password && <p className="error">{errores.password}</p>}
      </label>
  
      <label>
        <input
          className="input"
          type="text"
          placeholder="País"
          name="country"
          value={formData.country}
          onChange={handleChange}
        />
        {errores.country && <p className="error">{errores.country}</p>}
      </label>
  
      <label>
        <input
          className="input"
          type="text"
          placeholder="Ciudad"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
        {errores.city && <p className="error">{errores.city}</p>}
      </label>
  
      <label>
        <input
          type="checkbox"
          name="wantsNotification"
          checked={formData.wantsNotification}
          onChange={(e) => setFormData({ ...formData, wantsNotification: e.target.checked })}
        />
        Deseo recibir notificaciones
      </label>
  
      <label>
        <input
          type="checkbox"
          name="isServiceProvider"
          checked={formData.isServiceProvider}
          onChange={(e) => setFormData({ ...formData, isServiceProvider: e.target.checked })}
        />
        Soy un proveedor de servicios
      </label>

      <label>
        <input
          className="input"
          type="text"
          placeholder="Nombre de usuario"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
        />
        {errores.userName && <p className="error">{errores.userName}</p>}
      </label>
  
      <label>
        Fecha de Nacimiento:
        <DatePicker
          selected={formData.birthdate}
          onChange={(date) => setFormData({ ...formData, birthdate: date })}
          dateFormat="yyyy-MM-dd"
          showYearDropdown
          scrollableYearDropdown
        />
      </label>
      
      {registering && <p>Cargando...</p>}
      {registered && <p>El usuario se a creado con exito</p>}
      <button className="submit" type="submit">
        Registrarse
      </button>
      <p className="signin">
        ¿Ya tienes una cuenta? <a href="#">Iniciar sesión</a>
      </p>
    </form>
  );  
  
}
const mapStateToProps = (state) => {
  return {
    // Mapea las partes del estado que necesitas
    registering: state.login.registering,
    registered: state.login.registered,
    error: state.login.error,
  };
}
export default connect(mapStateToProps)(Formulario);
