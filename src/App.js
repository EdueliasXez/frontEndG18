
import styles from "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./Views/Landing/landing";
import Home from "./Views/Home/home";
import EventDetail from "./Views/Detail/EventDetail";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route index element={<Landing/>} />
        <Route exact path ="/home" element ={<Home/>}/>
        <Route path="/detail/:id" element={<EventDetail />} />
        <Route path="/checkout" />
        <Route path="/login"/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
