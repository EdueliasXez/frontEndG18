import React from 'react'; 
import { connect, useDispatch } from 'react-redux';
import { clearCart, addToCart, decreaseQuantity, removeFromCart, saveCheckoutData } from '../../Redux/actions/cart_actions';
import style from './Cart.module.css';
import { useNavigate } from 'react-router-dom';

function SidebarCart(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sumarUnidad = (item) => {
    if (item.quantity > 0) {
      dispatch(addToCart(item));
    }
  };

  const restarUnidad = (item) => {
    if (item.quantity > 1) {
      dispatch(decreaseQuantity(item));
    } else {
      dispatch(removeFromCart(item));
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const getCheckoutData = () => {
    return {
      cartItems: props.cartItems,
      total: props.cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    };
  };

  const handleCheckoutData = () => {
    const checkoutData = getCheckoutData();
    console.log('Datos de checkout:', checkoutData);
    dispatch(saveCheckoutData(checkoutData));
    navigate('/checkout');
  };

  console.log("Renderizando SidebarCart");

  
  const productList = props.cartItems.map(item => ({
    ...item,
    selectedImage: item.images[0],
  }));

  return (
    <div className={`${style.sidebar} ${props.showCart ? style.show : ''}`}>
      <h2>Carrito de Compras</h2>
      <div className="productList">
        {productList.map(item => (
          <div key={item._id} className={`${style.productItem}`}>
            <img src={item.selectedImage} className={`${style.productImage}`} alt={item.title} />
            <div>
              <h6>{item.title}</h6>
              <p>${item.price}</p>
            </div>
            <div className={`${style.quantity}`}>
              <button onClick={() => restarUnidad(item)} style={{ color: 'black' }}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => sumarUnidad(item)} style={{ color: 'black' }}>+</button>
            </div>
          </div>
        ))}
      </div>
      <div className={`${style.cartButtons}`}>
        <div className={`${style.buttonGroup}`}>
          <button onClick={handleClearCart}>Vaciar Carrito</button>
          <button onClick={handleCheckoutData}>Comprar</button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cart.items,
  };
};

export default connect(mapStateToProps)(SidebarCart);


////////////////////////////


// import React from 'react'; original
// import { connect, useDispatch } from 'react-redux';
// import { clearCart, addToCart, decreaseQuantity, removeFromCart, saveCheckoutData } from '../../Redux/actions/cart_actions';
// import style from './Cart.module.css';
// import { useNavigate } from 'react-router-dom';

// function SidebarCart(props) {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const sumarUnidad = (item) => {
//     if (item.quantity > 0) {
//       dispatch(addToCart(item));
//     }
//   };

//   const restarUnidad = (item) => {
//     if (item.quantity > 1) {
//       dispatch(decreaseQuantity(item));
//     } else {
//       dispatch(removeFromCart(item));
//     }
//   };
  
//   const handleClearCart = () => {
//     dispatch(clearCart());
//   };

//   const getCheckoutData = () => {
//     return {
//       cartItems: props.cartItems,
//       total: props.cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
//     };
//   }

//   const handleCheckoutData = () => {
//     const checkoutData = getCheckoutData();
//     console.log('Datos de checkout:', checkoutData);
//     dispatch(saveCheckoutData(checkoutData));
//     navigate('/checkout');
//   };

//   console.log("Renderizando SidebarCart");

//   return (
//   <div className={`${style.sidebar} ${props.showCart ? style.show : ''}`}>
//     <h2>Carrito de Compras</h2>
//     <div className="productList">
//       {props.cartItems.map(item => (
//         <div key={item._id} className={`${style.productItem}`}>
//           <img src={item.image} className={`${style.productImage}`} alt={item.title} />
//           <div>
//             <h6>{item.title}</h6>
//             <p>${item.price}</p>
//           </div>
//           <div className={`${style.quantity}`}>
//   <button onClick={() => restarUnidad(item)} style={{ color: 'black' }}>-</button>
//   <span>{item.quantity}</span>
//   <button onClick={() => sumarUnidad(item)} style={{ color: 'black' }}>+</button>
// </div>

//         </div>
//       ))}
//     </div>
//     <div className={`${style.cartButtons}`}>
//       <div className={`${style.buttonGroup}`}>
//       <button onClick={handleClearCart}>Vaciar Carrito</button>
//         <button onClick={handleCheckoutData}>Comprar</button>
//       </div>
//     </div>
//   </div>
// );
// }

// const mapStateToProps = (state) => {
//   return {
//     cartItems: state.cart.items,
//   };
// };

// export default connect(mapStateToProps)(SidebarCart);

