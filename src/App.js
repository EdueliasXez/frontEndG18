import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './Views/Landing/landing';
import Home from './Views/Home/home';
import EventDetail from './Views/Detail/EventDetail';
import FormLogin from './Components/FormLogin/FormLogin';
import About from "./Views/About/About";
import Checkout from './Components/Checkout/Checkout';
import Profile from './Components/Profile/Profile';
import SucessPage from './Components/Checkout/Estados/Sucess'
import CancelPage from './Components/Checkout/Estados/Cancel'
import Formulario from './Components/Form/Formulario';
import QRCodeGenerator from "./Components/TicketCode/QRCodeGenerator";
import Dashboard from "./Views/Admin/Dashboard/Dashboard";
import EventAdmin from "./Views/Admin/Event Admin/EventAdmin";
import EventForm from "./Views/CreateIsProvider/create"
import UsuariosAdmin from "./Views/Admin/Usuarios Admin/UsersAdmin";
import WishlistEvents from "./Views/WishlistEvents/WishlistEvents";
import CreateIsProvider from "./Views/CreateIsProvider/create";
import TicketsAdmin from "./Views/Admin/Dashboard/Cantidades/Tickets/CantTickets"
import UserEdit from './Components/Profile/EditProfile/EditProfile'

import ServiceProfile from './Views/ServiceProvider/Service';
import EventDet from './Views/PutEvent/PutEvent';


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
          <Route path="/register" element={<Formulario />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About/>} />
          <Route path="/checkout/success" element={<SucessPage/>} />
          <Route path="/checkout/cancel" element={<CancelPage />} />
          <Route path="/QRCodeGenerator" element={<QRCodeGenerator/>} />
          <Route path="/WishlistEvents" element={<WishlistEvents/>} />
          <Route path="/admin" element={<Dashboard/>} />
          <Route path="/admin/events" element={<EventAdmin/>} />
          <Route path="/admin/users" element={<UsuariosAdmin/>} />
          <Route path="/admin/Create" element={<CreateIsProvider/>} />
          <Route path="/admin/tickets" element={<TicketsAdmin/>} />
         // <Route path="/profile/:idUser" element={<ProfileViewer />} />
          <Route path="/editUser/:userId" element={<UserEdit />} />
          <Route path="/admin/servi" element={<ServiceProfile/>}/>
          <Route path ="/put/:id" element={<EventDet/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
