import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postCreateEvent } from "../../Redux/actions/events_actions";
import validate from './Validate.js';
import { getCategories } from "../../Redux/actions/categories_actions";
import style from "./FormEvent.module.css";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import Swal from "sweetalert2";

const FormEvent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const [form, setForm] = useState({
    title: "",
    summary: "",
    price: 0,
    stock: 0,
    images: "",
    active: "",
    categories: "",
    serviceProviderId: "",
  });

  const [error, setError] = useState({
    title: "Se requiere el nombre.",
    summary: "Por favor ingresa un resumen.",
    price: "Por favor ingresa un precio válido.",
    stock: "Se requiere el stock.",
    images: "Se requiere la imagen.",
    active: "Por favor ingresa si esta activo.",
    categories: "Por favor ingresa una categoría.",
    serviceProviderId: "Por favor ingresa ID de proveedor de servicio.",
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
      setError(
        validate({
          ...form,
          images: imageUrl,
        })
      );
    } catch (error) {
      console.error("Error uploading images:", error);
      setError({
        ...form,
        images: "Error al cargar la imagen.",
      });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
    setError(
      validate({
        ...form,
        [name]: value,
      })
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (Object.values(error).some((value) => value !== "")) {
      Swal.fire({
        title: "¡No se pudo crear el evento!",
        text: "Por favor llene las casillas vacías o revise sus errores",
        icon: "warning",
        confirmButtonText: "Ok",
      });
    } else {
      dispatch(postCreateEvent(form));
      const resetForm = () => {
        setForm({
          title: "",
          summary: "",
          price: 0,
          stock: 0,
          images: "",
          active: "",
          categories: "",
          serviceProviderId: "",
        });
      };
      Swal.fire({
        title: "¡Evento creado correctamente!",
        icon: "success",
        confirmButtonText: "Ok",
        confirmButtonColor: "#28a745",
      }).then((result) => {
        if (result.isConfirmed) {
          resetForm();
          navigate.push("/admin/eventos");
        }
      });
    }
  };

  const categories = useSelector((state) => state.categories);

  return (
    <div className={style.form__C}>
      <div className={style.card}>
        <Link to={"/admin/eventos"}>
          <button>volver a la lista</button>
        </Link>
        <h1 className={style.card__title} id="title">
          Agregar un nuevo Evento
        </h1>

        <form onSubmit={handleSubmit} className={style.Formulario}>
          <div className={style.card__form}>
            <label className={style.label__form}>Nombre: </label>
            <input
              type="text"
              value={form.title}
              onChange={handleChange}
              name="title"
              placeholder="Escribe el nombre del evento..."
            />
            {error.title && (
              <strong className={style.card__content}>{error.title}</strong>
            )}
          </div>

          <div className={style.imgCont}>
            <label className={style.label__form}>
              Imagen del evento:{" "}
            </label>
            <input
              type="file"
              onChange={handleImageUpload}
              name="images"
              accept="image/*"
            />
          </div>
          {form.images && (
            <img
              src={form.images}
              alt="Evento"
              className={style.uploadedImage}
            />
          )}
          {error.images && (
            <strong className={style.card__content}>{error.images}</strong>
          )}

          <div className={style.card__form3}>
            <label className={style.label__form}>Price:</label>
            <input
              type="text"
              value={form.price}
              onChange={handleChange}
              name="price"
              placeholder="Escribe el precio del evento..."
            />
            {error.price && (
              <strong className={style.card__content}>{error.price}</strong>
            )}
          </div>

          <div className={style.card__form}>
            <label className={style.label__form}>Stock:</label>
            <input
              type="text"
              value={form.stock}
              onChange={handleChange}
              name="stock"
              placeholder="Ingresa el stock del evento..."
            />
            {error.stock && (
              <strong className={style.card__content}>{error.stock}</strong>
            )}
          </div>

          <div className={style.card__form}>
            <label className={style.label__form}>Categoría: </label>
            <select
              className={style.selectBrandCategory}
              onChange={handleChange}
              name="categories"
            >
              <option value="">Selecciona una categoría</option>
              <option value="">Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {error.categories && (
              <strong className={style.card__content}>{error.categories}</strong>
            )}
          </div>

          <div className={style.card__form2}>
            <label className={style.label__form}>summary: </label>
            <input
              type="text"
              value={form.summary}
              onChange={handleChange}
              name="summary"
              placeholder="Por favor ingresa un resumen..."
            />
            {error.summary && (
              <strong className={style.card__content}>{error.summary}</strong>
            )}
          </div>

          <button className={style.btn} type="submit">
            Crear Evento
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormEvent;
