
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import {
  updateEvent,
  cleanDetail,
  getEventDetail
} from "../../Redux/actions/events_actions";
import { Style } from "@mui/icons-material";

const EditEvent = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const event = useSelector((state) => state.events.eventDetail);
  const [updatedEvent, setUpdatedEvent] = useState({
    title: "",
    summary: "",
    price: 0,
    stock: 0,
    placeId: {
      country: "",
      city: "",
      direction: "",
      postalCode: "",
    },
    date: "",
  });
  const [isEventModified, setIsEventModified] = useState(false); // Estado para verificar si se ha modificado el evento

  useEffect(() => {
    dispatch(cleanDetail());
    dispatch(getEventDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (event) {
      setUpdatedEvent(event);
    }
  }, [event]);

  const handleSave = () => {
    dispatch(updateEvent(id, updatedEvent));
    setIsEventModified(true); // Evento modificado, muestra la alerta
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEvent({
      ...updatedEvent,
      [name]: value,
    });
  };

  useEffect(() => {
    // Muestra una alerta si el evento ha sido modificado
    if (isEventModified) {
      alert("Evento modificado");
      setIsEventModified(false); // Restablece el estado
    }
  }, [isEventModified]);
  return (
    <Container maxWidth="md">
      <Paper elevation={3}>
        <Link to={`/admin/servi`}>Volver </Link>
        <Typography variant="h4" component="div">
          Editar Evento
        </Typography>
        <form>
          <TextField
            label="Título"
            name="title"
            value={updatedEvent.title}
            onChange={handleChange}
            multiline
            rows={3} // Ajusta este valor según tu preferencia
            maxRows={6} // Ajusta este valor según tu preferencia
          />
          <TextField
            label="Resumen"
            name="summary"
            value={updatedEvent.summary}
            onChange={handleChange}
            multiline
            rows={5} // Ajusta este valor según tu preferencia
            maxRows={10} // Ajusta este valor según tu preferencia
          />
          <TextField
            label="Precio"
            type="number"
            name="price"
            value={updatedEvent.price}
            onChange={handleChange}
          />
          <TextField
            label="Stock"
            type="number"
            name="stock"
            value={updatedEvent.stock}
            onChange={handleChange}
          />
          <TextField
  label="País"
  name="placeId.country" // Acceder al campo 'country' dentro de placeId
  value={updatedEvent.placeId.country}
  onChange={handleChange}
/>
<TextField
  label="Ciudad"
  name="placeId.city" // Acceder al campo 'city' dentro de placeId
  value={updatedEvent.placeId.city}
  onChange={handleChange}
/>
<TextField
  label="Dirección"
  name="placeId.direction" // Acceder al campo 'direction' dentro de placeId
  value={updatedEvent.placeId.direction}
  onChange={handleChange}
/>
<TextField
  label="Código Postal"
  name="placeId.postalCode" // Acceder al campo 'postalCode' dentro de placeId
  value={updatedEvent.placeId.postalCode}
  onChange={handleChange}
/>
          <TextField
            label="Fecha"
            type="datetime-local"
            name="date"
            value={updatedEvent.date}
            onChange={handleChange}
          />
          <Button variant="contained" className={Style.btn1} onClick={handleSave}>
            Guardar
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default EditEvent;
