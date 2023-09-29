import React, { useEffect, useState } from 'react';
import EventCard from '../Card/Card'; // Asegúrate de tener la ruta correcta al componente EventCard
import styles from './Cards.module.css';
import { getEvents } from '../../Redux/actions/events_actions';
import { useDispatch, useSelector } from 'react-redux';

function Cards() {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events);
  const loading = useSelector((state) => state.events.loading);
  const error = useSelector((state) => state.events.error);

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);
  console.log(events);

  const itemsPerPage = 10; 
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const eventsToShow = events.slice(startIndex, endIndex);

  const totalPages = Math.ceil(events.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className={styles.contGeneral}>
      <div className={styles.contenedorCards}>
        {loading ? (
          <div>Cargando eventos...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : eventsToShow.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </div>
      <div className={styles.contPag}>
        <button className={styles.button1} onClick={handlePrevPage} disabled={currentPage === 1}>
          Anterior
        </button>
        <button className={styles.button2} onClick={handleNextPage} disabled={currentPage === totalPages}>
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default Cards;
