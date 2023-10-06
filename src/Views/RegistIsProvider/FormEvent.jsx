import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postCreateEvent } from "../../Redux/actions/events_actions";
import validate from "./Validate";
import { getCategories } from "../../Redux/../Redux/actions/categories_actions";
import style from "./FormEvent.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";



const FormEvent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user); 

  // Verifica si el usuario actual tiene permisos de organizador
  const isOrganizer = user && user.role === "organizer";

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const [form, setForm] = useState({
    name: "",
    imageSrc: "",
    price: 0,
    stock: 0,
    category: "",
    description: "",
  });

  const [error, setError] = useState({
    name: "Se requiere el nombre.",
    imageSrc: "Se requiere la imagen.",
    price: "Por favor ingresa un precio válido.",
    stock: "Se requiere el stock.",
    category: "Por favor ingresa una categoría.",
    description: "Por favor ingresa una descripción.",
  
  });
  // Carga imagen clodinary
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    formData.append("key", "356561696592386");
    console.log(formData)
    console.log(file)
    try {
      const response = await axios.post("https://cloudinary.com/users/login",formData);
      const imageUrl = response.data.data.url;
      console.log(imageUrl);
      setForm({
        ...form,
        imageSrc: imageUrl,
      });
      setError(
        validate({
          ...form,
          imageSrc: imageUrl,
        })
      );
    } catch (error) {
       console.error("Error uploading image:", error);
    }
  };

  const handleSelectCategory = (event) => {
    setForm({
      ...form,
      eventCategory: event.target.value,
    });
    setError(
      validate({
        ...form,
        eventCategory: event.target.value,
      })
    );
  };

  const changeHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
    setError(validate({
        ...form,
        [event.target.name]: event.target.value,
      })
    );
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
    } else if (Object.values(error).some((value) => value !== "")) {
      Swal.fire({
        title: "¡No se pudo crear el evento!",
        text: "Por favor llene las casillas vacías o revise sus errores",
        icon: "warning",
        confirmButtonText: "Ok",
      });
    } else {
      // Agrega la información del organizador al formulario de evento
      const eventData = {
        ...form,
        organizerId: user.id, // Cambia esto según cómo identificas al organizador
      };

      dispatch(postCreateEvent(eventData));
      setForm({
        name: "",
        imageSrc: "",
        price: 0,
        stock: 0,
        category: "",
        description: "",
      });
      Swal.fire({
        title: "¡Evento creado correctamente!",
        icon: "success",
        confirmButtonText: "Ok",
        confirmButtonColor: "#28a745",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate.push("/admin/eventos");
        }
      });
    }
  };

  const eventCategories = useSelector((state) => state.eventCategories);
 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  // Establecer isLoading en falso después de 2 segundos
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className={style.loadingContainer}>
         
        </div>
      ) : (
        <div className={style.form__C}>
          <div className={style.card}>
            <Link to={""}>
              <button>volver a la lista</button>
            </Link>
            <h1 className={style.card__title} id="title">
              Agregar un nuevo Evento
            </h1>

            {isOrganizer ? ( // Verifica los permisos del organizador
              <form onSubmit={(e) => submitHandler(e)} className={style.Formulario}>
                <div className={style.card__form}>
                  <label className={style.label__form}>Nombre del evento: </label>
                  <input
                    type="text"
                    value={form.eventName}
                    onChange={(e) => changeHandler(e)}
                    name="eventName"
                    placeholder="Escribe el nombre del evento..."
                  />
                </div>
                {error.eventName && (
                  <strong className={style.card__content}>{error.eventName}</strong>
                )}

                
                
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
      )}
    </>
  );
};

export default FormEvent;
