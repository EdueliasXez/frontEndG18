import React from 'react';
import './EventData.css';

const EventData = () => {
    const eventData = [
     { 
      name: 'Evento 1',
      date: '01 de enero de 2024',
      location: 'Lugar 1',
      price: '50.00',
      image: 'imagen-evento-1.jpg',
      },
      {
        name: 'Evento 2',
        date: '15 de febrero de 2024',
        location: 'Lugar 2',
        price: '40.00',
        image: 'imagen-evento-2.jpg',
      }

    ];

  return (
    <div className="EventData">
        <h1>Eventos Disponibles</h1>
      <EventCard eventData={eventData} />
    </div>
  );
}

export default EventData;
