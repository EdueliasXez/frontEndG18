import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getReviews, createReview } from '../../Redux/actions/reviews_actions';
import { getUserProfileFromToken } from '../../Redux/actions/auth_actions';
import { handleActiveReview } from '../../Redux/actions/softDelete_actions'; 

function ReviewsComponent({ reviewedItemId, reviewedItemType }) {
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(0);
  const [active, setActive] = useState(true); 
  const reviews = useSelector((state) => state.reviews.reviews);
  const loading = useSelector((state) => state.reviews.loading);
  const error = useSelector((state) => state.reviews.error);
  const isAuthenticated = useSelector((state) => state.login.isAuthenticated);
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); 

  useEffect(() => {
    if (isAuthenticated) {
      getUserProfileFromToken()
        .then((data) => {
          setUserId(data._id);
          setIsAdmin(data.isAdmin); 
          dispatch(getReviews(reviewedItemId, reviewedItemType));
        })
        .catch((error) => {
          console.error("Error al obtener el usuario:", error);
        });
    }
  }, [dispatch, reviewedItemId, reviewedItemType, isAuthenticated]);

  const handleReviewSubmit = () => {
    if (newReview && userId) {
      const reviewData = {
        reviewedItemId,
        reviewedItemType,
        comment: newReview,
        rating,
        userId,
      };
      dispatch(createReview(reviewData));
      setNewReview('');
      setRating(0);
    }
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  }

  function renderRatingStars(rating) {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          style={{
            color: i <= rating ? 'gold' : 'gray',
          }}
        >
          &#9733;
        </span>
      );
    }
    return stars;
  }

  const handleSoftDeleteReview = (reviewId) => {
    if (isAdmin) {
      handleActiveReview(reviewId, !active); 
      setActive(!active);
    } else {
      console.error("No tienes permisos para desactivar reseñas.");
    }
  }

  return (
    <div>
      <h2>Reseñas</h2>
      {loading ? (
        <p>Cargando reseñas...</p>
      ) : error ? (
        <p>Error al cargar reseñas: {error}</p>
      ) : (
        <div>
          {reviews && reviews.length > 0 ? (
            <ul>
              {reviews.map((review) => (
                <li key={review._id}>
                  <p>Calificación: {renderRatingStars(review.rating)}</p>
                  <p>{review.comment}</p>
                  {isAdmin && (
                    <button onClick={() => handleSoftDeleteReview(review._id)}>
                      {active ? 'Desactivar' : 'Activar'} Reseña
                    </button>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay reseñas disponibles.</p>
          )}

          <div>
            <h3>Califica este artículo</h3>
            <div>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => handleRatingChange(star)}
                  style={{
                    color: star <= rating ? 'gold' : 'gray',
                    cursor: 'pointer',
                  }}
                >
                  &#9733;
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3>Escribe tu reseña</h3>
            <textarea
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
            />
            <button onClick={handleReviewSubmit}>Enviar reseña</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReviewsComponent;
