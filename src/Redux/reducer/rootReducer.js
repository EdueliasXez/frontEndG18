import { combineReducers } from 'redux';


import eventReducer from './events_reducer';
import categoryReducer from './categories_reducer';
import loginReducer from './login_reducer';
import cartReducer from './cart_reducer'
import reviewReducer from './reviews_reducer'
import authReducer from './auth_reducer'
import userReducer from './user_reducer'

const rootReducer = combineReducers({
user: userReducer,
events: eventReducer,
categories: categoryReducer,
cart: cartReducer,
login: loginReducer,
reviews: reviewReducer,
auth: authReducer,
});

export default rootReducer;
