import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";//// Hay que asegurarse de importar useAuth0
import axios from "axios";
import Swal from "sweetalert2";
import style from "./EventDetail.module.css";
import Loading from "../../components/Loading/Loading";

// me falta el redux traermelo para el cart,detail,cleandetail
//      favorite,deletefavorite,fetchdata => favorites
// me faltarian las rutas y tambien las llamadas back😎
//permite a los usuarios agregar eventos a favoritos, comprar boletos y escribir reseñas. 

const EventDetail = () => {
  const { eventId } = useParams();

  const event = useSelector((state) => state.eventDetail);

  const [isFavorite, setIsFavorite] = useState(false);
  const [userId, setUserId] = useState(null);
  const [eventReviews, setEventReviews] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const { isAuthenticated, loginWithRedirect, user } = useAuth0();

  useEffect(() => {
    dispatch(getEventDetail(eventId));
    return () => {
      dispatch(cleanDetail());
    };
  }, [dispatch, eventId]);

  useEffect(() => {
    const fetchEventReviews = async () => {
      try {
        const response = await axios.get(`/event-reviews/${eventId}`);
        setEventReviews(response.data);
      } catch (error) {
        console.error("Error al obtener las reseñas del evento", error);
      }
    };

    fetchEventReviews();
  }, [eventId]);

  useEffect(() => {
    if (isAuthenticated && user) {
      const userIdLogin = user.sub;
      setUserId(userIdLogin);
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    checkFavoriteStatus();
  }, [userId, event.id]);

  const checkFavoriteStatus = async () => {
    if (userId !== null) {
      try {
        const favoriteEvents = await fetchData(userId);
        if (!favoriteEvents.message) {
          const isEventFavorite = favoriteEvents.some((e) => e.id === event.id);
          setIsFavorite(isEventFavorite);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      setIsFavorite(false);
    }
  };

  const addToFavorites = async () => {
    if (userId === null) {
      alert("Debes iniciar sesión para agregar a favoritos");
    } else {
      try {
        await addFavorite(event.id, userId);
        setIsFavorite(true);
      } catch (error) {
        console.error("Error al agregar a favoritos:", error);
      }
    }
  };

  const removeFromFavorites = async () => {
    try {
      await deleteFavorite(event.id, userId);
      setIsFavorite(false);
      alert("Evento eliminado de favoritos");
    } catch (error) {
      console.error("Error al eliminar de favoritos:", error);
    }
  };

  function decrementTicketQuantity() {
    if (ticketQuantity > 1) {
      setTicketQuantity(ticketQuantity - 1);
    }
  }

  function incrementTicketQuantity() {
    if (ticketQuantity < event.availableTickets) {
      setTicketQuantity(ticketQuantity + 1);
    }
  }

  const buyTickets = async () => {
    if (userId === null) {
      // Handle adding tickets to cart for non-authenticated users
      // You can store selected tickets in local storage
    } else {
      try {
        const body = { quantity: ticketQuantity };
        const response = await axios.post(`/cart/${userId}/${event.id}`, body);
        const data = await response.data;
        // Handle success or error response
      } catch (error) {
        console.error("Error al agregar al carrito", error);
      }
    }
  };

  const handleBuyNow = () => {
    if (isAuthenticated) {
      if (ticketQuantity > 0 && ticketQuantity <= event.availableTickets) {
        // Dispatch an action to add tickets to the cart
        // Then redirect to the checkout page
        dispatch(addToCart({ ...event, quantity: ticketQuantity }));
        history.push(`/checkout`);
      } else {
        Swal.fire({
          title: "Lo sentimos",
          text: "No hay suficientes boletos disponibles",
          icon: "warning",
          confirmButtonText: "Ok",
        });
      }
    } else {
      handleCartLogin();
    }
  };

  const handleCartLogin = () => {
    Swal.fire({
      title: "Inicie sesión",
      text: "Por favor inicia sesión para comprar boletos.",
      icon: "warning",
      confirmButtonText: "Iniciar sesión",
      confirmButtonColor: "#28a745",
    }).then((result) => {
      if (result.isConfirmed) {
        loginWithRedirect();
      }
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className={style.loadingContainer}>
          <Loading />
        </div>
      ) : (
        <div className={style.container}>
          <div className={style.eventInfo}>
            <Link to={"/events"} className={style.goBack}>
              ← Volver al listado de eventos
            </Link>
            <h1>{event.name}</h1>
            <h3>Lugar: {event.location}</h3>
            {isFavorite ? (
              <button className={style.favoriteBtn} onClick={removeFromFavorites}>
                ❤️ Quitar de favoritos
              </button>
            ) : (
              <button className={style.favoriteBtn} onClick={addToFavorites}>
                🤍 Agregar a favoritos
              </button>
            )}
            <img src={event.imageUrl} alt={event.name} />
            <hr />
            <div className={style.eventDescription}>
              <h2>Descripción:</h2>
              <p>{event.description}</p>
              <h2>Reseñas de los usuarios</h2>
              <ul className={style.eventReviewsList}>
                {eventReviews.map((review) => (
                  <li key={review.id}>
                    <p>Comentario: {review.comment}</p>
                    <p>Calificación: {review.rating}</p>
                    <p>Usuario: {review.userEmail}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={style.ticketInfo}>
            <h2>Precio: ${event.ticketPrice}</h2>
            <div className={style.ticketQuantity}>
              <button onClick={decrementTicketQuantity}>-</button>
              <p>{ticketQuantity}</p>
              <button onClick={incrementTicketQuantity}>+</button>
            </div>
            <button className={style.addToCartBtn} onClick={buyTickets}>
              Agregar al carrito
            </button>
            <button className={style.buyNowBtn} onClick={handleBuyNow}>
              Comprar ahora
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EventDetail;
