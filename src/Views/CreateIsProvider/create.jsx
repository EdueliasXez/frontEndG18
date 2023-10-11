import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createEvent } from '../../Redux/actions/events_actions'; 
import axios from 'axios';
import './Create.css'

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
    serviceProviderId: '',
    categoryIds: [],
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
    serviceProviderId: '',
  });

  const [imageFiles, setImageFiles] = useState([]); 

  const handleEventChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value,
    });
  };

  const handlePlaceChange = (e) => {
    const { name, value } = e.target;
    setPlaceData({
      ...placeData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    const imageUrls = [...imageFiles];
  
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.startsWith('image/')) {
        const imageUrl = URL.createObjectURL(files[i]);
        imageUrls.push(imageUrl);
      }
    }
  
    setImageFiles(imageUrls);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const data = {
        images: imageFiles,
      };
  
      const response = await axios.post('/cloudinary/upload', data);
  
      if (response.status === 200) {
        const imageData = response.data;
  
        const imageUrls = imageData.imageUrl;
  
        setEventData({
          ...eventData,
          images: imageUrls,
        });
  
        console.log({ event: eventData, place: placeData });
        dispatch(createEvent({ event: eventData, place: placeData }));
      } else {

      }
    } catch (error) {
      console.error(error);

    }
  };

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
        name="file"
      />
      <label>ID del Proveedor de Servicios</label>
      <input
        type="text"
        name="serviceProviderId"
        value={eventData.serviceProviderId}
        onChange={handleEventChange}
      />
      <label>Categorías del Evento</label>
      <input
        type="text"
        name="categoryIds"
        value={eventData.categoryIds}
        onChange={handleEventChange}
      />
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
      <label>Fecha y Hora del Lugar</label>
      <input
        type="datetime-local"
        name="dateAndTime"
        value={placeData.dateAndTime.date}
        onChange={handlePlaceChange}
      />
      <input
        type="text"
        name="dateAndTime"
        value={placeData.dateAndTime.time}
        onChange={handlePlaceChange}
      />
      <label>ID del Proveedor de Servicios del Lugar</label>
      <input
        type="text"
        name="serviceProviderId"
        value={placeData.serviceProviderId}
        onChange={handlePlaceChange}
      />
      <button type="submit">Crear Evento</button>
    </form>
  );
}

export default EventForm;
