import Profile from '../Profile/Profile';
import LogoutButton from '../Profile/logout';
import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import {useAuth0} from '@auth0/auth0-react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { loginSuccess, loginFailure, registerSuccess, registerFailure } from '../../Redux/actions/authActions'; // Importa tus acciones
const FormLogin = () => {

    const { loginWithRedirect } = useAuth0();
    const { isAuthenticated} = useAuth0();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginOrRegister = async (e) => {
        e.preventDefault();
      
        // Obtén el nombre de usuario y la contraseña del estado local
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
      
        try {
          // Realiza la solicitud de inicio de sesión al backend
          const response = await fetch('/api/auth/iniciar-sesion', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', // Indica que estás enviando datos en formato JSON
            },
            body: JSON.stringify({ username, password }), // Convierte los datos de inicio de sesión a JSON
          });
      
          if (response.ok) {
            // El inicio de sesión fue exitoso
            console.log('Inicio de sesión exitoso');
            // Aquí puedes realizar acciones adicionales, como redirigir al usuario a la página de inicio, etc.
          } else {
            // El inicio de sesión falló, maneja el error
            const data = await response.json(); // Lee la respuesta del backend
            console.error('Error en el inicio de sesión:', data.error);
          }
        } catch (error) {
          console.error('Error en la solicitud:', error);
        }
      };

    return(
     <div>
                <form className="form_main" action="" onSubmit={handleLogin}>
            <p className="heading">Login</p>
            <div className="inputContainer">
                <svg viewBox="0 0 16 16" fill="#2e2e2e" height="16" width="16" xmlns="http://www.w3.org/2000/svg" class="inputIcon">
                <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
                </svg>
            <input placeholder="Usuario" id="username" class="inputField" type="text" value={username}
        onChange={(e) => setUsername(e.target.value)}/>
            </div>
            
        <div className="inputContainer">
            <svg viewBox="0 0 16 16" fill="#2e2e2e" height="16" width="16" xmlns="http://www.w3.org/2000/svg" class="inputIcon">
            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
            </svg>
            <input placeholder="Contraseña" id="password" class="inputField" type="password"  value={password}
        onChange={(e) => setPassword(e.target.value)}/>
        </div>
                    
                
        <button id="button" type="submit">INGRESAR</button>
            <div className="signupContainer">
                <ul/>
                <p>¿No tienes una cuenta?</p>
                <a href="/Registro">Registrate</a>
                {isAuthenticated ? <LogoutButton/> : <button className="btn" onClick={() => loginWithRedirect()}>Ingresar con google</button>
                    }
                
                <Profile />
                
            </div>
        
                </form>
                    <Link to="/home">
                    <button className='btn2'>INICIO</button>
                    </Link>
                
    </div>
     
        
)}


  export default connect(null, mapDispatchToProps)(FormLogin);