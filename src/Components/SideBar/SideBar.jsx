import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Sidebar() {
  // Obtiene las categorías del estado utilizando useSelector
  const categories = useSelector((state) => state.categories.categories);

  return (
    <div className="sidebar">
      <h2>Categorías</h2>
      <ul>
        {categories.map((category) => (
          <li key={category._id}>
            <Link to={`/category/${category._id}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
