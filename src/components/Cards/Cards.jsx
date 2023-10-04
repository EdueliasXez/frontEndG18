import React, { useEffect, useState } from 'react';
import EventCard from '../Card/Card';
import styles from './Cards.module.css';
import { getEvents, filterEventsByCategory } from '../../Redux/actions/events_actions';
import { useDispatch, useSelector } from 'react-redux';
//name
function Cards() {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events);
  const filteredEvents = useSelector((state) => state.events.filteredEvents);
  const loading = useSelector((state) => state.events.loading);
  const error = useSelector((state) => state.events.error);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (currentPage === 1) {
      dispatch(getEvents());
    }
  }, [dispatch, currentPage]);

  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const eventsToShow = loading ? [] : error ? [] : filteredEvents.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);

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
        <span className={styles.pageInfo}>Página {currentPage} de {totalPages}</span>
        <button className={styles.button2} onClick={handleNextPage} disabled={currentPage === totalPages}>
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default Cards;