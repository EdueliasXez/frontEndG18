import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import style from "./landing.module.css";
import { getCategories } from "../../Redux/../Redux/actions/categories_actions";
import Button from "@mui/material/Button";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import logo from '../../images/Logo-Clikcy.png'

function Landing() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);

  const [selectedItem, setSelectedItem] = useState(0);

  useEffect(() => {
    dispatch(getCategories());

    const interval = setInterval(() => {
      setSelectedItem((prevItem) =>
        prevItem === categories.length - 1 ? 0 : prevItem + 1
      );
    }, 10000); 

    return () => {
      clearInterval(interval); 
    };
  }, []);

  const backgroundClass = `${style.backgroundImage} ${style.backgroundWithFilter}`;
  const backgroundImageUrl = categories[selectedItem]?.backgroundImage[0] || "";
  

  return (
    <div className={style.landingContainer}>
      <div className={`${style.landingg} ${backgroundClass}`} style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
        {/* Tu contenido existente */}
        <div className={style.overlay}></div> {/* Agrega la capa de transparencia negra */}
        <div className={style.header}>
          <img src={logo} alt="Logo" className={style.logo} />
          <h1 className={style.h2}>Te damos la bienvenida</h1>
        </div>
  
        <div className={style.buttonlanding}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/home"
            className={style.empezarButton}
          >
            Empezar
          </Button>
        </div>
        <div className={style.categoryCarousel}>
          <h1 className={style.h1}>Explora nuestras categorías</h1>
          <Carousel
  showArrows={false}
  showStatus={false}
  showIndicators={false}
  centerMode={true}
  centerSlidePercentage={33.33}
  emulateTouch={true}
  selectedItem={selectedItem}
  onChange={(index) => setSelectedItem(index)}
  className={style.customCarousel} // Agrega una clase personalizada al carrusel
>
  {categories.map((category) => (
    <div key={category._id} className={`${style.category} ${style.categoryItem}`}>
      <h3 className={style.categoryText}>{category.name}</h3>
    </div>
  ))}
</Carousel>
        </div>
      </div>
    </div>
  );
}

export default Landing;

