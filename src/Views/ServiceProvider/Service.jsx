import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getEvents } from '../../Redux/actions/events_actions';
import style from './Service.module.css';
import { Link } from 'react-router-dom';

const ServiceProviderEvents = () => {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state) => state.events);
  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Filtrar eventos por serviceProviderId
  const serviceProviderId = '636c69636b795469636b6574';
  const filteredEvents = events.filter((event) => {
    return event.serviceProviderId === serviceProviderId;
  });

  return (
    <div>
      <h1 className={style.h1}>Eventos organizados por : {serviceProviderId}</h1>
      <div className={style.scrollableContent}>
        <ul>
          {filteredEvents.map((event) => (
            <li key={event._id}>
              <h3 className={style.font}>{event.title}</h3>
              <p className={style.txt}> ID: {event._id}</p>
              <ul />
              <Link to={`/put/${event._id}`}>
                <button className={style.btn}>MODIFICAR</button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ServiceProviderEvents;
