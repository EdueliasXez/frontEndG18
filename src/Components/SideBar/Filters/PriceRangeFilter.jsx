// import React from 'react';
// import ReactRangeSlider from 'react-range-slider';

// const PriceFilterBar = () => {
//   const dispatch = useDispatch();
//   const events = useSelector((state) => state.events);
//   const [priceRange, setPriceRange] = React.useState([events.minPrice, events.maxPrice]);

//   const handleChange = (event) => {
//     const newPriceRange = [event.target.value, priceRange[1]];
//     setPriceRange(newPriceRange);
//     dispatch(filterEventsByPriceRange(newPriceRange));
//   };

//   return (
//     <div>
//       <label>Price range:</label>
//       <ReactRangeSlider
//         min={events.minPrice}
//         max={events.maxPrice}
//         value={priceRange}
//         onChange={handleChange}
//       />
//     </div>
//   );
// };

// export default PriceFilterBar;
