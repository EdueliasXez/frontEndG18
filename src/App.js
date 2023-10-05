import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./Views/Landing/landing";
import Home from "./Views/Home/home";
import EventDetail from "./Views/Detail/EventDetail";
import FormLogin from './Components/FormLogin/FormLogin';
import QRCodeGenerator from "./Components/TicketCode/QRCodeGenerator";
import FormEvent from './Views/RegistIsProvider/FormEvent'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Landing />} />
          <Route exact path="/home" element={<Home />} />
          <Route path="/detail/:id" element={<EventDetail />} />
          <Route path="/checkout" />
          <Route path="/login" element={<FormLogin />} />
          <Route path="/QRCodeGenerator" element={<QRCodeGenerator/>} />
          <Route path="/FormEvent" element={<FormEvent />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
