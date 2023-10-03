import styles from "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./Views/Landing/landing";
import Home from "./Views/Home/home";
import EventDetail from "./Views/Detail/EventDetail";
import FormLogin from './Components/FormLogin/FormLogin';
import Cards from "./Components/Cards/Cards";
import About from "./Views/About/About";

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
          <Route path="/about" element={<About/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

