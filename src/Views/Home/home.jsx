import React, {useEffect, useRef, useState} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import style from "./home.module.css"
import NavBar from "../../Components/NavBar/NavBar";
import Card from "../../Components/Card/Card";
import Cards from "../../Components/Cards/Cards";
import FormLogin from "../../Components/FormLogin/FormLogin";

function Home (){
const navigate = useNavigate;



return (
 <body>
    <div className={style.container}>
    <NavBar/>
    <div className={style.card}>
          
         <Cards/>
        
       
        {/* <Card/>
        <Card/>
        <li>  <Card/></li>
        <li>  <Card/></li>
        <li>  <Card/></li>
        <li>  <Card/></li>
        <li> <li> <li>  <Card/></li></li> </li>
        <li>  <Card/></li>
        <li>  <Card/></li>
        <li>  <Card/></li>
        <li>  <Card/></li>
        <li>  <Card/></li>   */}
              </div>
 </div>
</body>
)
}

export default Home;
