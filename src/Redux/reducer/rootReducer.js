import { combineReducers } from 'redux';


// import userReducer from './userReducer';
import eventReducer from './events_reducer';
import categoryReducer from './categories_reducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
//   user: userReducer,
auth: authReducer,
events: eventReducer,
  categories: categoryReducer,
});

export default rootReducer;
