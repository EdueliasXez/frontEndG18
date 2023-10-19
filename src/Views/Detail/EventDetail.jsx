import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Button,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  LocationOn as LocationOnIcon,
  Description as DescriptionIcon,
  AttachMoney as AttachMoneyIcon,
  Event as EventIcon,
  Category as CategoryIcon,
  CheckCircle as CheckCircleIcon, 
  Block as BlockIcon, 
} from "@mui/icons-material";
import style from "./EventDetail.module.css";
import { getEventDetail, cleanDetail } from "../../Redux/actions/events_actions";
import { handleActiveEvent } from "../../Redux/actions/softDelete_actions"; 
import ReviewsComponent from "../../Components/Reviews/Reviews";
import { getUserProfileFromToken } from "../../Redux/actions/auth_actions"; 

const EventDetail = () => {
  const { id } = useParams();
  const event = useSelector((state) => state.events.eventDetail);
  const [isLoading, setIsLoading] = useState(true);
  const [eventActive, setEventActive] = useState(false); 
  const [isAdmin, setIsAdmin] = useState(false); 
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEventDetail(id));
    return () => {
      dispatch(cleanDetail());
    };
  }, [dispatch, id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (event) {
        setEventActive(event.active);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [event]);

  const checkIfAdmin = () => {
    getUserProfileFromToken()
      .then((data) => {
        setIsAdmin(data.isAdmin); 
      })
      .catch((error) => {
        console.error("Error al obtener los datos del usuario:", error);
      });
  };

  return (
    <>
      {isLoading ? (
        <div className={style.loadingContainer}>
          <p>Cargando...</p>
        </div>
      ) : (
        <Container maxWidth="md">
          <Paper elevation={3} className={style.eventInfo}>
            <Link to={"/home"} className={style.goBack}>
              ← Volver al listado de eventos
            </Link>
            <Typography variant="h4" component="div" gutterBottom>
              {event.title}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <ListItemIcon>
                <LocationOnIcon />
              </ListItemIcon>
              Lugar: {event.placeId.direction}, {event.placeId.city},{" "}
              {event.placeId.country}
            </Typography>
            <img src={event.images[0]} alt={event.title} className={style.image} />
            <hr />
            <div className={style.eventDescription}>
              <Typography variant="h6" gutterBottom>
                <DescriptionIcon />
              </Typography>
              <Typography variant="body1">{event.summary}</Typography>
            </div>
            <Typography variant="h6" gutterBottom>
              {eventActive ? ( 
                <CheckCircleIcon color="success" /> 
              ) : (
                <BlockIcon color="error" /> 
              )}
              Precio boleta: ${event.price}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Boletas disponibles: {event.stock}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <EventIcon />
              Fecha: {new Date(event.date).toLocaleDateString()}{" "}
              {new Date(event.date).toLocaleTimeString()}
            </Typography>
            <Typography variant="h6" gutterBottom>
              <CategoryIcon />
              Categorías
            </Typography>
            <List dense>
              {event.categories.map((category) => (
                <ListItem key={category._id}>
                  <ListItemIcon>
                    <CategoryIcon />
                  </ListItemIcon>
                  <ListItemText primary={category.name} />
                </ListItem>
              ))}
            </List>
            {eventActive && isAdmin && ( 
              <Button
                onClick={() => {
                  handleActiveEvent(event._id, false); 
                  setEventActive(false); 
                }}
              >
                Desactivar Evento
              </Button>
            )}
            {!eventActive && isAdmin && ( 
              <Button
                onClick={() => {
                  handleActiveEvent(event._id, true); 
                  setEventActive(true); 
                }}
              >
                Activar Evento
              </Button>
            )}
            {checkIfAdmin()} 
            <ReviewsComponent reviewedItemId={event._id} reviewedItemType="event" />
          </Paper>
        </Container>
      )}
    </>
  );
};

export default EventDetail;
