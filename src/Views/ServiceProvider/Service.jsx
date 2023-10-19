import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getEvents } from '../../Redux/actions/events_actions';
import { getUserProfileFromToken } from '../../Redux/actions/auth_actions'; 
import style from './Service.module.css';
import { Link } from 'react-router-dom';

const ServiceProviderEvents = () => {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state) => state.events);
  const [serviceProviderId, setServiceProviderId] = useState(null);

  useEffect(() => {
    getUserProfileFromToken()
      .then((userData) => {
        setServiceProviderId(userData._id);
        dispatch(getEvents()); 
      })
      .catch((error) => {
        console.error('Error al obtener el perfil del usuario:', error);
      });
  }, [dispatch]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  console.log('Eventos completos:', events); 
  console.log('ServiceProviderId', serviceProviderId)

  const filteredEvents = events.filter((event) => {
    return event.serviceProviderId === serviceProviderId;
  });
  
  console.log('Total de eventos filtrados:', filteredEvents.length);
  

  return (
    <div>
      <h1 className={style.h1}>Eventos organizados por: {serviceProviderId}</h1>
      <div className={style.scrollableContent}>
        <ul>
          {filteredEvents.map((event) => (
            <li key={event._id}>
              <h3 className={style.font}>{event.title}</h3>
              <p className={style.txt}>ID: {event._id}</p>
              <ul />
              <Link to={`/put/${event._id}`}>
                <button className={style.btn}>MODIFICAR</button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Link to="/profile"> 
        <button className={style.btn}>Volver a Perfil</button>
      </Link>
    </div>
  );
};

export default ServiceProviderEvents;
