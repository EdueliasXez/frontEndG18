import React, { useEffect, useState } from 'react';
import CustomCard from '../Card/Card';
import styles from './Cards.module.css';
import { getEvents } from '../../Redux/actions/events_actions';
import LocationFilter from '../SideBar/Filters/LocationFilter'
import { useDispatch, useSelector } from 'react-redux';


function Cards() {
  const dispatch = useDispatch();
  const filteredEvents = useSelector((state) => state.events.filteredEvents);
  const loading = useSelector((state) => state.events.loading);
  const error = useSelector((state) => state.events.error);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]); 
  const noEvents = filteredData.length === 0; 

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  useEffect(() => {
    setFilteredData(filteredEvents);
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
      <LocationFilter />
      <div className={styles.contenedorCards}>
        {loading ? (
          <div>Cargando eventos...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : noEvents ? ( // Mostrar aviso cuando no hay eventos
          <div>No hay eventos con estas especificaciones.</div>
        ) : eventsToShow.map((event, index) => (
          <CustomCard key={index} event={event} />
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
