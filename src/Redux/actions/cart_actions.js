import * as actionTypes from '../types/types';

export const addToCart = (item) => {
  const action = {
    type: actionTypes.ADD_TO_CART,
    payload: { ...item, quantity: 1 },
  };

  saveCartState(action.payload); 

  return action;
};


export const decreaseQuantity = (item) => {
  const action = {
    type: actionTypes.DECREASE_QUANTITY,
    payload: item,
  };
  saveCartState(action.payload);
  return action;
};

  
export const removeFromCart = (item) => {
  const action = {
    type: actionTypes.REMOVE_FROM_CART,
    payload: item,
  };

  saveCartState(action.payload);

  return action;
};
  
export const clearCart = () => {
  const action = {
    type: actionTypes.CLEAR_CART,
  };


  saveCartState([]); 

  return action;
};


export const saveCheckoutData = (checkoutData) => ({
  type: actionTypes.SAVE_CHECKOUT_DATA,
  payload: checkoutData,
});


export const saveCartState = (cartState) => {
  try {
    const serializedState = JSON.stringify(cartState);
    localStorage.setItem('cartState', serializedState);
  } catch (err) {
  }
};
