import React from 'react'
import './EventCard.css';


const EventCard = ({eventData}) => {
  return (
    <div className="card">
    <img src={eventData.image} alt={eventData.name} />
    <div className="card-info">
      <h2>{eventData.name}</h2>
      <p>Fecha: {eventData.date}</p>
      <p>Lugar: {eventData.location}</p>
      <p>Precio: ${eventData.price}</p>
      <button>Comprar boletos</button>
    </div>
  </div>
  );
}

export default EventCard;
