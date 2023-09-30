import React, { useState, useEffect } from 'react';
import { Typography, Paper } from '@mui/material';
import Select from 'react-select';
import { useSelector, useDispatch } from 'react-redux';
import { getCategories } from '../../Redux/actions/categories_actions';
import { filterEventsByCategory } from '../../Redux/actions/events_actions';
import styles from './SideBar.module.css'; // Importa el archivo CSS Module

function FilterBar() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const selectedCategory = useSelector((state) => state.events.selectedCategory);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleCategoryChange = (selectedOptions) => {

    dispatch(filterEventsByCategory(selectedOptions));
  };

  const categoriesOptions = categories.map((category) => ({
    value: category._id,
    label: category.name,
  }));

  return (
    <Paper elevation={3} className={styles.filterBarContainer}>
      <Typography variant="h6" gutterBottom className={styles.filterBarTitle}>
        Filtrar por Categoría
      </Typography>
      <Select
        options={categoriesOptions}
        isMulti={true} 
        value={selectedCategory}
        onChange={handleCategoryChange}
        placeholder="Selecciona una o más categorías" // Actualiza el placeholder
      />
    </Paper>
  );
}

export default FilterBar;
