import React from "react";
import style from "./Header.module.css"; // Asegúrate de crear un archivo CSS para los estilos de tu encabezado

function Header() {
  return (
    <header className={style.header}>
      {/* Agrega contenido a tu encabezado, como un título o elementos de navegación */}
      <h1>Mi Encabezado</h1>
      {/* Puedes agregar más elementos aquí según sea necesario */}
    </header>
  );
}

export default Header;