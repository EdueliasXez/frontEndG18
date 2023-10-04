import { combineReducers } from 'redux';


// import userReducer from './userReducer';
import eventReducer from './events_reducer';
import categoryReducer from './categories_reducer';

const rootReducer = combineReducers({
//   user: userReducer,
  events: eventReducer,
  categories: categoryReducer,
});

export default rootReducer;
