import * as actionTypes from '../types/types';

const initialState = {
  items: [],  
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      const existingItem = state.items.find(item => item._id === action.payload._id);

      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item._id === action.payload._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
        };
      }

      case actionTypes.DECREASE_QUANTITY:
      return {
        ...state,
        items: state.items.map((item) =>
          item._id === action.payload._id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };

    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload._id),
      };

    case actionTypes.CLEAR_CART:
      return {
        ...state,
        items: [],
      };
      case actionTypes.SAVE_CHECKOUT_DATA:
      return {
        ...state,
        checkoutData: action.payload,
      };
    default:
      return state;
  }
};

export default cartReducer;
