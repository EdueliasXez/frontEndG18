import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom"; // Importa useParams
import axios from "axios";
import style from "./EventDetail.module.css";
import { getEventDetail, cleanDetail } from "../../Redux/actions/events_actions";

const EventDetail = () => { 
  const { id } = useParams();
  const event = useSelector((state) => state.events.eventDetail);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  console.log('id', id, 'event', event)
  useEffect(() => {
    dispatch(getEventDetail(id)); // Usa 'id' obtenido de useParams
    return () => {
      dispatch(cleanDetail());
    };
  }, [dispatch, id]);

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
          <p>Cargando...</p>
        </div>
      ) : (
        <div className={style.container}>
          <div className={style.eventInfo}>
            <Link to={"/home"} className={style.goBack}>
              ← Volver al listado de eventos
            </Link>
            <h1>{event.title}</h1>
            <h3>Lugar: {event.location}</h3>
            <img src={event.imageUrl} alt={event.name} />
            <hr />
            <div className={style.eventDescription}>
              <h2>Descripción:</h2>
              <p>{event.summary}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EventDetail;
