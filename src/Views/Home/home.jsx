import React, {useEffect, useRef, useState} from "react";
import { useNavigate } from "react-router-dom";
import style from "./home.module.css"
import NavBar from "../../Components/NavBar/NavBar"
import Cards from '../../Components/Cards/Cards'
import Sidebar from "../../Components/SideBar/SideBar";

function Home (){
const navigate = useNavigate;



return (
 <div className={style.container}>
    <NavBar/>
    <Cards/>
 </div>
)
}

export default Home;
