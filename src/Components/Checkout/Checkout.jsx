import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { connect } from 'react-redux';
import styles from './Checkout.module.css'; // Importa los estilos

const stripePromise = loadStripe('pk_test_51Nv7bmABSmc5TFCSMCyTdEcykYDNkcyeEoqCv9dGxURp9fdrYPf5ax5LR9uRfbACItnY8yTMqcSBUK7BGuk9AXdX00yloW87TK');

const Checkout = (props) => {
  const [loading, setLoading] = useState(false);

  const { checkoutData } = props;

  const handleCheckout = async () => {
    setLoading(true);

    const stripe = await stripePromise;

    try {
      const { cartItems } = checkoutData;

      const lineItems = cartItems.map((item) => ({
        price_data: {
          product_data: {
            name: item.title,
          },
          currency: 'usd',
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      }));

      const body = {
        line_items: lineItems,
      };

      const response = await axios.post('/checkout/charge', body);

      const session = response.data;

      const SESSION_ID = session.id;

      const result = await stripe.redirectToCheckout({
        sessionId: SESSION_ID,
      });

      if (result.error) {
        console.error(result.error.message);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error al crear la sesión de pago:', error);
      setLoading(false);
    }
  };

  return (
    <div className={styles['checkout-container']}>
      <h2 className={styles['checkout-title']}>Checkout</h2>
      <h3>Items en el carrito:</h3>
      <ul>
        {checkoutData.cartItems.map((item) => (
          <li key={item._id} className={styles['cart-item']}>
            {item.title} - ${item.price} x {item.quantity}
          </li>
        ))}
      </ul>
      <p>Total: ${checkoutData.total}</p>
      <button
        onClick={handleCheckout}
        disabled={loading}
        className={styles['checkout-button']}
      >
        {loading ? 'Procesando...' : 'Realizar Pago'}
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    checkoutData: state.cart.checkoutData,
  };
};

export default connect(mapStateToProps)(Checkout);
