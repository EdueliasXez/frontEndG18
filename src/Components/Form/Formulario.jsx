import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from 'react-redux';
import './styles.css';
import { registerUser } from '../../Redux/actions/login_actions';

function Formulario() {
  const dispatch = useDispatch();

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
    apellido: '',
    email: '',
    contraseña: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
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

    if (formData.lastName === '') {
      newErrores.apellido = '*Campo obligatorio';
    } else {
      newErrores.apellido = '';
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(formData.email)) {
      newErrores.email = 'Correo electrónico inválido';
    } else {
      newErrores.email = '';
    }

    if (formData.password === '') {
      newErrores.contraseña = '*Campo obligatorio';
    } else if (formData.password.length < 6) {
      newErrores.contraseña = 'La contraseña debe tener al menos 6 caracteres';
    } else {
      newErrores.contraseña = '';
    }

    setErrores(newErrores);

    if (!Object.values(newErrores).some((error) => error !== '')) {
      dispatch(registerUser(formData))
        .then(() => {
          console.log('Registro exitoso');
        })
        .catch((error) => {
          console.error('Error en el registro:', error);
        });
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
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
          {errores.nombre && <p className="error">{errores.nombre}</p>}
        </label>
  
        <label>
          <input
            className="input"
            type="text"
            placeholder="Apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
          />
          {errores.apellido && <p className="error">{errores.apellido}</p>}
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
          name="contraseña"
          value={formData.contraseña}
          onChange={handleChange}
        />
        {errores.contraseña && <p className="error">{errores.contraseña}</p>}
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
  
      <button className="submit" type="submit">
        Registrarse
      </button>
      <p className="signin">
        ¿Ya tienes una cuenta? <a href="#">Iniciar sesión</a>
      </p>
    </form>
  );  
}

export default Formulario;
