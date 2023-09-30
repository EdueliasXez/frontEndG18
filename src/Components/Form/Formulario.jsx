import React, { useState } from 'react';
import './styles.css'

function Formulario() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    contraseña: '',
  });

  const [errores, setErrores] = useState({
    nombre: '',
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrores = { ...errores };

    // Validaciones
    if (formData.nombre === '') {
      newErrores.nombre = '*Campo obligatorio';
    } else {
      newErrores.nombre = '';
    }

    if (formData.apellido === '') {
      newErrores.apellido = '*Campo obligatorio';
    } else {
      newErrores.apellido = '';
    }

    if (formData.email === '') {
      newErrores.email = '*Campo obligatorio';
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(formData.email)) {
      newErrores.email = '*Campo obligatorio';
    } else {
      newErrores.email = '';
    }

    if (formData.contraseña === '') {
      newErrores.contraseña = '*Campo obligatorio';
    } else if (formData.contraseña.length < 6) {
      newErrores.contraseña = '*Campo obligatorio';
    } else {
      newErrores.contraseña = '';
    }

    setErrores(newErrores);

    // Si no hay errores, puedes enviar los datos del formulario
    if (Object.values(newErrores).every((error) => error === '')) {
      console.log('Datos del formulario:', formData);
    }
  };

  return (
    
    <form className="form" onSubmit={handleSubmit}>
    <p className="title">Registro </p>
    <p className="message">Regístrese ahora y obtenga acceso completo a nuestra aplicación </p>
        <div className="flex">
        <label>
            <input className="input" type="text" placeholder="Nombre" name="nombre"
            value={formData.nombre}
            onChange={handleChange}/>
            
            {errores.nombre && <p className="error">{errores.nombre}</p>}
        </label>

        <label>
            <input className="input" type="text" placeholder="Apellido"  name="apellido"
            value={formData.apellido}
            onChange={handleChange}/>
            
            {errores.apellido && <p className="error">{errores.apellido}</p>}
        </label>
    </div>  
            
    <label>
        <input className="input" type="email" placeholder="email"  name="email"
            value={formData.email}
            onChange={handleChange} />
        
        {errores.email && <p className="error">{errores.email}</p>}
    </label> 
        
    <label>
        <input className="input" type="password" placeholder="contraseña" name="contraseña"
            value={formData.contraseña}
            onChange={handleChange}/>
        
        {errores.contraseña && <p className="error">{errores.contraseña}</p>}
    </label>
    
    <button className="submit" type="submit">Registrarse</button>
    <p className="signin">
¿Ya tienes una cuenta? <a href="#">Iniciar sesion</a> </p>
</form>
  
    /*<div>
      <h1>Formulario</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
          {errores.nombre && <p className="error">{errores.nombre}</p>}
        </div>
        <div>
          <label>Apellido:</label>
          <input
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
          />
          {errores.apellido && <p className="error">{errores.apellido}</p>}
        </div>
        <div>
          <label>Correo Electrónico:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errores.email && <p className="error">{errores.email}</p>}
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="contraseña"
            value={formData.contraseña}
            onChange={handleChange}
          />
          {errores.contraseña && <p className="error">{errores.contraseña}</p>}
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>*/
  );
}

export default Formulario;
