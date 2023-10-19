import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './styles.css';
import { connect } from 'react-redux';
import { registerUser, registrationRequest, registrationSuccess, registrationFailure } from '../../Redux/actions/login_actions';

function Formulario(props) {
  console.log(props);
  const {
    dispatch,
    registered,
    registering,
  } = props;

  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  
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
    isServiceProvider: false,
    images: [],
    location: '',
    summary: '',
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
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleIsServiceProviderChange = (e) => {
    setFormData({
      ...formData,
      isServiceProvider: e.target.checked,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrores = { ...errores };

    setErrores(newErrores);

    if (!Object.values(newErrores).some((error) => error !== '' && error !== false)) {
      dispatch(registrationRequest());
      dispatch(registerUser(formData))
        .then(() => {
          dispatch(registrationSuccess());
          console.log('Registro exitoso');
          setRegistrationSuccess(true);
        })
        .catch((error) => {
          dispatch(registrationFailure(error));
          console.error('Error en el registro:', error);
          alert('Error: no se pudo registrar el usuario');
        });
    } else {
      console.log('error', newErrores);
    }
  }

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
          onChange={handleIsServiceProviderChange}
        />
        Soy un proveedor de servicios
      </label>

      {formData.isServiceProvider && (
        <div>
          <label>
            <input
              className="input"
              type="text"
              placeholder="Ubicación del servicio"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </label>
          <label>
            <input
              className="input"
              type="text"
              placeholder="Resumen del servicio"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
            />
          </label>
        </div>
      )}

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
      {registered && <p>El usuario se ha creado con éxito <Link to="/login">Ir a iniciar sesión</Link></p>}
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
    registering: state.login.registering,
    registered: state.login.registered,
    error: state.login.error,
  };
}

export default connect(mapStateToProps)(Formulario);
