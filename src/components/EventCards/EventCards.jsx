import React from 'react';
import EventCard from './EventCard';
import "./EventCards.module.css"

const EventCards = ({ events }) => {
  return (
    <div className="event-list">
    {events.map((event, index) => (
      <EventCard key={index} eventData={event} />
    ))}
  </div>
  );
}

export default EventCards;
