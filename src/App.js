import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import {cache} from "./components/NavBar/NavBar"
import { BrowserRouter, Route, Routes} from "react-router-dom";
import { Redirect } from 'react-router-dom';
import Landing from "./Views/Landing/landing";
import Home from "./Views/Home/home";
import EventDetail from "./Views/Detail/EventDetail";
import FormLogin from './Components/FormLogin/FormLogin';
import QRCodeGenerator from "./Components/TicketCode/QRCodeGenerator";
import RegistIsProvider from './Views/RegistIsProvider/FormEvent';
import UsuariosAdmin from "./Views/Admin/Usuarios Admin/UsuariosAdmin";
import EventAdmin from "./Views/Admin/Event Admin/EventAdmin";
import NavBarAdmin from "./Views/Admin/NavAdmin/NavBarAdmin";
import Dashboard from "./Views/Admin/Dashboard/Dashboard";
import Profile from "./Components/Profile/Profile";


//correo admin: ticketclicky@gmail.com
//contraseña admin: pfHenry18
// https://deploy-front-xi.vercel.app/

const  App =() => {
  const AdminLayout = () => {
    const userEmail = cache.get("userEmail")
     const {isAuthenticated, } = useAuth0()

  if(userEmail !== "ticketclicky@gmail.com" ||  !isAuthenticated){
    return <Redirect to="/" />
  }else{
    return (
    <div className="dashboard" style={{ display: "flex", width: "99%" }}>
          <NavBarAdmin />
          <Routes>
            <Route exact path="/admin" element={Dashboard} />
            <Route path="/admin/event" element={EventAdmin} />
            {/* <Route path="/admin/compras" element={Compras} /> */}
            <Route path="/admin/usuarios" element={UsuariosAdmin} />
            <Route path="/admin/FormEvent" element={RegistIsProvider} />
          </Routes>
        </div>
      );
     };
  }
  
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Landing />} />
          <Route exact path="/home" element={<Home />} />
          <Route path="/detail/:id" element={<EventDetail />} />
          <Route path="/checkout" />
          <Route path="/login" element={<FormLogin />} />
          <Route path="/QRCodeGenerator" element={<QRCodeGenerator/>} />
          <Route path="/users" element={Profile} />
          
          

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
