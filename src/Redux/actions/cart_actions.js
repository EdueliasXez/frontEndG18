import * as actionTypes from '../types/types';

export const addToCart = (item) => ({
  type: actionTypes.ADD_TO_CART,
  payload: { ...item, quantity: 1 }, 
});


export const decreaseQuantity = (item) => ({
  type: actionTypes.DECREASE_QUANTITY,
  payload: item,
});

  
  export const removeFromCart = (item) => ({
    type: actionTypes.REMOVE_FROM_CART,
    payload: item,
  });
  
  export const clearCart = () => ({
    type: actionTypes.CLEAR_CART,
  });

  export const SAVE_CHECKOUT_DATA = 'SAVE_CHECKOUT_DATA';

export const saveCheckoutData = (checkoutData) => ({
  type: actionTypes.SAVE_CHECKOUT_DATA,
  payload: checkoutData,
});