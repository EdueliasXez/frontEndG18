import React from "react";
import { Routes, Route } from "react-router-dom"; // Importa Routes y Route
import style from "./home.module.css";
import NavBar from "../../Components/NavBar/NavBar";
import Cards from "../../Components/Cards/Cards";
import Sidebar from "../../Components/SideBar/SideBar";
import EventDetail from "../Detail/EventDetail"; // Asegúrate de importar desde la ubicación correcta
import Header from "../Header/Header"

function Home() {
  return (
    <div className={style.container}>
      <div className={style.navbar}>
        <NavBar />
      </div>
      <div className={style.sidebar}>
        <Sidebar />
      </div>
      <div className={style.main}>
        <Cards />
      </div>
      <Routes>
        <Route path="/detail/:id" element={<EventDetail />} />
      </Routes>
    </div>
  );
}

export default Home;

