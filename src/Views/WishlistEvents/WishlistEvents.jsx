import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Container, Paper, Typography, List, ListItem, ListItemIcon, ListItemText, Button } from '@mui/material';
import style from "./WishlistEvents.module.css";

function WishlistEvents() {
  const [events, setEvents] = useState([]);
  const [newEventName, setNewEventName] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showAddToFavoritesMessage, setShowAddToFavoritesMessage] = useState(false);

  const categoryOptions = [
    "Salud y Bienestar",
    "Educación",
    "Negocios y Emprendimiento",
    "Ecología y Sostenibilidad",
    "Ciencia y Tecnología",
    "Artes Escénicas",
    "Debates y Política",
    "Conciertos",
    "Comedia",
    "Eventos Familiares",
    "Eventos Deportivos",
    "Exposiciones de Arte",
    "Ferias Locales",
    "Cine y Entretenimiento",
    "Moda",
    "Festivales",
    "Gastronomía",

  ];

  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem('favoriteEvents')) || [];
    setFavorites(savedEvents);
  }, []);

  const addToFavorites = () => {
    const eventsToAddToFavorites = events.filter((event) => selectedCategories.includes(event.category));
    const updatedFavorites = [...favorites, ...eventsToAddToFavorites];
    setFavorites(updatedFavorites);

    setSelectedCategories([]);

    localStorage.setItem('favoriteEvents', JSON.stringify(updatedFavorites));

    Swal.fire({
      title: 'Agregado a favoritos',
      icon: 'success',
      timer: 2000,
      timerProgressBar: true,
    });

    setShowAddToFavoritesMessage(true);
  };

  const handleAddEvent = (eventName, eventCategory) => {
    if (eventName.trim() !== '') {
      const newEvent = { id: Date.now(), name: eventName, category: eventCategory };
      setEvents([...events, newEvent]);
      setNewEventName('');
    }
  };

  const deleteEvent = (eventId) => {
    const updatedEvents = events.filter((event) => event.id !== eventId);
    setEvents(updatedEvents);
  };

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      const updatedCategories = selectedCategories.filter((c) => c !== category);
      setSelectedCategories(updatedCategories);
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <Container className={style.container} maxWidth="sm">
      <Paper className={style.paper} elevation={3}>
        <Typography variant="h4" gutterBottom>
          Eventos de Interés
        </Typography>
        <List>
          {events.map((event) => (
            <ListItem key={event.id}>
              <ListItemText primary={event.name} />
              <Button
                variant="outlined"
                color="primary"
                onClick={() => deleteEvent(event.id)}
              >
                Eliminar
              </Button>
            </ListItem>
          ))}
        </List>
        <div>
          <input
            type="text"
            placeholder="Nombre del evento"
            value={newEventName}
            onChange={(e) => setNewEventName(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleAddEvent(newEventName, 'CustomCategory')}
          >
            Agregar evento
          </Button>
        </div>
        <Typography variant="h4" gutterBottom>
          Wishlist
        </Typography>
        <List>
          {categoryOptions.map((category) => (
            <ListItem key={category} onClick={() => toggleCategory(category)}>
              <ListItemIcon>
                {selectedCategories.includes(category) ? (
                  <CheckBoxIcon />
                ) : (
                  <CheckBoxOutlineBlankIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={category} />
            </ListItem>
          ))}
          <Button
            variant="outlined"
            color="primary"
            onClick={addToFavorites}
            disabled={selectedCategories.length === 0}
          >
            Agregar a Favoritos
          </Button>
        </List>
        {showAddToFavoritesMessage && (
          <div className={style.addedToFavoritesMessage}>
            Eventos agregados a favoritos
          </div>
        )}
      </Paper>
    </Container>
  );
}

export default WishlistEvents;





























































































































