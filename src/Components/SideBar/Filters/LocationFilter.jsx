import React, { useState } from 'react';
import { connect } from 'react-redux';
import { filterEventsByLocation } from '../../../Redux/actions/events_actions';

const LocationFilter = ({ eventLocations, filterEventsByLocation }) => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    filterEventsByLocation(event.target.value, selectedCity);
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
    filterEventsByLocation(selectedCountry, event.target.value);
  };

  return (
    <div>
      <h3>Filtrar por localización</h3>
      {eventLocations ? (
      <div>
        <select value={selectedCountry} onChange={handleCountryChange}>
          <option value="">Todos los países</option>
          {eventLocations.countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        <select value={selectedCity} onChange={handleCityChange}>
          <option value="">Todas las ciudades</option>
          {eventLocations.cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
    ) : (
      <p>Cargando datos...</p>
    )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  eventLocations: state.events.eventLocations,
});

const mapDispatchToProps = {
  filterEventsByLocation,
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationFilter);



