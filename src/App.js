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
          <Route path="/checkout/sucess" element={<SucessPage/>} />
          <Route path="/checkout/cancel" element={<CancelPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

