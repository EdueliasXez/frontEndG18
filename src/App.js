import { useState, useEffect } from "react";
import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './Views/Landing/landing';
import Home from './Views/Home/home';
import EventDetail from './Views/Detail/EventDetail';
import FormLogin from './Components/FormLogin/FormLogin';
import QRCodeGenerator from "./Components/TicketCode/QRCodeGenerator";
import Form from "./Views/Form/FormEvent";
import UsuariosAdmin from "./Views/Admin/Usuarios Admin/UsuariosAdmin";
import EventAdmin from "./Views/Admin/Event Admin/EventAdmin";
import NavBarAdmin from "./Views/Admin/NavAdmin/NavBarAdmin";
import Dashboard from "./Views/Admin/Dashboard/Dashboard";
import Profile from './Components/Profile/Profile';
import About from "./Views/About/About";
import { useNavigate } from 'react-router-dom';
import CreateIsProvider from "./Views/CreateIsProvider/create"
import Checkout from './Components/Checkout/Checkout';
// import Compras from "./views/Compras/Compras";




import SucessPage from './Components/Checkout/Estados/Sucess'
import CancelPage from './Components/Checkout/Estados/Cancel'
import Formulario from './Components/Form/Formulario';


function App() { 
   
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Landing />} />
          <Route exact path="/home" element={<Home />} />
          <Route path="/detail/:id" element={<EventDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<FormLogin />} />
          <Route path="/QRCodeGenerator" element={<QRCodeGenerator/>} />
          <Route path="/users" element={Profile} />
          <Route path="/register" element={<Formulario />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About/>} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/success" element={<SucessPage/>} />
          <Route path="/checkout/cancel" element={<CancelPage />} />
          <Route exact path="/admin" element={<Dashboard/>} />
          <Route path="/admin/eventos" element={<EventAdmin/>} />
          {/* <Route path="/admin/compras" element={<Compras/>} /> */}
         <Route path="/admin/usuarios" element={<UsuariosAdmin/>} />
          <Route path="/admin/formEvent" element={<Form/>} />
          <Route path="/admin/create" element={<CreateIsProvider/>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

