import React, {useEffect, useRef, useState} from "react";
import { useNavigate } from "react-router-dom";
import style from "./home.module.css"
import NavBar from "../../Components/NavBar/NavBar";


function Home (){
const navigate = useNavigate;



return (
 <div className={style.container}>
    <NavBar/>
  
 </div>
)
}

export default Home;
