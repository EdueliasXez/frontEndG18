import React, { useEffect, useState } from 'react';
import EventCard from '../Card/Card';
import styles from './Cards.module.css';
import { getEvents, filterEventsByCategory } from '../../Redux/actions/events_actions';
import { useDispatch, useSelector } from 'react-redux';

function Cards() {
  const dispatch = useDispatch();
  const filteredEvents = useSelector((state) => state.events.filteredEvents);
  const loading = useSelector((state) => state.events.loading);
  const error = useSelector((state) => state.events.error);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]); // Almacena los eventos filtrados

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  // Recalcula los eventos filtrados cuando cambie la selección
  useEffect(() => {
    setFilteredData(filteredEvents);
    // También, al cambiar la selección, volvemos a la página 1
    setCurrentPage(1);
  }, [filteredEvents]);

  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const eventsToShow = loading ? [] : error ? [] : filteredData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

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
