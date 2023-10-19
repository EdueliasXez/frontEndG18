import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createEvent } from '../../Redux/actions/events_actions';
import { getCategories } from '../../Redux/actions/categories_actions';
import { getUserProfileFromToken } from '../../Redux/actions/auth_actions'; 
import axios from 'axios';
import './Create.css';

function EventForm() {
  const dispatch = useDispatch();
  const [eventData, setEventData] = useState({
    title: '',
    summary: '',
    price: 0,
    stock: 0,
    date: '',
    images: [],
    active: true,
    categoryIds: [],
    serviceProviderId: null, 
  });

  const [placeData, setPlaceData] = useState({
    country: '',
    city: '',
    direction: '',
    postalCode: '',
    dateAndTime: {
      date: '',
      time: '',
    },
    serviceProviderId: null, 
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [categories, setCategories] = useState([]);
  const categoryState = useSelector((state) => state.categories);
  const isAuthenticated = useSelector((state) => state.login.isAuthenticated); 

  useEffect(() => {
    dispatch(getCategories());
  
    getUserProfileFromToken()
      .then((userProfile) => {
        const serviceProviderId = userProfile._id;
        setEventData({
          ...eventData,
          serviceProviderId,
        });
        setPlaceData({
          ...placeData,
          serviceProviderId,
        });
      })
      .catch((error) => {
        console.error('Error al obtener el usuario:', error);
      });
  }, [dispatch]);
  
  // Agrega este useEffect para actualizar las categorías cuando cambie categoryState.categories
  useEffect(() => {
    setCategories(categoryState.categories);
  }, [categoryState.categories]);
  
  
  function handleEventChange(e) {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value,
    });
  }

  function handlePlaceChange(e) {
    const { name, value } = e.target;
    setPlaceData({
      ...placeData,
      [name]: value,
    });
  }

  function handleImageChange(e) {
    const files = e.target.files;
    const newImageFiles = new FormData();

    for (let i = 0; i < files.length; i++) {
      if (files[i].type.startsWith('image/')) {
        newImageFiles.append('images', files[i]);
      }
    }

    setImageFiles(newImageFiles);
  }

  function handleCategoryChange(e) {
    const selectedCategory = e.target.value;
    setEventData({
      ...eventData,
      categoryIds: [selectedCategory],
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
  
    try {
      const response = await axios.post('/cloudinary/upload', imageFiles);
  
      if (response.status === 200) {
        const imageData = response.data;
        const imageUrls = imageData.imageUrls;
  
        const updatedEventData = {
          ...eventData,
          images: imageUrls,
          date: eventData.date,
        };
  
        const updatedPlaceData = {
          ...placeData,
          dateAndTime: {
            date: eventData.date, // Elimina la propiedad "time"
          },
        };
  
        console.log({ event: updatedEventData, place: updatedPlaceData });
  
        dispatch(createEvent({ event: updatedEventData, place: updatedPlaceData }));
      } else {
        // Manejar el error si es necesario
      }
    } catch (error) {
      console.error(error);
    }
  }
  

  return (
    <form onSubmit={handleSubmit}>
      <h2>Crear un Evento</h2>
      <label>Título del Evento</label>
      <input
        type="text"
        name="title"
        value={eventData.title}
        onChange={handleEventChange}
      />
      <label>Resumen del Evento</label>
      <input
        type="text"
        name="summary"
        value={eventData.summary}
        onChange={handleEventChange}
      />
      <label>Precio</label>
      <input
        type="number"
        name="price"
        value={eventData.price}
        onChange={handleEventChange}
      />
      <label>Stock</label>
      <input
        type="number"
        name="stock"
        value={eventData.stock}
        onChange={handleEventChange}
      />
      <label>Fecha del Evento</label>
      <input
        type="datetime-local"
        name="date"
        value={eventData.date}
        onChange={handleEventChange}
      />
      <label>Imágenes del Evento</label>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        name="images"
      />
    
      <label>Categorías del Evento</label>
      <select
        name="categoryIds"
        onChange={handleCategoryChange}
        value={eventData.categoryIds[0]}
      >
        <option value="">Selecciona una categoría</option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>
      <label>País del Lugar</label>
      <input
        type="text"
        name="country"
        value={placeData.country}
        onChange={handlePlaceChange}
      />
      <label>Ciudad del Lugar</label>
      <input
        type="text"
        name="city"
        value={placeData.city}
        onChange={handlePlaceChange}
      />
      <label>Dirección del Lugar</label>
      <input
        type="text"
        name="direction"
        value={placeData.direction}
        onChange={handlePlaceChange}
      />
      <label>Código Postal del Lugar</label>
      <input
        type="text"
        name="postalCode"
        value={placeData.postalCode}
        onChange={handlePlaceChange}
      />
      <button type="submit">Crear Evento</button>
    </form>
  );
}

export default EventForm;
