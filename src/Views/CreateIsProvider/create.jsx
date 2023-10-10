import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postCreateEvent } from "../../Redux/actions/events_actions";
import { getCategories } from "../../Redux/actions/categories_actions";
import style from "./create.module.css";
import axios from "axios";
import validacion from "./Validacion.js"; 
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

const Create = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  
  const isOrganizer = user && user.role === "organizer";

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const [form, setForm] = useState({
    title: "",
    summary: "",
    price: "",
    stock: "",
    images: "",
    active: "",
    categories: "",
    serviceProviderId: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    summary: "",
    price: "",
    stock: "",
    images: "",
    active: "",
    categories: "",
    serviceProviderId: "",
  });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    formData.append("key", "356561696592386");

    try {
      const response = await axios.post("https://cloudinary.com/users/login", formData);
      const imageUrl = response.data.data.url;
      setForm({
        ...form,
        images: imageUrl,
      });
      validateField("images", imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleSelectCategory = (event) => {
    const selectedCategory = event.target.value;
    setForm({
      ...form,
      categories: selectedCategory,
    });
    validateField("categories", selectedCategory);
  };

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
    validateField(name, value);
  };

  const validateField = (fieldName, value) => {
    let errorMessage = "";
    if (fieldName === "title") {
      errorMessage = value.trim() === "" ? "Se requiere el nombre." : "";
    } else if (fieldName === "summary") {
      errorMessage = value.trim() === "" ? "Por favor ingresa un resumen." : "";
    } else if (fieldName === "images") {
      errorMessage = value.trim() === "" ? "¡Inserte una imagen!" : "";
    } else if (fieldName === "price") {
      errorMessage = isNaN(value) || value <= 0 ? "¡Por favor ingrese un precio válido!" : "";
    } else if (fieldName === "stock") {
      errorMessage = isNaN(value) || value <= 0 ? "¡Debe ser un número mayor a 0!" : "";
    } else if (fieldName === "categories") {
      errorMessage = value.trim() === "" ? "¡Por favor ingrese una categoría!" : "";
    }

    setErrors({
      ...errors,
      [fieldName]: errorMessage,
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!isOrganizer) {
      Swal.fire({
        title: "Permiso denegado",
        text: "Solo los organizadores pueden agregar eventos.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    } else {
      const errorsFromValidation = validacion(form); 

      if (Object.keys(errorsFromValidation).length > 0) {
       
        setErrors({
          ...errors,
          ...errorsFromValidation,
        });

        Swal.fire({
          title: "¡No se pudo crear el evento!",
          text: "Por favor llene las casillas vacías o revise sus errores",
          icon: "warning",
          confirmButtonText: "Ok",
        });
      } else {
        const eventData = {
          ...form,
          organizerId: user.id,
        };

        dispatch(postCreateEvent(eventData));
        setForm({
          title: "",
          summary: "",
          price: "",
          stock: "",
          images: "",
          active: "",
          categories: "",
          serviceProviderId: "",
        });

        Swal.fire({
          title: "¡Evento creado correctamente!",
          icon: "success",
          confirmButtonText: "Ok",
          confirmButtonColor: "#28a745",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/admin/eventos");
          }
        });
      }
    }
  };

  const eventCategories = useSelector((state) => state.categories);

  return (
    <div className={style.form__C}>
      <div className={style.card}>
        <Link to={"/admin/eventos"}>
          <button>volver a la lista</button>
        </Link>
        <h1 className={style.card__title} id="title">
          Agregar un nuevo Evento
        </h1>

        {isOrganizer ? (
          <form onSubmit={submitHandler} className={style.Formulario}>
            <div className={style.card__form}>
              <label className={style.label__form}>Nombre del evento: </label>
              <input
                type="text"
                value={form.title}
                onChange={changeHandler}
                name="title"
                placeholder="Escribe el nombre del evento..."
              />
              {errors.title && (
                <strong className={style.card__content}>{errors.title}</strong>
              )}
            </div>

            <div className={style.card__form}>
              <label className={style.label__form}>Resumen: </label>
              <textarea
                value={form.summary}
                onChange={changeHandler}
                name="summary"
                placeholder="Escribe un resumen..."
              />
              {errors.summary && (
                <strong className={style.card__content}>{errors.summary}</strong>
              )}
            </div>

            <div className={style.card__form}>
              <label className={style.label__form}>Precio: </label>
              <input
                type="number"
                value={form.price}
                onChange={changeHandler}
                name="price"
                placeholder="Ingrese el precio..."
              />
              {errors.price && (
                <strong className={style.card__content}>{errors.price}</strong>
              )}
            </div>

            <div className={style.card__form}>
              <label className={style.label__form}>Stock: </label>
              <input
                type="number"
                value={form.stock}
                onChange={changeHandler}
                name="stock"
                placeholder="Ingrese el stock..."
              />
              {errors.stock && (
                <strong className={style.card__content}>{errors.stock}</strong>
              )}
            </div>

            <div className={style.card__form}>
              <label className={style.label__form}>Categoría: </label>
              <select
                value={form.categories}
                onChange={handleSelectCategory}
                name="categories"
              >
                <option value="">Seleccione una categoría...</option>
                {eventCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.categories && (
                <strong className={style.card__content}>{errors.categories}</strong>
              )}
            </div>

            <div className={style.card__form}>
              <label className={style.label__form}>Imágenes: </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                name="images"
              />
              {errors.images && (
                <strong className={style.card__content}>{errors.images}</strong>
              )}
            </div>

            <button className={style.btn} type="submit">
              Crear evento
            </button>
          </form>
        ) : (
          <div className={style.permissionDenied}>
            Solo los organizadores pueden agregar eventos.
          </div>
        )}

        <br></br>
      </div>
      <br></br>
    </div>
  );
};

export default Create;
