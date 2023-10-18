import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
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
} from "@mui/icons-material";
import style from "./EventDetail.module.css";
import { getEventDetail, cleanDetail } from "../../Redux/actions/events_actions";

const EventDetail = () => {
  const { id } = useParams();
  const event = useSelector((state) => state.events.eventDetail);
  const [isLoading, setIsLoading] = useState(true);
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
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Verificar si hay stock disponible
  const isSoldOut = event.stock <= 0;

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
            {/* Mostrar imagen solo si hay stock */}
            {!isSoldOut && (
              <img src={event.images[0]} alt={event.title} className={style.image} />
            )}
            <hr />
            <div className={style.eventDescription}>
              <Typography variant="h6" gutterBottom>
                <DescriptionIcon />
              </Typography>
              <Typography variant="body1">{event.summary}</Typography>
            </div>
            <Typography variant="h6" gutterBottom>
              <AttachMoneyIcon />
              Precio boleta: ${event.price}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {/* Mostrar disponibilidad de boletas solo si no está agotado */}
              {isSoldOut ? "Agotado" : `Boletas disponibles: ${event.stock}`}
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
          </Paper>
        </Container>
      )}
    </>
  );
};

export default EventDetail;





// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Link, useParams } from "react-router-dom";
// import {
//   Container,
//   Paper,
//   Typography,
//   Button,
//   Grid,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
// } from "@mui/material";
// import {
//   LocationOn as LocationOnIcon,
//   Description as DescriptionIcon,
//   AttachMoney as AttachMoneyIcon,
//   Event as EventIcon,
//   Category as CategoryIcon,
// } from "@mui/icons-material";
// import style from "./EventDetail.module.css";
// import { getEventDetail, cleanDetail } from "../../Redux/actions/events_actions";

// const EventDetail = () => {
//   const { id } = useParams();
//   const event = useSelector((state) => state.events.eventDetail);
//   const [isLoading, setIsLoading] = useState(true);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getEventDetail(id));
//     return () => {
//       dispatch(cleanDetail());
//     };
//   }, [dispatch, id]);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 2000);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <>
//       {isLoading ? (
//         <div className={style.loadingContainer}>
//           <p>Cargando...</p>
//         </div>
//       ) : (
//         <Container maxWidth="md">
//           <Paper elevation={3} className={style.eventInfo}>
//             <Link to={"/home"} className={style.goBack}>
//               ← Volver al listado de eventos
//             </Link>
//             <Typography variant="h4" component="div" gutterBottom>
//               {event.title}
//             </Typography>
//             <Typography variant="subtitle1" gutterBottom>
//               <ListItemIcon>
//                 <LocationOnIcon />
//               </ListItemIcon>
//               Lugar: {event.placeId.direction}, {event.placeId.city},{" "}
//               {event.placeId.country}
//             </Typography>
//             <img src={event.images[0]} alt={event.title} className={style.image} />
//             <hr />
//             <div className={style.eventDescription}>
//               <Typography variant="h6" gutterBottom>
//                 <DescriptionIcon />
//               </Typography>
//               <Typography variant="body1">{event.summary}</Typography>
//             </div>
//             <Typography variant="h6" gutterBottom>
//               <AttachMoneyIcon />
//               Precio boleta: ${event.price}
//             </Typography>
//             <Typography variant="body1" gutterBottom>
//               Boletas disponibles: {event.stock}
//             </Typography>
//             <Typography variant="body1" gutterBottom>
//               <EventIcon />
//               Fecha: {new Date(event.date).toLocaleDateString()}{" "}
//               {new Date(event.date).toLocaleTimeString()}
//             </Typography>
//             <Typography variant="h6" gutterBottom>
//               <CategoryIcon />
//               Categorías
//             </Typography>
//             <List dense>
//               {event.categories.map((category) => (
//                 <ListItem key={category._id}>
//                   <ListItemIcon>
//                     <CategoryIcon />
//                   </ListItemIcon>
//                   <ListItemText primary={category.name} />
//                 </ListItem>
//               ))}
//             </List>
//           </Paper>
//         </Container>
//       )}
//     </>
//   );
// };

// export default EventDetail;
