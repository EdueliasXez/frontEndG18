
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
  const [isEventModified, setIsEventModified] = useState(false);

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
    setIsEventModified(true); 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name.includes(".")) {
      const [parentField, childField] = name.split(".");
      setUpdatedEvent({
        ...updatedEvent,
        [parentField]: {
          ...updatedEvent[parentField],
          [childField]: value,
        },
      });
    } else {

      setUpdatedEvent({
        ...updatedEvent,
        [name]: value,
      });
    }
  };
  

  useEffect(() => {
    if (isEventModified) {
      alert("Evento modificado");
      setIsEventModified(false);
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
            rows={3} 
            maxRows={6} 
          />
          <TextField
            label="Resumen"
            name="summary"
            value={updatedEvent.summary}
            onChange={handleChange}
            multiline
            rows={5} 
            maxRows={10} 
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
  name="placeId.country" 
  value={updatedEvent.placeId.country}
  onChange={handleChange}
/>
<TextField
  label="Ciudad"
  name="placeId.city" 
  value={updatedEvent.placeId.city}
  onChange={handleChange}
/>
<TextField
  label="Dirección"
  name="placeId.direction" 
  value={updatedEvent.placeId.direction}
  onChange={handleChange}
/>
<TextField
  label="Código Postal"
  name="placeId.postalCode"
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
